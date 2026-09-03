"use client";

import Link from "next/link";

interface GalleryMarqueeItem {
  tag: string;
  title: string;
  detail: string;
  action: string;
  highlight?: boolean;
}

export default function HomeGalleryMarquee() {
  const marqueeItems: GalleryMarqueeItem[] = [
    {
      tag: "FLAGSHIP RESIDENCE",
      title: "3 BHK Luxury Suites",
      detail: "Carpet: 1,580 sq.ft · From ₹2.40 Cr",
      action: "Inspect 3D Cutaway",
      highlight: true,
    },
    {
      tag: "NEOPOLIS CORRIDOR",
      title: "4 BHK Sky Mansions",
      detail: "Carpet: 2,450 sq.ft · Tower B Penthouse",
      action: "View Masterplan",
    },
    {
      tag: "BESPOKE LIVING",
      title: "2 BHK Luxury Residences",
      detail: "Carpet: 1,180 sq.ft · East Facing",
      action: "Explore Layouts",
    },
    {
      tag: "ESTATE PLOTS",
      title: "Freehold Villa Parcels",
      detail: "500–1,200 Sq.Yds · 100% Vastu",
      action: "View Gallery",
      highlight: true,
    },
    {
      tag: "INTERACTIVE 3D",
      title: "Real-Time 360° Floorplan Orbit",
      detail: "Architectural Cutaways & Day/Night Mode",
      action: "Launch 3D Viewer",
    },
    {
      tag: "HMDA SANCTIONED",
      title: "Verified Governance Portfolio",
      detail: "6-Acre Flagship Masterplan Hub",
      action: "Browse Portfolio",
    },
  ];

  // Repeat 3 times for seamless infinite right-to-left loop
  const seamlessMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative w-full bg-[#FAF7F2] border-y border-[#E8E4DC] py-4 overflow-hidden select-none">
      {/* Subtle top indicator bar */}
      <div className="max-w-[1240px] mx-auto px-6 mb-2 flex items-center justify-between text-[10px] tracking-[0.22em] uppercase font-semibold text-[#72716d]">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="text-[#1c1b1b]">AVAILABLE RESIDENCES &amp; 3D MASTERPLANS</span>
        </div>
        <Link
          href="/gallery"
          className="text-[#B08D57] hover:underline flex items-center gap-1 transition-colors"
        >
          <span>VIEW FULL GALLERY</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Soft Lateral Gradient Edge Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        {/* Continuous Gliding Track */}
        <div
          className="flex items-center gap-4 w-max group-hover:[animation-play-state:paused]"
          style={{
            animation: "marqueeGlide 28s linear infinite",
            willChange: "transform",
          }}
        >
          {seamlessMarquee.map((item, idx) => (
            <Link
              key={`${item.title}-${idx}`}
              href="/gallery"
              className="inline-flex items-center gap-4 px-4 py-2.5 rounded-xl bg-white border border-[#E8E4DC] hover:border-[#B08D57] hover:shadow-md transition-all duration-300 cursor-pointer shrink-0 group/card"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-[8.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    item.highlight
                      ? "bg-[#B08D57] text-white"
                      : "bg-[#FAF7F2] text-[#B08D57] border border-[#E8E4DC]"
                  }`}
                >
                  {item.tag}
                </span>

                <span
                  className="text-sm font-normal text-[#1c1b1b] group-hover/card:text-[#B08D57] transition-colors whitespace-nowrap"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </span>
              </div>

              <span className="text-xs text-[#72716d] whitespace-nowrap">
                {item.detail}
              </span>

              <div className="flex items-center gap-0.5 text-[10.5px] font-semibold text-[#B08D57] uppercase tracking-wider pl-2 border-l border-[#E8E4DC] group-hover/card:translate-x-0.5 transition-transform">
                <span>{item.action}</span>
                <span className="material-symbols-outlined text-xs">arrow_outward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
