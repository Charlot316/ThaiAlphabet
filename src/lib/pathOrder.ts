export type Point = { x: number; y: number };

export type PathSegment =
  | { cmd: "L"; from: Point; to: Point }
  | { cmd: "C"; from: Point; c1: Point; c2: Point; to: Point };

export type OrderedPathPoint = {
  order: number;
  point: Point;
  role: "start" | "end";
  segmentIndex: number;
  repeatIndex: number;
  repeatCount: number;
};

export type PathNode = {
  id: number;
  point: Point;
  useCount: number;
};

export type PathEdge = {
  fromId: number;
  toId: number;
  segmentIndex: number;
  segment: PathSegment;
};

export type StrokeLike = {
  d: string;
  sourceD?: string;
  points?: Array<{ id: number; x: number; y: number }>;
  sequence?: number[];
};

export type StrokePointModel = {
  nodes: PathNode[];
  edges: PathEdge[];
  sequence: number[];
};

function pointKey(point: Point) {
  return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
}

export function samePoint(a: Point, b: Point) {
  return Math.abs(a.x - b.x) < 0.01 && Math.abs(a.y - b.y) < 0.01;
}

export function fmtPathNumber(n: number) {
  return Number(n).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

export function parsePathSegments(d: string): PathSegment[] | null {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [];
  const segments: PathSegment[] = [];
  let current: Point | null = null;
  let subpathStart: Point | null = null;
  let i = 0;

  const take = () => Number(tokens[i++]);
  const point = (): Point => ({ x: take(), y: take() });

  while (i < tokens.length) {
    const token = tokens[i++];
    if (!/[a-zA-Z]/.test(token)) return null;
    const cmd = token.toUpperCase();
    if (cmd !== token) return null;

    if (cmd === "M") {
      current = point();
      subpathStart = current;
    } else if (cmd === "L" && current) {
      const to = point();
      segments.push({ cmd: "L", from: current, to });
      current = to;
    } else if (cmd === "H" && current) {
      const to: Point = { x: take(), y: current.y };
      segments.push({ cmd: "L", from: current, to });
      current = to;
    } else if (cmd === "V" && current) {
      const to: Point = { x: current.x, y: take() };
      segments.push({ cmd: "L", from: current, to });
      current = to;
    } else if (cmd === "C" && current) {
      const c1 = point();
      const c2 = point();
      const to = point();
      segments.push({ cmd: "C", from: current, c1, c2, to });
      current = to;
    } else if (cmd === "Z" && current && subpathStart) {
      segments.push({ cmd: "L", from: current, to: subpathStart });
      current = subpathStart;
    } else {
      return null;
    }
  }

  return segments;
}

export function pathSegmentsToD(segments: PathSegment[]) {
  const parts: string[] = [];
  let cursor: Point | null = null;

  for (const segment of segments) {
    if (!cursor || !samePoint(cursor, segment.from)) {
      parts.push(`M ${fmtPathNumber(segment.from.x)} ${fmtPathNumber(segment.from.y)}`);
    }

    if (segment.cmd === "L") {
      parts.push(`L ${fmtPathNumber(segment.to.x)} ${fmtPathNumber(segment.to.y)}`);
    } else {
      parts.push(
        `C ${fmtPathNumber(segment.c1.x)} ${fmtPathNumber(segment.c1.y)} ${fmtPathNumber(segment.c2.x)} ${fmtPathNumber(segment.c2.y)} ${fmtPathNumber(segment.to.x)} ${fmtPathNumber(segment.to.y)}`
      );
    }
    cursor = segment.to;
  }

  return parts.join(" ");
}

export function orderedPointsFromPath(d: string): OrderedPathPoint[] {
  const segments = parsePathSegments(d);
  if (!segments?.length) return [];

  const points: Omit<OrderedPathPoint, "repeatIndex" | "repeatCount">[] = [];
  segments.forEach((segment, segmentIndex) => {
    const previous = segments[segmentIndex - 1];
    if (!previous || !samePoint(previous.to, segment.from)) {
      points.push({
        order: points.length + 1,
        point: segment.from,
        role: "start",
        segmentIndex,
      });
    }
    points.push({
      order: points.length + 1,
      point: segment.to,
      role: "end",
      segmentIndex,
    });
  });

  const totals = new Map<string, number>();
  for (const entry of points) {
    const key = pointKey(entry.point);
    totals.set(key, (totals.get(key) ?? 0) + 1);
  }

  const seen = new Map<string, number>();
  return points.map((entry) => {
    const key = pointKey(entry.point);
    const repeatIndex = (seen.get(key) ?? 0) + 1;
    seen.set(key, repeatIndex);
    return {
      ...entry,
      repeatIndex,
      repeatCount: totals.get(key) ?? 1,
    };
  });
}

function reverseSegment(segment: PathSegment): PathSegment {
  if (segment.cmd === "L") {
    return { cmd: "L", from: segment.to, to: segment.from };
  }
  return {
    cmd: "C",
    from: segment.to,
    c1: segment.c2,
    c2: segment.c1,
    to: segment.from,
  };
}

function closestNodeId(nodes: PathNode[], point: Point): number {
  let best = nodes[0]?.id ?? 1;
  let bestD2 = Infinity;
  for (const node of nodes) {
    const d2 = (node.point.x - point.x) ** 2 + (node.point.y - point.y) ** 2;
    if (d2 < bestD2) {
      bestD2 = d2;
      best = node.id;
    }
  }
  return best;
}

export function pointModelFromStroke(stroke: StrokeLike): StrokePointModel {
  const segments = parsePathSegments(stroke.sourceD ?? stroke.d) ?? [];
  const nodes: PathNode[] = [];
  const nodeByKey = new Map<string, PathNode>();

  if (Array.isArray(stroke.points) && stroke.points.length > 0) {
    const sorted = [...stroke.points].sort((a, b) => a.id - b.id);
    for (const point of sorted) {
      const node = {
        id: point.id,
        point: { x: point.x, y: point.y },
        useCount: 0,
      };
      nodes.push(node);
      nodeByKey.set(pointKey(node.point), node);
    }
  }

  const ensureNode = (point: Point) => {
    const key = pointKey(point);
    const existing = nodeByKey.get(key);
    if (existing) return existing;
    const node = {
      id: nodes.length + 1,
      point: { x: point.x, y: point.y },
      useCount: 0,
    };
    nodes.push(node);
    nodeByKey.set(key, node);
    return node;
  };

  const edges = segments.map((segment, segmentIndex) => {
    const fromId = nodes.length > 0 && stroke.points?.length ? closestNodeId(nodes, segment.from) : ensureNode(segment.from).id;
    const toId = nodes.length > 0 && stroke.points?.length ? closestNodeId(nodes, segment.to) : ensureNode(segment.to).id;
    return { fromId, toId, segmentIndex, segment };
  });

  const sequence =
    Array.isArray(stroke.sequence) && stroke.sequence.length > 0
      ? stroke.sequence.filter((id) => nodes.some((node) => node.id === id))
      : edges.reduce<number[]>((acc, edge, index) => {
          const previous = edges[index - 1];
          if (index === 0 || previous?.toId !== edge.fromId) acc.push(edge.fromId);
          acc.push(edge.toId);
          return acc;
        }, []);

  const useCounts = new Map<number, number>();
  for (const id of sequence) useCounts.set(id, (useCounts.get(id) ?? 0) + 1);

  return {
    nodes: nodes
      .map((node) => ({ ...node, useCount: useCounts.get(node.id) ?? 0 }))
      .sort((a, b) => a.id - b.id),
    edges,
    sequence,
  };
}

export function parsePointSequence(input: string, maxId: number): number[] | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/[\s,，、>-]+/).filter(Boolean);
  const ids = parts.map(Number);
  if (ids.some((id) => !Number.isInteger(id) || id < 1 || id > maxId)) return null;
  return ids.length >= 2 ? ids : null;
}

export function sequenceToText(sequence: number[]) {
  return sequence.join(" ");
}

export function buildPathFromPointSequence(stroke: StrokeLike, sequence: number[]): string | null {
  const model = pointModelFromStroke(stroke);
  const nodeById = new Map(model.nodes.map((node) => [node.id, node]));
  const output: PathSegment[] = [];

  for (let i = 0; i < sequence.length - 1; i++) {
    const fromId = sequence[i];
    const toId = sequence[i + 1];
    if (fromId === toId) continue;
    const from = nodeById.get(fromId);
    const to = nodeById.get(toId);
    if (!from || !to) return null;

    const direct = model.edges.find((edge) => edge.fromId === fromId && edge.toId === toId);
    if (direct) {
      output.push(direct.segment);
      continue;
    }

    const reversed = model.edges.find((edge) => edge.fromId === toId && edge.toId === fromId);
    if (reversed) {
      output.push(reverseSegment(reversed.segment));
      continue;
    }

    output.push({ cmd: "L", from: from.point, to: to.point });
  }

  return output.length > 0 ? pathSegmentsToD(output) : null;
}

export function moveSegmentForPoint(d: string, pointOrder: number, delta: -1 | 1): string | null {
  const segments = parsePathSegments(d);
  if (!segments?.length) return null;
  const point = orderedPointsFromPath(d)[pointOrder];
  if (!point) return null;
  const from = point.segmentIndex;
  const to = from + delta;
  if (to < 0 || to >= segments.length) return null;
  const next = segments.slice();
  [next[from], next[to]] = [next[to], next[from]];
  return pathSegmentsToD(next);
}

export function reversePathBySegments(d: string): string {
  const segments = parsePathSegments(d);
  if (!segments?.length) return d;
  const reversed = [...segments].reverse().map(reverseSegment);
  return pathSegmentsToD(reversed);
}
