"use client";

import { useState } from "react";
import Link from "next/link";
import propertiesData from "@/data/properties.json";
import locationsData from "@/data/locations.json";
import ParallaxStatCards from "@/components/ParallaxStatCards";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: "booking-amount",
    category: "Allotment",
    question: "What is the standard booking token amount?",
    answer:
      "The initial booking token serves as a formal expression of interest to reserve your chosen residence or estate plot. It is fully refundable during the initial 15-day statutory document review and allotment verification window.",
  },
  {
    id: "possession-timeline",
    category: "Construction",
    question: "What is the possession timeline for upcoming phases?",
    answer:
      "Possession timelines are scheduled in phases aligned with HMDA master development milestones. Detailed tower-by-tower possession dates and construction progress milestones are confirmed upon formal allotment agreement issuance (Status: TBD).",
  },
  {
    id: "home-loan-tieups",
    category: "Financing",
    question: "Which institutional banks offer pre-approved home loans?",
    answer:
      "Luxehomes residences enjoy pre-approved financing tie-ups with leading public and private institutional banking partners, including State Bank of India (SBI), HDFC Bank, and ICICI Bank, with customized HNI borrowing facilities.",
  },
  {
    id: "cancellation-policy",
    category: "Governance",
    question: "What is the cancellation and refund framework?",
    answer:
      "Cancellations requested during the statutory verification window incur zero deductions and are refunded directly from the project's designated escrow account, adhering strictly to transparent governance and statutory standards.",
  },
  {
    id: "rera-status",
    category: "Regulatory",
    question: "What is the current RERA registration status?",
    answer:
      "RERA Registration Status: TBD (application in statutory progression). All land parcels are 100% clear-titled with approved HMDA layout sanctions and zero encumbrances.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<string | null>("booking-amount");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-luxury-pattern-subtle overflow-x-hidden pt-[90px] md:pt-[105px]">

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 1. COMPANY STORY SECTION                                          */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="w-full py-12 md:py-20 border-b border-[#E8E4DC]/80">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 reveal-item">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E8E4DC] text-[#B08D57] text-[10px] tracking-[0.25em] uppercase font-semibold">
              <span className="size-1.5 rounded-full bg-[#B08D57] animate-pulse" />
              <span>OUR HERITAGE &amp; PHILOSOPHY</span>
            </div>
            <h1
              className="text-[#1c1b1b] leading-tight text-3xl md:text-5xl font-normal max-w-3xl"
              style={{ fontFamily: "'Cormorant Garant', 'Playfair Display', serif" }}
            >
              Where Architectural Silence Becomes Enduring Legacy
            </h1>
            <div className="flex items-center gap-2">
              <div className="h-px w-10 bg-[#B08D57]/40" />
              <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" /></svg>
              <div className="h-px w-10 bg-[#B08D57]/40" />
            </div>
          </div>

          {/* Split Image & Narrative Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 flex flex-col gap-5 text-[#474741] font-light leading-relaxed reveal-slide-left">
              <p
                className="text-lg md:text-xl text-[#1c1b1b] font-normal leading-snug"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                Founded on the belief that true luxury lies in serene restraint, expansive volume, and verified governance.
              </p>
              <p className="text-sm text-[#72716d] leading-relaxed">
                For over 15 years, Luxehomes has spearheaded ultra-luxury development across Hyderabad&apos;s most coveted residential corridors — Kokapet, Financial District, Banjara Hills, and Jubilee Hills.
              </p>
              <p className="text-sm text-[#72716d] leading-relaxed">
                Every residential footprint is meticulously planned on HMDA-sanctioned land parcels, with 100% Vastu alignment, dedicated multi-lane arterial road connectivity, and institutional-grade construction quality.
              </p>
              <div className="pt-3 border-t border-[#E8E4DC] flex items-center gap-6 text-xs text-[#1c1b1b]">
                <div>
                  <span className="font-semibold text-[#B08D57] block">15+ Years</span>
                  <span className="text-[#72716d]">Of Verified Trust</span>
                </div>
                <div className="h-8 w-px bg-[#E8E4DC]" />
                <div>
                  <span className="font-semibold text-[#B08D57] block">6 Acres</span>
                  <span className="text-[#72716d]">Neopolis Corridor</span>
                </div>
                <div className="h-8 w-px bg-[#E8E4DC]" />
                <div>
                  <span className="font-semibold text-[#B08D57] block">100% Vastu</span>
                  <span className="text-[#72716d]">Harmonious Design</span>
                </div>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="lg:col-span-6 relative reveal-slide-right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8E4DC] shadow-xl bg-white group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrBdPj9oxtI9eBHXHVpAcaTAr33Y36nn5EGz4-TulcAC7JtGbmaCIu5Opkv4vHLqGPYBNJjRueiqJQmTd_wGTreZGlm9dpGxpNfLbAFrxRZpCc0MzW-TJwpKraMHYgTrCr20RoSRAvOIEwKU-b1tgBkdMbeRUzLbrrSWdmqU0USymV9RMm2CzQtZFa0GVS7d9-CDmi2p1dmQekILGVn6WrdjCkT13uIlOMMqahvRlY3QOezDei7LN8')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-6 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57]">
                    The Luxe Heritage
                  </p>
                  <p
                    className="text-lg md:text-xl font-normal mt-0.5"
                    style={{ fontFamily: "'Cormorant Garant', serif" }}
                  >
                    Architectural Restraint &amp; Refined Volume
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 2. ACHIEVEMENTS / MILESTONES PARALLAX SCROLLING CARDS             */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <ParallaxStatCards />

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 3. BUYER FAQS ACCORDION                                           */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 border-b border-[#E8E4DC]/80">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-2 reveal-item">
            <span className="text-[#B08D57] font-semibold text-xs tracking-[0.25em] uppercase">
              Transparency First
            </span>
            <h2
              className="text-[#1c1b1b] text-2xl md:text-4xl font-normal"
              style={{ fontFamily: "'Cormorant Garant', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-[#72716d]">
              Key statutory, commercial, and legal policies for prospective purchasers.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === faq.id;
              const delayClass = `reveal-delay-${(idx % 5) + 1}`;
              return (
                <div
                  key={faq.id}
                  className={`reveal-item ${delayClass} rounded-xl border transition-all duration-300 bg-white ${
                    isOpen
                      ? "border-[#B08D57] shadow-md ring-1 ring-[#B08D57]/20"
                      : "border-[#E8E4DC] hover:border-[#B08D57]/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`size-2 rounded-full transition-colors ${
                          isOpen ? "bg-[#B08D57]" : "bg-[#72716d]"
                        }`}
                      />
                      <span
                        className={`text-sm md:text-base font-medium transition-colors ${
                          isOpen ? "text-[#1c1b1b]" : "text-[#474741]"
                        }`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-lg transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#B08D57]" : "text-[#72716d]"
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-[#E8E4DC]/60 text-xs md:text-sm text-[#72716d] leading-relaxed animate-fade-in-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 4. CONTACT US SECTION                                             */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="contact" className="w-full py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-2 reveal-item">
            <span className="text-[#B08D57] font-semibold text-xs tracking-[0.25em] uppercase">
              Private Client Desk
            </span>
            <h2
              className="text-[#1c1b1b] text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "'Cormorant Garant', serif" }}
            >
              Connect With Our Advisory Team
            </h2>
            <p className="text-xs md:text-sm text-[#72716d] max-w-xl">
              Schedule a confidential walk-in consultation at the Kokapet Advisory Office or request portfolio literature.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Office Details + Map */}
            <div className="lg:col-span-5 flex flex-col gap-6 reveal-slide-left">
              <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-2xl border border-[#E8E4DC] flex flex-col gap-6 shadow-sm">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57] mb-2">
                    Kokapet Advisory Office
                  </h3>
                  <p className="text-sm text-[#1c1b1b] leading-relaxed">
                    The Luxe Tower, Neopolis Corridor<br />
                    Kokapet, Hyderabad, Telangana 500075<br />
                    India
                  </p>
                </div>

                <div className="h-px bg-[#E8E4DC]" />

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#72716d]">
                    Direct Advisory
                  </h4>
                  <a
                    href="tel:+914045678900"
                    className="text-sm font-medium text-[#1c1b1b] hover:text-[#B08D57] transition-colors"
                  >
                    +91 40 4567 8900
                  </a>
                  <a
                    href="mailto:concierge@luxehomes.com"
                    className="text-sm text-[#72716d] hover:text-[#B08D57] transition-colors"
                  >
                    concierge@luxehomes.com
                  </a>
                </div>

                <div className="h-px bg-[#E8E4DC]" />

                <div>
                  <span className="text-[11px] text-[#72716d] leading-relaxed block">
                    Working Hours: Monday – Saturday, 10:00 AM – 7:00 PM IST.<br />
                    RERA Registration: Status TBD · HMDA Approved Master Plan.
                  </span>
                </div>
              </div>

              {/* Stylized Corridor Map Snippet */}
              <div className="h-56 rounded-2xl overflow-hidden relative border border-[#E8E4DC] shadow-sm group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE')",
                  }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4 text-center">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8E4DC] shadow-md flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-[#B08D57] animate-pulse" />
                    <span className="text-xs font-semibold text-[#1c1b1b]">
                      The Luxe Tower · Kokapet
                    </span>
                    <Link
                      href="/location"
                      className="text-[10px] font-bold text-[#B08D57] uppercase tracking-wider pl-1 hover:underline"
                    >
                      View Map →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FAF7F2] p-6 md:p-10 rounded-2xl border border-[#E8E4DC] shadow-sm reveal-slide-right">
              <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-2xl border border-[#E8E4DC] flex flex-col gap-6 shadow-sm">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57] mb-2">
                    Kokapet Advisory Office
                  </h3>
                  <p className="text-sm text-[#1c1b1b] leading-relaxed">
                    The Luxe Tower, Neopolis Corridor<br />
                    Kokapet, Hyderabad, Telangana 500075<br />
                    India
                  </p>
                </div>

                <div className="h-px bg-[#E8E4DC]" />

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#72716d]">
                    Direct Advisory
                  </h4>
                  <a
                    href="tel:+914045678900"
                    className="text-sm font-medium text-[#1c1b1b] hover:text-[#B08D57] transition-colors"
                  >
                    +91 40 4567 8900
                  </a>
                  <a
                    href="mailto:concierge@luxehomes.com"
                    className="text-sm text-[#72716d] hover:text-[#B08D57] transition-colors"
                  >
                    concierge@luxehomes.com
                  </a>
                </div>

                <div className="h-px bg-[#E8E4DC]" />

                <div>
                  <span className="text-[11px] text-[#72716d] leading-relaxed block">
                    Working Hours: Monday – Saturday, 10:00 AM – 7:00 PM IST.<br />
                    RERA Registration: Status TBD · HMDA Approved Master Plan.
                  </span>
                </div>
              </div>

              {/* Stylized Corridor Map Snippet */}
              <div className="h-56 rounded-2xl overflow-hidden relative border border-[#E8E4DC] shadow-sm">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE')",
                  }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4 text-center">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8E4DC] shadow-md flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-[#B08D57] animate-pulse" />
                    <span className="text-xs font-semibold text-[#1c1b1b]">
                      The Luxe Tower · Kokapet
                    </span>
                    <Link
                      href="/location"
                      className="text-[10px] font-bold text-[#B08D57] uppercase tracking-wider pl-1 hover:underline"
                    >
                      View Map →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FAF7F2] p-6 md:p-10 rounded-2xl border border-[#E8E4DC] shadow-sm">
              {contactSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center gap-3">
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3
                    className="text-2xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Inquiry Dispatched
                  </h3>
                  <p className="text-sm text-[#72716d] max-w-md">
                    Thank you. A senior client relationship partner from the Kokapet Neopolis advisory desk will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B08D57] block mb-1">
                      Direct Communication
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-normal text-[#1c1b1b]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Send Confidential Advisory Message
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikram Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] bg-white text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] bg-white text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] bg-white text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Message / Viewing Preferences
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify your preferred corridor, unit size, or schedule a site visit..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DC] bg-white text-sm text-[#1c1b1b] placeholder-[#72716d]/60 focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    />
                  </div>

                  <p className="text-[11px] text-[#72716d]">
                    Your information is protected under strict client confidentiality. No spam or unsolicited marketing.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#B08D57] hover:bg-[#967645] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer mt-1"
                  >
                    Submit Advisory Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
