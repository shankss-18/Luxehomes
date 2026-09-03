import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import propertiesData from "@/data/properties.json";
import IsometricFloorPlanViewer, { UnitData } from "@/components/IsometricFloorPlanViewer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return propertiesData.units.map((unit) => ({
    id: unit.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const unit = propertiesData.units.find((u) => u.id === id) || propertiesData.units[0];
  return {
    title: `${unit.project_name} (${unit.tower}) — ${unit.bhk ? `${unit.bhk} BHK` : "Plot"} | LUXEHOMES Hyderabad`,
    description: `Explore the specifications, carpet area (${unit.carpet_area_sqft} sq.ft), and isometric floor plan of ${unit.project_name} in ${unit.locality}.`,
  };
}

export default async function UnitDetailPage({ params }: PageProps) {
  const { id } = await params;
  const unit = (propertiesData.units as UnitData[]).find((u) => u.id === id) || propertiesData.units[0];

  const specs = [
    { icon: "floor", title: "Imported Italian Marble", desc: "Seamless Italian marble flooring across living, dining, and internal corridors, exuding timeless quiet luxury." },
    { icon: "ac_unit", title: "VRV Central Climate Control", desc: "Energy-efficient concealed VRV air conditioning infrastructure for whisper-quiet thermal balance." },
    { icon: "smart_toy", title: "Smart Biometric Automation", desc: "State-of-the-art home automation with biometric keyless entry, motorized blind channels, and video security." },
    { icon: "balcony", title: "Panoramic Balcony Deck", desc: "Expansive private deck framing unobstructed perspectives of the Neopolis and Western Hyderabad corridors." },
  ];

  return (
    <main className="pt-[104px] pb-16 bg-luxury-pattern-subtle min-h-screen">
      {/* ── Breadcrumb & Back Navigation ─────────────────────────────────── */}
      <div className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#72716d] hover:text-[#B08D57] transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Curated Residences
        </Link>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center py-12 overflow-hidden bg-[#FAF7F2] border-y border-[#E8E4DC]">
        <div className="relative z-10 max-w-content mx-auto px-margin-mobile md:px-margin-desktop w-full text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E4DC] text-xs uppercase tracking-widest text-[#B08D57] font-semibold mb-4">
            <span className="size-1.5 rounded-full bg-[#B08D57]" />
            <span>{unit.locality}</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1c1b1b] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {unit.project_name} — {unit.tower}
          </h1>

          <p className="text-sm md:text-base text-[#72716d] max-w-2xl mx-auto mb-8 leading-relaxed">
            Unit {unit.unit_number} · {unit.bhk ? `${unit.bhk} BHK Luxury Residence` : "Freehold Custom Plot"} · 100% Vastu Compliant with {unit.facing} facing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Configuration", value: unit.bhk ? `${unit.bhk} BHK (${unit.type})` : "Villa Plot" },
              { label: "Carpet Area", value: `${unit.carpet_area_sqft} sq.ft` },
              { label: "Orientation", value: `${unit.facing} Facing` },
              { label: "Calculated Band", value: unit.display_price },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white p-4 rounded-xl border border-[#E8E4DC] shadow-sm">
                <span className="block text-[10px] uppercase font-semibold text-[#72716d] tracking-wider mb-0.5">
                  {label}
                </span>
                <span className="block text-base md:text-lg font-semibold text-[#1c1b1b]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Floor Plan Isometric Section ─────────────────────────────────── */}
      <section className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
            Architectural Engineering
          </span>
          <h2
            className="text-2xl md:text-3xl font-normal text-[#1c1b1b]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Isometric 3D Cutaway &amp; Dimensional Schedule
          </h2>
          <p className="text-xs md:text-sm text-[#72716d] mt-1">
            {unit.project_name} — {unit.tower} — {unit.bhk ? `${unit.bhk} BHK` : "Custom Plot"}
          </p>
        </div>

        <IsometricFloorPlanViewer unit={unit} />
      </section>

      {/* ── Curated Specifications ───────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-8 border-t border-[#E8E4DC]">
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-normal text-[#1c1b1b] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Curated Specifications
          </h2>
          <div className="w-12 h-px bg-[#B08D57] mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-6 border border-[#E8E4DC] bg-white rounded-xl shadow-sm"
            >
              <span className="material-symbols-outlined text-[#B08D57] mb-3 block text-2xl">
                {icon}
              </span>
              <h3 className="text-sm font-semibold text-[#1c1b1b] mb-1.5">{title}</h3>
              <p className="text-xs text-[#72716d] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Schedule CTA ─────────────────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop mt-8">
        <div className="bg-[#1c1b1b] text-white p-8 md:p-12 rounded-2xl text-center flex flex-col items-center">
          <h2
            className="text-2xl md:text-3xl font-normal mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Schedule a Private Site Inspection
          </h2>
          <p className="text-xs md:text-sm text-white/70 max-w-lg mb-6 leading-relaxed">
            Experience the Neopolis corridor and inspect {unit.project_name} first-hand with our senior advisory team.
          </p>
          <Link
            href="/contact"
            className="bg-[#B08D57] hover:bg-[#967645] text-white text-xs tracking-[0.2em] font-semibold py-3.5 px-8 rounded uppercase transition-all shadow-md"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
