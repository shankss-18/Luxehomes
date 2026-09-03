"use client";

import Link from "next/link";

interface GalleryMarqueeItem {
  id: string;
  category: string;
  title: string;
  specs: string;
  pricingOrHighlight: string;
  actionText: string;
}

export default function HomeGalleryMarquee() {
  // 8 distinct, diverse luxury residences and architectural features
  const uniqueItems: GalleryMarqueeItem[] = [
    {
      id: "botanika-3bhk",
      category: "FLAGSHIP RESIDENCE",
      title: "Botanika Greens — 3 BHK Luxury Suites",
      specs: "Carpet: 1,580 sq.ft · 100% East Vastu · Tower A",
      pricingOrHighlight: "From ₹2.40 Cr",
      actionText: "Inspect 3D Cutaway",
    },
    {
      id: "neopolis-4bhk",
      category: "PENTHOUSE COLLECTION",
      title: "One Neopolis — 4 BHK Sky Mansions",
      specs: "Carpet: 2,450 sq.ft · 30-Foot Panoramic Deck",
      pricingOrHighlight: "From ₹3.75 Cr",
      actionText: "View Masterplan",
    },
    {
      id: "cyber-vista-2bhk",
      category: "BESPOKE LIVING",
      title: "Cyber Vista — 2 BHK Luxury Residences",
      specs: "Carpet: 1,180 sq.ft · Italian Marble · Tower 1",
      pricingOrHighlight: "From ₹1.65 Cr",
      actionText: "Explore Floorplans",
    },
    {
      id: "grand-estates",
      category: "ESTATE PARCELS",
      title: "The Grand Estates — Freehold Villa Plots",
      specs: "500 to 1,200 Sq.Yds · 100% Clear Title",
      pricingOrHighlight: "Custom Sanctions",
      actionText: "Explore Plots",
    },
    {
      id: "3d-interactive",
      category: "SPATIAL TECHNOLOGY",
      title: "Interactive 3D Architectural Cutaways",
      specs: "Procedural 360° Orbit · Day & Evening Lighting",
      pricingOrHighlight: "Real-Time WebGL",
      actionText: "Launch 3D Orbit",
    },
    {
      id: "flagship-advisory",
      category: "CENTRAL SITE DESK",
      title: "The Luxe Tower — Kokapet Advisory Center",
      specs: "Sector 1 & 2 Neopolis Corridor · Experiential Gallery",
      pricingOrHighlight: "Private Consultations",
      actionText: "Schedule Visit",
    },
    {
      id: "governance-stat",
      category: "VERIFIED GOVERNANCE",
      title: "HMDA Sanctioned · 6-Acre Development Hub",
      specs: "Direct Arterial Road Access · Institutional Grade",
      pricingOrHighlight: "15+ Years of Trust",
      actionText: "Verify Pedigree",
    },
    {
      id: "courtyard-living",
      category: "ARCHITECTURAL PHILOSOPHY",
      title: "Serene Acoustic Silence & Volume",
      specs: "Double-Height Glass Salons · Central Courtyards",
      pricingOrHighlight: "Quiet Luxury",
      actionText: "Explore Gallery",
    },
  ];

  // 2 sets are enough with 8 wide cards and generous spacing, preventing duplicate items in the viewport
  const marqueeTrack = [...uniqueItems, ...uniqueItems];

  return (
    <section className="relative w-full bg-[#FAF7F2] border-y border-[#E8E4DC] py-5 overflow-hidden select-none">
      {/* Editorial Header Cue */}
      <div className="max-w-[1240px] mx-auto px-6 mb-3 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase font-semibold text-[#72716d]">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="text-[#1c1b1b]">Available Residences &amp; 3D Masterplans</span>
        </div>
        <Link
          href="/gallery"
          className="text-[#B08D57] hover:text-[#967645] flex items-center gap-1 transition-colors"
        >
          <span>VIEW COMPLETE GALLERY</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      {/* Marquee Outer Box with Generous Vertical Padding (Guarantees top/bottom borders never get clipped) */}
      <div className="relative w-full overflow-hidden py-4 group">
        {/* Soft Lateral Gradient Edge Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-44 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-44 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        {/* Gliding Track with Generous Gap & Vertical Room */}
        <div
          className="flex items-center gap-8 md:gap-10 w-max py-2.5 group-hover:[animation-play-state:paused]"
          style={{
            animation: "marqueeGlideHalf 42s linear infinite",
            willChange: "transform",
          }}
        >
          {marqueeTrack.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href="/gallery"
              className="inline-flex items-center gap-3.5 sm:gap-5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white border-2 border-[#E8E4DC] hover:border-[#B08D57] hover:ring-1 hover:ring-[#B08D57] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer shrink-0 group/card min-w-[275px] sm:min-w-[340px] md:min-w-[420px] justify-between relative z-10 hover:z-20"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[8.5px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#FAF7F2] text-[#B08D57] border border-[#E8E4DC]">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-[#B08D57]">
                    {item.pricingOrHighlight}
                  </span>
                </div>

                <h4
                  className="text-sm md:text-[15px] font-normal text-[#1c1b1b] group-hover/card:text-[#B08D57] transition-colors leading-snug whitespace-nowrap"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h4>

                <p className="text-[11px] text-[#72716d] whitespace-nowrap">
                  {item.specs}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#B08D57] uppercase tracking-wider pl-4 border-l border-[#E8E4DC] group-hover/card:translate-x-1 transition-transform shrink-0">
                <span className="hidden sm:inline">{item.actionText}</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
