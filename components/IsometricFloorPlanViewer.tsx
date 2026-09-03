"use client";

import { useState } from "react";

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
  // Store uploaded images per level using key: project_name + tower + level_name
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<Record<string, boolean>>({});

  const handleImageUpload = (levelName: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const key = `${unit.project_name}_${unit.tower}_${levelName}`;
      setUploadedImages((prev) => ({ ...prev, [key]: url }));
    };
    reader.readAsDataURL(file);
  };

  const toggleAccordion = (levelName: string) => {
    setMobileAccordionOpen((prev) => ({
      ...prev,
      [levelName]: !prev[levelName],
    }));
  };

  const isMultiLevel = unit.levels.length > 1;

  // —— Computed pricing ——
  const pricePerSqFt = unit.total_price_inr && unit.built_up_area_sqft
    ? Math.round(unit.total_price_inr / unit.built_up_area_sqft)
    : null;
  const pricePerSqYard = pricePerSqFt ? Math.round(pricePerSqFt * 9) : null;

  // —— Facing compass ——
  const facingAngles: Record<string, number> = {
    "North": 0, "North-East": 45, "East": 90, "South-East": 135,
    "South": 180, "South-West": 225, "West": 270, "North-West": 315,
  };
  const facingAngle = facingAngles[unit.facing] ?? 0;

  const compassDirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  void compassDirs;
  const facingShort = unit.facing.split("-").map((w) => w[0]).join("");
  void facingShort;

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ── PRICING METRICS BANNER ───────────────────────────────────── */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-wrap gap-4 items-start justify-between">

          {/* Pricing grid */}
          <div className="flex flex-wrap gap-6">
            {/* Total Price */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#72716d] mb-0.5">Total Price</p>
              <p className="font-light text-2xl text-[#B08D57]" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                {unit.display_price}
              </p>
            </div>
            {/* Per sq.ft */}
            {pricePerSqFt && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#72716d] mb-0.5">Rate / sq.ft</p>
                <p className="font-light text-2xl text-[#1c1b1b]" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                  ₹{pricePerSqFt.toLocaleString("en-IN")}
                </p>
              </div>
            )}
            {/* Per sq.yard */}
            {pricePerSqYard && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#72716d] mb-0.5">Rate / sq.yard</p>
                <p className="font-light text-2xl text-[#1c1b1b]" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                  ₹{pricePerSqYard.toLocaleString("en-IN")}
                </p>
              </div>
            )}
            {/* Carpet area */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#72716d] mb-0.5">Carpet Area</p>
              <p className="font-light text-2xl text-[#1c1b1b]" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                {unit.carpet_area_sqft} sq.ft
              </p>
            </div>
          </div>

          {/* Facing Compass */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#72716d]">Facing</p>
            {/* Compass circle */}
            <div className="relative w-20 h-20">
              {/* Outer ring */}
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <circle cx="40" cy="40" r="38" fill="#FAF7F2" stroke="#E8E4DC" strokeWidth="1.5" />
                {/* Cardinal direction labels */}
                <text x="40" y="9" textAnchor="middle" fontSize="7" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="600">N</text>
                <text x="71" y="43" textAnchor="middle" fontSize="7" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="600">E</text>
                <text x="40" y="76" textAnchor="middle" fontSize="7" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="600">S</text>
                <text x="9" y="43" textAnchor="middle" fontSize="7" fill="#72716d" fontFamily="Inter, sans-serif" fontWeight="600">W</text>
                {/* Tick marks */}
                {[0,45,90,135,180,225,270,315].map((deg) => {
                  const rad = (deg - 90) * Math.PI / 180;
                  const x1 = 40 + 32 * Math.cos(rad);
                  const y1 = 40 + 32 * Math.sin(rad);
                  const x2 = 40 + 36 * Math.cos(rad);
                  const y2 = 40 + 36 * Math.sin(rad);
                  return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8E4DC" strokeWidth="1" />;
                })}
                {/* Gold needle pointing to facing */}
                {(() => {
                  const rad = (facingAngle - 90) * Math.PI / 180;
                  const tipX = 40 + 26 * Math.cos(rad);
                  const tipY = 40 + 26 * Math.sin(rad);
                  const tailX = 40 - 14 * Math.cos(rad);
                  const tailY = 40 - 14 * Math.sin(rad);
                  return (
                    <>
                      <line x1={tailX} y1={tailY} x2={tipX} y2={tipY} stroke="#B08D57" strokeWidth="2" strokeLinecap="round" />
                      <circle cx={tipX} cy={tipY} r="3" fill="#B08D57" />
                      <circle cx="40" cy="40" r="3.5" fill="white" stroke="#B08D57" strokeWidth="1.5" />
                    </>
                  );
                })()}
              </svg>
            </div>
            {/* Facing label badge */}
            <span className="bg-[#B08D57] text-white text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full">
              {unit.facing}
            </span>
          </div>
        </div>

        {/* Bottom: unit identity */}
        <div className="mt-4 pt-4 border-t border-[#E8E4DC]/70 flex flex-wrap gap-3 text-[11px] text-[#72716d]">
          <span><span className="font-semibold text-[#1c1b1b]">Project:</span> {unit.project_name}</span>
          <span>·</span>
          <span><span className="font-semibold text-[#1c1b1b]">Tower:</span> {unit.tower}</span>
          <span>·</span>
          <span><span className="font-semibold text-[#1c1b1b]">Unit:</span> {unit.unit_number}</span>
          <span>·</span>
          <span><span className="font-semibold text-[#1c1b1b]">Built-up:</span> {unit.built_up_area_sqft} sq.ft</span>
          <span>·</span>
          <span className={`font-semibold ${ unit.status === "Available" ? "text-emerald-600" : "text-orange-500" }`}>{unit.status}</span>
        </div>
      </div>
      {/* ── Floor Plan Panels (Desktop: Side-by-side / Mobile: Stacked) ── */}
      <div
        className={`grid gap-8 ${
          isMultiLevel
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {unit.levels.map((level, levelIdx) => {
          const imageKey = `${unit.project_name}_${unit.tower}_${level.level_name}`;
          const activeImage = uploadedImages[imageKey] || unit.floor_plan_image || null;
          const isAccordionOpen = mobileAccordionOpen[level.level_name] ?? false;

          return (
            <div
              key={level.level_name}
              className="flex flex-col bg-white rounded-2xl border border-[#E8E4DC] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* ── Level Badge / Page Marker ───────────────────────── */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E4DC]/60">
                <div className="flex items-center gap-2.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08D57]" />
                  <span className="font-semibold text-xs tracking-[0.22em] uppercase text-[#B08D57]">
                    {level.level_name}
                  </span>
                  {isMultiLevel && (
                    <span className="text-[11px] text-[#72716d] font-medium tracking-wider">
                      (Level {levelIdx + 1} of {unit.levels.length})
                    </span>
                  )}
                </div>

                {/* Upload Slot Trigger for Architect/3D Artist renders */}
                <label
                  className="cursor-pointer inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#72716d] hover:text-[#B08D57] transition-colors"
                  title="Upload / replace isometric rendering"
                >
                  <span className="material-symbols-outlined text-sm">upload</span>
                  <span className="hidden sm:inline">Upload Render</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(level.level_name, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>

              {/* ── Isometric 3D Cutaway Stage ────────────────────────── */}
              <div className="relative w-full aspect-[16/10] bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#E8E4DC] flex items-center justify-center group">
                {activeImage ? (
                  <>
                    {/* Rendered 3D Isometric Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeImage}
                      alt={`${unit.project_name} ${unit.tower} ${level.level_name} Isometric 3D Floor Plan`}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Minimal Labeled Annotations on Image */}
                    {level.callouts &&
                      level.callouts.slice(0, 5).map((callout, calloutIdx) => (
                        <div
                          key={calloutIdx}
                          className="absolute pointer-events-none transition-all duration-300 z-10"
                          style={{
                            left: `${callout.x}%`,
                            top: `${callout.y}%`,
                          }}
                        >
                          {/* Dot marker */}
                          <div className="relative flex items-center">
                            <span className="size-2 rounded-full bg-[#1c1b1b] ring-2 ring-white shadow" />
                            {/* Thin leader line */}
                            <span className="w-8 h-px bg-[#1c1b1b]/70" />
                            {/* Small caption in charcoal (no boxes/bubbles as specified) */}
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
                  /* ── Clean "Floor plan rendering pending" Placeholder State ── */
                  <div className="flex flex-col items-center justify-center p-8 text-center select-none w-full h-full relative">
                    {/* Architectural Grid Watermark */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(#C8C7BE 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />

                    {/* Isometric Cube / Architectural Glyph */}
                    <div className="relative z-10 size-14 rounded-full bg-white border border-[#E8E4DC] flex items-center justify-center text-[#B08D57] shadow-sm mb-3">
                      <svg
                        className="size-7 text-[#B08D57]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        />
                      </svg>
                    </div>

                    <p
                      className="relative z-10 text-sm md:text-base font-normal text-[#1c1b1b] mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Floor Plan Rendering Pending
                    </p>
                    <p className="relative z-10 text-xs text-[#72716d] max-w-xs leading-relaxed">
                      Architectural 3D isometric cutaway model currently in preparation by design atelier.
                    </p>

                    {/* Preview Annotations Template */}
                    {level.callouts && level.callouts.length > 0 && (
                      <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
                        {level.callouts.slice(0, 3).map((callout, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-[10px] text-[#72716d] bg-white/80 border border-[#E8E4DC] px-2.5 py-1 rounded"
                          >
                            <span className="size-1 rounded-full bg-[#B08D57]" />
                            {callout.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Floor Plan Caption Beneath Visual ─────────────────── */}
              <div className="pt-3 pb-2 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1c1b1b]">
                  {unit.project_name} — {unit.tower} — {unit.bhk ? `${unit.bhk} BHK` : "Custom Plot"}
                </p>
                <p className="text-[11px] text-[#72716d] mt-0.5">
                  Unit {unit.unit_number} · Carpet: {unit.carpet_area_sqft} sq.ft · Facing: {unit.facing}
                </p>
              </div>

              {/* ── Room Dimensions Table / Mobile Accordion ──────────── */}
              <div className="mt-4 pt-4 border-t border-[#E8E4DC]/70">
                {/* Mobile Accordion Toggle Button */}
                <button
                  onClick={() => toggleAccordion(level.level_name)}
                  className="md:hidden w-full flex items-center justify-between py-2 text-left"
                >
                  <div className="flex items-center gap-2">
                    <svg className="size-4 text-[#B08D57]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                    </svg>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#1c1b1b]">
                      {level.level_name} Dimensions
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#72716d]">
                    {isAccordionOpen ? "expand_less" : "expand_more"}
                  </span>
                </button>

                {/* Table Container (Visible on Desktop, Collapsible on Mobile) */}
                <div
                  className={`${
                    isAccordionOpen ? "block" : "hidden"
                  } md:block transition-all`}
                >
                  {/* Section Heading with brand glyph */}
                  <div className="hidden md:flex items-center gap-2 mb-3">
                    <svg className="size-4 text-[#B08D57]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                    </svg>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#1c1b1b]">
                      {level.level_name}
                    </span>
                  </div>

                  {level.rooms && level.rooms.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E8E4DC] text-[#72716d] text-[10px] tracking-wider uppercase">
                            <th className="py-2 font-medium">Room / Space</th>
                            <th className="py-2 font-medium">Dimensions (Feet)</th>
                            <th className="py-2 font-medium text-right">Metric (Meters)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E4DC]/40 text-[#1c1b1b]">
                          {level.rooms.map((room, roomIdx) => (
                            <tr key={roomIdx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                              <td className="py-2 font-medium">{room.name}</td>
                              <td className="py-2 text-[#474741] font-mono text-[11px]">
                                {room.dim_ft || "—"}
                              </td>
                              <td className="py-2 text-[#72716d] text-right font-mono text-[11px]">
                                {room.dim_m ? `(${room.dim_m})` : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* Default room names with blank/"—" if dimensions aren't in data */
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E8E4DC] text-[#72716d] text-[10px] tracking-wider uppercase">
                            <th className="py-2 font-medium">Room Name</th>
                            <th className="py-2 font-medium text-right">Dimension</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E4DC]/40 text-[#1c1b1b]">
                          {["Living Room", "Kitchen", "Master Bedroom", "Bedroom 2", "Bathroom", "Balcony"].map(
                            (rName) => (
                              <tr key={rName}>
                                <td className="py-1.5 font-medium">{rName}</td>
                                <td className="py-1.5 text-right text-[#72716d]">—</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <p className="text-[10px] text-[#72716d] italic mt-2">
                        * Dimensions pending interior architect drawings
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Actions Row ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E4DC]">
        <div className="text-xs text-[#72716d]">
          <span className="font-semibold text-[#1c1b1b]">Locality:</span> {unit.locality} ·{" "}
          <span className="font-semibold text-[#1c1b1b]">Status:</span> {unit.status}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnquire}
            className="bg-[#B08D57] hover:bg-[#967645] text-white text-xs tracking-[0.18em] font-semibold py-3 px-6 rounded uppercase transition-colors shadow-sm cursor-pointer"
          >
            Enquire On This Layout
          </button>
        </div>
      </div>
    </div>
  );
}
