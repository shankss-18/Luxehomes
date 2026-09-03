import type { Metadata } from "next";
import Link from "next/link";
import propertiesData from "@/data/properties.json";

export const metadata: Metadata = {
  title: "Curated Residences — LUXEHOMES Hyderabad",
  description:
    "Explore our portfolio of 15 exclusive residences across 6 Hyderabad localities: Kokapet Neopolis, Financial District, Gachibowli, Banjara Hills, Jubilee Hills, and Tellapur.",
};

export default function PropertiesPage() {
  const units = propertiesData.units;

  return (
    <main className="pt-[104px] pb-section-v-padding max-w-content mx-auto px-margin-mobile md:px-margin-desktop">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="py-stack-lg border-b border-outline-variant/30 mb-stack-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="size-2 rounded-full bg-[#B08D57]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            15 Exclusive Residences · 6 Hyderabad Localities
          </span>
        </div>
        <h1 className="font-display-lg text-display-lg md:text-[64px] text-on-surface mb-stack-sm leading-tight">
          Curated Residences
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Explore our real estate portfolio anchored in Kokapet&apos;s HMDA Neopolis corridor, Financial District, and premier enclaves across Western Hyderabad.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* ── Filter Sidebar ─────────────────────────────────────────── */}
        <aside className="w-full lg:w-1/4 flex-shrink-0 mb-stack-lg lg:mb-0">
          <div className="glass-panel p-stack-md rounded-lg sticky top-[120px]">
            <h3 className="font-label-caps text-label-caps uppercase text-on-surface mb-stack-md border-b border-outline-variant/50 pb-2">
              Refine Search
            </h3>
            <div className="space-y-stack-md">
              {/* Corridor / Locality */}
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
                  Corridor / Locality
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    "Kokapet (Neopolis)",
                    "Financial District",
                    "Gachibowli",
                    "Banjara Hills",
                    "Jubilee Hills",
                    "Tellapur",
                  ].map((loc, i) => (
                    <div key={loc} className="flex items-center justify-between text-[#474741]">
                      <span>{loc}</span>
                      <span className="text-[#B08D57] font-semibold text-[11px]">
                        {units.filter((u) => u.locality.includes(loc.split(" ")[0])).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
                  Configuration
                </label>
                <div className="flex flex-wrap gap-2">
                  {["2 BHK", "3 BHK", "4 BHK", "Plots"].map((cfg) => (
                    <span
                      key={cfg}
                      className="px-3 py-1 border rounded-full text-xs border-outline-variant text-[#1c1b1b] font-medium"
                    >
                      {cfg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Calculation Base */}
              <div className="pt-2 border-t border-outline-variant/30">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#72716d] block mb-1">
                  Corridor Benchmark
                </span>
                <p className="text-sm font-semibold text-[#B08D57]">₹12,800/sq.ft (Avg Kokapet)</p>
                <p className="text-[11px] text-[#72716d] mt-1">Carpet areas verified per HMDA guidelines.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Property Grid ──────────────────────────────────────────── */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {units.map((u, idx) => {
              const isFeatured = idx === 0 || idx === 8;
              return (
                <article
                  key={u.id}
                  className={`${
                    isFeatured ? "md:col-span-2" : ""
                  } group relative overflow-hidden rounded-lg ghost-border bg-white shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`${
                      isFeatured ? "aspect-[21/9]" : "aspect-[16/10]"
                    } w-full overflow-hidden bg-[#FAF7F2] relative border-b border-[#E8E4DC]`}
                  >
                    {/* Visual pattern / background */}
                    <div
                      className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      style={{
                        backgroundImage:
                          idx % 2 === 0
                            ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTSb6angQ7EmFDDTOUg5zzRs1sw6A7DR0GRB0MP86xPN-ntQCbTMBUV4PGOMv90YJ38eOEL36kt-GSKVbeGq_0l4PpyOA8g3nOfADhyisPiwua3wD9VpuIZqF2kBHLRMFSjgFI4ehYA_25xzUWtO3bNnLJAsg4d5cjusYK446d_vfKNjaYBlUy0JfZZYW5v7cU8T5eouxna1tCHQQDWQxK8PJj8jojVNWfdCL0BKt5LiCh13JW7W8w')"
                            : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDCu-HMzEcDprEJAVGwghj0Qq7a_vDEIcwBPIde5FgnlxpqmuAEILp5JOkBQLcFRxCRlZo5d7cPP_NAtQkBum4nxq2vkb0L8XGHdX8JTIly2B3bh3MrBdmQvwc1RFoHS3XkLM-RyPbzoOiiAclqtwCsPWbG5dufotRwfviR20y43mpJm4UHqXF1FoSq6AJUVv-cpk3W7FFwT1EwEF2ipQgn2d3U66Lvci_-Igaq0UJrLq9eqDdUUPx')",
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 font-label-caps text-[10px] uppercase rounded text-white tracking-wider shadow bg-[#B08D57]">
                        {u.type.toUpperCase()} · {u.tower}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-sm">
                      Facing: {u.facing}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                      <div>
                        <h2 className="font-headline-md text-2xl mb-1 text-on-surface group-hover:text-[#B08D57] transition-colors">
                          {u.project_name} — {u.tower}
                        </h2>
                        <p className="font-body-md text-sm text-on-surface-variant">
                          {u.locality}
                        </p>
                        <p className="font-body-md text-xs text-[#72716d] mt-1">
                          {u.bhk ? `${u.bhk} BHK` : "Freehold Plot"} • Carpet: {u.carpet_area_sqft} sq.ft
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-[11px] text-[#72716d] uppercase tracking-wider">Calculated Price</p>
                        <p className="text-xl font-normal text-[#B08D57]" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {u.display_price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                      <Link
                        href={`/properties/${u.id}`}
                        className="text-xs font-semibold uppercase tracking-widest text-[#1c1b1b] hover:text-[#B08D57] transition-colors inline-flex items-center gap-1"
                      >
                        View Specifications
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                      <Link
                        href="/#collections"
                        className="text-xs font-semibold uppercase tracking-widest text-[#B08D57] hover:underline"
                      >
                        Inspect Floor Plan
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
