"use client";

import { MessageCircle } from "lucide-react";
import { buildGeneralInquiry, waUrl } from "@/lib/wa";

export function WhatsAppFAB() {
  return (
    <a
      href={waUrl(buildGeneralInquiry())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="hidden md:block fixed z-40 bottom-5 right-5 group"
    >
      <span className="absolute inset-0 rounded-full bg-[var(--color-whatsapp)] animate-ping opacity-25" />
      <span className="relative flex items-center gap-2 bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-deep)] text-white rounded-full pl-4 pr-5 py-3 shadow-[0_12px_32px_rgba(37,211,102,0.45)] transition-all">
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-semibold">Chat Admin</span>
      </span>
    </a>
  );
}
