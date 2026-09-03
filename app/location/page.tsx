"use client";

import { useState } from "react";
import Link from "next/link";
import locationsData from "@/data/locations.json";

interface LocationItem {
  id: string;
  index: string;
  name: string;
  badge: string;
  category: "office" | "flagship" | "tech" | "heritage";
  type: "office" | "residence";
  area: string;
  pincode: string;
  positioning: string;
  avgPriceSqFt: string;
  driveTimes: { label: string; duration: string; note: string }[];
  googleMapsUrl: string;
  appleMapsUrl: string;
  coordinates: { top: string; left: string }; // Position on the white cartographic canvas
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
      index: "01",
      name: "Kokapet Advisory Office",
      badge: "Flagship Site Office",
      category: "office",
      type: "office",
      area: "The Luxe Tower, Neopolis Corridor, Kokapet",
      pincode: "500075",
      positioning: "Dedicated private client advisory office, experiential gallery & on-site masterplan showroom with private client consulting salons.",
      avgPriceSqFt: "₹12,800/sq.ft",
      driveTimes: [
        { label: "Outer Ring Road", duration: "Immediate Exit 1", note: "Direct junction access" },
        { label: "Financial District", duration: "5 min drive", note: "Nanakramguda Circle" },
        { label: "Airport Transit", duration: "25 min drive", note: "Via ORR Expressway" },
      ],
      distanceFromOrr: "Direct Exit 1",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "The Luxe Tower, Neopolis Corridor, Kokapet, Hyderabad, Telangana 500075"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "The Luxe Tower, Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      coordinates: { top: "68%", left: "30%" }, // South-West placement (Flagship Advisory Hub)
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE",
    },
    {
      id: "kokapet-residences",
      index: "02",
      name: "Kokapet (Neopolis Corridor)",
      badge: "Flagship Residential",
      category: "flagship",
      type: "residence",
      area: "Neopolis Sector 1 & 2, Kokapet",
      pincode: "500075",
      positioning: locationsData.flagship.positioning,
      avgPriceSqFt: "₹12,800/sq.ft",
      driveTimes: [
        { label: "ORR Toll Plaza", duration: "3 min drive", note: "Seamless arterial ramp" },
        { label: "Financial District", duration: "5 min drive", note: "Direct multi-lane road" },
        { label: "Gachibowli IT Hub", duration: "8 min drive", note: "Quick corporate transit" },
      ],
      distanceFromOrr: "3 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      coordinates: { top: "36%", left: "28%" }, // West-Central placement
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCrBdPj9oxtI9eBHXHVpAcaTAr33Y36nn5EGz4-TulcAC7JtGbmaCIu5Opkv4vHLqGPYBNJjRueiqJQmTd_wGTreZGlm9dpGxpNfLbAFrxRZpCc0MzW-TJwpKraMHYgTrCr20RoSRAvOIEwKU-b1tgBkdMbeRUzLbrrSWdmqU0USymV9RMm2CzQtZFa0GVS7d9-CDmi2p1dmQekILGVn6WrdjCkT13uIlOMMqahvRlY3QOezDei7LN8",
    },
    {
      id: "financial-district",
      index: "03",
      name: "Financial District (Nanakramguda)",
      badge: "Corporate & Tech Core",
      category: "tech",
      type: "residence",
      area: "Nanakramguda, Financial District",
      pincode: "500032",
      positioning: "Walk-to-work culture amidst global conglomerates, US Consulate campus, and luxury commercial high-streets.",
      avgPriceSqFt: "₹13,200/sq.ft",
      driveTimes: [
        { label: "Nanakramguda Circle", duration: "2 min drive", note: "Core institutional zone" },
        { label: "Continental Hospitals", duration: "3 min drive", note: "Tertiary medical care" },
        { label: "Outer Ring Road", duration: "5 min drive", note: "Direct junction ramp" },
      ],
      distanceFromOrr: "5 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Financial District, Nanakramguda, Hyderabad 500032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Financial District, Nanakramguda, Hyderabad 500032"
      )}`,
      coordinates: { top: "52%", left: "54%" }, // Central placement
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "gachibowli",
      index: "04",
      name: "Gachibowli",
      badge: "Commercial Tech Hub",
      category: "tech",
      type: "residence",
      area: "Gachibowli IT Corridor",
      pincode: "500032",
      positioning: "Direct proximity to Microsoft, Amazon, DLF Cyber City, international schools, and premier sports complexes.",
      avgPriceSqFt: "₹12,500/sq.ft",
      driveTimes: [
        { label: "Financial District", duration: "5 min drive", note: "Wipro Circle" },
        { label: "AIG Hospitals", duration: "7 min drive", note: "Premier health research" },
        { label: "HITEC City Core", duration: "10 min drive", note: "Cyber Towers zone" },
      ],
      distanceFromOrr: "6 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Gachibowli, Hyderabad 500032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Gachibowli, Hyderabad 500032"
      )}`,
      coordinates: { top: "18%", left: "50%" }, // North-Central placement
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "banjara-hills",
      index: "05",
      name: "Banjara Hills",
      badge: "Heritage Prestige",
      category: "heritage",
      type: "residence",
      area: "Road No. 12, Banjara Hills",
      pincode: "500034",
      positioning: "Timeless heritage benchmark of high-net-worth residency in leafy, quiet central Hyderabad.",
      avgPriceSqFt: "₹16,500/sq.ft",
      driveTimes: [
        { label: "High-Street Boutiques", duration: "5 min drive", note: "Road No. 1 luxury row" },
        { label: "Financial District", duration: "15 min drive", note: "Fast arterial transit" },
        { label: "Airport via PVNR", duration: "20 min drive", note: "Elevated expressway" },
      ],
      distanceFromOrr: "15 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Banjara Hills, Hyderabad 500034"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Banjara Hills, Hyderabad 500034"
      )}`,
      coordinates: { top: "62%", left: "82%" }, // East-Central placement
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "jubilee-hills",
      index: "06",
      name: "Jubilee Hills",
      badge: "Elite Enclave",
      category: "heritage",
      type: "residence",
      area: "Road No. 36 & Durgam Cheruvu Enclave",
      pincode: "500033",
      positioning: "Elevated topography with panoramic vistas of Durgam Cheruvu lake, dining clubs, and curated high-street retail.",
      avgPriceSqFt: "₹18,000/sq.ft",
      driveTimes: [
        { label: "Apollo Health City", duration: "5 min drive", note: "Premier specialty hub" },
        { label: "Durgam Cable Bridge", duration: "8 min drive", note: "Iconic lake bridge" },
        { label: "HITEC City", duration: "12 min drive", note: "Tech corporate core" },
      ],
      distanceFromOrr: "12 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Jubilee Hills, Hyderabad 500033"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Jubilee Hills, Hyderabad 500033"
      )}`,
      coordinates: { top: "26%", left: "80%" }, // North-East placement
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "tellapur",
      index: "07",
      name: "Tellapur",
      badge: "Green Master Buffer",
      category: "flagship",
      type: "residence",
      area: "Tellapur Master Plan Zone",
      pincode: "502032",
      positioning: "Tranquil master-planned residential corridor with expansive green lung spaces and low-density estate developments.",
      avgPriceSqFt: "₹10,500/sq.ft",
      driveTimes: [
        { label: "Kokapet Neopolis", duration: "8 min drive", note: "Multi-lane arterial link" },
        { label: "Financial District", duration: "12 min drive", note: "Fast commute" },
        { label: "ORR Exit 2", duration: "4 min drive", note: "Outer ring toll access" },
      ],
      distanceFromOrr: "4 min drive",
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Tellapur, Hyderabad 502032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Tellapur, Hyderabad 502032"
      )}`,
      coordinates: { top: "44%", left: "12%" }, // Far West placement
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
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 pt-8 pb-4">
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

      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 pb-24 flex flex-col gap-14">

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 1. BESPOKE WHITE-THEMED ARCHITECTURAL VECTOR MAP CANVAS           */}
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
                    className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#B08D57] text-white font-semibold shadow-xs"
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
                <span className="size-2 rounded-full bg-[#B08D57] animate-pulse" />
                <span className="text-[11px] font-medium text-[#1c1b1b]">Flagship Advisory Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#1c1b1b]" />
                <span className="text-[11px]">Curated Residences</span>
              </div>
            </div>
          </div>

          {/* White-Themed Architectural Blueprint Canvas Container */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E4DC] shadow-xl bg-white select-none flex flex-col">

            {/* Top: 100% Visible Unobstructed Map Viewport */}
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[600px] bg-[#FAF8F5] select-none overflow-hidden">

              {/* SVG Architectural Vector Map Layer */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Soft Ivory-Cream Radial Gradient */}
                  <radialGradient id="whiteMapGlow" cx="40%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="65%" stopColor="#F6F3EE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#EFECE5" stopOpacity="0.95" />
                  </radialGradient>

                  {/* Outer Ring Road Warm Gold Gradient */}
                  <linearGradient id="whiteOrrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C4A46D" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#B08D57" stopOpacity="1" />
                    <stop offset="100%" stopColor="#967645" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Architectural Blueprint Grid Pattern */}
                  <pattern id="whiteArchGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(28, 27, 27, 0.035)" strokeWidth="1" />
                  </pattern>
                </defs>

                {/* Background Canvas */}
                <rect width="100%" height="100%" fill="url(#whiteMapGlow)" />
                <rect width="100%" height="100%" fill="url(#whiteArchGrid)" />

                {/* Distance Concentric Circles centered on Kokapet */}
                <circle cx="320" cy="408" r="95" fill="none" stroke="rgba(176, 141, 87, 0.28)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="320" cy="408" r="190" fill="none" stroke="rgba(176, 141, 87, 0.22)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="320" cy="408" r="300" fill="none" stroke="rgba(176, 141, 87, 0.15)" strokeWidth="1" strokeDasharray="5 5" />

                {/* Distance Labels in Gold */}
                <text x="320" y="304" fill="#B08D57" fontSize="10" fontWeight="600" fontFamily="'Inter', sans-serif" letterSpacing="1">3 KM RADIUS</text>
                <text x="320" y="208" fill="#B08D57" fontSize="10" fontWeight="600" fontFamily="'Inter', sans-serif" letterSpacing="1">8 KM RADIUS</text>

                {/* Durgam Cheruvu Lake Area (Clean Water Vector) */}
                <path
                  d="M 680 150 Q 740 130 780 160 T 750 240 T 670 210 Z"
                  fill="rgba(200, 225, 238, 0.55)"
                  stroke="rgba(130, 180, 205, 0.6)"
                  strokeWidth="1.5"
                />
                <text x="700" y="185" fill="#4B779A" fontSize="9.5" fontWeight="600" fontFamily="'Inter', sans-serif" letterSpacing="1">
                  DURGAM CHERUVU LAKE
                </text>

                {/* Arterial Highway Network Lines */}
                <path d="M 100 240 Q 300 220 540 260 T 880 280" fill="none" stroke="rgba(114, 113, 109, 0.15)" strokeWidth="2.5" />
                <path d="M 120 480 Q 320 440 540 260 T 820 140" fill="none" stroke="rgba(114, 113, 109, 0.15)" strokeWidth="2.5" />
                <path d="M 320 408 L 820 348" fill="none" stroke="rgba(176, 141, 87, 0.28)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 320 408 L 480 288" fill="none" stroke="rgba(176, 141, 87, 0.35)" strokeWidth="2" />
                <path d="M 320 408 L 120 276" fill="none" stroke="rgba(176, 141, 87, 0.28)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Outer Ring Road (ORR) Expressway - Major Gleaming Gold Ribbon */}
                <path
                  d="M 100 550 Q 180 380 320 280 T 540 200 T 740 180 T 900 160"
                  fill="none"
                  stroke="url(#whiteOrrGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* ORR Highway Badge Label */}
                <rect x="210" y="325" width="76" height="20" rx="6" fill="#FFFFFF" stroke="#B08D57" strokeWidth="1.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
                <text x="218" y="339" fill="#B08D57" fontSize="9.5" fontWeight="bold" letterSpacing="1">ORR EXIT 1</text>

                {/* PVNR Elevated Airport Expressway */}
                <path
                  d="M 820 348 Q 680 460 560 580"
                  fill="none"
                  stroke="rgba(176, 141, 87, 0.4)"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />
                <text x="660" y="470" fill="#967645" fontSize="9" fontWeight="600" letterSpacing="1" transform="rotate(50 660 470)">
                  PVNR AIRPORT EXPRESSWAY →
                </text>
              </svg>

              {/* Compass Rose in Top Right */}
              <div className="absolute top-5 right-5 pointer-events-none hidden md:flex flex-col items-center gap-1 opacity-80">
                <div className="size-11 rounded-full bg-white/90 border border-[#E8E4DC] shadow-sm flex items-center justify-center relative">
                  <span className="text-[9px] font-bold text-[#B08D57] absolute -top-1">N</span>
                  <span className="text-[7.5px] text-[#72716d] absolute -bottom-1">S</span>
                  <span className="text-[7.5px] text-[#72716d] absolute -left-1">W</span>
                  <span className="text-[7.5px] text-[#72716d] absolute -right-1">E</span>
                  <div className="size-1.5 rounded-full bg-[#B08D57]" />
                </div>
                <span className="text-[8px] uppercase tracking-widest text-[#72716d] font-semibold">GEOGRAPHIC RADAR</span>
              </div>

              {/* Interactive Corridors & Pins Layer (Spread out across map, clean on mobile) */}
              {filteredLocations.map((loc) => {
                const isSelected = loc.id === activeLocationId;
                const isOffice = loc.type === "office";

                return (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-20"
                    style={{ top: loc.coordinates.top, left: loc.coordinates.left }}
                  >
                    {/* Outer Pulsing Beacon for Selected Node */}
                    {isSelected && (
                      <span className="absolute -inset-3.5 rounded-full bg-[#B08D57]/20 animate-ping pointer-events-none" />
                    )}

                    {/* Pin Node Capsule (Compact on Mobile to Prevent Overlap) */}
                    <div
                      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-full border transition-all duration-300 ${
                        isSelected
                          ? isOffice
                            ? "bg-[#B08D57] text-white border-white shadow-xl ring-4 ring-[#B08D57]/30 scale-105 sm:scale-110"
                            : "bg-[#1c1b1b] text-white border-[#B08D57] shadow-xl ring-4 ring-black/15 scale-105 sm:scale-110"
                          : isOffice
                          ? "bg-white text-[#B08D57] border-[#B08D57] shadow-md hover:scale-105"
                          : "bg-white text-[#1c1b1b] border-[#E8E4DC] shadow-md hover:border-[#B08D57] hover:scale-105"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs sm:text-sm">
                        {isOffice ? "apartment" : "domain"}
                      </span>
                      <span className="text-[9.5px] sm:text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                        {loc.name.split(" ")[0]}
                      </span>

                      {/* Proximity tag (hidden on small mobile to avoid clumping) */}
                      <span
                        className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full hidden sm:inline ${
                          isSelected
                            ? isOffice
                              ? "bg-white/20 text-white font-medium"
                              : "bg-[#FAF7F2] text-[#B08D57] font-bold"
                            : "bg-[#FAF7F2] text-[#72716d] font-medium"
                        }`}
                      >
                        {loc.distanceFromOrr}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Desktop-Only Floating Spotlight HUD Card (Hidden on Mobile so Map is 100% Visible) */}
              <div className="hidden lg:block absolute bottom-4 left-4 right-4 z-30">
                <div className="bg-white/95 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-[#E8E4DC] shadow-xl flex items-center justify-between gap-4">

                  {/* Left: Corridor Thumbnail + Identity */}
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-xl overflow-hidden border border-[#E8E4DC] shrink-0 relative shadow-xs">
                      <img
                        src={activeLocation.image}
                        alt={activeLocation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9.5px] uppercase font-bold tracking-widest text-[#B08D57] px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E4DC]">
                          {activeLocation.badge}
                        </span>
                        <span className="text-[#72716d] text-xs">·</span>
                        <span className="text-xs font-semibold text-[#B08D57]">{activeLocation.avgPriceSqFt}</span>
                      </div>

                      <h4
                        className="text-lg md:text-xl font-normal text-[#1c1b1b]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {activeLocation.name}
                      </h4>

                      <p className="text-xs text-[#72716d] line-clamp-1">{activeLocation.area}</p>
                    </div>
                  </div>

                  {/* Middle: Transit Highlights */}
                  <div className="flex items-center gap-2">
                    {activeLocation.driveTimes.slice(0, 2).map((item) => (
                      <span
                        key={item.label}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-[11px] text-[#474741] flex items-center gap-1.5"
                      >
                        <span className="size-1.5 rounded-full bg-[#B08D57]" />
                        <span className="font-semibold text-[#1c1b1b]">{item.duration}</span>
                        <span className="text-[#72716d]">to {item.label}</span>
                      </span>
                    ))}
                  </div>

                  {/* Right: Google & Apple Maps Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={activeLocation.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#1c1b1b] hover:bg-[#B08D57] text-white text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">map</span>
                      <span>Google Maps</span>
                    </a>

                    <a
                      href={activeLocation.appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#1c1b1b] border border-[#E8E4DC] hover:border-[#B08D57] text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm text-[#B08D57]">navigation</span>
                      <span>Apple Maps</span>
                    </a>
                  </div>

                </div>
              </div>

            </div>

            {/* Mobile-Only Active Corridor Card: Sits directly below the map so the canvas is 100% visible! */}
            <div className="lg:hidden p-3 sm:p-4 bg-white border-t border-[#E8E4DC]">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E4DC] flex flex-col gap-2.5">
                {/* Corridor Identity */}
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg overflow-hidden border border-[#E8E4DC] shrink-0">
                    <img
                      src={activeLocation.image}
                      alt={activeLocation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[8.5px] uppercase font-bold tracking-widest text-[#B08D57] px-2 py-0.5 rounded-full bg-white border border-[#E8E4DC]">
                        {activeLocation.badge}
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#B08D57]">{activeLocation.avgPriceSqFt}</span>
                    </div>
                    <h4
                      className="text-sm font-medium text-[#1c1b1b] truncate"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {activeLocation.name}
                    </h4>
                    <p className="text-[10px] text-[#72716d] truncate">{activeLocation.area}</p>
                  </div>
                </div>

                {/* Mobile Directions Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={activeLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center justify-center px-3 py-2 rounded-lg bg-[#1c1b1b] hover:bg-[#B08D57] text-white text-[10px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">map</span>
                    <span>Google Maps</span>
                  </a>
                  <a
                    href={activeLocation.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center justify-center px-3 py-2 rounded-lg bg-white hover:bg-[#FAF7F2] text-[#1c1b1b] border border-[#E8E4DC] text-[10px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
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
        {/* 2. REGIONAL PORTFOLIO — INTERACTIVE ARCHITECTURAL DOSSIER STAGE    */}
        {/* (Bespoke Master-Detail Ledger replacing standard card boxes)      */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 reveal-item">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E4DC] pb-5">
            <div>
              <span className="text-[#B08D57] font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
                Regional Portfolio Ledger
              </span>
              <h3
                className="text-2xl md:text-4xl font-normal text-[#1c1b1b]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Curated Hyderabad Enclaves
              </h3>
            </div>
            <p className="text-xs text-[#72716d] max-w-md font-light leading-relaxed">
              Explore masterplan positioning, proximity indices, and statutory compliance across Western Hyderabad&apos;s 7 active nodes.
            </p>
          </div>

          {/* Master-Detail Architectural Stage: Detailed Card on Top, Flat Cards Below on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

            {/* DETAILED CARD (TOP ON MOBILE, RIGHT ON DESKTOP - 7 cols): Grand Panoramic Architectural Stage */}
            <div
              id="detailed-dossier-stage"
              className="order-1 lg:order-2 lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-[#E8E4DC] shadow-xl overflow-hidden flex flex-col justify-between h-full scroll-mt-24"
            >
              <div className="flex flex-col">
                {/* Widescreen Photography Visual Header */}
                <div className="relative h-52 sm:h-56 md:h-64 w-full overflow-hidden bg-[#1c1b1b]">
                  <img
                    src={activeLocation.image}
                    alt={activeLocation.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  {/* Floating Badges on Hero Visual */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2">
                    <span className="text-[9px] sm:text-[9.5px] uppercase font-bold tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-white/95 text-[#1c1b1b] shadow-md backdrop-blur-md">
                      {activeLocation.badge}
                    </span>

                    <span className="text-[10px] sm:text-[10.5px] font-semibold text-white px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                      ORR Access: {activeLocation.distanceFromOrr}
                    </span>
                  </div>

                  {/* Bottom Title on Hero Visual */}
                  <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 right-4 sm:right-5 text-white">
                    <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B08D57] block mb-0.5">
                      Enclave Dossier {activeLocation.index} · Active Selection
                    </span>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-normal leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {activeLocation.name}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-6 md:p-7 flex flex-col gap-4 sm:gap-5">
                  <div>
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57] block mb-1">
                      Masterplan Positioning
                    </span>
                    <p className="text-xs sm:text-sm md:text-base text-[#474741] font-light leading-relaxed">
                      {activeLocation.positioning}
                    </p>
                  </div>

                  {/* Transit Milestones Timeline */}
                  <div className="pt-3 border-t border-[#E8E4DC]">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#72716d] block mb-2 sm:mb-2.5">
                      Key Transit &amp; Hub Connectivity
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      {activeLocation.driveTimes.map((item) => (
                        <div
                          key={item.label}
                          className="p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E4DC] flex flex-col gap-0.5"
                        >
                          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#72716d]">
                            {item.label}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-[#B08D57]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {item.duration}
                          </span>
                          <span className="text-[9.5px] sm:text-[10px] text-[#72716d]">{item.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-3 sm:p-4 md:px-7 bg-[#FAF7F2] border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-3 mt-auto">
                <button
                  type="button"
                  onClick={scrollToMap}
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#B08D57] hover:text-[#967645] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm sm:text-base">my_location</span>
                  <span>Spotlight On Radar Map</span>
                </button>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <a
                    href={activeLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial text-center justify-center px-3.5 sm:px-4 py-2 rounded-xl bg-[#1c1b1b] hover:bg-[#B08D57] text-white text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span>Google Maps</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>

                  <a
                    href={activeLocation.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial text-center justify-center px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1c1b1b] border border-[#E8E4DC] hover:border-[#B08D57] text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>Apple Maps</span>
                    <span className="material-symbols-outlined text-xs text-[#72716d]">open_in_new</span>
                  </a>
                </div>
              </div>

            </div>

            {/* FLAT CARDS (BOTTOM ON MOBILE, LEFT ON DESKTOP - 5 cols): Interactive Enclave Directory Ledger */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between gap-2 sm:gap-2.5 h-full">
              <div className="lg:hidden text-center pb-1">
                <span className="text-[10.5px] font-semibold text-[#72716d] uppercase tracking-wider">
                  Tap Any Corridor Below to Inspect Dossier Above:
                </span>
              </div>
              {locationList.map((loc) => {
                const isSelected = loc.id === activeLocationId;

                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      setActiveLocationId(loc.id);
                      if (window.innerWidth < 1024) {
                        const el = document.getElementById("detailed-dossier-stage");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }
                    }}
                    className={`flex-1 min-h-[62px] sm:min-h-[72px] p-3 sm:p-3.5 md:px-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 sm:gap-4 relative overflow-hidden ${
                      isSelected
                        ? "bg-white border-[#B08D57] shadow-md ring-1 ring-[#B08D57]/20"
                        : "bg-white/70 hover:bg-white border-[#E8E4DC] hover:border-[#B08D57]/60 shadow-xs"
                    }`}
                  >
                    {/* Active Left Gold Accent Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#B08D57]" />
                    )}

                    <div className="flex items-center gap-3 sm:gap-3.5 pl-1">
                      <span
                        className={`text-xs font-semibold tracking-wider ${
                          isSelected ? "text-[#B08D57]" : "text-[#72716d]"
                        }`}
                        style={{ fontFamily: "'Cormorant Garant', serif" }}
                      >
                        {loc.index}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm md:text-base font-normal transition-colors ${
                              isSelected ? "text-[#1c1b1b] font-medium" : "text-[#474741]"
                            }`}
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {loc.name}
                          </h4>
                        </div>
                        <span className="text-[10.5px] sm:text-[11px] text-[#72716d] block">{loc.area.split(",")[0]}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-[#B08D57] block">
                        {loc.avgPriceSqFt}
                      </span>
                      <span className="text-[9.5px] sm:text-[10px] text-[#72716d] uppercase tracking-wider block">
                        {loc.distanceFromOrr}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
