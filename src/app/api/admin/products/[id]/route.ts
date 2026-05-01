import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteProduct, getProduct, upsertProduct } from "@/lib/storage";
import type { Product } from "@/types/product";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const existing = await getProduct(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const patch = (await req.json()) as Partial<Product>;
    const merged: Product = { ...existing, ...patch, id: existing.id };
    const saved = await upsertProduct(merged);
    revalidatePath("/");
    revalidatePath("/katalog");
    return NextResponse.json({ product: saved });
  } catch (e) {
    console.error("[products PATCH]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ok = await deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidatePath("/");
  revalidatePath("/katalog");
  return NextResponse.json({ ok: true });
}
