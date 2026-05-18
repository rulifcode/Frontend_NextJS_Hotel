"use client";

import Image from "next/image";
import { Coffee, HeartPulse, BedDouble, Wine } from "lucide-react";

export default function AboutSection() {
    const heroImage =
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400";

    const features = [
        {
            title: "Restaurant Service",
            desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet",
            icon: Coffee,
        },
        {
            title: "SPA & Wellness",
            desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet",
            icon: HeartPulse,
        },
        {
            title: "The Best Room",
            desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet",
            icon: BedDouble,
        },
        {
            title: "Lounge Bar",
            desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet",
            icon: Wine,
        },
    ];

    return (
        <section id="about" className="bg-[#F3F3F3] overflow-hidden">

            {/* ── TOP SECTION ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] lg:h-[500px]">

                {/* LEFT: dark content block */}
                <div className="bg-[#050505] flex items-center px-6 py-16 sm:px-12 lg:px-0">
                    <div className="lg:ml-[140px] max-w-full lg:max-w-[340px] w-full">
                        <h2 className="text-white text-4xl sm:text-[44px] font-bold mb-4 leading-tight">
                            About Us
                        </h2>
                        <div className="w-[72px] h-[3px] bg-[#FF6B00] mb-8" />
                        <p className="text-[#7A7A7A] text-sm leading-7 mb-5">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                            Velit officia consequat duis enim.
                        </p>
                        <p className="text-[#7A7A7A] text-sm leading-7 mb-9">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                            Velit officia consequat duis enim.
                        </p>
                        <button className="bg-[#FF6B00] hover:bg-[#eb6300] transition-all duration-300 text-white px-10 py-3.5 text-sm font-semibold tracking-wide">
                            Explore
                        </button>
                    </div>
                </div>

                {/* RIGHT: hero image */}
                <div className="relative h-[260px] sm:h-[340px] lg:h-[500px]">
                    <Image
                        src={heroImage}
                        alt="Hotel exterior"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority
                    />
                </div>
            </div>

            {/* ── BOTTOM SECTION ── */}
            {/* Desktop: overlapping cards layout */}
            <div className="hidden lg:block max-w-[1080px] mx-auto relative z-20 -mt-[92px] pb-20">
                <div className="grid grid-cols-[220px_1fr] gap-[90px]">

                    {/* Left info */}
                    <div className="pt-[145px]">
                        <h3 className="text-[30px] leading-[36px] font-bold text-[#232323] max-w-[210px] mb-5">
                            Classic Room and Interior
                        </h3>
                        <div className="flex items-center gap-1 text-[#FF6B00] text-sm mb-3">
                            ★ ★ ★ ★ ★
                        </div>
                        <p className="text-[#7B7B7B] text-[13px] mb-11">
                            Excellent 5000+ reviews
                        </p>
                        <div className="flex items-center -space-x-3 mb-5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="relative w-10 h-10">
                                    <Image
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt=""
                                        fill
                                        className="rounded-full border-[3px] border-[#F3F3F3] object-cover"
                                        sizes="40px"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-[#7B7B7B] text-[13px] leading-6 max-w-[150px]">
                            Peoples successfully got this dream place
                        </p>
                    </div>

                    {/* Feature cards — desktop stagger */}
                    <div
                        className="grid grid-cols-2 gap-x-6 max-w-[600px] ml-[130px]"
                        style={{ rowGap: "0px" }}
                    >
                        {features.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    style={{ marginTop: index < 2 ? "-55px" : "20px" }}
                                    className="bg-white w-[270px] min-h-[170px] px-7 py-7 shadow-[0_10px_25px_rgba(0,0,0,0.04)]"
                                >
                                    <div className="w-11 h-11 rounded-full bg-[#FF6B00] flex items-center justify-center mb-5">
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <h4 className="text-[17px] leading-6 font-bold text-[#232323] mb-3">
                                        {item.title}
                                    </h4>
                                    <p className="text-[#9A9A9A] text-[12px] leading-6 max-w-[190px]">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── MOBILE / TABLET bottom section ── */}
            <div className="lg:hidden px-5 sm:px-10 py-12">

                {/* Room info row */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold text-[#232323] mb-4 leading-snug">
                        Classic Room and Interior
                    </h3>
                    <div className="flex items-center gap-1 text-[#FF6B00] text-sm mb-2">
                        ★ ★ ★ ★ ★
                    </div>
                    <p className="text-[#7B7B7B] text-sm mb-6">Excellent 5,000+ reviews</p>

                    {/* Avatars + tagline */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center -space-x-2.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="relative w-9 h-9 shrink-0">
                                    <Image
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt=""
                                        fill
                                        className="rounded-full border-2 border-[#F3F3F3] object-cover"
                                        sizes="36px"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-[#7B7B7B] text-xs leading-5 max-w-[130px]">
                            Peoples successfully got this dream place
                        </p>
                    </div>
                </div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white px-6 py-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)] rounded-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center mb-4">
                                    <Icon size={17} className="text-white" />
                                </div>
                                <h4 className="text-base font-bold text-[#232323] mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-[#9A9A9A] text-[13px] leading-6">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}