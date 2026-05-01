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

export type Size = "1kg" | "5kg" | "10kg" | "20kg";

export type Variant = {
  size: Size;
  price: number;
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
  featured?: boolean;
  badge?: "Terlaris" | "Baru" | "Premium" | "Hemat";
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

export type OrderForm = {
  nama: string;
  hp: string;
  email: string;
  alamat: string;
  kota: string;
  kodepos: string;
  kurir: "JNE Reguler" | "POS Indonesia" | "J&T Cargo";
  catatan: string;
};
