import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
const PUBLIC_PREFIX = process.env.UPLOAD_PUBLIC_PREFIX || "/uploads";

async function saveLocal(file: File): Promise<string> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = /^[a-z0-9]{2,5}$/.test(ext) ? ext : "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  const filepath = path.join(UPLOAD_DIR, name);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buf);
  return `${PUBLIC_PREFIX}/${name}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File kosong" }, { status: 400 });
    }
    if (!ACCEPTED.includes(file.type)) {
      return NextResponse.json(
        { error: "Format harus JPG/PNG/WebP/AVIF" },
        { status: 400 },
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran maks 4MB" },
        { status: 400 },
      );
    }

    // Vercel Blob jika tersedia
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const ext = file.name.split(".").pop() || "jpg";
      const filename = `products/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: false,
      });
      return NextResponse.json({ url: blob.url });
    }

    // Fallback: filesystem (VPS / self-host)
    const url = await saveLocal(file);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ error: "Upload gagal" }, { status: 500 });
  }
}
