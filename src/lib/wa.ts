import type { CartItem, OrderForm } from "@/types/product";
import { formatRupiah } from "./format";

export const WA_ADMIN = "6285702403940";

export function buildOrderMessage(items: CartItem[], form: OrderForm): string {
  const lines: string[] = [];
  lines.push("Halo *Bharata Trisakti*, saya ingin pesan:");
  lines.push("");

  let subtotal = 0;
  items.forEach((item, i) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    lines.push(
      `${i + 1}. ${item.brand} ${item.name} - ${item.size} x${item.qty} = ${formatRupiah(lineTotal)}`,
    );
  });

  lines.push("");
  lines.push(`*Subtotal:* ${formatRupiah(subtotal)}`);
  lines.push(`*Kurir pilihan:* ${form.kurir}`);
  lines.push("");
  lines.push("*Data Pengiriman:*");
  lines.push(`Nama: ${form.nama}`);
  lines.push(`HP: ${form.hp}`);
  if (form.email) lines.push(`Email: ${form.email}`);
  lines.push(
    `Alamat: ${form.alamat}, ${form.kota}${form.kodepos ? ` ${form.kodepos}` : ""}`,
  );
  if (form.catatan) {
    lines.push("");
    lines.push(`Catatan: ${form.catatan}`);
  }

  lines.push("");
  lines.push("Mohon konfirmasi ongkir & ketersediaan stok. Terima kasih 🙏");

  return lines.join("\n");
}

export function buildCartInquiry(items: CartItem[]): string {
  if (items.length === 0) {
    return "Halo Bharata Trisakti, saya ingin tanya-tanya pakan ikan dulu. Bisa dibantu?";
  }
  const lines: string[] = [];
  lines.push("Halo *Bharata Trisakti*, saya tertarik dengan produk berikut:");
  lines.push("");

  let subtotal = 0;
  items.forEach((item, i) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    lines.push(
      `${i + 1}. ${item.brand} ${item.name} - ${item.size} x${item.qty} = ${formatRupiah(lineTotal)}`,
    );
  });

  lines.push("");
  lines.push(`*Subtotal:* ${formatRupiah(subtotal)}`);
  lines.push("");
  lines.push("Bisa dibantu untuk pemesanan & info ongkir? Terima kasih.");

  return lines.join("\n");
}

export function buildProductInquiry(productLabel: string): string {
  return `Halo Bharata Trisakti, saya mau tanya tentang produk *${productLabel}*. Apakah masih tersedia? Mohon info detail & ongkir ke daerah saya. Terima kasih.`;
}

export function buildGeneralInquiry(): string {
  return "Halo Bharata Trisakti, saya ingin konsultasi tentang pakan ikan koi/hias yang cocok. Bisa dibantu?";
}

export function waUrl(message: string, phone: string = WA_ADMIN): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string, phone: string = WA_ADMIN) {
  if (typeof window === "undefined") return;
  window.open(waUrl(message, phone), "_blank", "noopener,noreferrer");
}
