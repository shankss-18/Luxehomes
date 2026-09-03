"use client";

import { useState } from "react";
import Link from "next/link";
import propertiesData from "@/data/properties.json";
import locationsData from "@/data/locations.json";
import MarqueeStatCards from "@/components/MarqueeStatCards";

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
    interest: "kokapet-neopolis",
    message: "",
  });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "kokapet-neopolis",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-luxury-pattern-subtle overflow-x-hidden pt-[76px] md:pt-[84px]">

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 1. COMPANY STORY SECTION                                          */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 border-b border-[#E8E4DC]/80">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2.5 reveal-item">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[#B08D57] text-[10px] tracking-[0.28em] uppercase font-semibold shadow-xs">
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
              <svg width="6" height="6" viewBox="0 0 6 6">
                <polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" />
              </svg>
              <div className="h-px w-10 bg-[#B08D57]/40" />
            </div>
          </div>

          {/* Split Image & Narrative Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-[#474741] font-light leading-relaxed reveal-slide-left">
              <p
                className="text-xl md:text-2xl text-[#1c1b1b] font-normal leading-snug"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                Founded on the premise that true luxury lies in serene restraint, expansive volume, and verified governance.
              </p>
              <p className="text-sm text-[#72716d] leading-relaxed">
                For over 15 years, Luxehomes has spearheaded ultra-luxury development across Hyderabad&apos;s most coveted residential corridors — Kokapet, Financial District, Banjara Hills, and Jubilee Hills.
              </p>
              <p className="text-sm text-[#72716d] leading-relaxed">
                Every residential footprint is meticulously planned on HMDA-sanctioned land parcels, with 100% Vastu alignment, dedicated multi-lane arterial road connectivity, and institutional-grade construction quality.
              </p>

              <div className="pt-5 border-t border-[#E8E4DC] grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-white/70 border border-[#E8E4DC]">
                  <span className="font-semibold text-base text-[#B08D57] block" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                    15+ Years
                  </span>
                  <span className="text-[10.5px] text-[#72716d] uppercase tracking-wider">Verified Trust</span>
                </div>
                <div className="p-3 rounded-xl bg-white/70 border border-[#E8E4DC]">
                  <span className="font-semibold text-base text-[#B08D57] block" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                    6 Acres
                  </span>
                  <span className="text-[10.5px] text-[#72716d] uppercase tracking-wider">Neopolis Hub</span>
                </div>
                <div className="p-3 rounded-xl bg-white/70 border border-[#E8E4DC]">
                  <span className="font-semibold text-base text-[#B08D57] block" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                    100% Vastu
                  </span>
                  <span className="text-[10.5px] text-[#72716d] uppercase tracking-wider">Oriented</span>
                </div>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="lg:col-span-6 relative reveal-slide-right">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E8E4DC] shadow-2xl bg-white group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrBdPj9oxtI9eBHXHVpAcaTAr33Y36nn5EGz4-TulcAC7JtGbmaCIu5Opkv4vHLqGPYBNJjRueiqJQmTd_wGTreZGlm9dpGxpNfLbAFrxRZpCc0MzW-TJwpKraMHYgTrCr20RoSRAvOIEwKU-b1tgBkdMbeRUzLbrrSWdmqU0USymV9RMm2CzQtZFa0GVS7d9-CDmi2p1dmQekILGVn6WrdjCkT13uIlOMMqahvRlY3QOezDei7LN8')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B08D57]">
                      The Luxe Architecture
                    </p>
                    <p
                      className="text-xl md:text-2xl font-normal mt-0.5"
                      style={{ fontFamily: "'Cormorant Garant', serif" }}
                    >
                      Architectural Restraint &amp; Refined Volume
                    </p>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-wider text-white border border-white/20">
                    Est. 2011
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 2. ACHIEVEMENTS / MILESTONES — CONTINUOUS RIGHT-TO-LEFT MARQUEE   */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <MarqueeStatCards />

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 3. BUYER FAQS ACCORDION                                           */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 border-b border-[#E8E4DC]/80">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3 reveal-item">
            <span className="text-[#B08D57] font-semibold text-xs tracking-[0.28em] uppercase">
              Transparency First
            </span>
            <h2
              className="text-[#1c1b1b] text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "'Cormorant Garant', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-[#B08D57]/40" />
              <svg width="6" height="6" viewBox="0 0 6 6">
                <polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" />
              </svg>
              <div className="h-px w-8 bg-[#B08D57]/40" />
            </div>
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
                  className={`reveal-item ${delayClass} rounded-2xl border transition-all duration-300 bg-white ${
                    isOpen
                      ? "border-[#B08D57] shadow-lg ring-1 ring-[#B08D57]/20"
                      : "border-[#E8E4DC] hover:border-[#B08D57]/60 shadow-xs"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`size-2 rounded-full transition-colors shrink-0 ${
                          isOpen ? "bg-[#B08D57]" : "bg-[#E8E4DC]"
                        }`}
                      />
                      <span
                        className={`text-sm md:text-base font-normal transition-colors ${
                          isOpen ? "text-[#1c1b1b] font-medium" : "text-[#474741]"
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
      {/* 4. CONTACT US — REDESIGNED PRIVATE CLIENT DESK                    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="contact" className="w-full py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-14">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-3 reveal-item">
            <span className="text-[#B08D57] font-semibold text-xs tracking-[0.28em] uppercase">
              Private Client Desk
            </span>
            <h2
              className="text-[#1c1b1b] text-3xl md:text-5xl font-normal"
              style={{ fontFamily: "'Cormorant Garant', serif" }}
            >
              Connect With Our Advisory Team
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-[#B08D57]/40" />
              <svg width="6" height="6" viewBox="0 0 6 6">
                <polygon points="3,0 6,3 3,6 0,3" fill="#B08D57" />
              </svg>
              <div className="h-px w-8 bg-[#B08D57]/40" />
            </div>
            <p className="text-xs md:text-sm text-[#72716d] max-w-xl font-light">
              Schedule a confidential walk-in consultation at the Kokapet Advisory Office or request portfolio literature.
            </p>
          </div>

          {/* Clean 2-Column Split: Left Office Details / Right Advisory Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* LEFT COLUMN: Kokapet Advisory Office & Architectural Preview */}
            <div className="lg:col-span-5 bg-white p-7 md:p-9 rounded-3xl border border-[#E8E4DC] shadow-md flex flex-col justify-between reveal-slide-left h-full">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B08D57] block mb-1">
                      Flagship Experience Center
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-normal text-[#1c1b1b]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Kokapet Advisory Office
                    </h3>
                  </div>
                  <div className="size-11 rounded-2xl bg-[#FAF7F2] border border-[#E8E4DC] text-[#B08D57] flex items-center justify-center shadow-xs shrink-0">
                    <span className="material-symbols-outlined text-xl">apartment</span>
                  </div>
                </div>

                <p className="text-sm text-[#474741] leading-relaxed">
                  The Luxe Tower, Neopolis Corridor<br />
                  Sector 1 &amp; 2, Kokapet, Hyderabad, Telangana 500075<br />
                  India
                </p>

                <div className="h-px bg-[#E8E4DC]" />

                {/* Direct Contact Links */}
                <div className="flex flex-col gap-3.5">
                  <a
                    href="tel:+914045678900"
                    className="flex items-center gap-3.5 text-sm text-[#1c1b1b] hover:text-[#B08D57] transition-colors group p-2.5 rounded-2xl hover:bg-[#FAF7F2]"
                  >
                    <div className="size-9 rounded-xl bg-[#FAF7F2] border border-[#E8E4DC] flex items-center justify-center text-[#72716d] group-hover:text-[#B08D57] group-hover:border-[#B08D57] transition-colors">
                      <span className="material-symbols-outlined text-base">call</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#72716d] block font-medium">Telephone</span>
                      <span className="font-semibold text-sm">+91 40 4567 8900</span>
                    </div>
                  </a>

                  <a
                    href="mailto:concierge@luxehomes.com"
                    className="flex items-center gap-3.5 text-sm text-[#1c1b1b] hover:text-[#B08D57] transition-colors group p-2.5 rounded-2xl hover:bg-[#FAF7F2]"
                  >
                    <div className="size-9 rounded-xl bg-[#FAF7F2] border border-[#E8E4DC] flex items-center justify-center text-[#72716d] group-hover:text-[#B08D57] group-hover:border-[#B08D57] transition-colors">
                      <span className="material-symbols-outlined text-base">mail</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#72716d] block font-medium">Private Concierge</span>
                      <span className="font-semibold text-sm">concierge@luxehomes.com</span>
                    </div>
                  </a>
                </div>

                <div className="h-px bg-[#E8E4DC]" />

                <div className="flex items-center justify-between text-xs text-[#72716d]">
                  <span>Mon – Sat: 10:00 AM – 7:00 PM IST</span>
                  <span className="text-[#B08D57] font-semibold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#B08D57]" />
                    HMDA Approved
                  </span>
                </div>
              </div>

              {/* Corridor Preview Card with Link to /location */}
              <div className="mt-6 rounded-2xl overflow-hidden relative border border-[#E8E4DC] shadow-sm group h-40">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnuktRK27yvXgij5paYhzTzZ4XLQu_5rGB9LGp67vM7FqY2Hkkgv2M0sD1Afj4ZZx9EZeTwn3nZg3An_yJae-X-m-ETzP_VnIJI2Z6D3MHsNXzFUNNmNxEUFiuH07OJrMxlxfE0Xu_a-GNEhWdqWLfMM86rq1kOb_VUzpBRjWl-62tjafTus5OK6OI74YOAjDqxgFvH7rCrgTFhx7m22_GnJ9twD0xHu-axGSMOmWLpHCFJX6LFgBE')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end p-4">
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <span className="text-[9.5px] uppercase tracking-wider text-[#B08D57] font-bold block">
                        Interactive Map
                      </span>
                      <p className="text-white text-xs md:text-sm font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Explore 6 Hyderabad Corridors
                      </p>
                    </div>
                    <Link
                      href="/location"
                      className="px-3 py-1.5 rounded-full bg-white hover:bg-[#B08D57] text-[#1c1b1b] hover:text-white text-[11px] font-semibold uppercase tracking-wider shadow-md transition-all flex items-center gap-1"
                    >
                      <span>View Map</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Ultra-Luxury Private Advisory Form */}
            <div className="lg:col-span-7 bg-white p-7 md:p-10 rounded-3xl border border-[#E8E4DC] shadow-md hover:border-[#B08D57]/60 transition-all reveal-slide-right flex flex-col justify-between h-full">
              {contactSubmitted ? (
                <div className="py-16 flex flex-col items-center text-center gap-3 my-auto">
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-2 animate-bounce">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-normal text-[#1c1b1b]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Inquiry Dispatched
                  </h3>
                  <p className="text-sm text-[#72716d] max-w-md leading-relaxed">
                    Thank you, {formData.name || "esteemed client"}. A senior relationship partner from the Kokapet Neopolis advisory desk will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B08D57] block mb-1">
                      Private Client Protocol
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-normal text-[#1c1b1b]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Request Confidential Consultation
                    </h3>
                    <p className="text-xs text-[#72716d] mt-1 font-light">
                      Direct liaison with our Senior Partners &amp; Kokapet Neopolis Project Directors.
                    </p>
                  </div>

                  {/* Row 1: Full Name & Corporate Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Full Name <span className="text-[#B08D57]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Vikramaditya Reddy"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-[#FAF7F2]/60 text-sm text-[#1c1b1b] placeholder-[#72716d]/50 focus:bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Corporate Email <span className="text-[#B08D57]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-[#FAF7F2]/60 text-sm text-[#1c1b1b] placeholder-[#72716d]/50 focus:bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Target Corridor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Phone / WhatsApp <span className="text-[#B08D57]">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-[#FAF7F2]/60 text-sm text-[#1c1b1b] placeholder-[#72716d]/50 focus:bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                        Target Corridor / Property
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-[#FAF7F2]/60 text-sm text-[#1c1b1b] focus:bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] transition-all cursor-pointer"
                      >
                        <option value="kokapet-neopolis">Kokapet (Neopolis Corridor) — Flagship Residences</option>
                        <option value="financial-district">Financial District (Nanakramguda) — Corporate Tech Core</option>
                        <option value="gachibowli">Gachibowli — IT Corridor Residences</option>
                        <option value="banjara-hills">Banjara Hills — Heritage Prestige Enclave</option>
                        <option value="jubilee-hills">Jubilee Hills — Elite Topography Villas</option>
                        <option value="tellapur">Tellapur — Master Planned Green Corridor</option>
                      </select>
                    </div>
                  </div>

                  {/* Viewing Notes / Custom Criteria */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#474741] mb-1.5">
                      Consultation Preferences / Custom Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Specify your preferred floor band, Vastu orientation, or requested date for a private walkthrough..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-[#FAF7F2]/60 text-sm text-[#1c1b1b] placeholder-[#72716d]/50 focus:bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] transition-all resize-none"
                    />
                  </div>

                  {/* Privacy & Protocol Guarantee */}
                  <div className="flex items-center gap-2 text-xs text-[#72716d]">
                    <span className="material-symbols-outlined text-sm text-[#B08D57]">verified_user</span>
                    <span>Protected by client confidentiality protocol. Direct partner consultation only.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#B08D57] hover:bg-[#967645] text-white text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer mt-1 flex items-center justify-center gap-2"
                  >
                    <span>Dispatch Advisory Request</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
