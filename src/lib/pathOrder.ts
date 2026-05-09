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

function pointKey(point: Point) {
  return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
}

function samePoint(a: Point, b: Point) {
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
  const reversed = [...segments].reverse().map((segment): PathSegment => {
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
  });
  return pathSegmentsToD(reversed);
}
