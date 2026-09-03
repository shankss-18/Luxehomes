import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Locations — LUXEHOMES Hyderabad",
  description:
    "Curated enclaves of exclusivity in Kokapet (Neopolis), Financial District, Banjara Hills, and Jubilee Hills — offering seamless access to Western Hyderabad's finest hubs.",
};

const locations = [
  {
    name: "Kokapet (Neopolis Corridor)",
    badge: "Flagship Corridor",
    desc: "Hyderabad's most premium new-supply residential corridor, part of the HMDA-planned Neopolis master plan.",
    perks: [
      { icon: "directions_car",  text: "3 min drive to Outer Ring Road (ORR)" },
      { icon: "corporate_fare", text: "5 min drive to Financial District (Nanakramguda)" },
      { icon: "domain",         text: "8 min drive to Gachibowli IT Hub" },
      { icon: "currency_rupee",  text: "Avg Price: ₹12,800/sq.ft" },
    ],
    projects: "Flagship Residences & Plots",
    pin: { top: "50%", left: "38%" },
  },
  {
    name: "Financial District",
    badge: "Corporate Core",
    desc: "Walk-to-work culture amidst global tech conglomerates, US Consulate, and Waverock.",
    perks: [
      { icon: "business",       text: "2 min to Nanakramguda Tech Circle" },
      { icon: "local_hospital", text: "Continental Hospitals adjacent" },
    ],
    projects: "Commercial & Private Living",
    pin: { top: "40%", left: "65%" },
  },
  {
    name: "Banjara Hills",
    badge: "Heritage Prestige",
    desc: "The timeless benchmark of luxury living in leafy central Hyderabad.",
    perks: [
      { icon: "storefront",      text: "5 min to Luxury Retail & Dining" },
      { icon: "flight_takeoff",  text: "Direct access via PVNR Expressway" },
    ],
    projects: "Completed Heritage Portfolio",
    pin: { top: "45%", left: "30%" },
  },
  {
    name: "Jubilee Hills",
    badge: "Elite Topography",
    desc: "Elevated terrains offering panoramic vistas of Durgam Cheruvu.",
    perks: [
      { icon: "park",           text: "Overlooking protected green buffers" },
      { icon: "local_hospital", text: "5 min to Apollo Health City" },
    ],
    projects: "Private Estates",
    pin: { top: "32%", left: "55%" },
  },
];

export default function LocationsPage() {
  return (
    <main className="pt-[104px] min-h-screen flex flex-col md:flex-row">
      {/* ── Location List ────────────────────────────────────────────────── */}
      <section className="w-full md:w-5/12 lg:w-1/3 bg-surface z-10 flex flex-col shadow-[30px_0_60px_-15px_rgba(20,19,15,0.05)] border-r border-ghost relative">
        {/* Header */}
        <div className="px-margin-mobile md:px-12 py-12 md:py-16 flex-shrink-0">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57] block mb-2">
            Western Hyderabad Corridors
          </span>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">
            Prime Locations
          </h1>
          <p className="font-body-lg text-sm text-on-surface-variant max-w-sm leading-relaxed">
            Curated enclaves of exclusivity anchored by the flagship Neopolis corridor in Kokapet.
          </p>
          <div className="w-12 h-px bg-brass mt-6" />
        </div>

        {/* Location Items */}
        <div className="flex-grow overflow-y-auto px-margin-mobile md:px-12 pb-24 space-y-8">
          {locations.map(({ name, badge, desc, perks }) => (
            <div key={name} className="group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-xl text-on-surface group-hover:text-brass transition-colors duration-300">
                  {name}
                </h3>
                <span className="font-label-caps text-[10px] uppercase bg-surface-variant text-on-surface px-2 py-1 rounded-sm font-semibold">
                  {badge}
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-4 leading-relaxed">{desc}</p>
              <ul className="space-y-2 mb-6 border-l border-ghost pl-4">
                {perks.map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-brass text-base">
                      {icon}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="h-px w-full bg-ghost group-hover:bg-brass transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Map View ────────────────────────────────────────────────────── */}
      <section className="w-full md:w-7/12 lg:w-2/3 h-[614px] md:h-auto relative bg-surface-container-low">
        {/* Map Background */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundColor: "#f4f1ea",
            backgroundImage: "radial-gradient(#e5e2d8 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50"
          alt="Stylized map of Western Hyderabad and Kokapet"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBOZwk_BVhVxWN5j8WOo2X9yE6qWjAd9HIaB2Sv_SYPR1u5uWsNgQkpm8tTe5ELGNUwUHOFvHFpppv0Jwc-6HsTCLbNCDhukYxIK2VerMsahKFAOV-4_tLpiVojS1qb6jIb7esd9nf2Xmcs8abnMcKBwy6pqq_qTVzAYcwRpVX3iaW_BnANcx20Wm9TooeVAdr8urzd06odowB7iruz4JQ82PM9WsYtHuw3-RPT5HwUtZgHk696CmD"
        />

        {/* Map Pins */}
        {locations.map(({ name, projects, pin }, i) => (
          <div
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-8 h-8 rounded-full border border-brass map-pulse"
                style={{ animationDelay: `${i * 0.7}s` }}
              />
              <div className="w-3.5 h-3.5 bg-brass rounded-full shadow-[0_0_15px_rgba(176,141,87,0.5)] border-2 border-white" />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
              <div className="glass-card px-4 py-3 min-w-[220px] rounded shadow-xl">
                <h4 className="font-headline-md text-base text-on-surface mb-0.5">{name}</h4>
                <p className="font-label-caps text-[10px] text-brass uppercase font-semibold">{projects}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
          {["add", "remove"].map((icon) => (
            <button
              key={icon}
              className="w-10 h-10 glass-card flex items-center justify-center text-on-surface hover:text-brass transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-base">{icon}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
