# Bharata Trisakti — Pakan Ikan Koi & Hias

E-commerce website + admin console untuk toko pakan ikan **Bharata Trisakti**.

🔗 **Live:** https://bharata-trisakti.vercel.app

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (glassmorphic, broken white + teal accent)
- Vercel KV (storage) + Vercel Blob (foto produk)
- Framer Motion (animations) + Sonner (toasts) + Zustand (cart)

## Develop
```bash
npm install
npm run dev
```

## Admin
- `/admin` → login dengan password (env: `ADMIN_PASSWORD_HASH`)
- Add/edit/hapus produk, ganti nomor WA, toggle stok, banner promo, upload foto

## Env vars (set di Vercel project settings)
- `ADMIN_PASSWORD_HASH` — bcrypt hash dari password admin
- `JWT_SECRET` — random secret untuk session token
- `KV_*` — auto-injected oleh Vercel KV
- `BLOB_READ_WRITE_TOKEN` — auto-injected oleh Vercel Blob
