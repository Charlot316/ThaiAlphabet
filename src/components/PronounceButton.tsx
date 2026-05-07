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
      className={`btn-blue px-4 py-2 text-xs ${className}`}
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
