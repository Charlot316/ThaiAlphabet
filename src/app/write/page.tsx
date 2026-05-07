"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import PronounceButton from "@/components/PronounceButton";

export default function WritePage() {
  const items = useMemo(() => CONSONANTS.filter((c) => !c.obsolete), []);
  const [idx, setIdx] = useState(0);
  const c = items[idx];

  return (
    <div className="space-y-3">
      <div className="card-soft p-5 flex flex-col items-center">
        <div className="text-xs opacity-60">描红：在画布上临摹</div>
        <div className="thai-big text-2xl mt-1">{c.name} <span className="opacity-60">{c.meaning}</span></div>
        <div className="mt-1"><PronounceButton text={`${c.letter} ${c.name}`} label="🔊" /></div>
      </div>

      <TraceCanvas letter={c.letter} key={c.id} />

      <div className="flex justify-between gap-2">
        <button onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)} className="btn-ghost flex-1">‹ 上一个</button>
        <button onClick={() => setIdx((i) => (i + 1) % items.length)} className="btn-primary flex-1">下一个 ›</button>
      </div>
    </div>
  );
}

function TraceCanvas({ letter }: { letter: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  function clear() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    drawGuide();
  }

  function drawGuide() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.font = `${c.height * 0.85}px "Noto Sans Thai", "Sukhumvit Set", Tahoma, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, c.width / 2, c.height / 2);
    ctx.restore();
  }

  function pos(e: PointerEvent | React.PointerEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const ev = "nativeEvent" in e ? e.nativeEvent : (e as PointerEvent);
    return {
      x: ((ev as PointerEvent).clientX - r.left) * (c.width / r.width),
      y: ((ev as PointerEvent).clientY - r.top) * (c.height / r.height),
    };
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    // 高分辨率
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(1, 1);
    drawGuide();
  }, [letter]);

  function onDown(e: React.PointerEvent) {
    drawing.current = true;
    last.current = pos(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    if (!drawing.current) return;
    const p = pos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function onUp() {
    drawing.current = false;
    last.current = null;
  }

  return (
    <div className="card-soft space-y-2 p-3">
      <canvas
        ref={canvasRef}
        className="w-full aspect-square touch-none rounded-xl bg-white dark:bg-white/95"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
      />
      <div className="flex justify-end">
        <button onClick={clear} className="btn-orange px-4">🗑 清空</button>
      </div>
    </div>
  );
}
