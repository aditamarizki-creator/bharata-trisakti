import type { Brand, Product } from "@/types/product";

export const BRANDS: Brand[] = [
  "Hiro",
  "Sankoi",
  "STP KAE",
  "Kohaku",
  "PIP",
  "Matahari Sakti",
  "CP Petindo",
];

export const BRAND_INFO: Record<Brand, { tagline: string; tier: string }> = {
  Hiro: { tagline: "Premium imported koi food", tier: "Premium" },
  Sankoi: { tagline: "Kualitas Jepang untuk koi sehat", tier: "Mid-Premium" },
  "STP KAE": { tagline: "Pakan koi value terbaik", tier: "Value" },
  Kohaku: { tagline: "Color enhancer khusus koi", tier: "Mid" },
  PIP: { tagline: "Trusted local brand untuk hobiis", tier: "Mid" },
  "Matahari Sakti": { tagline: "Pakan ikan hias mass-market", tier: "Value" },
  "CP Petindo": { tagline: "Distribusi nasional terpercaya", tier: "Value" },
};

// Foto placeholder seeded picsum (stable, deterministik)
const pickImg = (i: number) =>
  `https://picsum.photos/seed/bharata-${i}/800/800`;

// Helper: bangun varian dari harga 1kg base
function variants(price1kg: number) {
  // 5kg: ~4.5x (sedikit hemat repack), 10kg: ~8.8x, 20kg: ~16.5x
  return [
    { size: "1kg" as const, price: Math.round(price1kg / 100) * 100 },
    { size: "5kg" as const, price: Math.round((price1kg * 4.5) / 100) * 100 },
    { size: "10kg" as const, price: Math.round((price1kg * 8.8) / 100) * 100 },
    { size: "20kg" as const, price: Math.round((price1kg * 16.5) / 100) * 100 },
  ];
}

// Harga 1kg per brand (anchor dari user untuk sak; di-derive ke 1kg repack realistis)
// Hiro 82.400 (asumsi sak 5kg @premium) → 1kg ≈ 18.500 + repack premium
// Sankoi 65.600 → 1kg ≈ 15.000
// STP KAE 36.300 → 1kg ≈ 8.500
// Kohaku 42.900 → 1kg ≈ 10.000
const PRICE_1KG: Record<Brand, number> = {
  Hiro: 19500,
  Sankoi: 15500,
  "STP KAE": 8500,
  Kohaku: 10000,
  PIP: 12000,
  "Matahari Sakti": 7500,
  "CP Petindo": 8000,
};

type Seed = {
  name: string;
  fishType: ("koi" | "hias")[];
  purpose: ("color" | "growth" | "daily" | "protein")[];
  description: string;
  badge?: Product["badge"];
  multiplier?: number; // adjust harga per produk
};

const SEEDS: Record<Brand, Seed[]> = {
  Hiro: [
    {
      name: "Hiro Color Up",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Pakan premium dengan kandungan astaxanthin tinggi untuk mempertajam warna merah dan kuning koi. Cocok untuk koi kontes & display.",
      badge: "Premium",
      multiplier: 1.05,
    },
    {
      name: "Hiro Growth Pro",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Formula kaya protein dan asam amino esensial untuk pertumbuhan cepat dengan postur badan ideal.",
      badge: "Terlaris",
      multiplier: 1.0,
    },
    {
      name: "Hiro Daily Premium",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Pakan harian seimbang dengan probiotik untuk pencernaan sehat dan air kolam tetap jernih.",
      multiplier: 0.95,
    },
    {
      name: "Hiro Hi-Protein 42",
      fishType: ["koi"],
      purpose: ["protein", "growth"],
      description:
        "Kandungan protein 42% — ideal untuk koi muda fase pertumbuhan optimal di musim panas.",
      multiplier: 1.08,
    },
    {
      name: "Hiro Wheat Germ",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Berbasis wheat germ, mudah dicerna pada suhu air rendah. Cocok untuk pakan musim hujan.",
      multiplier: 0.9,
    },
    {
      name: "Hiro Spirulina Plus",
      fishType: ["koi", "hias"],
      purpose: ["color"],
      description:
        "Diperkaya spirulina alami untuk warna alami, sistem imun kuat, dan vitalitas ikan.",
      multiplier: 1.02,
    },
    {
      name: "Hiro Champion Mix",
      fishType: ["koi"],
      purpose: ["color", "growth"],
      description:
        "Kombinasi color enhancer dan growth formula. Pilihan breeder profesional.",
      badge: "Premium",
      multiplier: 1.12,
    },
  ],
  Sankoi: [
    {
      name: "Sankoi Color Boost",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Spirulina + krill memperkaya pigmen warna koi tanpa membuat warna putih menguning.",
      badge: "Terlaris",
      multiplier: 1.0,
    },
    {
      name: "Sankoi Growth",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Protein 38% dengan vitamin lengkap untuk pertumbuhan badan koi yang proporsional.",
      multiplier: 0.95,
    },
    {
      name: "Sankoi Staple",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Pakan harian dengan nilai nutrisi seimbang. Ekonomis untuk pemeliharaan rutin.",
      multiplier: 0.85,
    },
    {
      name: "Sankoi Hi-Energy",
      fishType: ["koi"],
      purpose: ["protein"],
      description:
        "Energi tinggi untuk koi aktif, ideal sebelum musim breeding atau pasca panen.",
      multiplier: 1.05,
    },
    {
      name: "Sankoi Wheat",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Wheat germ-based, lebih ringan untuk pencernaan koi di kolam outdoor.",
      multiplier: 0.88,
    },
    {
      name: "Sankoi Tropical Mix",
      fishType: ["koi", "hias"],
      purpose: ["daily", "color"],
      description:
        "Bisa untuk koi maupun ikan hias tropis. Multi-fungsi untuk hobiis pemula.",
      multiplier: 0.92,
    },
    {
      name: "Sankoi Pro Breeder",
      fishType: ["koi"],
      purpose: ["growth", "protein"],
      description:
        "Formula breeder dengan vitamin E tinggi untuk reproduksi optimal & induk sehat.",
      multiplier: 1.08,
    },
  ],
  "STP KAE": [
    {
      name: "STP KAE Daily",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Pakan koi value terbaik di kelasnya. Nutrisi lengkap untuk pemeliharaan harian.",
      badge: "Hemat",
      multiplier: 1.0,
    },
    {
      name: "STP KAE Color",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Color enhancer harga ekonomis. Cocok untuk koi peliharaan rumah.",
      multiplier: 1.05,
    },
    {
      name: "STP KAE Growth",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Mendukung pertumbuhan koi remaja dengan harga bersahabat untuk peternak.",
      multiplier: 1.02,
    },
    {
      name: "STP KAE Mix",
      fishType: ["koi", "hias"],
      purpose: ["daily"],
      description:
        "Multi-purpose untuk koi & ikan hias. Solusi praktis ekonomis.",
      multiplier: 0.95,
    },
    {
      name: "STP KAE Stamina",
      fishType: ["koi"],
      purpose: ["protein"],
      description:
        "Boost energi dan stamina koi setelah pemindahan kolam atau perubahan cuaca.",
      multiplier: 1.0,
    },
    {
      name: "STP KAE Mini Pellet",
      fishType: ["koi", "hias"],
      purpose: ["daily"],
      description:
        "Pellet ukuran kecil untuk koi muda 10-25 cm dan ikan hias menengah.",
      multiplier: 0.98,
    },
    {
      name: "STP KAE Premium",
      fishType: ["koi"],
      purpose: ["color", "growth"],
      description:
        "Versi premium STP KAE dengan kandungan nutrisi lebih tinggi. Tetap value.",
      multiplier: 1.15,
    },
  ],
  Kohaku: [
    {
      name: "Kohaku Color Premium",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Spesialis penguatan warna merah Kohaku. Astaxanthin dosis optimal untuk koi pattern.",
      badge: "Terlaris",
      multiplier: 1.0,
    },
    {
      name: "Kohaku Daily Mix",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Pakan harian dengan formula seimbang khusus untuk koi varietas Kohaku & Sanke.",
      multiplier: 0.92,
    },
    {
      name: "Kohaku Growth Plus",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Mendukung pertumbuhan koi muda dengan struktur tulang dan otot yang proporsional.",
      multiplier: 0.98,
    },
    {
      name: "Kohaku Hi-Color",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Konsentrasi pigmen alami tertinggi di seri Kohaku. Untuk pertajam beni & sumi.",
      multiplier: 1.1,
    },
    {
      name: "Kohaku Wheat Light",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Wheat-based ringan, cocok untuk transisi musim dan pemberian malam hari.",
      multiplier: 0.88,
    },
    {
      name: "Kohaku Energy",
      fishType: ["koi"],
      purpose: ["protein"],
      description:
        "Hi-protein untuk koi remaja-dewasa fase aktif. Mendukung daya tahan tubuh.",
      multiplier: 1.04,
    },
    {
      name: "Kohaku Show Quality",
      fishType: ["koi"],
      purpose: ["color", "growth"],
      description:
        "Diformulasikan untuk persiapan kontes — warna, postur, dan kondisi prima.",
      badge: "Premium",
      multiplier: 1.18,
    },
  ],
  PIP: [
    {
      name: "PIP Koi Floating",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Pellet apung kualitas konsisten. Mudah dipantau saat pemberian pakan.",
      multiplier: 1.0,
    },
    {
      name: "PIP Color Pro",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Formula color enhancer lokal dengan komposisi import. Hemat tanpa kompromi.",
      multiplier: 1.05,
    },
    {
      name: "PIP Growth Master",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Untuk peternak dan hobiis serius — dorong pertumbuhan optimal koi muda.",
      badge: "Terlaris",
      multiplier: 1.02,
    },
    {
      name: "PIP Hias Premium",
      fishType: ["hias"],
      purpose: ["color", "daily"],
      description:
        "Khusus ikan hias air tawar (cupang, mas koki, guppy, dll) — warna cerah & tahan lama.",
      multiplier: 0.95,
    },
    {
      name: "PIP Daily Economic",
      fishType: ["koi", "hias"],
      purpose: ["daily"],
      description:
        "Pilihan harian hemat dengan nutrisi dasar lengkap. Cocok stok bulanan.",
      badge: "Hemat",
      multiplier: 0.85,
    },
    {
      name: "PIP Hi-Pro 40",
      fishType: ["koi"],
      purpose: ["protein"],
      description:
        "Protein 40% lokal — alternatif terjangkau untuk pakan high-protein import.",
      multiplier: 1.08,
    },
    {
      name: "PIP Aquarium Mix",
      fishType: ["hias"],
      purpose: ["daily", "color"],
      description:
        "Multi-spesies untuk akuarium komunitas. Ukuran pellet kecil mudah dimakan.",
      multiplier: 0.9,
    },
  ],
  "Matahari Sakti": [
    {
      name: "Matahari Sakti Floating",
      fishType: ["koi", "hias"],
      purpose: ["daily"],
      description:
        "Pakan apung mass-market terpercaya. Pilihan ekonomis untuk peternakan & hobiis.",
      badge: "Hemat",
      multiplier: 1.0,
    },
    {
      name: "Matahari Sakti Sinking",
      fishType: ["koi", "hias"],
      purpose: ["daily"],
      description:
        "Pakan tenggelam untuk ikan dasar dan koi yang lebih suka mencari makan di bawah.",
      multiplier: 0.95,
    },
    {
      name: "Matahari Sakti Color",
      fishType: ["koi", "hias"],
      purpose: ["color"],
      description:
        "Color enhancer harga merakyat dengan tambahan spirulina untuk pigmentasi.",
      multiplier: 1.05,
    },
    {
      name: "Matahari Sakti Growth",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Formula pertumbuhan untuk koi & ikan air tawar lainnya. Stok rumahan & toko.",
      multiplier: 1.02,
    },
    {
      name: "Matahari Sakti Pemula",
      fishType: ["hias"],
      purpose: ["daily"],
      description:
        "Diformulasikan untuk pemula yang baru pelihara ikan hias rumahan.",
      multiplier: 0.88,
    },
    {
      name: "Matahari Sakti Hi-Pro",
      fishType: ["koi"],
      purpose: ["protein"],
      description:
        "Protein 36% — pilihan hemat untuk fase pertumbuhan koi muda.",
      multiplier: 1.06,
    },
    {
      name: "Matahari Sakti Komunitas",
      fishType: ["hias"],
      purpose: ["daily", "color"],
      description:
        "Untuk akuarium komunitas — guppy, platy, molly, neon tetra, dan teman-temannya.",
      multiplier: 0.92,
    },
  ],
  "CP Petindo": [
    {
      name: "CP Petindo Koi Standard",
      fishType: ["koi"],
      purpose: ["daily"],
      description:
        "Pakan koi standar dari brand distribusi nasional. Tersedia stabil setiap saat.",
      multiplier: 1.0,
    },
    {
      name: "CP Petindo Color",
      fishType: ["koi"],
      purpose: ["color"],
      description:
        "Color enhancer dengan harga distributor. Cocok untuk hobiis & peternakan.",
      badge: "Terlaris",
      multiplier: 1.06,
    },
    {
      name: "CP Petindo Growth",
      fishType: ["koi"],
      purpose: ["growth"],
      description:
        "Pakan pertumbuhan dengan formula lokal teruji puluhan tahun.",
      multiplier: 1.02,
    },
    {
      name: "CP Petindo Hi-Pro",
      fishType: ["koi"],
      purpose: ["protein"],
      description:
        "Protein 38% — alternatif hi-protein dengan harga lebih bersahabat.",
      multiplier: 1.08,
    },
    {
      name: "CP Petindo Hias",
      fishType: ["hias"],
      purpose: ["daily", "color"],
      description:
        "Khusus ikan hias air tawar — dari cupang sampai mas koki, semua kebagian.",
      multiplier: 0.94,
    },
    {
      name: "CP Petindo Daily",
      fishType: ["koi", "hias"],
      purpose: ["daily"],
      description:
        "Multi-purpose harian, value money untuk konsumsi rutin keluarga ikan.",
      badge: "Hemat",
      multiplier: 0.9,
    },
    {
      name: "CP Petindo Premium",
      fishType: ["koi"],
      purpose: ["color", "growth"],
      description:
        "Tier premium dari CP Petindo untuk peternak yang ingin upgrade tanpa import.",
      multiplier: 1.15,
    },
  ],
};

// Generate produk array dari seeds
function buildProducts(): Product[] {
  const result: Product[] = [];
  let imgIdx = 0;

  (Object.keys(SEEDS) as Brand[]).forEach((brand) => {
    SEEDS[brand].forEach((seed, j) => {
      const base = PRICE_1KG[brand] * (seed.multiplier ?? 1);
      const slug = `${brand}-${seed.name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      result.push({
        id: `${brand.replace(/\s/g, "")}-${j}`,
        slug,
        brand,
        name: seed.name,
        fishType: seed.fishType,
        purpose: seed.purpose,
        description: seed.description,
        variants: variants(base),
        image: pickImg(imgIdx++),
        featured: j === 0 || (brand === "Hiro" && j <= 1),
        badge: seed.badge,
      });
    });
  });

  // Produk ke-50: paket bundling
  result.push({
    id: "bundle-koi-starter",
    slug: "paket-koi-starter",
    brand: "Hiro",
    name: "Paket Koi Starter (Mix Daily + Color)",
    fishType: ["koi"],
    purpose: ["daily", "color"],
    description:
      "Paket hemat untuk pemula: 1 kemasan daily feeding + 1 kemasan color enhancer dari brand pilihan. Cocok untuk koi 30-50cm di kolam ukuran sedang.",
    variants: variants(16500),
    image: pickImg(imgIdx++),
    featured: true,
    badge: "Hemat",
  });

  return result;
}

export const PRODUCTS: Product[] = buildProducts();

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured).slice(0, 6);

export function findProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getMinPrice(p: Product): number {
  return Math.min(...p.variants.map((v) => v.price));
}
