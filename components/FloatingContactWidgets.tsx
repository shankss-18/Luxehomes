"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  cta?: { label: string; href: string };
}

export default function FloatingContactWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Welcome to Luxehomes. I am your private AI Concierge. How may I assist with unit configurations, Kokapet Neopolis pricing, or scheduling a visit?",
      timestamp: "Just now",
      cta: { label: "Explore 3D Masterplans", href: "/gallery" },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [messages, chatOpen]);

  const resetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Conversation refreshed. Ask me anything about floorplans, pricing benchmark, or our private client advisory office.",
        timestamp: "Just now",
      },
    ]);
  };

  // Knowledge base responses based on properties and locations data
  const handleBotResponse = (userQuery: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let botReply = "";
      let cta: { label: string; href: string } | undefined = undefined;

      if (q.includes("3 bhk") || q.includes("3bhk") || q.includes("suite")) {
        botReply =
          "3 BHK luxury suites at Botanika Greens (Tower A, Unit A-901) offer 1,580 sq.ft carpet, 100% East Vastu facing, and courtyard views. Benchmark pricing from ₹2.40 Cr.";
        cta = { label: "Inspect 3D Cutaway", href: "/gallery" };
      } else if (q.includes("4 bhk") || q.includes("4bhk") || q.includes("mansion") || q.includes("penthouse")) {
        botReply =
          "4 BHK Sky Mansions at One Neopolis (Unit B-1802) feature 2,450 sq.ft carpet, panoramic 30-foot balcony, private elevator lobby, and 3-car parking from ₹3.75 Cr.";
        cta = { label: "View Unit Specifications", href: "/gallery" };
      } else if (q.includes("2 bhk") || q.includes("2bhk")) {
        botReply =
          "2 BHK residences at Cyber Vista (Tower 1) feature 1,180 sq.ft carpet with Italian marble finishes and direct Financial District link from ₹1.65 Cr.";
        cta = { label: "Explore 2 BHK Gallery", href: "/gallery" };
      } else if (q.includes("price") || q.includes("rate") || q.includes("cost") || q.includes("sq ft") || q.includes("sqft")) {
        botReply =
          "Kokapet Neopolis benchmark is ₹12,800/sq.ft. Financial District stands at ₹13,200/sq.ft; Jubilee/Banjara Hills ranges ₹16,500–₹18,000/sq.ft.";
        cta = { label: "View Location Dossier", href: "/location" };
      } else if (q.includes("hmda") || q.includes("rera") || q.includes("vastu") || q.includes("approval")) {
        botReply =
          "All developments are 100% HMDA-sanctioned land parcels with clear titles, leading bank approvals, and 100% East & North Vastu alignment.";
        cta = { label: "Check Approvals", href: "/about#faqs" };
      } else if (q.includes("visit") || q.includes("appointment") || q.includes("office") || q.includes("contact") || q.includes("schedule")) {
        botReply =
          "Our flagship advisory office is at The Luxe Tower, Neopolis Sector 1 & 2, Kokapet. Open daily 9:30 AM – 7:00 PM for private walkthroughs.";
        cta = { label: "Schedule Consultation", href: "/about#contact" };
      } else {
        botReply =
          "Luxehomes creates ultra-luxury 2, 3, and 4 BHK residences in Hyderabad's premier corridors. Would you like to inspect our interactive 3D cutaway?";
        cta = { label: "Launch 3D Cutaway", href: "/gallery" };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          cta,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    handleBotResponse(text);
  };

  const quickPrompts = [
    "3 BHK residences?",
    "Neopolis pricing",
    "HMDA & Vastu status",
    "Schedule site visit",
  ];

  return (
    <>
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 1. FLOATING LUXURY CONCIERGE DOCK (BOTTOM-RIGHT)                  */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 sm:gap-3.5 pointer-events-auto select-none">

        {/* WhatsApp Direct Concierge Button with Floating & Ripple Aura */}
        <div className="relative group animate-luxury-float">
          {/* Animated Emerald Ripple Aura Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ripple-emerald pointer-events-none -z-10" />

          {/* Luxury Rich Tooltip (Desktop Hover) */}
          <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 bg-[#1c1b1b]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:flex flex-col gap-0.5 border border-[#B08D57]/30">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide">WhatsApp Concierge · +91 95509 60744</span>
            </div>
            <span className="text-[10px] text-[#E8E4DC]/70">Direct enquiry for floor plans, pricing &amp; site visits</span>
          </div>

          <a
            href="https://wa.me/919550960744?text=Hello%20Luxe%20Homes%2C%20I%20am%20interested%20in%20exploring%20your%20luxury%20residences%20(2%2C%203%20%26%204%20BHK)%20and%20freehold%20villa%20plots%20at%20Kokapet%20(Neopolis%20Corridor).%20Please%20share%20floor%20plan%20brochures%2C%20pricing%20details%2C%20and%20schedule%20a%20private%20site%20visit."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp (+91 95509 60744)"
            className="relative size-12 sm:size-13 rounded-full bg-gradient-to-tr from-[#1EBE5D] via-[#22ca61] to-[#2BF074] text-white shadow-[0_10px_28px_-3px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_38px_0px_rgba(37,211,102,0.65)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-white/25"
          >
            {/* Live Online Beacon Dot */}
            <span className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full bg-[#1c1b1b] border-2 border-white flex items-center justify-center shadow-xs">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>

            {/* Official WhatsApp Logo SVG with Gentle Hover Scale */}
            <svg
              className="size-6.5 sm:size-7 fill-white transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.275-.1-.476-.15-.676.15-.2.3-.777.977-.952 1.177-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.613.136-.134.301-.351.451-.527.151-.175.201-.3.302-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.927-2.233-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.91 1.229 3.111c.15.2 2.122 3.24 5.14 4.544.718.31 1.279.495 1.716.634.721.229 1.378.197 1.897.119.579-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.201-.577-.351zM12.004 21.75c-1.737 0-3.441-.453-4.945-1.314l-.354-.202-3.676.964.981-3.584-.222-.353a9.718 9.718 0 01-1.492-5.187c0-5.385 4.381-9.766 9.768-9.766 2.609 0 5.061 1.017 6.906 2.862a9.713 9.713 0 012.86 6.904c0 5.386-4.382 9.766-9.826 9.766zm8.334-16.671A11.666 11.666 0 0012.004.25C5.522.25.247 5.526.247 12.009c0 2.07.54 4.09 1.565 5.869L0 24l6.287-1.65a11.724 11.724 0 005.717 1.474h.005c6.481 0 11.757-5.275 11.757-11.759 0-3.14-1.222-6.092-3.428-8.295z" />
            </svg>
          </a>
        </div>

        {/* AI Concierge Chatbot Trigger Button with Delayed Float & Gold Ripple */}
        <div className="relative group animate-luxury-float-delayed">
          {/* Animated Gold Ripple Aura Ring */}
          <span className="absolute inset-0 rounded-full bg-[#B08D57] animate-ripple-gold pointer-events-none -z-10 opacity-70" />

          {/* Luxury Rich Tooltip (Desktop Hover) */}
          <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 bg-[#1c1b1b]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:flex flex-col gap-0.5 border border-[#B08D57]/30">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#B08D57] animate-ping" />
              <span className="text-xs font-semibold tracking-wide">
                {chatOpen ? "Close AI Concierge" : "Luxe AI Concierge · Available 24/7"}
              </span>
            </div>
            <span className="text-[10px] text-[#E8E4DC]/70">Instant answers for pricing, Vastu, and 3D cutaways</span>
          </div>

          <button
            onClick={() => setChatOpen((prev) => !prev)}
            aria-label="Toggle AI Concierge Chat"
            className="relative size-12 sm:size-13 rounded-full bg-gradient-to-b from-[#25221e] via-[#1c1b1b] to-[#121110] text-white border-2 border-[#B08D57] shadow-[0_10px_28px_-3px_rgba(176,141,87,0.45)] hover:shadow-[0_14px_38px_0px_rgba(176,141,87,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            {/* Live AI Pulse Sparkle Badge */}
            <span className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full bg-[#1c1b1b] border-2 border-[#B08D57] flex items-center justify-center shadow-xs">
              <span className="size-1.5 rounded-full bg-[#B08D57] animate-ping" />
            </span>

            {chatOpen ? (
              <svg className="size-5.5 text-[#B08D57] transition-transform duration-300 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Enhanced Animated AI Robot SVG */
              <svg className="size-7 sm:size-7.5 animate-bot-head" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glowing Antenna */}
                <line x1="12" y1="1.5" x2="12" y2="5.5" stroke="#B08D57" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="12" cy="1.5" r="1.5" fill="#E8C98E" className="animate-bot-antenna"/>
                
                {/* Outer Head Chassis */}
                <rect x="3" y="5.5" width="18" height="14.5" rx="5" fill="#1c1b1b" stroke="#B08D57" strokeWidth="1.8"/>
                
                {/* Left/Right Ear Nodes */}
                <rect x="1" y="9.5" width="2" height="6.5" rx="1" fill="#B08D57"/>
                <rect x="21" y="9.5" width="2" height="6.5" rx="1" fill="#B08D57"/>
                
                {/* Cyber Visor Screen */}
                <rect x="6.2" y="9" width="11.6" height="4.5" rx="2" fill="#FAF7F2"/>
                
                {/* Illuminated Digital Eyes */}
                <circle cx="9.2" cy="11.2" r="1.3" fill="#B08D57" className="animate-pulse"/>
                <circle cx="14.8" cy="11.2" r="1.3" fill="#B08D57" className="animate-pulse"/>
                
                {/* Expressive Waveform Mouth */}
                <path d="M8.5 16.2C10 17.4 14 17.4 15.5 16.2" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 2. COMPACT FLOATING LUXURY AI CHAT MODAL (RESPONSIVE SAFE AREA)   */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {chatOpen && (
        <div className="fixed bottom-18 right-3 sm:bottom-22 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[350px] max-w-[350px] h-[430px] max-h-[74vh] bg-white rounded-3xl shadow-[0_22px_65px_-12px_rgba(28,27,27,0.35)] border border-[#E8E4DC] overflow-hidden flex flex-col animate-chat-spring select-none">

          {/* Compact Luxury Header */}
          <div className="p-3 px-4 bg-[#1c1b1b] text-white flex items-center justify-between border-b border-[#B08D57]/30 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#2a241e] border border-[#B08D57] flex items-center justify-center relative">
                {/* Robot Emblem */}
                <svg className="size-4.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="14" rx="5" fill="#1c1b1b" stroke="#B08D57" strokeWidth="1.8"/>
                  <line x1="12" y1="2" x2="12" y2="6" stroke="#B08D57" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="2" r="1.5" fill="#B08D57"/>
                  <rect x="6.5" y="10" width="11" height="3.5" rx="1.5" fill="#FAF7F2"/>
                  <circle cx="9.2" cy="11.8" r="1" fill="#B08D57"/>
                  <circle cx="14.8" cy="11.8" r="1" fill="#B08D57"/>
                </svg>
                {/* Online Glowing Dot */}
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 ring-1.5 ring-[#1c1b1b] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold tracking-wide text-white">Luxe AI Concierge</h4>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#B08D57] px-1.5 py-0.2 rounded bg-[#B08D57]/15">
                    Live
                  </span>
                </div>
                <span className="text-[9.5px] text-[#A0988A] tracking-wider block">
                  Private Client Advisory
                </span>
              </div>
            </div>

            {/* Header Controls: Reset & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Refresh Chat"
                className="size-7 rounded-lg text-white/50 hover:text-[#B08D57] hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Restart Conversation"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>

              <button
                onClick={() => setChatOpen(false)}
                title="Minimize Concierge"
                className="size-7 rounded-lg text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Close Chat"
              >
                <span className="material-symbols-outlined text-base group-hover:rotate-90 transition-transform duration-200">close</span>
              </button>
            </div>
          </div>

          {/* Compact Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto bg-gradient-to-b from-[#FAF7F2] to-white flex flex-col gap-2.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[88%] ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-2.5 px-3 rounded-2xl text-[11.5px] leading-relaxed transition-all ${
                    msg.sender === "user"
                      ? "bg-[#1c1b1b] text-white rounded-br-none shadow-xs"
                      : "bg-white text-[#1c1b1b] border border-[#E8E4DC] shadow-xs rounded-bl-none"
                  }`}
                >
                  {msg.text}

                  {msg.cta && (
                    <div className="mt-2 pt-1.5 border-t border-[#E8E4DC]">
                      <Link
                        href={msg.cta.href}
                        onClick={() => setChatOpen(false)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1c1b1b] hover:bg-[#B08D57] text-white text-[10px] font-medium tracking-wide transition-all shadow-xs"
                      >
                        <span>{msg.cta.label}</span>
                        <span className="material-symbols-outlined text-[11px]">arrow_forward</span>
                      </Link>
                    </div>
                  )}
                </div>

                <span className="text-[8.5px] text-[#72716d] mt-0.5 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex items-center gap-1.5 p-2 px-3 rounded-2xl bg-white border border-[#E8E4DC] text-[10.5px] text-[#72716d] shadow-xs">
                <span className="size-1.5 rounded-full bg-[#B08D57] animate-bounce" />
                <span className="size-1.5 rounded-full bg-[#B08D57] animate-bounce [animation-delay:0.18s]" />
                <span className="size-1.5 rounded-full bg-[#B08D57] animate-bounce [animation-delay:0.36s]" />
                <span className="text-[10px] text-[#72716d] ml-1">Consulting portfolio ledger...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills (No Scrollbar, Smooth Glide) */}
          <div className="px-3 py-1.5 bg-[#FAF7F2] border-t border-[#E8E4DC] flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E8E4DC] hover:border-[#B08D57] text-[#474741] hover:text-[#1c1b1b] hover:shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Compact Input Field */}
          <div className="p-2.5 bg-white border-t border-[#E8E4DC] shrink-0">
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8E4DC] focus-within:border-[#B08D57] focus-within:ring-1 focus-within:ring-[#B08D57]/30 rounded-full px-3 py-1 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Ask about 3D layouts, pricing..."
                className="flex-1 bg-transparent text-xs text-[#1c1b1b] placeholder:text-[#72716d]/70 focus:outline-none py-1"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="size-7 rounded-full bg-[#B08D57] hover:bg-[#967645] disabled:opacity-30 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90 shadow-xs"
                aria-label="Send message"
              >
                <span className="material-symbols-outlined text-xs">send</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
