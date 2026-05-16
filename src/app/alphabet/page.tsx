"use client";

import AlphabetModulePanel from "@/components/AlphabetModulePanel";
import { useAlphabetFinalExamResult } from "@/lib/moduleProgress";

export default function AlphabetPage() {
  const examResult = useAlphabetFinalExamResult();
  return (
    <div className="space-y-5">
      <AlphabetModulePanel examResult={examResult} />
    </div>
  );
}
