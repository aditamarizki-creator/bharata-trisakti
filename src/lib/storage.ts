import "server-only";
import { Redis } from "@upstash/redis";
import type { Product, Settings } from "@/types/product";
import { PRODUCTS as SEED_PRODUCTS } from "./products";
import { DEFAULT_SETTINGS } from "@/types/product";

// Vercel KV exposes the same Upstash REST API via env vars.
// Common names: KV_REST_API_URL/KV_REST_API_TOKEN (Vercel KV legacy)
// or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN (Upstash direct).
function getRedisUrl() {
  return (
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_URL ||
    ""
  );
}

function getRedisToken() {
  return (
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_TOKEN ||
    ""
  );
}

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = getRedisUrl();
  const token = getRedisToken();
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

export function isStorageConfigured(): boolean {
  return getRedis() !== null;
}

// ===== In-memory fallback (preview / dev tanpa KV) =====
type MemoryStore = {
  products: Product[] | null;
  settings: Settings | null;
};
const mem: MemoryStore = { products: null, settings: null };

const KEY_PRODUCTS = "bharata:products";
const KEY_SETTINGS = "bharata:settings";

// ===== Products =====

export async function getProducts(): Promise<Product[]> {
  const r = getRedis();
  if (!r) {
    if (!mem.products) mem.products = seedProducts();
    return mem.products;
  }
  try {
    const data = await r.get<Product[]>(KEY_PRODUCTS);
    if (!data || !Array.isArray(data) || data.length === 0) {
      // first run: seed from products.ts
      const seeded = seedProducts();
      await r.set(KEY_PRODUCTS, seeded);
      return seeded;
    }
    return data;
  } catch (e) {
    console.error("[storage] getProducts error:", e);
    if (!mem.products) mem.products = seedProducts();
    return mem.products;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function saveProducts(products: Product[]): Promise<void> {
  const r = getRedis();
  if (!r) {
    mem.products = products;
    return;
  }
  await r.set(KEY_PRODUCTS, products);
}

export async function upsertProduct(product: Product): Promise<Product> {
  const all = await getProducts();
  const idx = all.findIndex((p) => p.id === product.id);
  const now = Date.now();
  const next: Product = {
    ...product,
    updatedAt: now,
    createdAt: idx >= 0 ? all[idx].createdAt ?? now : now,
  };
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  await saveProducts(all);
  return next;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const all = await getProducts();
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) return false;
  await saveProducts(next);
  return true;
}

// ===== Settings =====

export async function getSettings(): Promise<Settings> {
  const r = getRedis();
  if (!r) {
    if (!mem.settings) mem.settings = { ...DEFAULT_SETTINGS };
    return mem.settings;
  }
  try {
    const data = await r.get<Settings>(KEY_SETTINGS);
    if (!data) {
      await r.set(KEY_SETTINGS, DEFAULT_SETTINGS);
      return { ...DEFAULT_SETTINGS };
    }
    // merge defaults agar field baru terisi
    return { ...DEFAULT_SETTINGS, ...data, promoBanner: { ...DEFAULT_SETTINGS.promoBanner, ...(data.promoBanner ?? {}) } };
  } catch (e) {
    console.error("[storage] getSettings error:", e);
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  const r = getRedis();
  if (!r) {
    mem.settings = settings;
    return;
  }
  await r.set(KEY_SETTINGS, settings);
}

// ===== Seed =====
function seedProducts(): Product[] {
  return SEED_PRODUCTS.map((p) => ({
    ...p,
    inStock: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
}
