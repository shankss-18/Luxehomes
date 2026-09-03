"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export interface CompanyMilestone {
  id: string;
  year: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  stat: string;
  statLabel: string;
  img: string;
}

const milestones: CompanyMilestone[] = [
  {
    id: "genesis",
    year: "1998",
    badge: "THE GENESIS",
    title: "Foundations of Silence",
    headline: "Architecting sanctuaries that whisper, rather than shout.",
    description:
      "LuxeHomes was founded on a singular architectural premise: that true luxury lies in restraint, generous volume, and uncompromised craftsmanship. Our earliest estates set a new benchmark for private luxury in India.",
    stat: "25+ Years",
    statLabel: "Of Unwavering Legacy",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrBdPj9oxtI9eBHXHVpAcaTAr33Y36nn5EGz4-TulcAC7JtGbmaCIu5Opkv4vHLqGPYBNJjRueiqJQmTd_wGTreZGlm9dpGxpNfLbAFrxRZpCc0MzW-TJwpKraMHYgTrCr20RoSRAvOIEwKU-b1tgBkdMbeRUzLbrrSWdmqU0USymV9RMm2CzQtZFa0GVS7d9-CDmi2p1dmQekILGVn6WrdjCkT13uIlOMMqahvRlY3QOezDei7LN8",
  },
  {
    id: "materials",
    year: "PROVENANCE",
    badge: "MATERIAL INTEGRITY",
    title: "Direct Tuscan Quarrying",
    headline: "Hand-selected Statuario marble & bespoke Milanese brass.",
    description:
      "Every block of natural stone is personally cataloged from the Carrara mountains in Italy. We avoid artificial composites in favor of monolithic masonry that patinas with dignity across generations.",
    stat: "100%",
    statLabel: "Hand-Selected Natural Stone",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuDd8t1guXUoAtzqFeiDaYSAy7e-dt18VV0BmW2S1XSFCKoL5JFauHruyRrTnhPvaqXVrhBcYJC8E4m-d2G52zg3cJywZr9rCxh5N8Nbx4CfT1zH3K1_rqpzHyOqwEQYa8QVQYNKg2d7dppm2n8KS_Ws-NNhgnwMv-cPeZbrWgMdMz65D69mqsjt4HeN9P7yi5bWG0YrBtBsSNS5qgsma4yuEeSlMRHXkm-oOyy3gjAof_oz0-s0Dm",
  },
  {
    id: "architecture",
    year: "DESIGN",
    badge: "VISIONARY PARTNERS",
    title: "Pritzker-Caliber Form",
    headline: "Harnessing natural celestial light and double-height volumes.",
    description:
      "Collaborating with master architectural ateliers across Tokyo, London, and Zurich, our floorplans are engineered around the sun's trajectory to create naturally illuminated, serene microclimates.",
    stat: "4.5m+",
    statLabel: "Ceiling Clearances",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE3btmwXJCCJ5Np8T2hWKIR5wt9r5x2-bV44zlsz_iNK0imWXWm_WCQt--8wY-_kz66Zc29l2c-DhR4udkQVpbmFrNloAJ5Tfc2B8ZtN8PGrc4JMwBN-oyArlprpbQxYq8DQ1CdDzyhPWhjg3-7vOK5oe6SVzIxQlzubpyfyzbFeey77F9qjGD36mrgSX-thK4kRkQqXkIsNLS2niS7iKYFyHO0mvjolTKwktXHbX-OVUww3jJLiyG",
  },
  {
    id: "trust",
    year: "GOVERNANCE",
    badge: "STATUTORY EXCELLENCE",
    title: "Uncompromising Integrity",
    headline: "100% RERA compliance, verified escrow, and legal clarity.",
    description:
      "A relationship built on transparency. All projects operate under strict independent escrow management, clear titled deeds, and zero encumbrances, ensuring family wealth is preserved securely.",
    stat: "₹14,000 Cr",
    statLabel: "Completed Valuations",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNzgTgh3sK8EkgakowYkAu3yfDOnipaK3E5wEY-6nFKjStqmIBSeVrOxnnzbFu5fXH8ZJe8uJj3wHVUGzNv-chFEoP_41A86JkVSdvSNiE5zg_VcUAZUmLO-42Tbwh7YsPgrWjmCBPrvoRbviCG5AlyD6QZNoTtokyoOmNhf28UZrOTLcUwV3BvqOrBbfgPa5Kyd1DcI6Z3-FJKalk6tgNmdQdGPBCUNsWc5ASJMJiyiqU8SzYcFNK",
  },
  {
    id: "concierge",
    year: "LIFESTYLE",
    badge: "WHITE-GLOVE SERVICE",
    title: "The Private Ecosystem",
    headline: "Discreet concierge, private vaults, and curated hospitality.",
    description:
      "Living at LuxeHomes means unconstrained access to private aviation bookings, rare vintage wine storage, on-demand executive security, and global reciprocal privileges at premier private member clubs.",
    stat: "24/7",
    statLabel: "Private Concierge Advisory",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJH8I5HZfJVZXcLhGI0CFj95mj-GN1RU8TktNDZMDayfhOLONkwFSz_MUz3Ns65fXmNIe3Z2SzqtDhjV8q9UMNllKGM-LKM9ACDCVvLJyGTIJzigmObewFGrBDxqU2zjFyPA3bAnr5U6o_A14VHyP6juN19VWMwyGXly-tGWEH6fYk9nS3x1J8l1GZqW2EzvsSIe6-_7ct7GpMR5UHzEVXCl-cG_zoABtTl6eK8HrRWtNV6EcaY87B",
  },
  {
    id: "sustainability",
    year: "SUSTAINABILITY",
    badge: "NET-ZERO HERITAGE",
    title: "Built For Generations",
    headline: "IGBC Platinum insulation, rainwater aquifers, and clean energy.",
    description:
      "Our residences combine biophilic sky gardens with intelligent geothermal ventilation. Designed to age with grace, minimizing carbon footprint while maximizing thermal tranquility.",
    stat: "Platinum",
    statLabel: "IGBC Green Certification",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlS2pwlnISchTzcPFkSjN1fQAGK-i6fm9oNP1HyXmEmRqldU3p8o63mx7XqSOWvYZKLk612KBtm_NDDgHFKeJLd6jXNDU5ZUzDU70PKPBpv5G0a4cAO1WY5gCV5qX-DKAIJBpGebCS6WqwSyU7k4rPo0Qd8vWyS_4plQLDjnevnshvpiZyYhC8dPABNq3_s3f2DCoh_7s0r4O3z5-vCGtDJ5ci3_gXfoF3icKc1LJWVRpSbabwOHdg",
  },
];

export default function CompanyStoryScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStory, setSelectedStory] = useState<CompanyMilestone | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to a specific card smoothly
  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".company-story-card");
    if (cards[index]) {
      const card = cards[index];
      const leftOffset = card.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({
        left: leftOffset,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % milestones.length;
    scrollToCard(nextIndex);
  }, [currentIndex, scrollToCard]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + milestones.length) % milestones.length;
    scrollToCard(prevIndex);
  }, [currentIndex, scrollToCard]);

  // Automated scrolling timer: triggers every 4 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Sync index on manual scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll<HTMLElement>(".company-story-card");
    cards.forEach((card, idx) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      if (Math.abs(scrollLeft - cardLeft) < card.offsetWidth / 2) {
        setCurrentIndex(idx);
      }
    });
  };

  return (
    <section
      className="relative w-full py-20 overflow-hidden border-y border-[#E8E4DC] bg-luxury-pattern"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Subtle Gradient Scrim ───────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/80 to-[#FAF7F2]/95 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block size-2 rounded-full bg-[#B08D57] animate-pulse" />
              <span className="text-[#B08D57] font-semibold text-xs tracking-[0.22em] uppercase">
                The LuxeHomes Chronicle
              </span>
            </div>
            <h2
              className="text-[#1c1b1b] text-3xl md:text-5xl font-normal leading-[1.15] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Architects of Quiet Luxury
            </h2>
            <p className="text-[#72716d] text-sm md:text-base mt-3 leading-relaxed">
              Explore the heritage, materials, and unwavering integrity behind India&apos;s most coveted private estates.
            </p>
          </div>

          {/* ── Automated Scroll Status & Controls ───────────────────────── */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Auto-scroll toggle badge */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8E4DC] bg-white/80 backdrop-blur-sm text-xs text-[#72716d] hover:text-[#1c1b1b] transition-colors shadow-sm"
              title={isPaused ? "Click to resume automatic scrolling" : "Click to pause automatic scrolling"}
            >
              <span className={`inline-block size-2 rounded-full ${isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
              <span className="tracking-wider uppercase text-[11px] font-medium">
                {isPaused ? "Paused" : "Auto-Pacing"}
              </span>
              <span className="material-symbols-outlined text-sm">
                {isPaused ? "play_arrow" : "pause"}
              </span>
            </button>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous company story"
                className="size-11 rounded-full border border-[#E8E4DC] bg-white hover:bg-[#B08D57] hover:border-[#B08D57] hover:text-white text-[#1c1b1b] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next company story"
                className="size-11 rounded-full border border-[#E8E4DC] bg-white hover:bg-[#B08D57] hover:border-[#B08D57] hover:text-white text-[#1c1b1b] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Progress Bar Line ─────────────────────────────────────────── */}
        <div className="w-full h-1 bg-[#E8E4DC]/60 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-[#B08D57] transition-all duration-500 ease-out"
            style={{
              width: `${((currentIndex + 1) / milestones.length) * 100}%`,
            }}
          />
        </div>

        {/* ── Horizontal Scroll Track Container ────────────────────────── */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {milestones.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedStory(item)}
                className={`company-story-card flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] snap-start rounded-2xl overflow-hidden border transition-all duration-500 group bg-white/90 backdrop-blur-md cursor-pointer ${
                  isActive
                    ? "border-[#B08D57] shadow-xl ring-1 ring-[#B08D57]/30"
                    : "border-[#E8E4DC] hover:border-[#B08D57]/70 shadow-md hover:shadow-lg"
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Year / Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-wider text-[#1c1b1b] uppercase shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  {/* Stat Overlay at Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                    <div>
                      <p className="text-xs text-white/80 font-light tracking-wide">
                        {item.statLabel}
                      </p>
                      <p
                        className="text-2xl md:text-3xl font-normal text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.stat}
                      </p>
                    </div>
                    <span className="size-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#B08D57] transition-colors">
                      <span className="material-symbols-outlined text-sm text-white">
                        arrow_outward
                      </span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-7 flex flex-col justify-between">
                  <div>
                    <span className="text-[#B08D57] text-[11px] font-semibold tracking-[0.2em] uppercase block mb-1">
                      Chapter {idx + 1} of {milestones.length}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-normal text-[#1c1b1b] mb-2 leading-snug group-hover:text-[#B08D57] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#1c1b1b] tracking-wide mb-2 italic">
                      &ldquo;{item.headline}&rdquo;
                    </p>
                    <p className="text-sm text-[#72716d] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8E4DC]/60 flex items-center justify-between">
                    <span className="text-xs text-[#B08D57] font-semibold tracking-widest uppercase group-hover:underline">
                      Read Full Chapter
                    </span>
                    <span className="text-xs text-[#72716d]">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Slide Navigation Indicators ──────────────────────────────── */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {milestones.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-8 h-2 bg-[#B08D57]"
                  : "w-2 h-2 bg-[#E8E4DC] hover:bg-[#B08D57]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Full Story Lightbox Modal ─────────────────────────────────── */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in-scale"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E4DC] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedStory.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 size-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <span className="px-3 py-1 bg-[#B08D57] text-white rounded text-xs tracking-widest uppercase font-semibold">
                  {selectedStory.badge}
                </span>
                <h3
                  className="text-2xl md:text-3xl font-normal mt-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selectedStory.title}
                </h3>
              </div>
            </div>

            <div className="p-8">
              <p className="text-base font-medium text-[#1c1b1b] mb-4 italic leading-relaxed">
                &ldquo;{selectedStory.headline}&rdquo;
              </p>
              <p className="text-sm text-[#72716d] leading-relaxed mb-6">
                {selectedStory.description}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E4DC] mb-6">
                <div>
                  <p className="text-xs text-[#72716d] uppercase tracking-wider">Metric</p>
                  <p
                    className="text-xl font-normal text-[#1c1b1b] mt-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {selectedStory.stat}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#72716d] uppercase tracking-wider">Benchmark</p>
                  <p className="text-xs font-semibold text-[#B08D57] mt-1">
                    {selectedStory.statLabel}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/about"
                  onClick={() => setSelectedStory(null)}
                  className="flex-1 bg-[#B08D57] hover:bg-[#967645] text-white text-xs tracking-[0.2em] font-semibold py-3.5 rounded-lg uppercase transition-colors text-center"
                >
                  Explore Heritage &amp; Trust
                </Link>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="border border-[#1c1b1b] text-[#1c1b1b] text-xs tracking-[0.2em] font-semibold py-3.5 px-6 rounded-lg uppercase hover:bg-[#1c1b1b] hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
