"use client";

export default function Footer() {

    const quickLinks = [
        { label: "Home",     href: "/" },
        { label: "Services", href: "/#why" },
        { label: "About us", href: "/#about" },
        { label: "Galeri",   href: "/galeri" },
        { label: "Artikel",  href: "/artikel" },
        { label: "Contact",  href: "/#contact" },
    ];

    const usefulLinks = ["Privacy policy", "Legal", "FAQ", "Blogs"];

    const socials = [
        { label: "LinkedIn",  href: "https://linkedin.com/in/ruliffadrian" },
        { label: "Instagram", href: "https://instagram.com/ruliffadrian" },
        { label: "GitHub",    href: "https://github.com/rulifcode" },
        { label: "GitLab",    href: "https://gitlab.com/rulifcode" },
    ];

    return (
        <footer id="contact" className="bg-[#050505] text-white pt-16 sm:pt-20">

            {/* ── TOP GRID ── */}
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8">

                {/* Desktop: 3-col | Mobile: stacked */}
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-12 lg:gap-16 items-start">

                    {/* LEFT — Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick link</h3>
                        <ul className="space-y-4 text-[#C5C5C5] text-[15px]">
                            {quickLinks.map(({ label, href }) => (
                                <li key={label} className="hover:text-[#FF6B00] transition">
                                    <a href={href}>{label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CENTER — Contact */}
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-4xl sm:text-[44px] font-bold mb-4">Contact</h2>
                        <p className="text-[#8B8B8B] text-[15px] leading-7 max-w-[420px] mb-8">
                            Graha Pos Indonesia Bandung, Jawa Barat.
                        </p>

                        {/* Google Maps */}
                        <div className="w-full max-w-[520px] h-[200px] sm:h-[220px] rounded-md overflow-hidden border border-[#2A2A2A] mb-8">
                            <iframe
                                src="https://www.google.com/maps?q=Graha+Pos+Indonesia+Bandung&output=embed"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Email subscribe */}
                        <div className="flex w-full max-w-[520px]">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="flex-1 h-[52px] sm:h-[58px] bg-transparent border border-[#4A4A4A] px-4 sm:px-5 text-sm outline-none text-white placeholder:text-[#7A7A7A]"
                            />
                            <button className="bg-[#FF6B00] hover:bg-[#eb6300] transition-all px-5 sm:px-8 text-sm font-semibold whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* RIGHT — Useful (desktop: right-aligned | mobile: left-aligned) */}
                    <div className="lg:text-right">
                        <h3 className="text-lg font-semibold mb-6">Useful</h3>
                        <ul className="space-y-4 text-[#C5C5C5] text-[15px]">
                            {usefulLinks.map((item) => (
                                <li key={item} className="hover:text-[#FF6B00] transition">
                                    <a href="#">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#1F1F1F] mt-14" />

                {/* ── BOTTOM BAR ── */}
                {/* Desktop: 3-col row | Mobile: stacked center */}
                <div className="py-7 flex flex-col lg:grid lg:grid-cols-3 items-center gap-5 lg:gap-6">

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/photoprofile.jpeg"
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div>
                            <p className="text-[#D6D6D6] font-medium text-sm">ruliffadrian</p>
                            <p className="text-[#7B7B7B] text-xs">ruliffax@gmail.com</p>
                            <p className="text-[#7B7B7B] text-xs">+62 813-8291-6024</p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-[#8B8B8B] text-sm mb-1">
                            Copyright © ruliffadrian
                        </p>
                        <a
                            href="https://rulifweb.vercel.app/"
                            target="_blank"
                            className="text-[#FF6B00] text-sm hover:underline"
                        >
                            rulifweb.vercel.app
                        </a>
                    </div>

                    {/* Social links — wrap on mobile */}
                    <div className="flex items-center justify-center lg:justify-end flex-wrap gap-x-4 gap-y-2 text-sm text-[#D6D6D6]">
                        {socials.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                className="hover:text-[#FF6B00] transition"
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                </div>

            </div>

        </footer>
    );
}