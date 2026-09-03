"use client";

import React, { useState, useEffect } from "react";
import ThreeDModelViewer from "./ThreeDModelViewer";

export interface RoomDimension {
  name: string;
  dim_ft?: string | null;
  dim_m?: string | null;
}

export interface CalloutPoint {
  label: string;
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
}

export interface FloorLevel {
  level_name: string;
  callouts?: CalloutPoint[];
  rooms?: RoomDimension[];
}

export interface UnitData {
  id: string;
  project_name: string;
  tower: string;
  unit_number: string;
  bhk: number | null;
  type: string;
  locality: string;
  carpet_area_sqft: number;
  built_up_area_sqft: number;
  total_price_inr: number | null;
  display_price: string;
  facing: string;
  status: string;
  levels: FloorLevel[];
  floor_plan_image?: string | null;
}

interface IsometricFloorPlanViewerProps {
  unit: UnitData;
  onEnquire?: () => void;
}

export default function IsometricFloorPlanViewer({
  unit,
  onEnquire,
}: IsometricFloorPlanViewerProps) {
  // View mode: 3D interactive model vs. architectural 2D/3D cutaway photo
  const [viewMode, setViewMode] = useState<"3d" | "render">("3d");

  // Selected level for multi-level villas/apartments (defaults to level 0)
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const [activePerspective, setActivePerspective] = useState<"cutaway" | "living" | "bedroom">("cutaway");
  const [fullScreenOpen, setFullScreenOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullScreenOpen(false);
    };
    if (fullScreenOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullScreenOpen]);

  const currentLevel = unit.levels[activeLevelIdx] || unit.levels[0];
  const isMultiLevel = unit.levels.length > 1;

  // —— Computed pricing metrics ——
  const pricePerSqFt =
    unit.total_price_inr && unit.built_up_area_sqft
      ? Math.round(unit.total_price_inr / unit.built_up_area_sqft)
      : null;
  const pricePerSqYard = pricePerSqFt ? Math.round(pricePerSqFt * 9) : null;

  // —— Facing compass needle angle ——
  const facingAngles: Record<string, number> = {
    North: 0,
    "North-East": 45,
    East: 90,
    "South-East": 135,
    South: 180,
    "South-West": 225,
    West: 270,
    "North-West": 315,
  };
  const facingAngle = facingAngles[unit.facing] ?? 45;

  const perspectives = [
    { id: "cutaway", label: "Masterplan Cutaway", icon: "view_in_ar", src: unit.floor_plan_image || "/images/floorplans/isometric_3bhk.jpg" },
    { id: "living", label: "Living & Dining Salon", icon: "chair", src: "/images/floorplans/luxe_living_dining.jpg" },
    { id: "bedroom", label: "Master Bedroom Suite", icon: "bed", src: "/images/floorplans/luxe_master_suite.jpg" },
  ];

  const currentPerspective = perspectives.find((p) => p.id === activePerspective) || perspectives[0];
  const activeImage = currentPerspective.src;

  return (
    /* ── SINGLE UNIFIED CONTAINER ───────────────────────────────────────── */
    <div className="w-full bg-white rounded-2xl md:rounded-3xl border border-[#E8E4DC] shadow-xl overflow-hidden flex flex-col transition-all duration-300">
      
      {/* ── 1. TOP HEADER & PRICING METRICS BAR ─────────────────────────── */}
      <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-b from-white to-[#FAF7F2]/50 border-b border-[#E8E4DC]">
        {/* Top Identity Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-[#E8E4DC]/70">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="size-2 rounded-full bg-[#B08D57] animate-pulse shrink-0" />
            <span
              className="text-[#1c1b1b] text-sm sm:text-base md:text-lg font-medium tracking-tight"
              style={{ fontFamily: "'Cormorant Garant', serif" }}
            >
              {unit.project_name} · {unit.tower} · Unit {unit.unit_number}
            </span>
            {/* Small & Elegant Luxury Badge */}
            <span className="text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded bg-[#FAF7F2] text-[#B08D57] border border-[#B08D57]/35 shrink-0 shadow-xs">
              {unit.bhk ? `${unit.bhk} BHK` : "Estate"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#72716d]">
            <span className="hidden sm:inline">100% Vastu Compliant</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-medium text-[#1c1b1b]">HMDA Approved</span>
          </div>
        </div>

        {/* Pricing & Key Metrics Strip */}
        <div className="flex flex-wrap gap-6 items-start justify-between">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 flex-1">
            {/* Total Price */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#72716d] mb-1">
                TOTAL PRICE
              </p>
              <p
                className="font-light text-2xl md:text-3xl text-[#B08D57] leading-none"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                {unit.display_price}
              </p>
            </div>

            {/* Rate / sq.ft */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#72716d] mb-1">
                RATE / SQ.FT
              </p>
              <p
                className="font-light text-xl md:text-2xl text-[#1c1b1b] leading-none"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                {pricePerSqFt ? `₹${pricePerSqFt.toLocaleString("en-IN")}` : "₹12,800"}
              </p>
            </div>

            {/* Rate / sq.yard */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#72716d] mb-1">
                RATE / SQ.YARD
              </p>
              <p
                className="font-light text-xl md:text-2xl text-[#1c1b1b] leading-none"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                {pricePerSqYard ? `₹${pricePerSqYard.toLocaleString("en-IN")}` : "₹1,15,200"}
              </p>
            </div>

            {/* Carpet Area */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#72716d] mb-1">
                CARPET AREA
              </p>
              <p
                className="font-light text-xl md:text-2xl text-[#1c1b1b] leading-none"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                {unit.carpet_area_sqft}{" "}
                <span className="text-sm font-sans text-[#72716d]">sq.ft</span>
              </p>
            </div>
          </div>

          {/* Facing Compass Dial */}
          <div className="flex flex-col items-center gap-1.5 self-center sm:self-auto pl-0 sm:pl-6 border-l-0 sm:border-l border-[#E8E4DC]">
            <p className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#72716d]">
              FACING
            </p>
            {/* SVG Compass with Rotating Gold Needle */}
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                <circle cx="40" cy="40" r="37" fill="#FAF7F2" stroke="#E8E4DC" strokeWidth="1.5" />
                {/* Cardinal direction labels */}
                <text x="40" y="11" textAnchor="middle" fontSize="7.5" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="700">N</text>
                <text x="69" y="42.5" textAnchor="middle" fontSize="7.5" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="700">E</text>
                <text x="40" y="74" textAnchor="middle" fontSize="7.5" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="700">S</text>
                <text x="11" y="42.5" textAnchor="middle" fontSize="7.5" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="700">W</text>
                {/* Ticks */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = ((deg - 90) * Math.PI) / 180;
                  const x1 = 40 + 31 * Math.cos(rad);
                  const y1 = 40 + 31 * Math.sin(rad);
                  const x2 = 40 + 35 * Math.cos(rad);
                  const y2 = 40 + 35 * Math.sin(rad);
                  return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8E4DC" strokeWidth="1" />;
                })}
                {/* Direction Needle pointing to facing */}
                {(() => {
                  const rad = ((facingAngle - 90) * Math.PI) / 180;
                  const tipX = 40 + 25 * Math.cos(rad);
                  const tipY = 40 + 25 * Math.sin(rad);
                  const tailX = 40 - 12 * Math.cos(rad);
                  const tailY = 40 - 12 * Math.sin(rad);
                  return (
                    <g>
                      <line x1={tailX} y1={tailY} x2={tipX} y2={tipY} stroke="#B08D57" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx={tipX} cy={tipY} r="3" fill="#B08D57" />
                      <circle cx={40} cy={40} r="3" fill="white" stroke="#B08D57" strokeWidth="1.5" />
                    </g>
                  );
                })()}
              </svg>
            </div>
            {/* Facing pill */}
            <span className="bg-[#B08D57] text-white text-[9.5px] font-bold tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              {unit.facing}
            </span>
          </div>
        </div>

        {/* Sub-bar unit details */}
        <div className="mt-4 pt-3 border-t border-[#E8E4DC]/60 flex flex-wrap gap-2 md:gap-4 text-xs text-[#72716d]">
          <span>
            <strong className="text-[#1c1b1b] font-medium">Project:</strong> {unit.project_name}
          </span>
          <span>·</span>
          <span>
            <strong className="text-[#1c1b1b] font-medium">Tower:</strong> {unit.tower}
          </span>
          <span>·</span>
          <span>
            <strong className="text-[#1c1b1b] font-medium">Unit:</strong> {unit.unit_number}
          </span>
          <span>·</span>
          <span>
            <strong className="text-[#1c1b1b] font-medium">Built-up:</strong> {unit.built_up_area_sqft} sq.ft
          </span>
          <span>·</span>
          <span className="font-semibold text-emerald-600 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {unit.status}
          </span>
        </div>
      </div>

      {/* ── 2. INTERACTIVE STAGE TOOLBAR (MODE TOGGLE & CONTROLS) ───────── */}
      <div className="px-4 sm:px-6 md:px-8 py-3 bg-[#FAF7F2] border-b border-[#E8E4DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 select-none">
        {/* Left: Level Selectors & View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2.5">
          {/* Level Tabs (if multi-level) */}
          {isMultiLevel && (
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E4DC]">
              {unit.levels.map((lvl, idx) => (
                <button
                  key={lvl.level_name}
                  onClick={() => setActiveLevelIdx(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                    activeLevelIdx === idx
                      ? "bg-[#1c1b1b] text-white"
                      : "text-[#72716d] hover:text-[#1c1b1b]"
                  }`}
                >
                  {lvl.level_name}
                </button>
              ))}
            </div>
          )}

          {!isMultiLevel && (
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#B08D57]" />
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#B08D57]">
                {currentLevel?.level_name || "GROUND FLOOR"}
              </span>
            </div>
          )}

          {/* View Mode Toggle: 3D Model vs. High-Res Render */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E8E4DC] shadow-xs">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "3d"
                  ? "bg-[#B08D57] text-white shadow-xs"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">view_in_ar</span>
              <span className="sm:hidden">3D Model</span>
              <span className="hidden sm:inline">3D Interactive Model</span>
            </button>
            <button
              onClick={() => setViewMode("render")}
              className={`px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "render"
                  ? "bg-[#1c1b1b] text-white shadow-xs"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">photo</span>
              <span className="sm:hidden">2D Render</span>
              <span className="hidden sm:inline">Architectural Render</span>
            </button>
          </div>

          {/* Right: Verified HMDA Compliance Status */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10.5px] uppercase tracking-widest text-[#72716d] font-semibold bg-white px-3 py-1 rounded-full border border-[#E8E4DC] shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Statutory HMDA Plan</span>
          </div>
        </div>
      </div>

      {/* ── 3. CENTER 3D STAGE VIEWPORT ─────────────────────────────────── */}
      <div className="p-3 sm:p-5 md:p-8 bg-white">
        {viewMode === "3d" ? (
          /* ── 3D INTERACTIVE THREE.JS MODEL ──────────────────────────── */
          <div className="w-full touch-none select-none" style={{ touchAction: "none" }}>
            <ThreeDModelViewer
              bhk={unit.bhk}
              projectName={unit.project_name}
              tower={unit.tower}
              unitNumber={unit.unit_number}
              facing={unit.facing}
              carpetArea={unit.carpet_area_sqft}
            />
          </div>
        ) : (
          /* ── ARCHITECTURAL CUTAWAY RENDER (PHOTO WITH HOTSPOTS & FULLSCREEN) ──────── */
          <div className="flex flex-col gap-3">
            {/* Interactive Image Container with Click-to-Fullscreen */}
            <div
              onClick={() => setFullScreenOpen(true)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[280px] sm:min-h-[380px] bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E4DC] flex items-center justify-center group shadow-inner cursor-zoom-in transition-all"
              title="Click to view full-screen architectural render"
            >
              {activeImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeImage}
                    alt={`${unit.project_name} ${unit.tower} ${currentPerspective.label}`}
                    className="w-full h-full object-cover sm:object-contain p-1 sm:p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Top Perspective Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 text-[#1c1b1b] text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-[#E8E4DC] shadow-xs backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
                    <span className="size-1.5 rounded-full bg-[#B08D57]" />
                    <span>{currentPerspective.label}</span>
                  </div>

                  {/* Hotspot callouts (shown on cutaway perspective) */}
                  {activePerspective === "cutaway" &&
                    currentLevel?.callouts &&
                    currentLevel.callouts.slice(0, 4).map((callout, calloutIdx) => (
                      <div
                        key={calloutIdx}
                        className="absolute pointer-events-none transition-all duration-300 z-10 hidden sm:block"
                        style={{
                          left: `${callout.x}%`,
                          top: `${callout.y}%`,
                        }}
                      >
                        <div className="relative flex items-center">
                          <span className="size-2 rounded-full bg-[#1c1b1b] ring-2 ring-white shadow" />
                          <span className="w-8 h-px bg-[#1c1b1b]/70" />
                          <span
                            className="text-[10px] md:text-[11px] text-[#1c1b1b] font-medium tracking-wide whitespace-nowrap pl-1 drop-shadow-sm select-none bg-white/85 px-1.5 py-0.5 rounded shadow-xs"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {callout.label}
                          </span>
                        </div>
                      </div>
                    ))}

                  {/* Click to expand full-screen pill button */}
                  <div className="absolute bottom-3 right-3 bg-[#1c1b1b]/80 hover:bg-[#1c1b1b] text-white text-[10.5px] tracking-wide font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md group-hover:scale-105 pointer-events-none">
                    <span className="material-symbols-outlined text-sm text-[#B08D57]">fullscreen</span>
                    <span>Click for Fullscreen</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center select-none w-full h-full relative">
                  <div className="size-14 rounded-full bg-white border border-[#E8E4DC] flex items-center justify-center text-[#B08D57] shadow-sm mb-3">
                    <span className="material-symbols-outlined text-2xl">view_in_ar</span>
                  </div>
                  <p
                    className="text-base font-normal text-[#1c1b1b] mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Architectural Drawing in Atelier
                  </p>
                  <p className="text-xs text-[#72716d] max-w-xs leading-relaxed">
                    High-resolution rendered drawing being finalized. Toggle to 3D Model above to orbit the residence.
                  </p>
                </div>
              )}
            </div>

            {/* Visual Perspective Selector with Fullscreen Trigger */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 pb-1 flex-wrap">
              {perspectives.map((p) => {
                const isSelected = activePerspective === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePerspective(p.id as any)}
                    className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#1c1b1b] text-white shadow-xs"
                        : "bg-[#FAF7F2] text-[#474741] border border-[#E8E4DC] hover:border-[#B08D57]"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-sm ${isSelected ? "text-[#B08D57]" : "text-[#72716d]"}`}>
                      {p.icon}
                    </span>
                    <span>{p.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => setFullScreenOpen(true)}
                className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer bg-white text-[#B08D57] border border-[#B08D57]/40 hover:bg-[#FAF7F2] shrink-0"
              >
                <span className="material-symbols-outlined text-sm">open_in_full</span>
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        )}

        {/* Caption below visual (Compact on mobile) */}
        <div className="pt-3 pb-1 text-center">
          <p
            className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider text-[#1c1b1b]"
            style={{ fontFamily: "'Cormorant Garant', serif" }}
          >
            {unit.project_name} — {unit.tower} — {unit.bhk ? `${unit.bhk} BHK` : "Custom Plot"}
          </p>
          <p className="text-[10.5px] sm:text-xs text-[#72716d] mt-0.5">
            Unit {unit.unit_number} · Carpet: {unit.carpet_area_sqft} sq.ft · Built-up: {unit.built_up_area_sqft} sq.ft · Facing: {unit.facing}
          </p>
        </div>

        {/* ── 4. ROOM DIMENSIONS SCHEDULE ─────────────────────────────── */}
        <div className="mt-3 pt-3 border-t border-[#E8E4DC]/70">
          {/* Mobile Accordion Toggle (Clean expandable pill) */}
          <button
            onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
            className="md:hidden w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E4DC] text-left cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2">
              <svg className="size-3.5 text-[#B08D57]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1c1b1b]">
                {currentLevel?.level_name || "Ground Floor"} Schedule ({currentLevel?.rooms?.length || 0} Rooms)
              </span>
            </div>
            <span className="material-symbols-outlined text-sm text-[#72716d]">
              {mobileAccordionOpen ? "expand_less" : "expand_more"}
            </span>
          </button>

          {/* Table Container */}
          <div className={`${mobileAccordionOpen ? "block mt-2.5" : "hidden"} md:block transition-all`}>
            <div className="hidden md:flex items-center gap-2 mb-3">
              <svg className="size-4 text-[#B08D57]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#1c1b1b]">
                {currentLevel?.level_name || "Ground Floor"} Dimensions Schedule
              </span>
            </div>

            {currentLevel?.rooms && currentLevel.rooms.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E4DC] text-[#72716d] text-[9.5px] sm:text-[10px] tracking-wider uppercase">
                      <th className="py-2 sm:py-2.5 font-medium">Room / Space</th>
                      <th className="py-2 sm:py-2.5 font-medium">Dimensions (Feet)</th>
                      <th className="py-2 sm:py-2.5 font-medium text-right">Metric (Meters)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]/40 text-[#1c1b1b]">
                    {currentLevel.rooms.map((room, roomIdx) => (
                      <tr key={roomIdx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-1.5 sm:py-2 font-medium">{room.name}</td>
                        <td className="py-1.5 sm:py-2 text-[#474741] font-mono text-[10.5px] sm:text-[11px]">
                          {room.dim_ft || "—"}
                        </td>
                        <td className="py-1.5 sm:py-2 text-[#72716d] text-right font-mono text-[10.5px] sm:text-[11px]">
                          {room.dim_m ? `(${room.dim_m})` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E4DC] text-[#72716d] text-[10px] tracking-wider uppercase">
                      <th className="py-2 font-medium">Room Name</th>
                      <th className="py-2 font-medium text-right">Dimension</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]/40 text-[#1c1b1b]">
                    {["Living & Dining Hall", "Kitchen & Store", "Master Suite", "Bedroom 2", "Balcony Deck"].map(
                      (rName) => (
                        <tr key={rName}>
                          <td className="py-2 font-medium">{rName}</td>
                          <td className="py-2 text-right text-[#72716d] font-mono text-[11px]">—</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 5. CONTAINER BOTTOM ACTION BAR ─────────────────────────────── */}
      <div className="px-6 md:px-8 py-4 bg-[#FAF7F2] border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-[#72716d]">
          <span className="font-semibold text-[#1c1b1b]">Locality:</span> {unit.locality} ·{" "}
          <span className="font-semibold text-[#1c1b1b]">Status:</span>{" "}
          <span className="text-emerald-600 font-semibold">{unit.status}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnquire}
            className="bg-[#B08D57] hover:bg-[#967645] text-white text-xs tracking-[0.2em] font-semibold py-3 px-8 rounded-lg uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer"
          >
            Enquire On This Residence
          </button>
        </div>
      </div>

      {/* ── 6. FULLSCREEN LIGHTBOX MODAL ─────────────────────────────────── */}
      {fullScreenOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in select-none"
          onClick={() => setFullScreenOpen(false)}
        >
          {/* Lightbox Top Controls Bar */}
          <div
            className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 text-white shrink-0 pb-3 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#B08D57] animate-pulse" />
              <div>
                <h4 className="text-sm sm:text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {unit.project_name} · {unit.tower} · Unit {unit.unit_number}
                </h4>
                <p className="text-[11px] text-white/60">
                  {currentPerspective.label} · {unit.carpet_area_sqft} sq.ft · Facing {unit.facing}
                </p>
              </div>
            </div>

            <button
              onClick={() => setFullScreenOpen(false)}
              className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-95"
              aria-label="Close Fullscreen"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Lightbox Center Image Viewport */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage || ""}
              alt={`${unit.project_name} ${currentPerspective.label} Fullscreen`}
              className="max-h-[76vh] max-w-[95vw] sm:max-w-[88vw] object-contain rounded-xl shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Lightbox Bottom Perspective Switcher */}
          <div
            className="w-full max-w-xl mx-auto flex items-center justify-center gap-2 pt-3 shrink-0 flex-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            {perspectives.map((p) => {
              const isSelected = activePerspective === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePerspective(p.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#B08D57] text-white shadow-lg scale-105"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/15"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
