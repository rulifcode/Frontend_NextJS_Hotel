"use client";

export default function Footer() {
    return (
        <footer className="bg-[#050505] text-white pt-20">

            {/* TOP */}
            <div className="max-w-[1200px] mx-auto px-8">

                <div className="grid lg:grid-cols-[220px_1fr_220px] gap-16 items-start">

                    {/* LEFT — Quick Link */}
                    <div>
                        <h3 className="text-[20px] font-semibold mb-8">
                            Quick link
                        </h3>
                        <ul className="space-y-5 text-[#C5C5C5] text-[15px]">
                            {["Home", "Services", "About us", "Contact"].map((item) => (
                                <li key={item} className="hover:text-[#FF6B00] transition">
                                    <a href="#">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CENTER — Contact */}
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-[44px] font-bold mb-4">Contact</h2>
                        <p className="text-[#8B8B8B] text-[15px] leading-7 max-w-[420px] mb-10">
                            Graha Pos Indonesia Bandung, Jawa Barat.
                        </p>

                        {/* GOOGLE MAPS */}
                        <div className="w-full max-w-[520px] h-[220px] rounded-md overflow-hidden border border-[#2A2A2A] mb-10">
                            <iframe
                                src="https://www.google.com/maps?q=Graha+Pos+Indonesia+Bandung&output=embed"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* EMAIL FORM */}
                        <div className="flex w-full max-w-[520px]">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="flex-1 h-[58px] bg-transparent border border-[#4A4A4A] px-5 text-sm outline-none text-white placeholder:text-[#7A7A7A]"
                            />
                            <button className="bg-[#FF6B00] hover:bg-[#eb6300] transition-all px-8 text-sm font-semibold">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* RIGHT — Useful */}
                    <div className="text-right">
                        <h3 className="text-[20px] font-semibold mb-8">Useful</h3>
                        <ul className="space-y-5 text-[#C5C5C5] text-[15px]">
                            {["Privacy policy", "Legal", "FAQ", "Blogs"].map((item) => (
                                <li key={item} className="hover:text-[#FF6B00] transition">
                                    <a href="#">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* DIVIDER */}
                <div className="border-t border-[#1F1F1F] mt-16"></div>

                {/* BOTTOM */}
                <div className="py-7 grid lg:grid-cols-3 items-center gap-6">

                    {/* LEFT — Profile */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/photoprofile.jpeg"
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-[#D6D6D6] font-medium">ruliffadrian</p>
                            <p className="text-[#7B7B7B] text-xs">ruliffax@gmail.com</p>
                            <p className="text-[#7B7B7B] text-xs">+62 813-8291-6024</p>
                        </div>
                    </div>

                    {/* CENTER — Copyright */}
                    <div className="text-center">
                        <p className="text-[#8B8B8B] text-sm mb-2">
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

                    {/* RIGHT — Social */}
                    <div className="flex items-center justify-end gap-5 text-sm text-[#D6D6D6]">
                        <div className="w-px h-6 bg-[#2A2A2A]"></div>
                        {[
                            { label: "LinkedIn", href: "https://linkedin.com/in/ruliffadrian" },
                            { label: "Instagram", href: "https://instagram.com/ruliffadrian" },
                            { label: "GitHub", href: "https://github.com/rulifcode" },
                            { label: "GitLab", href: "https://gitlab.com/rulifcode" },
                        ].map(({ label, href }) => (
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