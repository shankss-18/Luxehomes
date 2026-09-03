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
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none">

        {/* WhatsApp Direct Concierge Button (Official Brand Logo) */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1c1b1b] text-white text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 border border-white/10">
            <span>Chat on WhatsApp · Private Concierge</span>
          </div>

          <a
            href="https://wa.me/914045678900?text=Hello%20Luxehomes%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20residences%20and%20schedule%20a%20private%20site%20visit."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="size-12 md:size-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-2xl hover:shadow-emerald-500/35 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            {/* Official WhatsApp Logo SVG */}
            <svg
              className="size-7 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.275-.1-.476-.15-.676.15-.2.3-.777.977-.952 1.177-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.613.136-.134.301-.351.451-.527.151-.175.201-.3.302-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.927-2.233-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.91 1.229 3.111c.15.2 2.122 3.24 5.14 4.544.718.31 1.279.495 1.716.634.721.229 1.378.197 1.897.119.579-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.201-.577-.351zM12.004 21.75c-1.737 0-3.441-.453-4.945-1.314l-.354-.202-3.676.964.981-3.584-.222-.353a9.718 9.718 0 01-1.492-5.187c0-5.385 4.381-9.766 9.768-9.766 2.609 0 5.061 1.017 6.906 2.862a9.713 9.713 0 012.86 6.904c0 5.386-4.382 9.766-9.826 9.766zm8.334-16.671A11.666 11.666 0 0012.004.25C5.522.25.247 5.526.247 12.009c0 2.07.54 4.09 1.565 5.869L0 24l6.287-1.65a11.724 11.724 0 005.717 1.474h.005c6.481 0 11.757-5.275 11.757-11.759 0-3.14-1.222-6.092-3.428-8.295z" />
            </svg>
          </a>
        </div>

        {/* AI Concierge Chatbot Trigger Button (Official AI Bot Vector Icon) */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1c1b1b] text-white text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 border border-white/10">
            <span>Luxe AI Concierge · Live Assistant</span>
          </div>

          <button
            onClick={() => setChatOpen((prev) => !prev)}
            aria-label="Toggle AI Concierge Chat"
            className="size-12 md:size-13 rounded-full bg-[#1c1b1b] hover:bg-[#282420] text-white border-2 border-[#B08D57] shadow-lg hover:shadow-2xl hover:shadow-[#B08D57]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            {chatOpen ? (
              <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Authentic Modern AI Chatbot Vector Logo */
              <svg className="size-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="14" rx="5" fill="#1c1b1b" stroke="#B08D57" strokeWidth="1.8"/>
                <line x1="12" y1="2" x2="12" y2="6" stroke="#B08D57" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="12" cy="2" r="1.5" fill="#B08D57"/>
                <rect x="1" y="10" width="2" height="6" rx="1" fill="#B08D57"/>
                <rect x="21" y="10" width="2" height="6" rx="1" fill="#B08D57"/>
                <rect x="6.5" y="9.5" width="11" height="4" rx="2" fill="#FAF7F2"/>
                <circle cx="9.2" cy="11.5" r="1.2" fill="#B08D57"/>
                <circle cx="14.8" cy="11.5" r="1.2" fill="#B08D57"/>
                <path d="M9 16C10 17 14 17 15 16" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
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
