export type Brand =
  | "Hiro"
  | "Sankoi"
  | "STP KAE"
  | "Kohaku"
  | "PIP"
  | "Matahari Sakti"
  | "CP Petindo";

export type FishType = "koi" | "hias";

export type Purpose = "color" | "growth" | "daily" | "protein";

export type Unit = "kg" | "dus" | "piece" | "sak";
export const UNITS: Unit[] = ["kg", "dus", "piece", "sak"];

// Label varian, contoh: "1kg", "5kg", "1 dus", "1 piece", "1 sak".
// Disimpan sebagai string bebas supaya admin fleksibel mengisi ukuran apapun.
export type Size = string;

export type Variant = {
  size: Size;
  price: number;
  unit?: Unit;
  amount?: number;
};

export type Product = {
  id: string;
  slug: string;
  brand: Brand;
  name: string;
  fishType: FishType[];
  purpose: Purpose[];
  description: string;
  variants: Variant[];
  image: string;
  imageUrl?: string; // override foto upload (replaces SVG)
  featured?: boolean;
  inStock?: boolean; // default true; false = stok habis
  badge?: "Terlaris" | "Baru" | "Premium" | "Hemat";
  createdAt?: number;
  updatedAt?: number;
};

export type CartItem = {
  productId: string;
  brand: Brand;
  name: string;
  size: Size;
  price: number;
  qty: number;
  image: string;
};

export type Settings = {
  waNumber: string; // ex: "6285702403940" (no +)
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storeHours: string;
  promoBanner: {
    enabled: boolean;
    text: string;
    href?: string;
  };
};

export const DEFAULT_SETTINGS: Settings = {
  waNumber: "6285702403940",
  storeName: "Bharata Trisakti",
  storeAddress:
    "Jl. Raya Grajagan, Krajan, Purwoharjo, Kec. Purwoharjo, Kabupaten Banyuwangi, Jawa Timur 68483",
  storeEmail: "",
  storeHours: "Senin–Sabtu, 08.00–16.00 WIB",
  promoBanner: {
    enabled: false,
    text: "🎉 Promo terbatas — chat WA untuk info lengkap",
    href: "",
  },
};
