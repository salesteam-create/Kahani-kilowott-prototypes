"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useScroll } from "@/components/motion/ScrollProvider";

type Panel = null | "menu" | "reserve";

const UICtx = createContext<{
  panel: Panel;
  openMenu: () => void;
  openReserve: () => void;
  close: () => void;
}>({ panel: null, openMenu: () => {}, openReserve: () => {}, close: () => {} });

export const useUI = () => useContext(UICtx);

/** Owns the two full-screen overlays so only one is ever open, and freezes scroll beneath them. */
export function UIProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const { stop, start } = useScroll();

  useEffect(() => {
    const html = document.documentElement;
    if (panel) {
      stop();
      html.style.overflow = "hidden";
    } else {
      start();
      html.style.overflow = "";
    }
  }, [panel, stop, start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = useCallback(() => setPanel("menu"), []);
  const openReserve = useCallback(() => setPanel("reserve"), []);
  const close = useCallback(() => setPanel(null), []);

  return <UICtx.Provider value={{ panel, openMenu, openReserve, close }}>{children}</UICtx.Provider>;
}
