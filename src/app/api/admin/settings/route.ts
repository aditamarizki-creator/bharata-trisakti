import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSettings, saveSettings } from "@/lib/storage";
import type { Settings } from "@/types/product";

export const runtime = "nodejs";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: Request) {
  try {
    const patch = (await req.json()) as Partial<Settings>;
    const current = await getSettings();
    const merged: Settings = {
      ...current,
      ...patch,
      promoBanner: { ...current.promoBanner, ...(patch.promoBanner ?? {}) },
    };
    // Sanitize WA number: only digits
    merged.waNumber = (merged.waNumber || "").replace(/\D/g, "");
    if (merged.waNumber.startsWith("0")) {
      merged.waNumber = "62" + merged.waNumber.slice(1);
    }
    await saveSettings(merged);
    // Revalidate semua pages karena settings dipakai global
    revalidatePath("/", "layout");
    return NextResponse.json({ settings: merged });
  } catch (e) {
    console.error("[settings PUT]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
