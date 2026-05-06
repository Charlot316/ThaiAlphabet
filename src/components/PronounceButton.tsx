"use client";
import { useEffect } from "react";
import { speak, warmupVoices } from "@/lib/tts";

export default function PronounceButton({
  text,
  label = "🔊",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  useEffect(() => {
    warmupVoices();
  }, []);
  return (
    <button
      type="button"
      className={`btn-ghost text-sm px-3 py-2 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        speak(text);
      }}
      aria-label={`发音 ${text}`}
    >
      {label}
    </button>
  );
}
