"use client";

import React, { useEffect, useRef, useState } from "react";
import propertiesData from "@/data/properties.json";

interface StatItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  speed: number; // Parallax speed multiplier
  featured?: boolean;
}

export default function ParallaxStatCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>("land-parcel");

  const stats: StatItem[] = [
    {
      id: "rera",
      label: "RERA Registered",
      value: "Status: TBD",
      sub: "HMDA Master Plan",
      speed: -0.12,
    },
    {
      id: "land-parcel",
      label: "Land Parcel",
      value: propertiesData.trustStats.acresDeveloped,
      sub: "Neopolis Corridor",
      speed: 0.14,
      featured: true,
    },
    {
      id: "presence",
      label: "Presence",
      value: propertiesData.trustStats.locationsCount,
      sub: "Kokapet · Banjara · Jubilee",
      speed: -0.16,
    },
    {
      id: "track-record",
      label: "Track Record",
      value: propertiesData.trustStats.yearsOfTrust,
      sub: "Verified Governance",
      speed: 0.1,
    },
    {
      id: "vastu",
      label: "Vastu Norms",
      value: "100% Compliant",
      sub: "Ancient Sthapatya Veda",
      speed: -0.08,
    },
    {
      id: "connectivity",
      label: "Connectivity",
      value: "3 Min to ORR",
      sub: "Multi-Lane Arterial Road",
      speed: 0.15,
    },
  ];

  // Window scroll listener for smooth parallax calculation
  useEffect(() => {
    let animFrame: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Distance of section center from viewport center
      const centerOffset = rect.top + rect.height / 2 - windowH / 2;
      setScrollY(centerOffset);
    };

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-16 md:py-24 overflow-hidden select-none bg-gradient-to-b from-white via-[#FAF7F2]/60 to-white border-y border-[#E8E4DC]"
    >
      {/* ── Background Parallax Decorative Elements ──────────────────── */}
      <div
        className="absolute -top-24 -left-24 size-96 rounded-full bg-[#B08D57]/5 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(${scrollY * -0.15}px) translateX(${mousePos.x * 20}px)`,
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 size-96 rounded-full bg-[#1c1b1b]/5 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.18}px) translateX(${mousePos.x * -20}px)`,
        }}
      />

      {/* Subtle architectural grid lines floating behind cards */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          backgroundImage:
            "linear-gradient(#1c1b1b 1px, transparent 1px), linear-gradient(to right, #1c1b1b 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col gap-14 relative z-10">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-2.5 reveal-item">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[#B08D57] text-[10px] tracking-[0.25em] uppercase font-semibold shadow-xs">
            <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span>PROVEN GOVERNANCE</span>
          </div>
          <h2
            className="text-[#1c1b1b] text-3xl md:text-5xl font-normal leading-tight"
            style={{ fontFamily: "'Cormorant Garant', 'Playfair Display', serif" }}
          >
            Institutional Standards of Excellence
          </h2>
          <p
            className="text-xs md:text-sm text-[#72716d] max-w-xl font-light leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Factual benchmarks grounded in statutory compliance, strategic landholdings, and multi-decade client satisfaction.
          </p>
        </div>

        {/* ── PARALLAX CARDS TRACK ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-4 lg:gap-3 perspective-1000">
          {stats.map((stat, idx) => {
            const isHovered = hoveredCard === stat.id;
            // Parallax vertical translation computed from scroll distance
            const parallaxY = Math.round(scrollY * stat.speed);

            return (
              <div
                key={stat.id}
                onMouseEnter={() => setHoveredCard(stat.id)}
                className={`reveal-item reveal-delay-${(idx % 5) + 1} transition-all duration-500 ease-out`}
                style={{
                  transform: `translateY(${parallaxY}px)`,
                }}
              >
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-400 flex flex-col items-center text-center cursor-pointer group backdrop-blur-sm ${
                    isHovered
                      ? "bg-white border-[#B08D57] shadow-[0_20px_45px_rgba(176,141,87,0.18)] -translate-y-2 scale-[1.03] ring-1 ring-[#B08D57]/30"
                      : "bg-white/80 hover:bg-white border-[#E8E4DC] shadow-sm hover:border-[#B08D57]/60"
                  }`}
                  style={{
                    transform: isHovered
                      ? `perspective(800px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg) translateY(-8px)`
                      : "none",
                  }}
                >
                  {/* Gold Corner Accent for Featured Card */}
                  {stat.featured && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="size-2 rounded-full bg-[#B08D57] animate-pulse block" />
                    </div>
                  )}

                  {/* Label */}
                  <span
                    className="text-[#B08D57] font-semibold text-[9.5px] tracking-[0.22em] uppercase mb-2 block"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </span>

                  {/* Value */}
                  <p
                    className="text-[#1c1b1b] font-normal text-xl md:text-2xl my-1 group-hover:text-[#B08D57] transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garant', serif" }}
                  >
                    {stat.value}
                  </p>

                  {/* Subtitle */}
                  <span
                    className="text-[#72716d] text-[10.5px] font-light mt-1 block"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.sub}
                  </span>

                  {/* Bottom Gold Indicator Bar */}
                  <div
                    className={`mt-4 h-0.5 rounded-full transition-all duration-400 ${
                      isHovered ? "w-12 bg-[#B08D57]" : "w-4 bg-[#E8E4DC] group-hover:w-8 group-hover:bg-[#B08D57]/60"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Parallax hint footer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-[#72716d] uppercase tracking-[0.2em] font-medium opacity-60">
          <span className="material-symbols-outlined text-xs text-[#B08D57]">unfold_more</span>
          <span>Dynamic multi-layer parallax depth active on scroll</span>
        </div>
      </div>
    </div>
  );
}
