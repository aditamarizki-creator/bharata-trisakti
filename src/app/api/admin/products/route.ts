import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProducts, upsertProduct } from "@/lib/storage";
import type { Product } from "@/types/product";

export const runtime = "nodejs";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Product>;
    if (!body.name || !body.brand) {
      return NextResponse.json({ error: "Brand & nama wajib" }, { status: 400 });
    }
    const id =
      body.id ||
      `${body.brand.replace(/\s+/g, "")}-${Date.now().toString(36)}`;
    const slug =
      body.slug ||
      `${body.brand}-${body.name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    const product: Product = {
      id,
      slug,
      brand: body.brand,
      name: body.name,
      fishType: body.fishType ?? ["koi"],
      purpose: body.purpose ?? ["daily"],
      description: body.description ?? "",
      variants:
        body.variants && body.variants.length > 0
          ? body.variants
          : [
              { size: "1kg", price: 0 },
              { size: "5kg", price: 0 },
              { size: "10kg", price: 0 },
              { size: "20kg", price: 0 },
            ],
      image: body.image ?? "",
      imageUrl: body.imageUrl ?? "",
      featured: !!body.featured,
      inStock: body.inStock !== false,
      badge: body.badge,
    };
    const saved = await upsertProduct(product);
    // Revalidate storefront pages
    revalidatePath("/");
    revalidatePath("/katalog");
    return NextResponse.json({ product: saved });
  } catch (e) {
    console.error("[products POST]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
