"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Settings } from "@/types/product";
import { DEFAULT_SETTINGS } from "@/types/product";

const Ctx = createContext<Settings>(DEFAULT_SETTINGS);

export function SettingsProvider({
  value,
  children,
}: {
  value: Settings;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings(): Settings {
  return useContext(Ctx);
}
