"use client";

export const LOCATION_CHANGE_EVENT = "thai-alphabet:location-change";

declare global {
  interface Window {
    __thaiLocationEventsInstalled?: boolean;
  }
}

export function installLocationChangeEvents() {
  if (typeof window === "undefined" || window.__thaiLocationEventsInstalled) return;
  window.__thaiLocationEventsInstalled = true;

  const fire = () => window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(...args) {
    const result = originalPushState.apply(this, args);
    queueMicrotask(fire);
    return result;
  };

  window.history.replaceState = function replaceState(...args) {
    const result = originalReplaceState.apply(this, args);
    queueMicrotask(fire);
    return result;
  };

  window.addEventListener("popstate", fire);
  window.addEventListener("pageshow", fire);
}
