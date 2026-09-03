"use client";

import React, { useState } from "react";
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

  // Store uploaded custom renderings
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(true);

  const handleImageUpload = (levelName: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const key = `${unit.project_name}_${unit.tower}_${levelName}`;
      setUploadedImages((prev) => ({ ...prev, [key]: url }));
      setViewMode("render"); // Auto-switch to render to view upload
    };
    reader.readAsDataURL(file);
  };

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

  const imageKey = `${unit.project_name}_${unit.tower}_${currentLevel?.level_name}`;
  const activeImage = uploadedImages[imageKey] || unit.floor_plan_image || null;

  return (
    /* ── SINGLE UNIFIED CONTAINER ───────────────────────────────────────── */
    <div className="w-full bg-white rounded-2xl md:rounded-3xl border border-[#E8E4DC] shadow-xl overflow-hidden flex flex-col transition-all duration-300">
      
      {/* ── 1. TOP HEADER & PRICING METRICS BAR ─────────────────────────── */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-white to-[#FAF7F2]/50 border-b border-[#E8E4DC]">
        {/* Top Identity Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E8E4DC]/70">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#B08D57] animate-pulse" />
            <span
              className="text-[#1c1b1b] text-base md:text-lg font-medium tracking-tight"
              style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.25rem" }}
            >
              {unit.project_name} · {unit.tower} · Unit {unit.unit_number}
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#B08D57]/10 text-[#B08D57] border border-[#B08D57]/25">
              {unit.bhk ? `${unit.bhk} BHK Residence` : "Luxury Estate"}
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
      <div className="px-6 md:px-8 py-3.5 bg-[#FAF7F2] border-b border-[#E8E4DC] flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Left: Level Selectors & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
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
              <span className="font-semibold text-xs tracking-[0.2em] uppercase text-[#B08D57]">
                {currentLevel?.level_name || "GROUND FLOOR"}
              </span>
            </div>
          )}

          {/* View Mode Toggle: 3D Model vs. High-Res Render */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E8E4DC] shadow-xs">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "3d"
                  ? "bg-[#B08D57] text-white shadow-xs"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">view_in_ar</span>
              <span>3D Interactive Model</span>
            </button>
            <button
              onClick={() => setViewMode("render")}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "render"
                  ? "bg-[#1c1b1b] text-white shadow-xs"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">photo</span>
              <span>Architectural Render</span>
            </button>
          </div>
        </div>

        {/* Right: Upload Custom Render Trigger */}
        <label
          className="cursor-pointer inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#72716d] hover:text-[#B08D57] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#E8E4DC] shadow-xs"
          title="Upload / replace rendering"
        >
          <span className="material-symbols-outlined text-sm text-[#B08D57]">upload</span>
          <span className="hidden sm:inline">Upload Custom Render</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0] && currentLevel) {
                handleImageUpload(currentLevel.level_name, e.target.files[0]);
              }
            }}
          />
        </label>
      </div>

      {/* ── 3. CENTER 3D STAGE VIEWPORT ─────────────────────────────────── */}
      <div className="p-4 md:p-8 bg-white">
        {viewMode === "3d" ? (
          /* ── 3D INTERACTIVE THREE.JS MODEL ──────────────────────────── */
          <div className="w-full">
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
          /* ── ARCHITECTURAL CUTAWAY RENDER (PHOTO WITH HOTSPOTS) ──────── */
          <div className="relative w-full aspect-[16/10] bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E4DC] flex items-center justify-center group">
            {activeImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage}
                  alt={`${unit.project_name} ${unit.tower} ${currentLevel?.level_name} Floor Plan`}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Hotspot callouts */}
                {currentLevel?.callouts &&
                  currentLevel.callouts.slice(0, 5).map((callout, calloutIdx) => (
                    <div
                      key={calloutIdx}
                      className="absolute pointer-events-none transition-all duration-300 z-10"
                      style={{
                        left: `${callout.x}%`,
                        top: `${callout.y}%`,
                      }}
                    >
                      <div className="relative flex items-center">
                        <span className="size-2 rounded-full bg-[#1c1b1b] ring-2 ring-white shadow" />
                        <span className="w-8 h-px bg-[#1c1b1b]/70" />
                        <span
                          className="text-[10px] md:text-[11px] text-[#1c1b1b] font-medium tracking-wide whitespace-nowrap pl-1 drop-shadow-sm select-none"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {callout.label}
                        </span>
                      </div>
                    </div>
                  ))}
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
        )}

        {/* Caption below visual */}
        <div className="pt-4 pb-2 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1c1b1b]"
            style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem" }}
          >
            {unit.project_name} — {unit.tower} — {unit.bhk ? `${unit.bhk} BHK` : "Custom Plot"}
          </p>
          <p className="text-xs text-[#72716d] mt-0.5">
            Unit {unit.unit_number} · Carpet: {unit.carpet_area_sqft} sq.ft · Built-up: {unit.built_up_area_sqft} sq.ft · Facing: {unit.facing}
          </p>
        </div>

        {/* ── 4. ROOM DIMENSIONS SCHEDULE ─────────────────────────────── */}
        <div className="mt-4 pt-4 border-t border-[#E8E4DC]/70">
          {/* Mobile Accordion Toggle */}
          <button
            onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
            className="md:hidden w-full flex items-center justify-between py-2 text-left"
          >
            <div className="flex items-center gap-2">
              <svg className="size-4 text-[#B08D57]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#1c1b1b]">
                {currentLevel?.level_name || "Ground Floor"} Dimensions Schedule
              </span>
            </div>
            <span className="material-symbols-outlined text-sm text-[#72716d]">
              {mobileAccordionOpen ? "expand_less" : "expand_more"}
            </span>
          </button>

          {/* Table Container */}
          <div className={`${mobileAccordionOpen ? "block" : "hidden"} md:block transition-all`}>
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
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E4DC] text-[#72716d] text-[10px] tracking-wider uppercase">
                      <th className="py-2.5 font-medium">Room / Space</th>
                      <th className="py-2.5 font-medium">Dimensions (Feet)</th>
                      <th className="py-2.5 font-medium text-right">Metric (Meters)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]/40 text-[#1c1b1b]">
                    {currentLevel.rooms.map((room, roomIdx) => (
                      <tr key={roomIdx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-2.5 font-medium">{room.name}</td>
                        <td className="py-2.5 text-[#474741] font-mono text-[11px]">
                          {room.dim_ft || "—"}
                        </td>
                        <td className="py-2.5 text-[#72716d] text-right font-mono text-[11px]">
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
    </div>
  );
}
