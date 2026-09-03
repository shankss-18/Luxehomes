"use client";

import { useState } from "react";
import Link from "next/link";
import locationsData from "@/data/locations.json";

interface LocationItem {
  id: string;
  name: string;
  badge: string;
  category: "office" | "flagship" | "tech" | "heritage";
  type: "office" | "residence";
  area: string;
  pincode: string;
  positioning: string;
  avgPriceSqFt: string;
  driveTimes: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
  coordinates: { top: string; left: string }; // Position on the cartographic canvas
  image: string;
  distanceFromOrr: string;
}

export default function LocationPage() {
  const [activeLocationId, setActiveLocationId] = useState<string>("kokapet-office");
  const [activeFilter, setActiveFilter] = useState<"all" | "office" | "flagship" | "tech" | "heritage">("all");

  // Comprehensive location registry bound from locationsData
  const locationList: LocationItem[] = [
    {
      id: "kokapet-office",
      name: "Kokapet Advisory Office",
      badge: "Flagship Site Office",
      category: "office",
      type: "office",
      area: "The Luxe Tower, Neopolis Corridor, Kokapet",
      pincode: "500075",
      positioning: "Dedicated private client advisory office, experiential gallery & on-site masterplan showroom",
      avgPriceSqFt: "₹12,800/sq.ft (Corridor Benchmark)",
      driveTimes: ["Immediate ORR Exit 1", "5 min to Financial District", "25 min to Airport"],
      distanceFromOrr: "Direct Exit 1",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "The Luxe Tower, Neopolis Corridor, Kokapet, Hyderabad, Telangana 500075"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "The Luxe Tower, Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      coordinates: { top: "54%", left: "42%" },
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE",
    },
    {
      id: "kokapet-residences",
      name: "Kokapet (Neopolis Corridor)",
      badge: "Flagship Residential",
      category: "flagship",
      type: "residence",
      area: "Neopolis Sector 1 & 2, Kokapet",
      pincode: "500075",
      positioning: locationsData.flagship.positioning,
      avgPriceSqFt: "₹12,800/sq.ft",
      driveTimes: [
        "3 min to ORR Toll Plaza",
        "5 min to Financial District",
        "8 min to Gachibowli IT Hub",
      ],
      distanceFromOrr: "3 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      coordinates: { top: "50%", left: "37%" },
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCrBdPj9oxtI9eBHXHVpAcaTAr33Y36nn5EGz4-TulcAC7JtGbmaCIu5Opkv4vHLqGPYBNJjRueiqJQmTd_wGTreZGlm9dpGxpNfLbAFrxRZpCc0MzW-TJwpKraMHYgTrCr20RoSRAvOIEwKU-b1tgBkdMbeRUzLbrrSWdmqU0USymV9RMm2CzQtZFa0GVS7d9-CDmi2p1dmQekILGVn6WrdjCkT13uIlOMMqahvRlY3QOezDei7LN8",
    },
    {
      id: "financial-district",
      name: "Financial District (Nanakramguda)",
      badge: "Corporate & Tech Core",
      category: "tech",
      type: "residence",
      area: "Nanakramguda, Financial District",
      pincode: "500032",
      positioning: "Corporate institutional zone with walk-to-work culture beside global campuses",
      avgPriceSqFt: "₹13,200/sq.ft",
      driveTimes: ["2 min to Nanakramguda Circle", "3 min to Continental Hospitals", "8 min to ORR"],
      distanceFromOrr: "5 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Financial District, Nanakramguda, Hyderabad 500032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Financial District, Nanakramguda, Hyderabad 500032"
      )}`,
      coordinates: { top: "42%", left: "54%" },
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "gachibowli",
      name: "Gachibowli",
      badge: "Commercial Tech Hub",
      category: "tech",
      type: "residence",
      area: "Gachibowli IT Corridor",
      pincode: "500032",
      positioning: "Direct proximity to Microsoft, Amazon, DLF Cyber City, and premier sports stadiums",
      avgPriceSqFt: "₹12,500/sq.ft",
      driveTimes: ["5 min to Financial District", "7 min to AIG Hospitals", "10 min to HITEC City"],
      distanceFromOrr: "6 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Gachibowli, Hyderabad 500032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Gachibowli, Hyderabad 500032"
      )}`,
      coordinates: { top: "35%", left: "62%" },
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "banjara-hills",
      name: "Banjara Hills",
      badge: "Heritage Prestige",
      category: "heritage",
      type: "residence",
      area: "Road No. 12, Banjara Hills",
      pincode: "500034",
      positioning: "Timeless heritage benchmark of high-net-worth living in leafy central Hyderabad",
      avgPriceSqFt: "₹16,500/sq.ft",
      driveTimes: ["5 min to Luxury High-Street", "15 min to Financial District", "20 min to Airport via PVNR"],
      distanceFromOrr: "15 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Banjara Hills, Hyderabad 500034"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Banjara Hills, Hyderabad 500034"
      )}`,
      coordinates: { top: "36%", left: "78%" },
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "jubilee-hills",
      name: "Jubilee Hills",
      badge: "Elite Enclave",
      category: "heritage",
      type: "residence",
      area: "Road No. 36 & Durgam Cheruvu Enclave",
      pincode: "500033",
      positioning: "Elevated topography with panoramic vistas of the lake and high-street lifestyle",
      avgPriceSqFt: "₹18,000/sq.ft",
      driveTimes: ["5 min to Apollo Health City", "8 min to Durgam Cheruvu Cable Bridge", "12 min to HITEC City"],
      distanceFromOrr: "12 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Jubilee Hills, Hyderabad 500033"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Jubilee Hills, Hyderabad 500033"
      )}`,
      coordinates: { top: "27%", left: "71%" },
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "tellapur",
      name: "Tellapur",
      badge: "Green Master Buffer",
      category: "flagship",
      type: "residence",
      area: "Tellapur Master Plan Zone",
      pincode: "502032",
      positioning: "Tranquil master-planned residential corridor with expansive green lung spaces",
      avgPriceSqFt: "₹10,500/sq.ft",
      driveTimes: ["8 min to Kokapet Neopolis", "12 min to Financial District", "10 min to ORR Exit 2"],
      distanceFromOrr: "4 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Tellapur, Hyderabad 502032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Tellapur, Hyderabad 502032"
      )}`,
      coordinates: { top: "60%", left: "22%" },
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredLocations =
    activeFilter === "all"
      ? locationList
      : locationList.filter((l) => l.category === activeFilter);

  const activeLocation =
    locationList.find((loc) => loc.id === activeLocationId) || locationList[0];

  const scrollToMap = () => {
    const mapElement = document.getElementById("interactive-map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-luxury-pattern-subtle overflow-x-hidden pt-[76px] md:pt-[84px]">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-8 pb-6">
        <div className="flex flex-col items-center text-center gap-2.5 reveal-item">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[#B08D57] text-[10px] tracking-[0.28em] uppercase font-semibold shadow-xs">
            <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span>STRATEGIC GEOGRAPHY</span>
          </div>
          <h1
            className="text-[#1c1b1b] leading-tight text-3xl md:text-5xl font-normal"
            style={{ fontFamily: "'Cormorant Garant', 'Playfair Display', serif" }}
          >
            Prime Hyderabad Corridors
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-[#B08D57]/40" />
            <svg width="6" height="6" viewBox="0 0 6 6">
              <polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" />
            </svg>
            <div className="h-px w-10 bg-[#B08D57]/40" />
          </div>
          <p
            className="text-[#72716d] text-sm md:text-base max-w-2xl font-light leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore our residential developments and central advisory office across Western Hyderabad&apos;s most prestigious addresses.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-24 flex flex-col gap-14">

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 1. BESPOKE CARTOGRAPHIC INTERACTIVE VECTOR MAP                    */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div id="interactive-map" className="flex flex-col gap-4 reveal-item">

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E8E4DC] rounded-full shadow-xs overflow-x-auto max-w-full">
              {[
                { id: "all", label: "All Corridors (7)" },
                { id: "office", label: "Advisory Office" },
                { id: "flagship", label: "Flagship Hubs" },
                { id: "tech", label: "Corporate Tech Core" },
                { id: "heritage", label: "Heritage Enclaves" },
              ].map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#1c1b1b] text-white font-medium shadow-xs"
                        : "text-[#72716d] hover:text-[#1c1b1b] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs text-[#72716d]">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#B08D57] animate-ping" />
                <span className="text-[11px] font-medium text-[#1c1b1b]">Central Flagship Node</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#1c1b1b]" />
                <span className="text-[11px]">Residences</span>
              </div>
            </div>
          </div>

          {/* Cartographic Blueprint Vector Map Canvas */}
          <div className="relative w-full h-[460px] md:h-[560px] rounded-3xl overflow-hidden border border-[#E8E4DC] shadow-2xl bg-[#111315] select-none">

            {/* SVG Cartographic Architectural Layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="mapGlow" cx="42%" cy="54%" r="60%">
                  <stop offset="0%" stopColor="#B08D57" stopOpacity="0.14" />
                  <stop offset="60%" stopColor="#111315" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#111315" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="orrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B08D57" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#B08D57" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#B08D57" stopOpacity="0.4" />
                </linearGradient>
                <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Grid backdrop */}
              <rect width="100%" height="100%" fill="#111315" />
              <rect width="100%" height="100%" fill="url(#archGrid)" />
              <rect width="100%" height="100%" fill="url(#mapGlow)" />

              {/* Distance Concentric Circles from Kokapet */}
              <circle cx="420" cy="324" r="90" fill="none" stroke="rgba(176, 141, 87, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="420" cy="324" r="180" fill="none" stroke="rgba(176, 141, 87, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="420" cy="324" r="280" fill="none" stroke="rgba(176, 141, 87, 0.08)" strokeWidth="1" strokeDasharray="5 5" />

              {/* Distance Labels */}
              <text x="420" y="226" fill="rgba(176, 141, 87, 0.45)" fontSize="10" fontFamily="'Inter', sans-serif" letterSpacing="1">3 KM RADIUS</text>
              <text x="420" y="136" fill="rgba(176, 141, 87, 0.35)" fontSize="10" fontFamily="'Inter', sans-serif" letterSpacing="1">8 KM RADIUS</text>

              {/* Durgam Cheruvu Lake Area (Water vector) */}
              <path
                d="M 670 180 Q 710 160 740 190 T 720 250 T 660 230 Z"
                fill="rgba(45, 85, 125, 0.25)"
                stroke="rgba(85, 145, 205, 0.3)"
                strokeWidth="1.5"
              />
              <text x="680" y="215" fill="rgba(120, 175, 230, 0.5)" fontSize="9" fontFamily="'Inter', sans-serif" letterSpacing="1">DURGAM CHERUVU</text>

              {/* Arterial Road Network */}
              {/* Secondary roads */}
              <path d="M 120 180 Q 320 220 540 250 T 880 230" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="2" />
              <path d="M 220 500 Q 380 420 540 250 T 780 120" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="2" />
              <path d="M 420 324 L 780 216" fill="none" stroke="rgba(176, 141, 87, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 420 324 L 540 252" fill="none" stroke="rgba(176, 141, 87, 0.35)" strokeWidth="2" />
              <path d="M 420 324 L 220 360" fill="none" stroke="rgba(176, 141, 87, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Outer Ring Road (ORR) Expressway - Major Glowing Ribbon */}
              <path
                d="M 160 520 Q 220 400 370 300 T 540 252 T 660 210 T 820 160"
                fill="none"
                stroke="url(#orrGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* ORR Highway Badge Label */}
              <rect x="250" y="340" width="70" height="18" rx="4" fill="#1c1b1b" stroke="#B08D57" strokeWidth="1" />
              <text x="257" y="353" fill="#B08D57" fontSize="9" fontWeight="bold" letterSpacing="1">ORR EXIT 1</text>

              {/* PVNR Airport Expressway */}
              <path
                d="M 780 216 Q 660 380 580 560"
                fill="none"
                stroke="rgba(176, 141, 87, 0.3)"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
              <text x="630" y="480" fill="rgba(176, 141, 87, 0.45)" fontSize="9" letterSpacing="1" transform="rotate(65 630 480)">PVNR AIRPORT EXPRESSWAY →</text>
            </svg>

            {/* Compass Rose in Top Right Corner */}
            <div className="absolute top-5 right-5 pointer-events-none hidden md:flex flex-col items-center gap-1 opacity-70">
              <div className="size-10 rounded-full border border-white/10 flex items-center justify-center relative">
                <span className="text-[9px] font-bold text-[#B08D57] absolute -top-1">N</span>
                <span className="text-[7px] text-white/40 absolute -bottom-1">S</span>
                <span className="text-[7px] text-white/40 absolute -left-1">W</span>
                <span className="text-[7px] text-white/40 absolute -right-1">E</span>
                <div className="size-1 rounded-full bg-[#B08D57]" />
              </div>
              <span className="text-[8px] uppercase tracking-widest text-white/40">HUD RADAR</span>
            </div>

            {/* Interactive Corridors & Pins Layer */}
            {filteredLocations.map((loc) => {
              const isSelected = loc.id === activeLocationId;
              const isOffice = loc.type === "office";

              return (
                <div
                  key={loc.id}
                  onClick={() => setActiveLocationId(loc.id)}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group z-20"
                  style={{ top: loc.coordinates.top, left: loc.coordinates.left }}
                >
                  {/* Outer Pulsing Beacon for Selected Node */}
                  {isSelected && (
                    <span className="absolute -inset-3 rounded-full bg-[#B08D57]/25 animate-ping pointer-events-none" />
                  )}

                  {/* Pin Node Capsule */}
                  <div
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full shadow-2xl border transition-all duration-300 ${
                      isSelected
                        ? isOffice
                          ? "bg-[#B08D57] text-white border-white ring-4 ring-[#B08D57]/50 scale-110"
                          : "bg-white text-[#1c1b1b] border-[#B08D57] ring-4 ring-white/30 scale-110"
                        : isOffice
                        ? "bg-[#B08D57]/90 text-white border-[#B08D57] hover:scale-105"
                        : "bg-[#1c1b1b]/90 text-white border-white/20 hover:border-[#B08D57] hover:scale-105"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isOffice ? "apartment" : "domain"}
                    </span>
                    <span className="text-[10.5px] font-semibold tracking-wider uppercase whitespace-nowrap">
                      {loc.name.split(" ")[0]}
                    </span>

                    {/* Small distance tag */}
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? isOffice
                            ? "bg-black/20 text-white"
                            : "bg-[#FAF7F2] text-[#B08D57] font-bold"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {loc.distanceFromOrr}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Bottom Glassmorphic Spotlight HUD Card */}
            <div className="absolute bottom-4 left-4 right-4 z-30">
              <div className="bg-[#1c1b1b]/95 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">

                {/* Left Side: Thumbnail + Info */}
                <div className="flex items-center gap-4">
                  <div className="size-14 md:size-16 rounded-xl overflow-hidden border border-white/15 shrink-0 relative">
                    <img
                      src={activeLocation.image}
                      alt={activeLocation.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9.5px] uppercase font-bold tracking-widest text-[#B08D57] px-2 py-0.5 rounded bg-[#B08D57]/15 border border-[#B08D57]/30">
                        {activeLocation.badge}
                      </span>
                      <span className="text-white/40 text-xs">·</span>
                      <span className="text-xs text-white/70">{activeLocation.avgPriceSqFt}</span>
                    </div>

                    <h4
                      className="text-lg md:text-xl font-normal leading-snug text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {activeLocation.name}
                    </h4>

                    <p className="text-xs text-white/60 line-clamp-1">{activeLocation.area}</p>
                  </div>
                </div>

                {/* Middle: Connectivity Highlights */}
                <div className="hidden lg:flex items-center gap-2">
                  {activeLocation.driveTimes.slice(0, 2).map((drive) => (
                    <span
                      key={drive}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/80 flex items-center gap-1.5"
                    >
                      <span className="size-1.5 rounded-full bg-[#B08D57]" />
                      {drive}
                    </span>
                  ))}
                </div>

                {/* Right Side: Google & Apple Maps Action Buttons */}
                <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
                  <a
                    href={activeLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#B08D57] hover:bg-[#967645] text-white text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-lg"
                  >
                    <span className="material-symbols-outlined text-sm">map</span>
                    <span>Google Maps</span>
                  </a>

                  <a
                    href={activeLocation.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm text-[#B08D57]">navigation</span>
                    <span>Apple Maps</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 2. REGIONAL PORTFOLIO CARDS GRID (REDESIGNED LUXURY SHOWCASE)     */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 reveal-item">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E4DC] pb-5">
            <div>
              <span className="text-[#B08D57] font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
                Regional Portfolio
              </span>
              <h3
                className="text-2xl md:text-3xl font-normal text-[#1c1b1b]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                All Corridors &amp; Facilities
              </h3>
            </div>
            <p className="text-xs text-[#72716d] max-w-sm">
              Click any corridor card to spotlight on the cartographic map above or open direct navigation.
            </p>
          </div>

          {/* Cards Grid: High-End Architectural Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {locationList.map((loc, idx) => {
              const isSelected = loc.id === activeLocationId;
              const isOffice = loc.type === "office";
              const delayClass = `reveal-delay-${(idx % 3) + 1}`;

              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    setActiveLocationId(loc.id);
                    scrollToMap();
                  }}
                  className={`reveal-item ${delayClass} bg-white rounded-3xl border transition-all duration-500 flex flex-col justify-between cursor-pointer group shadow-sm overflow-hidden ${
                    isSelected
                      ? "border-[#B08D57] ring-2 ring-[#B08D57]/30 shadow-xl -translate-y-1.5"
                      : "border-[#E8E4DC] hover:border-[#B08D57]/70 hover:shadow-xl hover:-translate-y-1.5"
                  }`}
                >
                  <div>
                    {/* Visual Header Image Frame */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1c1b1b]">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span
                          className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md ${
                            isOffice
                              ? "bg-[#B08D57] text-white shadow-xs"
                              : "bg-white/90 text-[#1c1b1b] shadow-xs"
                          }`}
                        >
                          {loc.badge}
                        </span>

                        <span className="text-[10px] font-semibold text-white px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                          {loc.distanceFromOrr}
                        </span>
                      </div>

                      {/* Bottom Image Overlay: Price Tag */}
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                          <span className="text-[9.5px] uppercase tracking-wider text-white/70 block">
                            Benchmark Rate
                          </span>
                          <span className="text-sm font-semibold text-[#B08D57]">
                            {loc.avgPriceSqFt}
                          </span>
                        </div>
                        <div className="size-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#B08D57] transition-colors">
                          <span className="material-symbols-outlined text-sm text-white">explore</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col gap-3">
                      <div>
                        <h4
                          className="text-xl font-normal text-[#1c1b1b] group-hover:text-[#B08D57] transition-colors"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {loc.name}
                        </h4>
                        <p className="text-xs text-[#72716d] mt-0.5">
                          {loc.area} · PIN {loc.pincode}
                        </p>
                      </div>

                      {/* Positioning Line */}
                      <p className="text-xs text-[#474741] font-light leading-relaxed">
                        {loc.positioning}
                      </p>

                      {/* Transit Connectivity Timeline Chips */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {loc.driveTimes.map((drive) => (
                          <span
                            key={drive}
                            className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-[10.5px] text-[#72716d] flex items-center gap-1.5"
                          >
                            <span className="size-1.5 rounded-full bg-[#B08D57]" />
                            {drive}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row: Google & Apple Maps */}
                  <div className="p-4 px-6 bg-[#FAF7F2]/60 border-t border-[#E8E4DC] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLocationId(loc.id);
                        scrollToMap();
                      }}
                      className="text-[10.5px] tracking-wider uppercase font-semibold text-[#B08D57] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Spotlight Map</span>
                      <span className="material-symbols-outlined text-xs">my_location</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={loc.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] tracking-wider uppercase font-semibold text-[#1c1b1b] hover:text-[#B08D57] transition-colors flex items-center gap-0.5"
                      >
                        <span>Google</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>

                      <span className="text-[#E8E4DC]">•</span>

                      <a
                        href={loc.appleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] tracking-wider uppercase font-semibold text-[#72716d] hover:text-[#B08D57] transition-colors flex items-center gap-0.5"
                      >
                        <span>Apple</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
