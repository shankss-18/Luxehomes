import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — LUXEHOMES Hyderabad",
  description:
    "Schedule a private viewing or speak with our luxury property advisors at our Kokapet Neopolis site office.",
};

export default function ContactPage() {
  return (
    <main className="pt-[120px]">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-content mx-auto py-section-v-padding text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57] block mb-2">
          Kokapet Neopolis Experience Center
        </span>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-md">
          Connect with our Advisory Team
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Schedule a private viewing or speak with our luxury property advisors to explore residences and plots in Western Hyderabad.
        </p>
      </section>

      {/* ── Bento Grid ──────────────────────────────────────────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-content mx-auto pb-section-v-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* ── Contact Info + Map ─────────────────────────────────────── */}
          <div className="md:col-span-5 flex flex-col gap-gutter">
            {/* Details Card */}
            <div className="bg-surface-container p-stack-lg rounded-xl border border-outline-variant/30 flex flex-col gap-stack-lg bg-white shadow-sm">
              <div>
                <h3 className="font-label-caps text-xs uppercase tracking-wider text-[#B08D57] font-semibold mb-stack-sm">Kokapet Site Office</h3>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  The Luxe Tower, Neopolis Corridor<br />
                  Kokapet, Hyderabad, Telangana 500075<br />
                  India
                </p>
              </div>
              <div>
                <h3 className="font-label-caps text-xs uppercase tracking-wider text-[#B08D57] font-semibold mb-stack-sm">Direct Lines</h3>
                <p className="font-body-md text-body-md text-on-surface">
                  Advisory: +91 40 4567 8900<br />
                  Site Experience: +91 40 4567 8901
                </p>
              </div>
              <div>
                <h3 className="font-label-caps text-xs uppercase tracking-wider text-[#B08D57] font-semibold mb-stack-sm">Concierge Email</h3>
                <p className="font-body-md text-body-md text-on-surface">
                  concierge@luxehomes.com
                </p>
              </div>
              <div className="pt-2 border-t border-outline-variant/30">
                <span className="text-[11px] text-[#72716d]">RERA Registration: TBD · HMDA Approved Master Plan</span>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 rounded-xl overflow-hidden relative border border-[#E8E4DC]">
              <div
                className="bg-cover bg-center w-full h-full"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBOZwk_BVhVxWN5j8WOo2X9yE6qWjAd9HIaB2Sv_SYPR1u5uWsNgQkpm8tTe5ELGNUwUHOFvHFpppv0Jwc-6HsTCLbNCDhukYxIK2VerMsahKFAOV-4_tLpiVojS1qb6jIb7esd9nf2Xmcs8abnMcKBwy6pqq_qTVzAYcwRpVX3iaW_BnANcx20Wm9TooeVAdr8urzd06odowB7iruz4JQ82PM9WsYtHuw3-RPT5HwUtZgHk696CmD')",
                }}
              />
            </div>
          </div>

          {/* ── Contact Form ───────────────────────────────────────────── */}
          <div className="md:col-span-7 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 relative overflow-hidden bg-white shadow-sm">
            <div className="relative z-10">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                Request a Consultation
              </h2>
              <p className="text-xs text-[#72716d] mb-stack-lg">
                Connect with our senior Hyderabad property advisors for site visits and verified cost sheets.
              </p>
              <form className="flex flex-col gap-stack-lg">
                {/* Full Name */}
                <div className="flex flex-col gap-stack-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Full Name"
                    className="bg-transparent border-0 border-b border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors outline-none"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  {[
                    { id: "email", label: "Email Address", type: "email", ph: "address@domain.com" },
                    { id: "phone", label: "Phone Number",  type: "tel", ph: "+91 98765 43210"   },
                  ].map(({ id, label, type, ph }) => (
                    <div key={id} className="flex flex-col gap-stack-sm">
                      <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor={id}>
                        {label}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        required
                        placeholder={ph}
                        className="bg-transparent border-0 border-b border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Preferred Configuration */}
                <div className="flex flex-col gap-stack-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="interest">
                    Target Configuration (Kokapet Neopolis)
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="bg-transparent border-0 border-b border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors appearance-none outline-none"
                  >
                    <option value="2bhk">2 BHK Suite (1,150–1,350 sq.ft) · ₹1.47 Cr – ₹1.73 Cr*</option>
                    <option value="3bhk">3 BHK Grand Residence (1,580–1,950 sq.ft) · ₹2.02 Cr – ₹2.50 Cr*</option>
                    <option value="4bhk">4 BHK Sky Villa (2,480–2,890 sq.ft) · ₹3.17 Cr – ₹3.70 Cr*</option>
                    <option value="plots">Freehold Villa Plots (300–500 sq.yds) · TBD</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-stack-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="message">
                    Specific Requirements or Preferred Site Visit Date
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Floor preference, Vastu orientation, or scheduled visit time..."
                    className="bg-transparent border-0 border-b border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors outline-none resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-stack-sm mt-stack-md">
                  <button
                    type="submit"
                    className="font-button text-button uppercase tracking-widest text-on-primary bg-charcoal px-8 py-4 w-full md:w-auto self-start hover:bg-[#B08D57] transition-all duration-300 cursor-pointer"
                  >
                    Submit Advisory Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
