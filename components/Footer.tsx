"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="border-t border-[#E8E4DC] pt-14 pb-10 bg-[#FAF7F2] text-[#1c1b1b]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* ── Brand Column ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#B08D57]">
              <svg className="size-6 text-[#B08D57]" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
              </svg>
              <h2
                className="text-[#1c1b1b] text-xl font-bold uppercase tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                LUXE
              </h2>
            </div>
            <p className="text-[#72716d] text-sm italic leading-relaxed">
              Redefining the essence of living through architectural silence and refined aesthetics in Hyderabad&apos;s most prestigious corridors.
            </p>
          </div>

          {/* ── Navigation Column ────────────────────────────────────── */}
          <div className="flex flex-col gap-3.5">
            <h5 className="font-bold text-[#1c1b1b] uppercase text-[11px] tracking-[0.2em]">
              Navigation
            </h5>
            {[
              { href: "/", label: "Home" },
              { href: "/properties", label: "Gallery & Residences" },
              { href: "/about", label: "About Us" },
              { href: "/locations", label: "Locations" },
              { href: "/contact", label: "Contact Us" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-[#72716d] text-sm hover:text-[#B08D57] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Contact Column (Real Hyderabad Data) ─────────────────── */}
          <div className="flex flex-col gap-3.5">
            <h5 className="font-bold text-[#1c1b1b] uppercase text-[11px] tracking-[0.2em]">
              Kokapet Advisory Office
            </h5>
            <p className="text-[#72716d] text-sm leading-relaxed">
              The Luxe Tower, Neopolis Corridor<br />
              Kokapet, Hyderabad, Telangana 500075<br />
              India
            </p>
            <a
              href="mailto:concierge@luxehomes.com"
              className="text-[#72716d] text-sm hover:text-[#B08D57] transition-colors"
            >
              concierge@luxehomes.com
            </a>
            <a
              href="tel:+914045678900"
              className="text-[#72716d] text-sm hover:text-[#B08D57] transition-colors"
            >
              +91 40 4567 8900
            </a>
          </div>

          {/* ── Newsletter Column ────────────────────────────────────── */}
          <div className="flex flex-col gap-3.5">
            <h5 className="font-bold text-[#1c1b1b] uppercase text-[11px] tracking-[0.2em]">
              Newsletter
            </h5>
            <p className="text-[#72716d] text-xs leading-relaxed">
              Join our inner circle for exclusive previews of upcoming Neopolis releases.
            </p>
            {subscribed ? (
              <div className="bg-[#FAF7F2] border border-[#B08D57] rounded-lg p-3 text-xs text-[#B08D57] font-medium animate-fade-in-scale">
                ✓ Welcome to our inner circle. An invitation has been dispatched.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#F1EDEC] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 w-full text-xs text-[#1c1b1b] placeholder-[#72716d] focus:ring-1 focus:ring-[#B08D57] focus:border-[#B08D57] focus:outline-none transition-all"
                  placeholder="Email Address"
                  type="email"
                />
                <button
                  type="submit"
                  className="bg-[#B08D57] hover:bg-[#967645] text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-sm hover:shadow"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#72716d] border-t border-[#E8E4DC]/60 pt-6">
          <p>© 2026 LUXEHOMES Hyderabad. All rights reserved. RERA Registration: TBD · HMDA Approved Master Plan.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#B08D57] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#B08D57] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#B08D57] transition-colors">
              RERA Disclosures (TBD)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
