"use client";

import type { Brand } from "@/types/product";
import { cn } from "@/lib/cn";

type Props = {
  brand: Brand;
  name: string;
  seed?: string | number;
  className?: string;
  rounded?: string;
};

// Hash sederhana → 0..n
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const PALETTES: { from: string; to: string; accent: string; ink: string }[] = [
  { from: "#0E7C86", to: "#075963", accent: "#B8E0DD", ink: "#FAF8F3" },
  { from: "#3FA9A2", to: "#0E7C86", accent: "#FBF6E7", ink: "#FAF8F3" },
  { from: "#075963", to: "#1F2A2E", accent: "#C9A961", ink: "#FAF8F3" },
  { from: "#2E8B57", to: "#0E7C86", accent: "#F5E9C8", ink: "#FAF8F3" },
  { from: "#5A6770", to: "#1F2A2E", accent: "#C9A961", ink: "#FAF8F3" },
  { from: "#0E7C86", to: "#3FA9A2", accent: "#F5F2EC", ink: "#1F2A2E" },
];

export function ProductImage({
  brand,
  name,
  seed,
  className,
  rounded = "rounded-2xl",
}: Props) {
  const key = `${brand}-${name}-${seed ?? ""}`;
  const idx = hash(key) % PALETTES.length;
  const palette = PALETTES[idx];
  const variantPattern = hash(key) % 3;

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className={cn("w-full h-full block", rounded, className)}
      role="img"
      aria-label={`${brand} ${name}`}
    >
      <defs>
        <linearGradient id={`bg-${idx}-${variantPattern}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <radialGradient
          id={`spot-${idx}-${variantPattern}`}
          cx="0.2"
          cy="0.15"
          r="0.6"
        >
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* base */}
      <rect width="400" height="400" fill={`url(#bg-${idx}-${variantPattern})`} />
      <rect width="400" height="400" fill={`url(#spot-${idx}-${variantPattern})`} />

      {/* abstract koi/water motif */}
      <g opacity="0.85" fill="none" stroke={palette.accent} strokeLinecap="round" strokeWidth="2.5">
        {variantPattern === 0 && (
          <>
            <path d="M30 200 Q 120 140 200 200 T 380 200" opacity="0.6" />
            <path d="M30 240 Q 120 180 200 240 T 380 240" opacity="0.4" />
            <path d="M30 160 Q 120 100 200 160 T 380 160" opacity="0.4" />
          </>
        )}
        {variantPattern === 1 && (
          <>
            <circle cx="290" cy="110" r="60" opacity="0.5" />
            <circle cx="290" cy="110" r="100" opacity="0.25" />
            <circle cx="290" cy="110" r="140" opacity="0.15" />
            <path d="M30 280 Q 120 220 200 280 T 380 280" opacity="0.5" />
            <path d="M30 320 Q 120 260 200 320 T 380 320" opacity="0.35" />
          </>
        )}
        {variantPattern === 2 && (
          <>
            <path d="M50 100 C 100 60, 200 60, 250 100 S 380 140 380 100" opacity="0.5" />
            <path d="M50 320 C 100 360, 200 360, 250 320 S 380 280 380 320" opacity="0.5" />
          </>
        )}
      </g>

      {/* koi silhouette */}
      <g
        transform={`translate(${variantPattern === 1 ? 70 : 80}, ${
          variantPattern === 1 ? 220 : 200
        }) rotate(${variantPattern === 0 ? -8 : 6})`}
        fill={palette.accent}
        opacity="0.92"
      >
        <ellipse cx="60" cy="0" rx="80" ry="22" />
        <path d="M-30 0 L -65 -22 L -55 0 L -65 22 Z" />
        <circle cx="100" cy="-5" r="3.5" fill={palette.from} />
      </g>

      {/* brand wordmark */}
      <text
        x="32"
        y="60"
        fill={palette.ink}
        opacity="0.88"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="2"
      >
        {brand.toUpperCase()}
      </text>
      <text
        x="32"
        y="370"
        fill={palette.ink}
        opacity="0.85"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="20"
        fontWeight="800"
      >
        {name.length > 22 ? name.slice(0, 21) + "…" : name}
      </text>
    </svg>
  );
}
