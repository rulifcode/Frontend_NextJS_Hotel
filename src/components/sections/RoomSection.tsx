"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getGaleris, getGaleriImageUrl } from "@/lib/api";
import type { Galeri } from "@/types";

export default function RoomSection() {
  const [galeri, setGaleri] = useState<Galeri[]>([]);

  useEffect(() => {
    getGaleris()
      .then((data) => setGaleri(data.slice(0, 5)))
      .catch(console.error);
  }, []);

  return (
    <section id="room" className="py-24 px-6 bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <p className="text-[#9A9A9A] text-sm mb-2">Our Room</p>
          <h2
            className="font-bold text-[#121212] leading-tight"
            style={{ fontSize: "clamp(34px,5vw,54px)" }}
          >
            A World Of{" "}
            <span className="text-[#FF6B00]">Choice</span>
          </h2>
          <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-xl mx-auto mt-4">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            amet sint. Velit officia consequat.
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-[1fr_1.3fr_1fr] gap-8 items-start">
          <div className="space-y-8">
            {galeri[0] && <Card item={galeri[0]} height="h-[240px]" />}
            {galeri[1] && <Card item={galeri[1]} height="h-[240px]" />}
          </div>
          <div>
            {galeri[2] && <Card item={galeri[2]} height="h-[540px]" big />}
          </div>
          <div className="space-y-8">
            {galeri[3] && <Card item={galeri[3]} height="h-[240px]" />}
            {galeri[4] && <Card item={galeri[4]} height="h-[240px]" />}
          </div>
        </div>

        {/* MOBILE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden mt-10">
          {galeri.map((item) => (
            <Card key={item.id} item={item} height="h-[260px]" />
          ))}
        </div>

        {/* EXPLORE BUTTON */}
        <div className="flex flex-col items-center mt-16 gap-4">
          <p className="text-[#9A9A9A] text-sm">
            Temukan kamar yang sempurna untuk Anda
          </p>
          <Link
            href="/kamar"
            className="group inline-flex items-center gap-3 border border-[#121212] text-[#121212] text-[13px] font-semibold px-10 py-4 tracking-widest uppercase hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-white transition-all duration-300"
          >
            Explore All Rooms
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}

function Card({
  item,
  height,
  big = false,
}: {
  item: Galeri;
  height: string;
  big?: boolean;
}) {
  const imgSrc = getGaleriImageUrl(item.foto_url ?? item.foto);

  return (
    <div className="group">
      {/* IMAGE */}
      <div className={`overflow-hidden bg-[#ECECEC] ${height}`}>
        {item.foto ? (
          <img
            src={imgSrc}
            alt={item.judul}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#BDBDBD] text-sm">
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="pt-3">
        <p className="text-[11px] uppercase font-semibold tracking-wide text-[#A8A8A8] mb-1">
          {Math.floor(Math.random() * 6) + 1} Guests
        </p>
        <h3
          className={`font-bold text-[#121212] leading-tight ${
            big ? "text-[38px]" : "text-[22px]"
          }`}
        >
          {item.judul}
        </h3>
      </div>
    </div>
  );
}