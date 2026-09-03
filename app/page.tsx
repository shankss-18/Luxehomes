"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import propertiesData from "@/data/properties.json";
import locationsData from "@/data/locations.json";
import IsometricFloorPlanViewer, { UnitData } from "@/components/IsometricFloorPlanViewer";

export default function HomePage() {
  // ─── Modal States ──────────────────────────────────────────────────────────
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedModalUnit, setSelectedModalUnit] = useState<UnitData | null>(null);

  // ─── Form Success States ───────────────────────────────────────────────────
  const [enquireSuccess, setEnquireSuccess] = useState(false);
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  // ─── Interactive BHK Masterplan Tab ────────────────────────────────────────
  // Options: "2bhk" | "3bhk" | "4bhk" | "plots"
  const [activeTab, setActiveTab] = useState<"2bhk" | "3bhk" | "4bhk" | "plots">("3bhk");

  // Selected unit ID within the active tab
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");

  // ─── Facility Category Filter ──────────────────────────────────────────────
  const [activeFacilityCategory, setActiveFacilityCategory] = useState<"all" | "schools" | "hospitals" | "retail" | "itParks">("all");
  const [activeFacilityPin, setActiveFacilityPin] = useState<string | null>(null);

  // ─── Scroll Reveal Observer ────────────────────────────────────────────────
  const collectionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-item, .reveal-slide-left, .reveal-slide-right");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ─── Dynamic Data Filtering & Computed Summary Stats (Live from properties.json) ───
  const unitsByTab = useMemo(() => {
    const allUnits = propertiesData.units as UnitData[];
    return {
      "2bhk": allUnits.filter((u) => u.bhk === 2),
      "3bhk": allUnits.filter((u) => u.bhk === 3),
      "4bhk": allUnits.filter((u) => u.bhk === 4),
      plots: allUnits.filter((u) => u.type === "plot"),
    };
  }, []);

  const currentTabUnits = unitsByTab[activeTab];

  // Auto-select first unit when tab changes
  useEffect(() => {
    if (currentTabUnits && currentTabUnits.length > 0) {
      setSelectedUnitId(currentTabUnits[0].id);
    }
  }, [activeTab, currentTabUnits]);

  // Active unit currently being viewed in the isometric floor plan
  const activeUnit = currentTabUnits.find((u) => u.id === selectedUnitId) || currentTabUnits[0];

  // ─── Live Computed Summary Metrics ─────────────────────────────────────────
  const tabSummary = useMemo(() => {
    if (!currentTabUnits || currentTabUnits.length === 0) {
      return {
        carpetRange: "—",
        startingPrice: "Price on Request",
        unitCount: 0,
        facings: "—",
      };
    }

    const carpets = currentTabUnits.map((u) => u.carpet_area_sqft);
    const minCarpet = Math.min(...carpets);
    const maxCarpet = Math.max(...carpets);

    const prices = currentTabUnits
      .map((u) => u.total_price_inr)
      .filter((p): p is number => p !== null && p > 0);

    let startingPrice = "Price on Request / TBD";
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      startingPrice = `₹${(minPrice / 10000000).toFixed(2)} Cr*`;
    }

    const facingsSet = Array.from(new Set(currentTabUnits.map((u) => u.facing)));

    return {
      carpetRange:
        activeTab === "plots"
          ? `${minCarpet.toLocaleString()} – ${maxCarpet.toLocaleString()} sq.ft (300–500 sq.yds)`
          : `${minCarpet.toLocaleString()} – ${maxCarpet.toLocaleString()} sq.ft`,
      startingPrice,
      unitCount: currentTabUnits.length,
      facings: facingsSet.join(", "),
    };
  }, [currentTabUnits, activeTab]);

  const handleEnquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquireSuccess(true);
    setTimeout(() => {
      setEnquireSuccess(false);
      setEnquireOpen(false);
    }, 2800);
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBrochureSuccess(true);
    setTimeout(() => {
      setBrochureSuccess(false);
      setBrochureOpen(false);
    }, 2500);
  };

  // Flattened facilities list for category tabs
  const allFacilities = [
    ...locationsData.facilities.schools.map((f) => ({ ...f, category: "schools", catLabel: "Schools" })),
    ...locationsData.facilities.hospitals.map((f) => ({ ...f, category: "hospitals", catLabel: "Hospitals" })),
    ...locationsData.facilities.retail.map((f) => ({ ...f, category: "retail", catLabel: "Retail & Leisure" })),
    ...locationsData.facilities.itParks.map((f) => ({ ...f, category: "itParks", catLabel: "IT Hubs" })),
  ];

  const filteredFacilities = activeFacilityCategory === "all"
    ? allFacilities
    : allFacilities.filter((f) => f.category === activeFacilityCategory);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-luxury-pattern-subtle overflow-x-hidden pt-[60px]">
      {/* Hidden button for Navbar to trigger enquire modal */}
      <button
        id="enquiry-modal-trigger"
        onClick={() => setEnquireOpen(true)}
        className="hidden"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION — Premium Cinematic Experience                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className="w-full min-h-[88vh] lg:h-[94vh] relative overflow-hidden flex flex-col justify-center items-center"
      >
        {/* —— Slow-panning background image —— */}
        <div
          className="absolute inset-0 bg-cover animate-hero-pan"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE')",
            backgroundPosition: "50% 60%",
          }}
        />

        {/* Layered gradient overlays for premium depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

        {/* —— Decorative SVG corner ornament (top-left) —— */}
        <div className="absolute top-8 left-8 opacity-40 animate-fade-in-scale [animation-delay:800ms]">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2 L40 2 L40 2" stroke="#B08D57" strokeWidth="0.8"
              strokeDasharray="200" className="animate-svg-draw" style={{ animationDelay: "600ms" }} />
            <path d="M2 2 L2 40" stroke="#B08D57" strokeWidth="0.8"
              strokeDasharray="200" className="animate-svg-draw" style={{ animationDelay: "750ms" }} />
            <circle cx="2" cy="2" r="2" fill="#B08D57" />
            <path d="M10 2 L10 10 L2 10" stroke="#B08D57" strokeWidth="0.4" opacity="0.5"
              strokeDasharray="100" className="animate-svg-draw" style={{ animationDelay: "900ms" }} />
          </svg>
        </div>

        {/* —— Decorative SVG corner ornament (top-right) —— */}
        <div className="absolute top-8 right-8 opacity-40 animate-fade-in-scale [animation-delay:900ms]">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M78 2 L40 2" stroke="#B08D57" strokeWidth="0.8"
              strokeDasharray="200" className="animate-svg-draw" style={{ animationDelay: "700ms" }} />
            <path d="M78 2 L78 40" stroke="#B08D57" strokeWidth="0.8"
              strokeDasharray="200" className="animate-svg-draw" style={{ animationDelay: "850ms" }} />
            <circle cx="78" cy="2" r="2" fill="#B08D57" />
            <path d="M70 2 L70 10 L78 10" stroke="#B08D57" strokeWidth="0.4" opacity="0.5"
              strokeDasharray="100" className="animate-svg-draw" style={{ animationDelay: "1000ms" }} />
          </svg>
        </div>

        {/* —— Thin gold diagonal accent line —— */}
        <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden opacity-30">
          <div className="h-px bg-gradient-to-r from-transparent via-[#B08D57] to-transparent animate-gold-sweep" />
        </div>

        {/* —— Content —— */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 gap-7 w-full max-w-5xl mx-auto">

          {/* Location badge with animated dot */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] tracking-[0.25em] uppercase animate-fade-in-down">
            <span className="inline-block size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.22em" }}>Neopolis Corridor · Kokapet, Hyderabad</span>
          </div>

          {/* Main luxury headline */}
          <div className="flex flex-col items-center gap-2">
            <h1
              className="text-white leading-[1.06] tracking-tight animate-fade-in-up [animation-delay:200ms]"
              style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
            >
              Where Address
            </h1>
            {/* Gold divider line with SVG diamond */}
            <div className="flex items-center gap-3 w-full justify-center animate-fade-in-up [animation-delay:350ms]">
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#B08D57]/60" />
              <svg width="10" height="10" viewBox="0 0 10 10" className="text-[#B08D57]">
                <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" />
              </svg>
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#B08D57]/60" />
            </div>
            <h1
              className="text-white leading-[1.06] tracking-tight animate-fade-in-up [animation-delay:350ms]"
              style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
            >
              Becomes Legacy
            </h1>
          </div>

          {/* Subhead */}
          <p
            className="text-white/75 font-light max-w-2xl leading-[1.85] animate-fade-in-up [animation-delay:500ms]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "14.5px", letterSpacing: "0.02em" }}
          >
            Luxehomes, Kokapet, Hyderabad — Discover HMDA-planned ultra-luxury residences in the heart of Hyderabad&apos;s most premium residential corridor, just 5 minutes from the Financial District.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-1 animate-fade-in-up [animation-delay:650ms]">
            <button
              onClick={() => setEnquireOpen(true)}
              className="bg-[#B08D57] hover:bg-[#967645] text-white text-[11px] tracking-[0.22em] font-semibold py-4 px-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(176,141,87,0.4)] hover:scale-[1.03] cursor-pointer animate-border-pulse"
            >
              ENQUIRE NOW
            </button>
            <button
              onClick={() => setBrochureOpen(true)}
              className="border border-white/50 bg-white/8 hover:bg-white/15 text-white text-[11px] tracking-[0.22em] font-semibold py-4 px-10 transition-all duration-300 backdrop-blur-sm hover:scale-[1.03] cursor-pointer"
            >
              DOWNLOAD BROCHURE
            </button>
          </div>

          {/* Trust bar */}
          <div className="w-full max-w-3xl mt-4 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-5 text-center animate-fade-in-up [animation-delay:800ms]">
            {[
              { label: "RERA Registered", value: "Status: TBD", sub: "HMDA Master Plan" },
              { label: "Land Parcel", value: propertiesData.trustStats.acresDeveloped, sub: "Neopolis Corridor" },
              { label: "Presence", value: propertiesData.trustStats.locationsCount, sub: "Kokapet · Banjara · Jubilee" },
              { label: "Track Record", value: propertiesData.trustStats.yearsOfTrust, sub: "Verified Governance" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-[#B08D57] font-semibold text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {stat.label}
                </span>
                <p className="text-white text-xs md:text-sm font-medium mt-1" style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem" }}>{stat.value}</p>
                <span className="text-white/50 text-[10px] mt-0.5">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated scroll indicator */}
        <a
          href="#collections"
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors animate-fade-in-up [animation-delay:1000ms] group"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll</span>
          {/* Animated SVG scroll arrow */}
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="group-hover:translate-y-1 transition-transform duration-300">
            <rect x="7" y="1" width="6" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="10" cy="5" r="2" fill="currentColor" className="animate-bounce" style={{ animationDuration: "1.5s" }} />
            <path d="M5 21 L10 26 L15 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. MASTERPLAN / FLOOR PLAN VISUAL COMPONENT (Isometric 3D Cutaway)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex justify-center px-6 md:px-12 py-16">
        <div className="flex flex-col max-w-[1200px] w-full gap-16">

          <section id="collections" ref={collectionsRef} className="flex flex-col gap-8 scroll-mt-24">
            {/* Section Header */}
            <div className="flex flex-wrap justify-between items-end gap-4 reveal-item">
              <div className="flex min-w-72 flex-col gap-1.5">
                <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase">
                  Isometric 3D Masterplan
                </span>
                <h2
                  className="text-[#1c1b1b] text-3xl md:text-4xl font-normal leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Layouts &amp; Unit Configurations
                </h2>
                <p className="text-[#72716d] text-sm max-w-xl mt-1 leading-relaxed">
                  Presented as isometric 3D architectural cutaways with annotated room zoning, live-computed carpet area bands, and dimensional schedules.
                </p>
              </div>

              {/* Masterplan Tabs: 2 BHK, 3 BHK, 4 BHK, Plots */}
              <div className="flex items-center gap-2 border border-[#E8E4DC] rounded-full p-1.5 bg-white shadow-sm overflow-x-auto max-w-full">
                {[
                  { id: "2bhk", label: "2 BHK" },
                  { id: "3bhk", label: "3 BHK" },
                  { id: "4bhk", label: "4 BHK" },
                  { id: "plots", label: "Plots" },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-[#B08D57] text-white font-semibold shadow-sm"
                          : "text-[#72716d] hover:text-[#1c1b1b] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Per-Tab Live Computed Summary Card ──────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 md:p-8 shadow-sm reveal-item">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E4DC]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="size-2 rounded-full bg-[#B08D57]" />
                    <span className="text-xs font-semibold text-[#B08D57] tracking-widest uppercase">
                      Live Portfolio Summary · {activeTab === "plots" ? "Villa Plots" : `${activeTab.replace("bhk", "").toUpperCase()} BHK Group`}
                    </span>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {activeTab === "plots"
                      ? "The Neopolis Freehold Estate Plots"
                      : `${activeTab.replace("bhk", "")} BHK Luxury Residences`}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-xs font-semibold text-[#1c1b1b]">
                    {tabSummary.unitCount} Residences Available
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-xs text-[#72716d]">
                    Benchmark: ₹12,800/sq.ft
                  </span>
                </div>
              </div>

              {/* Live Computed Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Carpet Area Range
                  </span>
                  <p
                    className="text-lg md:text-xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {tabSummary.carpetRange}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Starting Price
                  </span>
                  <p
                    className="text-lg md:text-xl font-normal text-[#B08D57]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {tabSummary.startingPrice}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Unique Facings
                  </span>
                  <p className="text-xs md:text-sm font-medium text-[#1c1b1b] mt-1">
                    {tabSummary.facings}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Statutory Compliance
                  </span>
                  <p className="text-xs text-[#72716d] mt-1">
                    100% Vastu · HMDA Approved
                  </p>
                </div>
              </div>

              {/* Unit Selector Pills within Active Tab */}
              {currentTabUnits && currentTabUnits.length > 1 && (
                <div className="mt-8 pt-6 border-t border-[#E8E4DC]/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#72716d] block mb-3">
                    Select Residence / Tower to View Isometric 3D Cutaway:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {currentTabUnits.map((u) => {
                      const isSelected = activeUnit.id === u.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => setSelectedUnitId(u.id)}
                          className={`px-3.5 py-2 rounded-lg text-xs transition-all flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? "bg-[#1c1b1b] text-white font-medium shadow-sm"
                              : "bg-[#FAF7F2] text-[#474741] border border-[#E8E4DC] hover:border-[#B08D57]"
                          }`}
                        >
                          <span className={`size-1.5 rounded-full ${isSelected ? "bg-[#B08D57]" : "bg-[#72716d]"}`} />
                          <span>{u.project_name}</span>
                          <span className="opacity-70">({u.tower})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── PART B: Isometric 3D Floor Plan Visual Component ────────── */}
            {activeUnit && (
              <div className="reveal-item">
                <IsometricFloorPlanViewer
                  unit={activeUnit}
                  onEnquire={() => {
                    setSelectedModalUnit(activeUnit);
                    setEnquireOpen(true);
                  }}
                />
              </div>
            )}
          </section>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* 3. VIDEO SHOWCASE SECTION (Updated to Luxehomes, Kokapet)         */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <section ref={videoRef} className="w-full flex flex-col items-center">
            {/* Centered Heading */}
            <div className="flex flex-col items-center text-center mb-6 reveal-item">
              <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase mb-1">
                The Experience
              </span>
              <h2
                className="text-[#1c1b1b] text-3xl md:text-4xl font-normal mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Luxehomes, Kokapet
              </h2>
              <p className="text-[#72716d] text-sm md:text-base font-normal">
                A Walkthrough of Tomorrow&apos;s Address in the Neopolis Corridor
              </p>
            </div>

            {/* Video Card with Realistic Browser/App Mockup Header */}
            <div
              onClick={() => setVideoModalOpen(true)}
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8E4DC] bg-white group cursor-pointer reveal-item"
            >
              {/* Mockup Header Bar */}
              <div className="bg-[#FAF7F2] border-b border-[#E8E4DC] px-6 py-3 flex items-center justify-between text-xs select-none">
                <span
                  className="text-[#1c1b1b] font-medium text-sm tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Luxehomes, Kokapet (Neopolis)
                </span>
                <div className="hidden sm:flex items-center gap-6 text-[11px] text-[#72716d] tracking-wider font-medium">
                  <span className="text-[#1c1b1b] font-semibold">Home</span>
                  <span>Masterplan</span>
                  <span>Layouts</span>
                  <span>Connectivity</span>
                  <span>Site Office</span>
                </div>
              </div>

              {/* Video Preview Canvas */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTSb6angQ7EmFDDTOUg5zzRs1sw6A7DR0GRB0MP86xPN-ntQCbTMBUV4PGOMv90YJ38eOEL36kt-GSKVbeGq_0l4PpyOA8g3nOfADhyisPiwua3wD9VpuIZqF2kBHLRMFSjgFI4ehYA_25xzUWtO3bNnLJAsg4d5cjusYK446d_vfKNjaYBlUy0JfZZYW5v7cU8T5eouxna1tCHQQDWQxK8PJj8jojVNWfdCL0BKt5LiCh13JW7W8w')",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/45 flex items-center justify-center">
                  {/* Pulsing Frosted Glass Play Button */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute size-24 border border-white/40 rounded-full animate-ping pointer-events-none" />
                    <div className="absolute size-20 border border-[#B08D57]/50 rounded-full animate-pulse-ring pointer-events-none" />
                    <div className="size-16 md:size-20 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/70 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/35">
                      <span
                        className="material-symbols-outlined text-white text-3xl md:text-4xl pl-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-4 left-6 text-white/90 text-xs tracking-wider font-light flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Luxehomes, Kokapet • 4K Cinematic Virtual Walkthrough
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* 4. NEARBY PREMIUM FACILITIES & DRIVE-TIME CONNECTIVITY            */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <section ref={facilitiesRef} className="pt-4 flex flex-col gap-10">
            {/* Header with Kokapet Neopolis Drive-time stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-item">
              <div>
                <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block mb-1">
                  Strategic Location
                </span>
                <h2
                  className="text-[#1c1b1b] text-3xl md:text-4xl font-normal leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Nearby Premium Facilities
                </h2>
                <p className="text-[#72716d] text-sm max-w-xl mt-1 leading-relaxed">
                  Surrounded by top international educational institutions, tertiary multi-specialty healthcare, premier luxury high-streets, and the Financial District.
                </p>
              </div>

              {/* Approximate Drive-time Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E8E4DC] text-xs font-semibold text-[#1c1b1b] shadow-sm flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Financial District 5 min
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E8E4DC] text-xs font-semibold text-[#1c1b1b] shadow-sm flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#B08D57]" />
                  Gachibowli IT Hub 8 min
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E8E4DC] text-xs font-semibold text-[#1c1b1b] shadow-sm flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500" />
                  ORR 3 min
                </span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 border-b border-[#E8E4DC] pb-4 overflow-x-auto">
              {[
                { id: "all", label: "All Facilities" },
                { id: "schools", label: "Schools" },
                { id: "hospitals", label: "Hospitals" },
                { id: "retail", label: "Retail & Leisure" },
                { id: "itParks", label: "IT Parks" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFacilityCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeFacilityCategory === tab.id
                      ? "bg-[#1c1b1b] text-white"
                      : "text-[#72716d] hover:text-[#1c1b1b] hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 4 Feature Columns / Facility Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFacilities.map((facility, idx) => (
                <div
                  key={facility.name}
                  onMouseEnter={() => setActiveFacilityPin(facility.name)}
                  onMouseLeave={() => setActiveFacilityPin(null)}
                  className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-sm hover:shadow-lg hover:border-[#B08D57] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-[#B08D57] flex items-center justify-center group-hover:bg-[#B08D57] group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          {facility.icon}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#FAF7F2] text-[#B08D57] border border-[#E8E4DC]">
                        {facility.distance}
                      </span>
                    </div>

                    <h4
                      className="text-lg font-normal text-[#1c1b1b] mb-1 group-hover:text-[#B08D57] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {facility.name}
                    </h4>

                    <p className="text-xs text-[#72716d] mb-3">
                      {facility.locality}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E4DC]/60 text-xs text-[#474741] font-medium flex items-center justify-between">
                    <span>{facility.type}</span>
                    <span className="material-symbols-outlined text-sm text-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Topography Map & Corridor Placement */}
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-white p-6 md:p-8 rounded-2xl border border-[#E8E4DC] shadow-md mt-4">
              <div className="flex-1">
                <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block mb-1">
                  Neopolis Corridor Master Plan
                </span>
                <h3
                  className="text-2xl md:text-3xl font-normal text-[#1c1b1b] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Strategic Crossroads of Western Hyderabad
                </h3>
                <p className="text-[#72716d] text-sm leading-relaxed mb-6">
                  {locationsData.flagship.positioning || "Hyderabad's most premium new-supply residential corridor"}. Seamlessly connected via 100-foot multi-lane arterial roads directly to the Outer Ring Road (ORR Exit 1 &amp; 1A) and the Financial District.
                </p>

                <div className="space-y-3">
                  {locationsData.flagship.connectivity.map((conn) => (
                    <div key={conn.hub} className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC]">
                      <span className="material-symbols-outlined text-[#B08D57] text-xl mt-0.5">
                        navigation
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1c1b1b] flex items-center gap-2">
                          {conn.hub}
                          <span className="text-[11px] font-normal text-[#B08D57]">({conn.duration})</span>
                        </p>
                        <p className="text-xs text-[#72716d] mt-0.5 leading-relaxed">{conn.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Stylized Hyderabad Map */}
              <div className="w-full lg:w-1/2 h-[340px] rounded-xl overflow-hidden relative shadow-md border border-[#E8E4DC]">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBOZwk_BVhVxWN5j8WOo2X9yE6qWjAd9HIaB2Sv_SYPR1u5uWsNgQkpm8tTe5ELGNUwUHOFvHFpppv0Jwc-6HsTCLbNCDhukYxIK2VerMsahKFAOV-4_tLpiVojS1qb6jIb7esd9nf2Xmcs8abnMcKBwy6pqq_qTVzAYcwRpVX3iaW_BnANcx20Wm9TooeVAdr8urzd06odowB7iruz4JQ82PM9WsYtHuw3-RPT5HwUtZgHk696CmD')",
                  }}
                />

                {/* Pulsing Pins for Real Hyderabad Facilities */}
                {/* Pin: Kokapet Neopolis */}
                <div className="absolute top-[50%] left-[38%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute size-10 rounded-full border border-[#B08D57] animate-pulse-ring" />
                    <div className="size-4 bg-[#B08D57] rounded-full border-2 border-white shadow-lg" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1b1b] text-white text-[11px] px-2.5 py-1 rounded shadow-lg whitespace-nowrap font-medium pointer-events-none">
                    ★ Luxehomes (Kokapet Neopolis)
                  </div>
                </div>

                {/* Pin: Financial District (5 min) */}
                <div className="absolute top-[40%] left-[65%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group">
                  <div className="relative flex items-center justify-center">
                    <div className="size-3 bg-emerald-600 rounded-full border-2 border-white shadow-md" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1b1b] text-white text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Financial District (5 min)
                  </div>
                </div>

                {/* Pin: Gachibowli IT Hub (8 min) */}
                <div className="absolute top-[28%] left-[78%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group">
                  <div className="relative flex items-center justify-center">
                    <div className="size-3 bg-blue-600 rounded-full border-2 border-white shadow-md" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1b1b] text-white text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Gachibowli IT Hub (8 min)
                  </div>
                </div>

                {/* Pin: Continental Hospitals (4.2 km) */}
                <div className="absolute top-[62%] left-[68%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group">
                  <div className="relative flex items-center justify-center">
                    <div className="size-2.5 bg-red-600 rounded-full border-2 border-white shadow-sm" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1b1b] text-white text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Continental Hospitals (4.2 km)
                  </div>
                </div>

                {/* Map Bottom Legend */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E8E4DC] text-[10px] text-[#1c1b1b] font-medium flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#B08D57]" /> Kokapet</span>
                  <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-600" /> IT Hubs</span>
                  <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-red-600" /> Hospitals</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. INTERACTIVE ENQUIRE MODAL (Updated with Real Kokapet Units)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {enquireOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-scale"
          onClick={() => setEnquireOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-[#E8E4DC] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEnquireOpen(false)}
              className="absolute top-6 right-6 text-[#72716d] hover:text-[#1c1b1b] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {enquireSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3
                  className="text-2xl font-normal text-[#1c1b1b]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Consultation Scheduled
                </h3>
                <p className="text-sm text-[#72716d] max-w-sm mx-auto">
                  A relationship manager from our Kokapet site office will connect with you within 2 hours.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block mb-1">
                  Private Acquisition · Kokapet
                </span>
                <h3
                  className="text-2xl font-normal text-[#1c1b1b] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Request Consultation
                </h3>
                <p className="text-xs text-[#72716d] mb-6">
                  Schedule a private visit to the Neopolis site experience center or receive verified pricing schedules.
                </p>

                <form onSubmit={handleEnquireSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1.5">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1.5">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="address@domain.com"
                        className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1.5">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1.5">
                      Target Project / Layout
                    </label>
                    <select
                      defaultValue={activeUnit ? activeUnit.id : "botanika-greens-ta-3bhk"}
                      className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] transition-colors"
                    >
                      {(propertiesData.units as UnitData[]).map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.project_name} ({u.tower}) — {u.bhk ? `${u.bhk} BHK` : "Plot"} · {u.display_price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1.5">
                      Specific Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Floor preference, Vastu direction, or site visit date..."
                      className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#B08D57] hover:bg-[#967645] text-white text-xs tracking-[0.2em] font-semibold py-3.5 rounded-lg uppercase transition-all shadow-md mt-2 cursor-pointer"
                  >
                    Submit Advisory Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. BROCHURE DOWNLOAD MODAL (Real Kokapet Neopolis Digital Folio)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {brochureOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-scale"
          onClick={() => setBrochureOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[#E8E4DC] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBrochureOpen(false)}
              className="absolute top-6 right-6 text-[#72716d] hover:text-[#1c1b1b] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {brochureSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="size-14 rounded-full bg-[#FAF7F2] text-[#B08D57] border border-[#B08D57] flex items-center justify-center mx-auto text-2xl font-bold">
                  ↓
                </div>
                <h3
                  className="text-xl font-normal text-[#1c1b1b]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Digital Folio Transmitted
                </h3>
                <p className="text-xs text-[#72716d] leading-relaxed">
                  The curated Kokapet Neopolis Floorplans, HMDA Master Plan &amp; Cost Sheet PDF has been emailed to you.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block mb-1">
                  Kokapet Neopolis Folio
                </span>
                <h3
                  className="text-xl font-normal text-[#1c1b1b]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Download Brochure
                </h3>
                <p className="text-xs text-[#72716d] mb-5">
                  Receive comprehensive floor plans, construction milestone schedules, and HMDA master plan layouts.
                </p>

                <form onSubmit={handleBrochureSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="address@domain.com"
                      className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1b1b] tracking-wider uppercase mb-1">
                      Select Unit Layout
                    </label>
                    <select className="w-full bg-[#FAF7F2] border border-[#E8E4DC] rounded-lg px-3.5 py-2.5 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57]">
                      <option>All Configurations (Complete Kokapet Folio)</option>
                      <option>2 BHK Suite (1,150–1,350 sq.ft)</option>
                      <option>3 BHK Residence (1,580–1,950 sq.ft)</option>
                      <option>4 BHK Sky Villa (2,480–2,890 sq.ft)</option>
                      <option>Villa Plots (300–500 sq.yds)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1c1b1b] hover:bg-[#333] text-white text-xs tracking-[0.2em] font-semibold py-3.5 rounded-lg uppercase transition-all shadow-md cursor-pointer"
                  >
                    Receive Digital Folio
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. VIDEO PLAYER MODAL — YouTube Embed                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in-scale"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-[#0a0906] rounded-xl max-w-5xl w-full overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-[#B08D57]/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="bg-black/60 px-6 py-3.5 flex items-center justify-between border-b border-white/8 text-white">
              <div className="flex items-center gap-3">
                {/* SVG diamond ornament */}
                <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#B08D57]">
                  <polygon points="4,0 8,4 4,8 0,4" fill="currentColor" />
                </svg>
                <span
                  className="text-sm tracking-widest font-light"
                  style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem" }}
                >
                  Luxehomes, Kokapet — Virtual Walkthrough
                </span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Close video"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* YouTube Embed */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/L0PSxBh31NI?autoplay=1&rel=0&modestbranding=1&controls=1&si=rGx06JX19krDOhF0"
                title="Luxehomes Kokapet Virtual Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>

            {/* Bottom action bar */}
            <div className="bg-black/60 px-6 py-4 flex items-center justify-between border-t border-white/8">
              <p className="text-white/50 text-xs tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                Kokapet, Hyderabad · Neopolis Corridor
              </p>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  setEnquireOpen(true);
                }}
                className="bg-[#B08D57] text-white text-[10px] tracking-[0.2em] font-semibold px-5 py-2 hover:bg-[#967645] transition-colors cursor-pointer"
              >
                SCHEDULE VISIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
