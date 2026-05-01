export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRupiahShort(amount: number): string {
  if (amount >= 1_000_000) {
    const v = amount / 1_000_000;
    return `Rp ${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)} jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${Math.round(amount / 1_000)}rb`;
  }
  return formatRupiah(amount);
}

export function formatPhoneIndonesia(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  let normalized = digits;
  if (normalized.startsWith("62")) normalized = "0" + normalized.slice(2);
  if (!normalized.startsWith("0")) normalized = "0" + normalized;
  return normalized.replace(/(\d{4})(\d{4})(\d{0,4})/, (_m, a, b, c) =>
    c ? `${a}-${b}-${c}` : `${a}-${b}`,
  );
}
