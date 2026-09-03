"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import propertiesData from "@/data/properties.json";
import locationsData from "@/data/locations.json";
import IsometricFloorPlanViewer, { UnitData } from "@/components/IsometricFloorPlanViewer";

export default function GalleryPage() {
  // ─── Modal States ──────────────────────────────────────────────────────────
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [selectedModalUnit, setSelectedModalUnit] = useState<UnitData | null>(null);

  // ─── Form Success States ───────────────────────────────────────────────────
  const [enquireSuccess, setEnquireSuccess] = useState(false);
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  // ─── Interactive BHK Masterplan Tab ────────────────────────────────────────
  // Options: "2bhk" | "3bhk" | "4bhk" | "plots"
  const [activeTab, setActiveTab] = useState<"2bhk" | "3bhk" | "4bhk" | "plots">("3bhk");

  // Selected unit ID within the active tab
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const viewerRef = useRef<HTMLDivElement>(null);

  const scrollToViewer = () => {
    setTimeout(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

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

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-luxury-pattern-subtle overflow-x-hidden pt-[90px] md:pt-[105px]">
      {/* Hidden button for Navbar to trigger enquire modal */}
      <button
        id="enquiry-modal-trigger"
        onClick={() => setEnquireOpen(true)}
        className="hidden"
        aria-hidden="true"
      />

      {/* ── Page Header / Intro ────────────────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-3 sm:pb-4">
        <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 reveal-item">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8E4DC] text-[#B08D57] text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase font-semibold">
            <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span>OUR RESIDENCES</span>
          </div>
          <h1
            className="text-[#1c1b1b] leading-tight text-2xl sm:text-3xl md:text-5xl font-normal"
            style={{ fontFamily: "'Cormorant Garant', 'Playfair Display', serif" }}
          >
            Explore Every Configuration
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-[#B08D57]/40" />
            <svg width="6" height="6" viewBox="0 0 6 6">
              <polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" />
            </svg>
            <div className="h-px w-10 bg-[#B08D57]/40" />
          </div>
          <p
            className="text-[#72716d] text-xs sm:text-sm md:text-base max-w-2xl font-light leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Presented as isometric 3D architectural cutaways with annotated room zoning, live-computed carpet area bands, and dimensional schedules.
          </p>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* LAYOUTS & UNIT CONFIGURATIONS SECTION (Relocated from Home)       */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="flex justify-center px-4 sm:px-6 md:px-12 py-6 sm:py-10 pb-16 sm:pb-20">
        <div className="flex flex-col max-w-[1200px] w-full gap-8 sm:gap-10">

          <section id="configurations" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
            {/* Section Sub-Header with Tab Selector (Centered on Mobile) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left reveal-item">
              <div className="flex flex-col items-center sm:items-start gap-1 w-full sm:w-auto">
                <span className="text-[#B08D57] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase">
                  Isometric 3D Masterplan
                </span>
                <h2
                  className="text-[#1c1b1b] text-xl sm:text-2xl md:text-3xl font-normal leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Layouts &amp; Unit Configurations
                </h2>
              </div>

              {/* Masterplan Tabs: 2 BHK, 3 BHK, 4 BHK, Plots (Centered Options) */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 border border-[#E8E4DC] rounded-full p-1 bg-white shadow-sm overflow-x-auto max-w-full no-scrollbar mx-auto sm:mx-0">
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
                      className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
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
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 sm:p-7 md:p-8 shadow-sm reveal-item reveal-delay-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[#E8E4DC] text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="size-2 rounded-full bg-[#B08D57]" />
                    <span className="text-[11px] sm:text-xs font-semibold text-[#B08D57] tracking-widest uppercase">
                      Live Portfolio Summary · {activeTab === "plots" ? "Villa Plots" : `${activeTab.replace("bhk", "").toUpperCase()} BHK Group`}
                    </span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {activeTab === "plots"
                      ? "The Neopolis Freehold Estate Plots"
                      : `${activeTab.replace("bhk", "")} BHK Luxury Residences`}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-xs font-semibold text-[#1c1b1b]">
                    {tabSummary.unitCount} Residences Available
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E4DC] text-xs text-[#72716d]">
                    Benchmark: ₹12,800/sq.ft
                  </span>
                </div>
              </div>

              {/* Live Computed Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6">
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Carpet Area Range
                  </span>
                  <p
                    className="text-base sm:text-lg md:text-xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {tabSummary.carpetRange}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Starting Price
                  </span>
                  <p
                    className="text-base sm:text-lg md:text-xl font-normal text-[#B08D57]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {tabSummary.startingPrice}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Unique Facings
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-[#1c1b1b] mt-1">
                    {tabSummary.facings}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                    Statutory Compliance
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#72716d] mt-1">
                    100% Vastu · HMDA Approved
                  </p>
                </div>
              </div>

              {/* Unit Selector Pills within Active Tab (Centered on Mobile) */}
              {currentTabUnits && currentTabUnits.length > 1 && (
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E8E4DC]/60 text-center sm:text-left">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#72716d] block mb-3">
                    Select Residence / Tower to View Isometric 3D Cutaway:
                  </span>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-2.5">
                    {currentTabUnits.map((u) => {
                      const isSelected = activeUnit.id === u.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            setSelectedUnitId(u.id);
                            scrollToViewer();
                          }}
                          className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs transition-all flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? "bg-[#1c1b1b] text-white font-medium shadow-sm"
                              : "bg-[#FAF7F2] text-[#474741] border border-[#E8E4DC] hover:border-[#B08D57]"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              isSelected ? "bg-[#B08D57]" : "bg-[#72716d]"
                            }`}
                          />
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
              <div className="scroll-mt-24" ref={viewerRef}>
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

        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* MODAL 1: ENQUIRE NOW MODAL                                        */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {enquireOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEnquireOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl border border-[#E8E4DC]">
            <button
              onClick={() => setEnquireOpen(false)}
              className="absolute top-5 right-5 text-[#72716d] hover:text-[#1c1b1b] transition-colors p-1"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {enquireSuccess ? (
              <div className="text-center py-8">
                <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3
                  className="text-2xl font-normal text-[#1c1b1b] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-[#72716d]">
                  Our private client relationship partner for Kokapet (Neopolis Corridor) will connect with you within 2 business hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block mb-1">
                    Private Client Advisory
                  </span>
                  <h3
                    className="text-2xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Request Confidential Portfolio
                  </h3>
                  <p className="text-xs text-[#72716d] mt-1">
                    {selectedModalUnit
                      ? `Enquiring for: ${selectedModalUnit.project_name} (${selectedModalUnit.tower}) · ${selectedModalUnit.display_price}`
                      : "Direct confidential consultation for Kokapet luxury residences"}
                  </p>
                </div>

                <form onSubmit={handleEnquireSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Anand Mahindra"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Residence Category
                    </label>
                    <select
                      defaultValue={activeTab}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    >
                      <option value="2bhk">2 BHK (1,180 – 1,350 sq.ft) · From ₹1.51 Cr*</option>
                      <option value="3bhk">3 BHK (1,850 – 2,150 sq.ft) · From ₹2.37 Cr*</option>
                      <option value="4bhk">4 BHK Penthouse (2,950 – 3,450 sq.ft) · From ₹3.78 Cr*</option>
                      <option value="plots">Freehold Estate Plot (300 – 500 sq.yds) · From ₹3.84 Cr*</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Specific Inquiries / Vastu Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for East-facing corner unit on high floor with Financial District skyline view"
                      className="w-full px-4 py-2 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    />
                  </div>

                  <p className="text-[11px] text-[#72716d] leading-relaxed">
                    By submitting, you consent to non-intrusive communication via authorized Luxehomes advisory desk. Your identity remains strictly confidential.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#B08D57] hover:bg-[#967645] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shadow-md cursor-pointer"
                  >
                    Submit Advisory Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* MODAL 2: DOWNLOAD BROCHURE MODAL                                 */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {brochureOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setBrochureOpen(false);
          }}
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-[#E8E4DC]">
            <button
              onClick={() => setBrochureOpen(false)}
              className="absolute top-5 right-5 text-[#72716d] hover:text-[#1c1b1b] transition-colors p-1"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {brochureSuccess ? (
              <div className="text-center py-6">
                <div className="size-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-2xl">download_done</span>
                </div>
                <h3
                  className="text-xl font-normal text-[#1c1b1b] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Brochure Dispatched
                </h3>
                <p className="text-xs text-[#72716d]">
                  The confidential digital masterplan brochure has been dispatched to your email address.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <span className="text-[#B08D57] font-semibold text-xs tracking-[0.2em] uppercase block mb-1">
                    Confidential Document
                  </span>
                  <h3
                    className="text-xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Download Masterplan Brochure
                  </h3>
                  <p className="text-xs text-[#72716d] mt-1">
                    Receive the complete 48-page architectural dossier including Kokapet Neopolis corridor map, unit floor plans, and statutory disclosures.
                  </p>
                </div>

                <form onSubmit={handleBrochureSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. K. Rao"
                      className="w-full px-4 py-2 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Mobile (for WhatsApp link delivery) *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 rounded-lg border border-[#E8E4DC] text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#1c1b1b] hover:bg-[#B08D57] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shadow cursor-pointer mt-2"
                  >
                    Send PDF to Email &amp; WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
