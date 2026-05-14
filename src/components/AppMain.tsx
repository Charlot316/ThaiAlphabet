"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AppMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <main
      ref={mainRef}
      className="relative isolate w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-x-none"
      style={{ background: "transparent", contain: "layout paint" }}
    >
      <div
        key={pathname}
        className="mx-auto flex min-h-full w-full max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl flex-col px-4 py-5 sm:px-5 lg:px-6"
        style={{
          background: "transparent",
          paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
        }}
      >
        {children}
      </div>
    </main>
  );
}
