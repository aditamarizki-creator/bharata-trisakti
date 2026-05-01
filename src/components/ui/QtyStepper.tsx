"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  className,
}: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0 glass rounded-full p-1 border border-white/70",
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Kurangi"
        className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/70 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-10 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Tambah"
        className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/70 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
