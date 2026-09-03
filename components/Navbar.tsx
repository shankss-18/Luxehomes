"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavbarProps {
  onOpenEnquire?: () => void;
}

export default function Navbar({ onOpenEnquire }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "/", id: "home" },
    { label: "GALLERY", href: "/gallery", id: "gallery" },
    { label: "LOCATION", href: "/location", id: "location" },
    { label: "ABOUT", href: "/about", id: "about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/97 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)] border-b border-[#E8E4DC] py-2.5"
            : "bg-white/95 backdrop-blur-sm border-b border-[#E8E4DC]/70 py-3"
        } px-6 md:px-14 flex items-center justify-between whitespace-nowrap`}
      >
        {/* ── Brand Logo ─────────────────────────────────────────────── */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-[#1c1b1b] font-normal tracking-tight hover:opacity-80 transition-opacity flex items-baseline gap-1"
            style={{ fontFamily: "'Cormorant Garant', 'Playfair Display', serif", fontSize: "1.55rem", letterSpacing: "-0.01em" }}
          >
            Luxe<span className="text-[#B08D57]">Homes</span>
          </Link>
        </div>

        {/* ── Thin Gold Separator ─────────────────────────────────────── */}
        <div className="hidden md:block h-5 w-px bg-[#E8E4DC] mx-6" />

        {/* ── Desktop Navigation Menu ─────────────────────────────────── */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex items-center gap-7 lg:gap-9 text-[10.5px] tracking-[0.17em] font-medium text-[#474741]">
            {navItems.map((item) => {
              const isHomeActive = item.href === "/" && pathname === "/";
              const isRouteActive = pathname.startsWith(item.href) && item.href !== "/";
              const isActive = isHomeActive || isRouteActive;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 transition-all duration-200 group ${
                    isActive
                      ? "text-[#1c1b1b]"
                      : "text-[#6b6b65] hover:text-[#1c1b1b]"
                  }`}
                >
                  {item.label}
                  {/* Animated gold underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#B08D57] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── Enquire CTA Button ──────────────────────────────────────── */}
        <div className="hidden md:flex justify-end items-center gap-3">
          {/* Subtle SVG diamond ornament */}
          <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#B08D57] opacity-60">
            <polygon points="7,0 14,7 7,14 0,7" fill="currentColor" />
          </svg>
          <button
            onClick={onOpenEnquire ? onOpenEnquire : () => {
              const el = document.getElementById("enquiry-modal-trigger");
              if (el) el.click();
              else window.location.href = "/about#contact";
            }}
            className="flex items-center justify-center border border-[#1c1b1b] text-[#1c1b1b] text-[10px] tracking-[0.22em] font-semibold py-2 px-7 hover:bg-[#1c1b1b] hover:text-white transition-all duration-300 cursor-pointer"
          >
            ENQUIRE
          </button>
        </div>

        {/* ── Mobile Hamburger Toggle ─────────────────────────────────── */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#1c1b1b] p-1.5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 26 }}>
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile Sliding Drawer Menu ───────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-[60px] left-0 w-full bg-white border-b border-[#E8E4DC] px-6 py-8 shadow-xl transition-transform duration-300 ease-out flex flex-col gap-6 ${
            menuOpen ? "translate-y-0" : "-translate-y-6"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase font-medium text-[#1c1b1b] py-2 border-b border-[#F1EDEC] flex justify-between items-center"
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-sm text-[#B08D57]">arrow_forward</span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              setMenuOpen(false);
              if (onOpenEnquire) onOpenEnquire();
              else {
                const el = document.getElementById("enquiry-modal-trigger");
                if (el) el.click();
                else window.location.href = "/about#contact";
              }
            }}
            className="w-full text-center border border-[#1c1b1b] text-[#1c1b1b] text-xs tracking-widest font-semibold py-3 hover:bg-[#1c1b1b] hover:text-white transition-colors"
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </>
  );
}
