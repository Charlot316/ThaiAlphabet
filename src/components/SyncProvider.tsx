"use client";
import { useEffect } from "react";
import { installSyncHook, isLoggedIn, pull } from "@/lib/sync";

export default function SyncProvider() {
  useEffect(() => {
    installSyncHook();
    if (isLoggedIn()) {
      pull(); // 启动时把云端最新数据拉回来
    }
  }, []);
  return null;
}
