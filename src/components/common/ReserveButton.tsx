"use client";
import { useUI } from "@/components/layout/UIProvider";

export function ReserveButton({ label = "Reserve a table" }: { label?: string }) {
  const { openReserve } = useUI();
  return (
    <button type="button" onClick={openReserve} className="btn btn-solid t-nav">
      {label} <span className="arrow">→</span>
    </button>
  );
}
