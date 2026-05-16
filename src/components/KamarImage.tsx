"use client";

// ============================================================
// components/KamarImage.tsx — Client component untuk gambar kamar
// Dipisah agar onError tidak crash di Server Component
// ============================================================

import Image from "next/image";
import { useState } from "react";

interface KamarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function KamarImage({ src, alt, className }: KamarImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className ?? "object-cover group-hover:scale-105 transition-transform duration-500"}
      unoptimized={imgSrc.includes("localhost")}
      onError={() => setImgSrc("/placeholder-room.jpg")}
    />
  );
}