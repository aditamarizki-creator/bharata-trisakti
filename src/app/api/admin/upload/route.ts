import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Vercel Blob belum ter-setup. Buka Vercel dashboard → Storage → Create Blob.",
      },
      { status: 503 },
    );
  }
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
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ error: "Upload gagal" }, { status: 500 });
  }
}
