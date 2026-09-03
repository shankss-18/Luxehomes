import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Heritage & Trust — LUXEHOMES",
  description:
    "For over two decades, LuxeHomes has redefined the landscape of luxury real estate in India. Architecting elegance for a discerning few.",
};

export default function AboutPage() {
  return (
    <main className="pt-[100px] md:pt-[120px]">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-section-v-padding text-center">
        <p className="font-label-caps text-label-caps text-primary uppercase mb-stack-md tracking-widest">
          Our Heritage &amp; Trust
        </p>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg text-on-surface max-w-4xl mx-auto mb-stack-lg">
          Architecting Elegance for a Discerning Few.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          For over two decades, LuxeHomes has redefined the landscape of luxury real estate in India.
          We do not just build properties; we curate legacies rooted in serene sophistication and
          uncompromising craftsmanship.
        </p>
        <div className="w-16 h-px bg-[#B08D57] mx-auto mt-section-v-padding" />
      </section>

      {/* ── Heritage Narrative ──────────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-section-v-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          {/* Text */}
          <div className="md:col-span-5 md:pr-12">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">
              A 20-Year Legacy of Quiet Luxury
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              Our journey began with a singular vision: to create sanctuaries that offer an escape from
              the ordinary. Through a fusion of editorial minimalism and deep respect for natural
              materials, every LuxeHomes residence tells a story of heritage and trust.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              We source the finest materials globally, partnering with visionary architects who
              understand that true luxury whispers, rather than shouts. Our commitment to quality is
              evident in every tactile surface and flooded light corridor.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center font-button text-button text-primary hover:text-on-surface transition-colors border-b border-primary pb-1"
            >
              Explore Our Masterpieces{" "}
              <span className="material-symbols-outlined ml-2" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Image Grid */}
          <div className="md:col-span-7 grid grid-cols-2 gap-stack-md mt-stack-lg md:mt-0">
            <div className="col-span-2 h-80 relative rounded-DEFAULT overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Architectural exterior"
                className="w-full h-full object-cover filter grayscale opacity-90 transition-transform duration-700 hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrBdPj9oxtI9eBHXHVpAcaTAr33Y36nn5EGz4-TulcAC7JtGbmaCIu5Opkv4vHLqGPYBNJjRueiqJQmTd_wGTreZGlm9dpGxpNfLbAFrxRZpCc0MzW-TJwpKraMHYgTrCr20RoSRAvOIEwKU-b1tgBkdMbeRUzLbrrSWdmqU0USymV9RMm2CzQtZFa0GVS7d9-CDmi2p1dmQekILGVn6WrdjCkT13uIlOMMqahvRlY3QOezDei7LN8"
              />
              <div className="absolute inset-0 border border-[#FAF7F2]/20 pointer-events-none" />
            </div>
            <div className="h-64 relative rounded-DEFAULT overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Material details"
                className="w-full h-full object-cover filter grayscale opacity-90 transition-transform duration-700 hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuDd8t1guXUoAtzqFeiDaYSAy7e-dt18VV0BmW2S1XSFCKoL5JFauHruyRrTnhPvaqXVrhBcYJC8E4m-d2G52zg3cJywZr9rCxh5N8Nbx4CfT1zH3K1_rqpzHyOqwEQYa8QVQYNKg2d7dppm2n8KS_Ws-NNhgnwMv-cPeZbrWgMdMz65D69mqsjt4HeN9P7yi5bWG0YrBtBsSNS5qgsma4yuEeSlMRHXkm-oOyy3gjAof_oz0-s0Dm"
              />
            </div>
            <div className="h-64 relative rounded-DEFAULT overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Lifestyle shot"
                className="w-full h-full object-cover filter grayscale opacity-90 transition-transform duration-700 hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNzgTgh3sK8EkgakowYkAu3yfDOnipaK3E5wEY-6nFKjStqmIBSeVrOxnnzbFu5fXH8ZJe8uJj3wHVUGzNv-chFEoP_41A86JkVSdvSNiE5zg_VcUAZUmLO-42Tbwh7YsPgrWjmCBPrvoRbviCG5AlyD6QZNoTtokyoOmNhf28UZrOTLcUwV3BvqOrBbfgPa5Kyd1DcI6Z3-FJKalk6tgNmdQdGPBCUNsWc5ASJMJiyiqU8SzYcFNK"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Luxe Promise ────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-section-v-padding">
        <div className="max-w-content mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-section-v-padding">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-stack-sm">
              Our Commitment
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
              The Luxe Promise
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              {
                icon: "verified_user",
                title: "Absolute Compliance",
                desc: "Every project is fully RERA registered and adheres to the highest statutory standards, ensuring your investment is protected by rigorous legal and ethical frameworks.",
              },
              {
                icon: "account_balance",
                title: "Financial Transparency",
                desc: "We operate with complete clarity. From structured payment schedules to clear documentation, we build trust through unwavering financial integrity.",
              },
              {
                icon: "diamond",
                title: "Curated Advisory",
                desc: "Experience a bespoke acquisition journey. Our dedicated advisors provide discreet, personalized guidance to help you secure a residence that aligns with your legacy.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-surface p-8 border border-[#E8E4DC] rounded-DEFAULT hover:shadow-[0_20px_40px_rgba(20,19,15,0.03)] transition-shadow duration-500"
              >
                <span className="material-symbols-outlined text-primary mb-stack-md block" style={{ fontSize: 32 }}>
                  {icon}
                </span>
                <h3 className="font-headline-md text-on-surface text-[24px] mb-stack-sm">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
