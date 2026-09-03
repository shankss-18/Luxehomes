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
    { label: "MASTERPLAN", href: "/#collections", id: "masterplan" },
    { label: "GALLERY", href: "/properties", id: "gallery" },
    { label: "LOCATION", href: "/locations", id: "location" },
    { label: "ABOUT & CONTACT", href: "/contact", id: "about-contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E4DC] py-4"
            : "bg-white border-b border-[#E8E4DC] py-5"
        } px-6 md:px-12 flex items-center justify-between whitespace-nowrap`}
      >
        {/* ── Brand Logo ─────────────────────────────────────────────── */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-serif-luxury text-2xl md:text-3xl text-[#1c1b1b] font-normal tracking-tight hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            LuxeHomes
          </Link>
        </div>

        {/* ── Desktop Navigation Menu ─────────────────────────────────── */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex items-center gap-5 lg:gap-6 text-xs tracking-[0.14em] font-medium text-[#474741]">
            {navItems.map((item, index) => {
              const isHomeActive = item.href === "/" && pathname === "/";
              const isRouteActive = pathname.startsWith(item.href) && item.href !== "/";
              const isActive = isHomeActive || isRouteActive;

              return (
                <div key={item.label} className="flex items-center gap-5 lg:gap-6">
                  <Link
                    href={item.href}
                    className={`transition-all duration-200 hover:text-[#1c1b1b] ${
                      isActive
                        ? "text-[#1c1b1b] border-b border-[#1c1b1b] pb-1 font-semibold"
                        : "text-[#474741] hover:text-[#1c1b1b]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {index < navItems.length - 1 && (
                    <span className="text-[#c8c7be] select-none text-[11px]">-</span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* ── Enquire CTA Button ──────────────────────────────────────── */}
        <div className="hidden md:flex justify-end">
          <button
            onClick={onOpenEnquire ? onOpenEnquire : () => {
              const el = document.getElementById("enquiry-modal-trigger");
              if (el) el.click();
              else window.location.href = "/contact";
            }}
            className="flex items-center justify-center border border-[#1c1b1b] text-[#1c1b1b] text-xs tracking-[0.18em] font-medium py-2.5 px-8 hover:bg-[#1c1b1b] hover:text-white transition-all duration-300 cursor-pointer"
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
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
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
          className={`absolute top-[68px] left-0 w-full bg-white border-b border-[#E8E4DC] px-6 py-8 shadow-xl transition-transform duration-300 ease-out flex flex-col gap-6 ${
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
                <span className="material-symbols-outlined text-sm text-[#c8c7be]">arrow_forward</span>
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
                else window.location.href = "/contact";
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
