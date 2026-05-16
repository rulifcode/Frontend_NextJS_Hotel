"use client";

import Image from "next/image";
import {
  Wine,
  Car,
  Building2,
  Wifi,
} from "lucide-react";

export default function WhySection() {
  const facilities = [
    {
      icon: Wine,
      title: "Welcome",
      sub: "Drinks",
    },
    {
      icon: Car,
      title: "Car Rent",
      sub: "Service",
    },
    {
      icon: Building2,
      title: "Resort",
      sub: "& Spa",
    },
    {
      icon: Wifi,
      title: "Free",
      sub: "WiFi Service",
    },
  ];

  return (
    <section id="why" className="py-24 px-6 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* TOP ICONS */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-16">
          {facilities.map((a) => {
            const Icon = a.icon;

            return (
              <div key={a.title} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon
                    size={20}
                    className="text-[#FF6B00]"
                  />
                </div>

                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-[#121212]">
                    {a.title}
                  </p>

                  <p className="text-[11px] text-[#777]">
                    {a.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* TITLE */}
        <div className="text-center mb-20">
          <h2
            className="text-[#121212] font-bold leading-tight"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            Why You Should{" "}
            <span className="text-[#FF6B00]">
              Stay Here
            </span>
          </h2>

          <p className="text-[#8A8A8A] text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            amet sint. Velit officia consequat.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div className="space-y-12">
            {[
              {
                num: "1",
                title: "Provide the best choice of Room.",
                desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
              },
              {
                num: "2",
                title: "Low price with Best Quality",
                desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
              },
              {
                num: "3",
                title: "Restaurant Service",
                desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-5">

                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-semibold text-sm shadow-md">
                    {item.num}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#121212] font-semibold text-xl mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="relative h-[650px] hidden lg:block">
            <Image
              src="/images/why-stay.png"
              alt="Why Stay"
              fill
              priority
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}