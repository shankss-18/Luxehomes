"use client";

import React, { useState } from "react";
import propertiesData from "@/data/properties.json";

interface StatItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}

export default function MarqueeStatCards() {
  const [isPaused, setIsPaused] = useState(false);

  const stats: StatItem[] = [
    {
      id: "rera",
      label: "RERA Registered",
      value: "Status: TBD",
      sub: "HMDA Master Plan Approved",
    },
    {
      id: "land-parcel",
      label: "Land Parcel",
      value: propertiesData.trustStats.acresDeveloped,
      sub: "Neopolis Freehold Corridor",
      highlight: true,
    },
    {
      id: "presence",
      label: "Hyderabad Presence",
      value: propertiesData.trustStats.locationsCount,
      sub: "Kokapet · Banjara · Jubilee",
    },
    {
      id: "track-record",
      label: "Track Record",
      value: propertiesData.trustStats.yearsOfTrust,
      sub: "Verified Corporate Governance",
      highlight: true,
    },
    {
      id: "vastu",
      label: "Vastu Norms",
      value: "100% Compliant",
      sub: "Ancient Sthapatya Veda",
    },
    {
      id: "connectivity",
      label: "Strategic Transit",
      value: "3 Min to ORR",
      sub: "Direct Multi-Lane Arterial Road",
    },
    {
      id: "master-planning",
      label: "Sanctioned Grid",
      value: "HMDA Sanctioned",
      sub: "Comprehensive Infrastructure",
    },
    {
      id: "institutional",
      label: "Banking Tie-ups",
      value: "SBI · HDFC · ICICI",
      sub: "Pre-approved HNI Lending",
    },
  ];

  // Repeat items 3 times for a completely seamless, gapless infinite marquee loop
  const marqueeItems = [...stats, ...stats, ...stats];

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-y border-[#E8E4DC]">
      {/* Subtle architectural background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1c1b1b 1px, transparent 1px), linear-gradient(to right, #1c1b1b 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col gap-12 relative z-10">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 reveal-item">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[#B08D57] text-[10px] tracking-[0.28em] uppercase font-semibold shadow-xs">
            <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span>PROVEN GOVERNANCE</span>
          </div>
          <h2
            className="text-[#1c1b1b] text-3xl md:text-5xl font-normal leading-tight"
            style={{ fontFamily: "'Cormorant Garant', 'Playfair Display', serif" }}
          >
            Institutional Standards of Excellence
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-[#B08D57]/40" />
            <svg width="6" height="6" viewBox="0 0 6 6">
              <polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" />
            </svg>
            <div className="h-px w-10 bg-[#B08D57]/40" />
          </div>
          <p
            className="text-xs md:text-sm text-[#72716d] max-w-xl font-light leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Factual benchmarks grounded in statutory compliance, strategic landholdings, and multi-decade client satisfaction.
          </p>
        </div>
      </div>

      {/* ── LUXURY MARQUEE CONTAINER ─────────────────────────────────── */}
      <div
        className="relative w-full mt-10 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Edge Masks for High-End Editorial Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-[#FAF7F2] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-[#FAF7F2] to-transparent z-20 pointer-events-none" />

        {/* Scrolling Track: Right to Left */}
        <div
          className="flex items-stretch gap-6 w-max py-4 cursor-grab active:cursor-grabbing"
          style={{
            animation: "marqueeGlide 35s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`flex-shrink-0 w-[270px] md:w-[310px] p-6 md:p-7 rounded-2xl border transition-all duration-400 flex flex-col justify-between group relative shadow-xs hover:shadow-xl ${
                item.highlight
                  ? "bg-white border-[#B08D57]/60 ring-1 ring-[#B08D57]/20 hover:border-[#B08D57]"
                  : "bg-white/90 border-[#E8E4DC] hover:border-[#B08D57]/70"
              } hover:-translate-y-1.5`}
            >
              {/* Top Row: Eyebrow + Indicator */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className="text-[#B08D57] font-semibold text-[9.5px] tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                </span>
                <span
                  className={`size-2 rounded-full ${
                    item.highlight ? "bg-[#B08D57] animate-pulse" : "bg-[#E8E4DC] group-hover:bg-[#B08D57]"
                  } transition-colors duration-300`}
                />
              </div>

              {/* Main Metric Value */}
              <div className="my-2">
                <p
                  className="text-[#1c1b1b] font-normal text-2xl md:text-3xl leading-tight group-hover:text-[#B08D57] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garant', serif" }}
                >
                  {item.value}
                </p>
              </div>

              {/* Bottom: Subtitle + Gold Accent Line */}
              <div className="mt-4 pt-3 border-t border-[#E8E4DC]/60 flex flex-col gap-2">
                <span
                  className="text-[#72716d] text-xs font-light group-hover:text-[#474741] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.sub}
                </span>
                <div className="h-0.5 w-6 bg-[#E8E4DC] group-hover:w-12 group-hover:bg-[#B08D57] transition-all duration-400 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Footnote / Controls Cue */}
      <div className="flex items-center justify-center gap-2 mt-6 text-[10.5px] text-[#72716d] uppercase tracking-[0.22em] font-medium opacity-70">
        <span className="material-symbols-outlined text-xs text-[#B08D57]">motion_photos_on</span>
        <span>Continuous Live Portfolio Feed · Hover to Inspect</span>
      </div>
    </section>
  );
}
