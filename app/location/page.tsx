"use client";

import { useState } from "react";
import locationsData from "@/data/locations.json";

interface LocationItem {
  id: string;
  name: string;
  badge: string;
  type: "office" | "residence";
  area: string;
  pincode: string;
  positioning: string;
  avgPriceSqFt: string;
  driveTimes: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
  coordinates: { top: string; left: string };
}

export default function LocationPage() {
  const [activeLocationId, setActiveLocationId] = useState<string>("kokapet-office");

  // Comprehensive location registry bound from locationsData
  const locationList: LocationItem[] = [
    {
      id: "kokapet-office",
      name: "Kokapet Advisory Office",
      badge: "Flagship Site Office",
      type: "office",
      area: "The Luxe Tower, Neopolis Corridor, Kokapet",
      pincode: "500075",
      positioning: "Dedicated private client advisory office, experiential gallery & on-site masterplan showroom",
      avgPriceSqFt: "₹12,800/sq.ft (Corridor Benchmark)",
      driveTimes: ["Immediate ORR Exit 1", "5 min to Financial District", "25 min to Airport"],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "The Luxe Tower, Neopolis Corridor, Kokapet, Hyderabad, Telangana 500075"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "The Luxe Tower, Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      coordinates: { top: "54%", left: "42%" },
    },
    {
      id: "kokapet-residences",
      name: "Kokapet (Neopolis Corridor)",
      badge: "Flagship Residential",
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
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Neopolis Corridor, Kokapet, Hyderabad 500075"
      )}`,
      coordinates: { top: "50%", left: "38%" },
    },
    {
      id: "financial-district",
      name: "Financial District (Nanakramguda)",
      badge: "Corporate & Tech Core",
      type: "residence",
      area: "Nanakramguda, Financial District",
      pincode: "500032",
      positioning: "Corporate institutional zone with walk-to-work culture beside global campuses",
      avgPriceSqFt: "₹13,200/sq.ft",
      driveTimes: ["2 min to Nanakramguda Circle", "3 min to Continental Hospitals", "8 min to ORR"],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Financial District, Nanakramguda, Hyderabad 500032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Financial District, Nanakramguda, Hyderabad 500032"
      )}`,
      coordinates: { top: "42%", left: "55%" },
    },
    {
      id: "gachibowli",
      name: "Gachibowli",
      badge: "Commercial Tech Hub",
      type: "residence",
      area: "Gachibowli IT Corridor",
      pincode: "500032",
      positioning: "Direct proximity to Microsoft, Amazon, DLF Cyber City, and premier sports stadiums",
      avgPriceSqFt: "₹12,500/sq.ft",
      driveTimes: ["5 min to Financial District", "7 min to AIG Hospitals", "10 min to HITEC City"],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Gachibowli, Hyderabad 500032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Gachibowli, Hyderabad 500032"
      )}`,
      coordinates: { top: "36%", left: "62%" },
    },
    {
      id: "banjara-hills",
      name: "Banjara Hills",
      badge: "Heritage Prestige",
      type: "residence",
      area: "Road No. 12, Banjara Hills",
      pincode: "500034",
      positioning: "Timeless heritage benchmark of high-net-worth living in leafy central Hyderabad",
      avgPriceSqFt: "₹16,500/sq.ft",
      driveTimes: ["5 min to Luxury High-Street", "15 min to Financial District", "20 min to Airport via PVNR"],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Banjara Hills, Hyderabad 500034"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Banjara Hills, Hyderabad 500034"
      )}`,
      coordinates: { top: "38%", left: "76%" },
    },
    {
      id: "jubilee-hills",
      name: "Jubilee Hills",
      badge: "Elite Enclave",
      type: "residence",
      area: "Road No. 36 & Durgam Cheruvu Enclave",
      pincode: "500033",
      positioning: "Elevated topography with panoramic vistas of the lake and high-street lifestyle",
      avgPriceSqFt: "₹18,000/sq.ft",
      driveTimes: ["5 min to Apollo Health City", "8 min to Durgam Cheruvu Cable Bridge", "12 min to HITEC City"],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Jubilee Hills, Hyderabad 500033"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Jubilee Hills, Hyderabad 500033"
      )}`,
      coordinates: { top: "28%", left: "70%" },
    },
    {
      id: "tellapur",
      name: "Tellapur",
      badge: "Green Residential Buffer",
      type: "residence",
      area: "Tellapur Master Plan Zone",
      pincode: "502032",
      positioning: "Tranquil master-planned residential corridor with expansive green lung spaces",
      avgPriceSqFt: "₹10,500/sq.ft",
      driveTimes: ["8 min to Kokapet Neopolis", "12 min to Financial District", "10 min to ORR Exit 2"],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Tellapur, Hyderabad 502032"
      )}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(
        "Tellapur, Hyderabad 502032"
      )}`,
      coordinates: { top: "58%", left: "24%" },
    },
  ];

  const activeLocation =
    locationList.find((loc) => loc.id === activeLocationId) || locationList[0];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-luxury-pattern-subtle overflow-x-hidden pt-[90px] md:pt-[105px]">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-8 pb-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E8E4DC] text-[#B08D57] text-[10px] tracking-[0.25em] uppercase font-semibold">
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
            Explore our residential developments and central advisory office across Western Hyderabad&apos;s most sought-after addresses.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-24 flex flex-col gap-10">

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 1. FULL INTERACTIVE MAP CANVAS                                    */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden border border-[#E8E4DC] shadow-xl bg-white">
          {/* Stylized Muted Hyderabad Map Canvas */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE')",
              filter: "brightness(0.92) contrast(1.05)",
            }}
          />

          {/* Luxury dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none" />

          {/* Map Top Bar: Legend & Status */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-[#E8E4DC] shadow-md flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#B08D57] animate-pulse" />
              <span className="text-xs font-semibold text-[#1c1b1b] tracking-wide">
                Western Hyderabad Corridors
              </span>
              <span className="text-[11px] text-[#72716d] hidden sm:inline">
                ({locationList.length} Active Nodes)
              </span>
            </div>

            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E8E4DC] shadow-md flex items-center gap-3 text-xs text-[#72716d]">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#B08D57]" />
                <span>Site Office</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#1c1b1b]" />
                <span>Residences</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Pins */}
          {locationList.map((loc) => {
            const isSelected = loc.id === activeLocationId;
            const isOffice = loc.type === "office";

            return (
              <div
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group z-20"
                style={{ top: loc.coordinates.top, left: loc.coordinates.left }}
              >
                {/* Pin Badge with Icon */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border transition-all duration-300 ${
                    isSelected
                      ? isOffice
                        ? "bg-[#B08D57] text-white border-white ring-4 ring-[#B08D57]/40 scale-110"
                        : "bg-[#1c1b1b] text-white border-[#B08D57] ring-4 ring-black/30 scale-110"
                      : isOffice
                      ? "bg-white text-[#B08D57] border-[#B08D57] hover:scale-105"
                      : "bg-white/95 text-[#1c1b1b] border-[#E8E4DC] hover:scale-105"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isOffice ? "apartment" : "location_city"}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
                    {loc.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom Overlay Card for Selected Location */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <div className="pointer-events-auto bg-white/97 backdrop-blur-md p-4 md:p-5 rounded-xl border border-[#E8E4DC] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`size-10 rounded-lg flex items-center justify-center text-white shrink-0 ${
                    activeLocation.type === "office" ? "bg-[#B08D57]" : "bg-[#1c1b1b]"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {activeLocation.type === "office" ? "apartment" : "domain"}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#B08D57]">
                      {activeLocation.badge}
                    </span>
                    <span className="text-[#72716d] text-xs">·</span>
                    <span className="text-xs text-[#72716d]">{activeLocation.avgPriceSqFt}</span>
                  </div>
                  <h4
                    className="text-lg font-medium text-[#1c1b1b] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {activeLocation.name}
                  </h4>
                  <p className="text-xs text-[#72716d] mt-0.5">{activeLocation.area}</p>
                </div>
              </div>

              {/* Deep Link Map Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={activeLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#1c1b1b] hover:bg-[#B08D57] text-white text-[10.5px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  <span>Google Maps</span>
                </a>
                <a
                  href={activeLocation.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#FAF7F2] hover:bg-white text-[#1c1b1b] border border-[#E8E4DC] hover:border-[#B08D57] text-[10.5px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm text-[#72716d]">navigation</span>
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 2. LOCATION CARDS GRID                                            */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
            <div>
              <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block">
                Regional Portfolio
              </span>
              <h3
                className="text-xl md:text-2xl font-normal text-[#1c1b1b]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                All Corridors &amp; Facilities
              </h3>
            </div>
            <span className="text-xs text-[#72716d]">
              Click any corridor to spotlight on map
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationList.map((loc) => {
              const isSelected = loc.id === activeLocationId;
              const isOffice = loc.type === "office";

              return (
                <div
                  key={loc.id}
                  onClick={() => setActiveLocationId(loc.id)}
                  className={`bg-white p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm ${
                    isSelected
                      ? "border-[#B08D57] ring-2 ring-[#B08D57]/20 shadow-md scale-[1.01]"
                      : "border-[#E8E4DC] hover:border-[#B08D57]/70 hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Top Row: Badge & Type */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[9.5px] uppercase font-bold tracking-widest px-2.5 py-1 rounded ${
                          isOffice
                            ? "bg-[#B08D57]/15 text-[#B08D57] border border-[#B08D57]/30"
                            : "bg-[#FAF7F2] text-[#1c1b1b] border border-[#E8E4DC]"
                        }`}
                      >
                        {loc.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-[#B08D57]">
                        {loc.avgPriceSqFt}
                      </span>
                    </div>

                    {/* Corridor Name */}
                    <h4
                      className="text-lg font-normal text-[#1c1b1b] group-hover:text-[#B08D57] transition-colors mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {loc.name}
                    </h4>

                    {/* Address / Area */}
                    <p className="text-xs text-[#72716d] mb-3">
                      {loc.area} · PIN {loc.pincode}
                    </p>

                    {/* Positioning Line */}
                    <p className="text-xs text-[#474741] font-light leading-relaxed mb-4">
                      {loc.positioning}
                    </p>

                    {/* Connectivity Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {loc.driveTimes.map((drive) => (
                        <span
                          key={drive}
                          className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E8E4DC] text-[10px] text-[#72716d] flex items-center gap-1"
                        >
                          <span className="size-1 rounded-full bg-[#B08D57]" />
                          {drive}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row: Google & Apple Maps */}
                  <div className="pt-3 border-t border-[#E8E4DC]/70 flex items-center justify-between gap-2">
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] tracking-wider uppercase font-semibold text-[#1c1b1b] hover:text-[#B08D57] transition-colors flex items-center gap-1"
                    >
                      <span>Google Maps</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>

                    <a
                      href={loc.appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] tracking-wider uppercase font-semibold text-[#72716d] hover:text-[#B08D57] transition-colors flex items-center gap-1"
                    >
                      <span>Apple Maps</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
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
