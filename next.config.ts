import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      // Vercel Blob (kalau dipakai)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Production domain (untuk uploads/*)
      { protocol: "https", hostname: "bharatatrisakti.id" },
      { protocol: "https", hostname: "www.bharatatrisakti.id" },
    ],
  },
};

export default nextConfig;
