"use client";

export interface PageScrollLock {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyWidth: string;
  bodyTouchAction: string;
  htmlOverflow: string;
  htmlTouchAction: string;
  scrollY: number;
}

export function lockPageScroll(): PageScrollLock | null {
  if (typeof window === "undefined") return null;
  const body = document.body;
  const html = document.documentElement;
  const snapshot: PageScrollLock = {
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyWidth: body.style.width,
    bodyTouchAction: body.style.touchAction,
    htmlOverflow: html.style.overflow,
    htmlTouchAction: html.style.touchAction,
    scrollY: window.scrollY,
  };
  html.style.overflow = "hidden";
  html.style.touchAction = "none";
  body.style.overflow = "hidden";
  body.style.touchAction = "none";
  body.style.position = "fixed";
  body.style.top = `-${snapshot.scrollY}px`;
  body.style.width = "100%";
  return snapshot;
}

export function unlockPageScroll(snapshot: PageScrollLock | null) {
  if (!snapshot || typeof window === "undefined") return;
  const body = document.body;
  const html = document.documentElement;
  body.style.overflow = snapshot.bodyOverflow;
  body.style.position = snapshot.bodyPosition;
  body.style.top = snapshot.bodyTop;
  body.style.width = snapshot.bodyWidth;
  body.style.touchAction = snapshot.bodyTouchAction;
  html.style.overflow = snapshot.htmlOverflow;
  html.style.touchAction = snapshot.htmlTouchAction;
  window.scrollTo(0, snapshot.scrollY);
}

export function preventElementTouchScroll(element: Element): () => void {
  const prevent = (event: Event) => {
    event.preventDefault();
  };
  element.addEventListener("touchstart", prevent, { passive: false });
  element.addEventListener("touchmove", prevent, { passive: false });
  return () => {
    element.removeEventListener("touchstart", prevent);
    element.removeEventListener("touchmove", prevent);
  };
}
