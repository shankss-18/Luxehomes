"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import propertiesData from "@/data/properties.json";
import locationsData from "@/data/locations.json";

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
      text: "Welcome to Luxehomes. I am your private AI Concierge. I can assist you with unit configurations, Kokapet Neopolis pricing, 3D masterplans, or scheduling an advisory session.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
    }
  }, [messages, chatOpen]);

  // Knowledge base responses based on properties and locations data
  const handleBotResponse = (userQuery: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let botReply = "";
      let cta: { label: string; href: string } | undefined = undefined;

      if (q.includes("3 bhk") || q.includes("3bhk") || q.includes("suite")) {
        botReply =
          "We offer ultra-luxury 3 BHK suites at Botanika Greens (Tower A, Unit A-901). Carpet area is 1,580 sq.ft with 100% East Vastu facing, overlooking the central landscaped courtyard. Pricing starts at ₹2.40 Cr.";
        cta = { label: "Inspect 3D Masterplan", href: "/gallery" };
      } else if (q.includes("4 bhk") || q.includes("4bhk") || q.includes("mansion") || q.includes("penthouse")) {
        botReply =
          "Our 4 BHK Sky Mansions at One Neopolis (Tower B, Unit B-1802) feature 2,450 sq.ft carpet with a panoramic 30-foot living balcony, private elevator lobby, and 3-car basement parking. Pricing is ₹3.75 Cr.";
        cta = { label: "View Unit Details", href: "/gallery" };
      } else if (q.includes("2 bhk") || q.includes("2bhk")) {
        botReply =
          "Our bespoke 2 BHK residences at Cyber Vista (Tower 1, Unit T1-404) offer 1,180 sq.ft carpet with premium Italian marble flooring and direct connectivity to the Financial District. Pricing is ₹1.65 Cr.";
        cta = { label: "Explore 2 BHK Gallery", href: "/gallery" };
      } else if (q.includes("price") || q.includes("rate") || q.includes("cost") || q.includes("sq ft") || q.includes("sqft")) {
        botReply =
          "Our Kokapet Neopolis corridor benchmark rate is ₹12,800/sq.ft. For Financial District it is ₹13,200/sq.ft, and for Banjara/Jubilee Hills enclaves it ranges between ₹16,500 and ₹18,000/sq.ft.";
        cta = { label: "View Strategic Geography", href: "/location" };
      } else if (q.includes("hmda") || q.includes("rera") || q.includes("vastu") || q.includes("approval")) {
        botReply =
          "All Luxehomes footprints are 100% HMDA-sanctioned land parcels with clear titles, full institutional bank tie-ups, and 100% Vastu compliance across East and North orientations. Formal RERA registration filings are actively tracked.";
        cta = { label: "Read Governance FAQs", href: "/about#faqs" };
      } else if (q.includes("visit") || q.includes("appointment") || q.includes("office") || q.includes("contact") || q.includes("schedule")) {
        botReply =
          "Our flagship site advisory office is located at The Luxe Tower, Neopolis Sector 1 & 2, Kokapet. We are open daily from 9:30 AM to 7:00 PM for private client walkthroughs.";
        cta = { label: "Schedule Consultation", href: "/about#contact" };
      } else {
        botReply =
          "Thank you for your interest. Luxehomes develops ultra-luxury 2, 3, and 4 BHK residences across Hyderabad's premier corridors including Kokapet Neopolis, Financial District, and Jubilee Hills. Would you like to explore our interactive 3D cutaway or schedule a private site visit?";
        cta = { label: "Launch Interactive 3D Cutaway", href: "/gallery" };
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
    }, 900);
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
    "What 3 BHK residences are available?",
    "Tell me about Kokapet Neopolis pricing",
    "Are properties HMDA & Vastu approved?",
    "Schedule a private site visit",
  ];

  return (
    <>
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 1. FLOATING LUXURY CONCIERGE DOCK (BOTTOM-RIGHT)                  */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto select-none">

        {/* WhatsApp Direct Concierge Button (Refined Quiet Luxury Styling) */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1c1b1b]/95 backdrop-blur-md text-white text-[10.5px] font-medium tracking-wide px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 border border-[#B08D57]/30">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>Private WhatsApp Concierge</span>
          </div>

          <a
            href="https://wa.me/914045678900?text=Hello%20Luxehomes%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20residences%20and%20schedule%20a%20private%20site%20visit."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="size-11 md:size-12 rounded-full bg-[#1c1b1b] hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#B08D57]/50 hover:border-[#25D366] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group/wa"
          >
            {/* Subtle live status dot */}
            <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-emerald-500 border border-[#1c1b1b]" />

            {/* Refined WhatsApp SVG Icon */}
            <svg
              className="size-5 fill-current transition-transform duration-300 group-hover/wa:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.09 19.11L7.81 18.95L4.69 19.77L5.52 16.73L5.34 16.44C4.56 15.19 4.14 13.75 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.63 7.38C8.44 7.38 8.24 7.39 8.07 7.74C7.86 8.16 7.28 8.71 7.28 9.83C7.28 10.95 8.1 12.03 8.21 12.18C8.33 12.33 9.79 14.71 12.09 15.63C14 16.39 14.39 16.24 14.81 16.2C15.23 16.16 16.14 15.65 16.33 15.12C16.52 14.59 16.52 14.13 16.46 14.03C16.4 13.93 16.25 13.87 15.89 13.69C15.53 13.51 13.78 12.65 13.45 12.53C13.13 12.41 12.89 12.35 12.66 12.71C12.42 13.06 11.75 13.87 11.54 14.1C11.34 14.34 11.13 14.37 10.77 14.19C10.41 14.01 9.25 13.63 7.88 12.41C6.8 11.45 6.07 10.27 5.86 9.91C5.66 9.55 5.84 9.36 6.02 9.18C6.18 9.02 6.38 8.76 6.56 8.55C6.74 8.34 6.8 8.19 6.92 7.95C7.04 7.71 6.98 7.5 6.89 7.32C6.8 7.14 6.13 5.48 5.85 4.81C5.58 4.16 5.3 4.25 5.09 4.24L4.44 4.23C4.24 4.23 3.91 4.31 3.64 4.6C3.36 4.89 2.58 5.62 2.58 7.1C2.58 8.58 3.66 10.01 3.81 10.21C3.96 10.41 5.92 13.44 8.93 14.74C11.94 16.04 11.94 15.61 12.48 15.57C13.02 15.53 14.23 14.86 14.48 14.15C14.73 13.44 14.73 12.83 14.66 12.71C14.58 12.59 14.39 12.51 14.03 12.33L8.63 7.38Z" />
            </svg>
          </a>
        </div>

        {/* AI Concierge Chatbot Trigger Button (Refined Luxury Styling) */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1c1b1b]/95 backdrop-blur-md text-white text-[10.5px] font-medium tracking-wide px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 border border-[#B08D57]/30">
            <span className="size-1.5 rounded-full bg-[#B08D57]" />
            <span>Luxe AI Concierge</span>
          </div>

          <button
            onClick={() => setChatOpen((prev) => !prev)}
            aria-label="Toggle AI Concierge Chat"
            className={`size-11 md:size-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer relative ${
              chatOpen
                ? "bg-[#B08D57] text-white border-[#B08D57]"
                : "bg-[#1c1b1b] text-[#B08D57] hover:bg-[#B08D57] hover:text-white border-[#B08D57]/50 hover:border-[#B08D57]"
            }`}
          >
            {chatOpen ? (
              <span className="material-symbols-outlined text-lg">close</span>
            ) : (
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
                <span className="absolute -top-1 -right-1 size-1.5 rounded-full bg-[#B08D57]" />
              </div>
            )}
          </button>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 2. BESPOKE LUXURY AI CHAT MODAL / DRAWER                          */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-[390px] h-[540px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-[#E8E4DC] overflow-hidden flex flex-col animate-fade-in-scale select-none">

          {/* Chat Header */}
          <div className="p-4 px-5 bg-[#1c1b1b] text-white flex items-center justify-between border-b border-[#B08D57]/30">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#B08D57]/20 border border-[#B08D57] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg text-[#B08D57]">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium tracking-wide">Luxe AI Concierge</h4>
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-[#B08D57] uppercase tracking-wider block">
                  Private Client Advisory
                </span>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[#FAF7F2] to-white flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#1c1b1b] text-white rounded-br-none"
                      : "bg-white text-[#1c1b1b] border border-[#E8E4DC] shadow-xs rounded-bl-none"
                  }`}
                >
                  {msg.text}

                  {msg.cta && (
                    <div className="mt-2.5 pt-2 border-t border-[#E8E4DC]">
                      <Link
                        href={msg.cta.href}
                        onClick={() => setChatOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B08D57] hover:underline"
                      >
                        <span>{msg.cta.label}</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-[#72716d] mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E8E4DC] text-xs text-[#72716d]">
                <span className="size-1.5 rounded-full bg-[#B08D57] animate-bounce" />
                <span className="size-1.5 rounded-full bg-[#B08D57] animate-bounce [animation-delay:0.2s]" />
                <span className="size-1.5 rounded-full bg-[#B08D57] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1">Consulting property ledger...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="p-2 px-3 bg-[#FAF7F2] border-t border-[#E8E4DC] flex gap-1.5 overflow-x-auto whitespace-nowrap">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E8E4DC] hover:border-[#B08D57] text-[#474741] hover:text-[#1c1b1b] transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#E8E4DC] flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Ask about 3D layouts, pricing, Vastu..."
              className="flex-1 bg-[#FAF7F2] border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#B08D57] transition-colors"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="size-8.5 rounded-xl bg-[#B08D57] hover:bg-[#967645] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
