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
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-[60px] left-0 w-full bg-[#FAF7F2] border-b border-[#E8E4DC] px-5 py-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col gap-5 ${
            menuOpen ? "translate-y-0" : "-translate-y-6"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`min-h-[48px] px-4 rounded-xl text-xs tracking-[0.2em] uppercase font-medium flex justify-between items-center transition-all ${
                    isActive
                      ? "bg-white text-[#B08D57] font-semibold border border-[#B08D57]/40 shadow-xs"
                      : "text-[#1c1b1b] hover:bg-white/60 hover:text-[#B08D57]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isActive && <span className="size-1.5 rounded-full bg-[#B08D57]" />}
                    <span>{item.label}</span>
                  </div>
                  <span className={`material-symbols-outlined text-sm ${isActive ? "text-[#B08D57]" : "text-[#72716d]"}`}>
                    arrow_forward
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Quick Advisory Contact Row on Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E4DC]/80">
            <a
              href="tel:+914045678900"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#E8E4DC] text-[#1c1b1b] text-[10.5px] font-semibold tracking-wider uppercase shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm text-[#B08D57]">call</span>
              <span>Direct Call</span>
            </a>
            <a
              href="https://wa.me/914045678900"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-[10.5px] font-semibold tracking-wider uppercase shadow-xs active:scale-95 transition-all"
            >
              <span className="size-3.5 fill-white">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                  <path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.275-.1-.476-.15-.676.15-.2.3-.777.977-.952 1.177-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.613.136-.134.301-.351.451-.527.151-.175.201-.3.302-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.927-2.233-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.91 1.229 3.111c.15.2 2.122 3.24 5.14 4.544.718.31 1.279.495 1.716.634.721.229 1.378.197 1.897.119.579-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.201-.577-.351zM12.004 21.75c-1.737 0-3.441-.453-4.945-1.314l-.354-.202-3.676.964.981-3.584-.222-.353a9.718 9.718 0 01-1.492-5.187c0-5.385 4.381-9.766 9.768-9.766 2.609 0 5.061 1.017 6.906 2.862a9.713 9.713 0 012.86 6.904c0 5.386-4.382 9.766-9.826 9.766zm8.334-16.671A11.666 11.666 0 0012.004.25C5.522.25.247 5.526.247 12.009c0 2.07.54 4.09 1.565 5.869L0 24l6.287-1.65a11.724 11.724 0 005.717 1.474h.005c6.481 0 11.757-5.275 11.757-11.759 0-3.14-1.222-6.092-3.428-8.295z" />
                </svg>
              </span>
              <span>WhatsApp</span>
            </a>
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
            className="w-full text-center bg-[#1c1b1b] text-white text-xs tracking-widest font-semibold py-3.5 rounded-xl hover:bg-[#B08D57] transition-all shadow-sm active:scale-98"
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </>
  );
}
