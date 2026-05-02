import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";
import type { Product, Settings } from "@/types/product";
import { PRODUCTS as SEED_PRODUCTS } from "./products";
import { DEFAULT_SETTINGS } from "@/types/product";

// Storage backends:
// 1. Upstash/Vercel KV jika env KV_REST_API_URL ter-set (deploy Vercel)
// 2. Filesystem JSON di DATA_DIR (default ./data) — VPS / self-host
const DATA_DIR =
  process.env.DATA_DIR || path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

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
  return getRedis() !== null || true; // filesystem selalu tersedia
}

const KEY_PRODUCTS = "bharata:products";
const KEY_SETTINGS = "bharata:settings";

// ===== Filesystem helpers =====
async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

async function writeJsonAtomic(file: string, data: unknown) {
  await ensureDataDir();
  const tmp = `${file}.tmp.${process.pid}.${Date.now()}`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file);
}

// ===== Products =====

export async function getProducts(): Promise<Product[]> {
  const r = getRedis();
  if (r) {
    try {
      const data = await r.get<Product[]>(KEY_PRODUCTS);
      if (!data || !Array.isArray(data) || data.length === 0) {
        const seeded = seedProducts();
        await r.set(KEY_PRODUCTS, seeded);
        return seeded;
      }
      return data;
    } catch (e) {
      console.error("[storage] getProducts redis error, falling back to fs:", e);
    }
  }
  const data = await readJson<Product[]>(PRODUCTS_FILE);
  if (!data || !Array.isArray(data) || data.length === 0) {
    const seeded = seedProducts();
    await writeJsonAtomic(PRODUCTS_FILE, seeded);
    return seeded;
  }
  return data;
}

export async function getProduct(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function saveProducts(products: Product[]): Promise<void> {
  const r = getRedis();
  if (r) {
    try {
      await r.set(KEY_PRODUCTS, products);
      return;
    } catch (e) {
      console.error("[storage] saveProducts redis error, falling back to fs:", e);
    }
  }
  await writeJsonAtomic(PRODUCTS_FILE, products);
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
  if (r) {
    try {
      const data = await r.get<Settings>(KEY_SETTINGS);
      if (!data) {
        await r.set(KEY_SETTINGS, DEFAULT_SETTINGS);
        return { ...DEFAULT_SETTINGS };
      }
      return {
        ...DEFAULT_SETTINGS,
        ...data,
        promoBanner: {
          ...DEFAULT_SETTINGS.promoBanner,
          ...(data.promoBanner ?? {}),
        },
      };
    } catch (e) {
      console.error("[storage] getSettings redis error, falling back to fs:", e);
    }
  }
  const data = await readJson<Settings>(SETTINGS_FILE);
  if (!data) {
    await writeJsonAtomic(SETTINGS_FILE, DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  }
  return {
    ...DEFAULT_SETTINGS,
    ...data,
    promoBanner: {
      ...DEFAULT_SETTINGS.promoBanner,
      ...(data.promoBanner ?? {}),
    },
  };
}

export async function saveSettings(settings: Settings): Promise<void> {
  const r = getRedis();
  if (r) {
    try {
      await r.set(KEY_SETTINGS, settings);
      return;
    } catch (e) {
      console.error("[storage] saveSettings redis error, falling back to fs:", e);
    }
  }
  await writeJsonAtomic(SETTINGS_FILE, settings);
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
