# 🏛️ LuxeHomes — Sovereign Ultra-Luxury Real Estate & Spatial 3D Masterplan Platform

> **Next-generation architectural visualization, real-time WebGL 3D dollhouse cutaways, interactive HMDA masterplanning, and AI-powered client concierge for sovereign luxury residences.**

![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?style=flat-square&logo=three.js)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)
![HMDA Approved](https://img.shields.io/badge/HMDA-Master_Plan_Approved-emerald?style=flat-square)
![Vastu Compliant](https://img.shields.io/badge/Vastu-100%25_Compliant-gold?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

---

## 🚀 Overview

### The Problem
Modern luxury real estate developers and discerning High-Net-Worth Individuals (HNWIs) face persistent friction in standard digital property exploration:

- **Static 2D Blueprint Disconnect:** Conventional 2D architectural blueprints and flat schematics fail to convey spatial volume, ceiling clearances (4.5m+), daylight trajectories, and furnished livability, leaving elite buyers guessing.
- **Opaque Carpet Area & Pricing Benchmarks:** Commercial brochures frequently obscure true usable RERA carpet area versus super built-up loading factors, preventing transparent per-square-foot and per-square-yard valuation calculations.
- **Disconnected Regional GIS & Drive-Time Fallacies:** Standard embedded maps lack corridor-level context, obscuring true arterial highway access (e.g., Outer Ring Road Exit 1/1A) and accurate drive times to international schools, tertiary medical centers, and corporate IT hubs.
- **High-Friction Manual Inquiry Silos:** Slow contact forms with no instant advisory routing, missing Vastu orientation metrics, and lack of real-time spatial exploration cause significant drop-offs among international and non-resident Indian (NRI) buyers.

### The Solution
**LuxeHomes** (League Constructions) is an autonomous, sovereign spatial real estate platform that transforms luxury residential discovery by combining:

- **Procedural 3D WebGL Dollhouse Engine:** Custom Three.js architectural visualizer offering 360° orbit inspection, procedural cutaway ceilings, satin-matte PBR materials, studio 3-point illumination, and instant Day/Evening solar toggles.
- **Dual-Mode Architectural Masterplan Viewer:** Seamless 1-click toggle between real-time 3D WebGL interactive dollhouses and ultra-high-resolution architectural renders with interactive hotspot callouts, room dimension schedules, and live area loading calculators.
- **Dynamic Vastu Shastra Orientation Engine:** Real-time geometric compass needle calibrated to each unit's cardinal alignment (North, North-East, East, South-East, South, South-West, West, North-West).
- **Cartographic Infrastructure & Drive-Time Explorer:** Interactive Western Hyderabad master plan tracking Neopolis corridor connectivity, ORR arterial junctions, and categorized facilities (Schools, Hospitals, Retail, IT Hubs) with pulsing radar pins.
- **AI Private Client Concierge & Instant WhatsApp Dispatch:** Grounded conversational real estate intelligence providing factual pricing schedules, unit availability, and 1-click encrypted WhatsApp advisory routing (`+91 9550960744`).

---

## ✨ Key Capabilities

### 1. 🏢 Procedural 3D WebGL Architectural Dollhouse Viewer (`ThreeDModelViewer.tsx`)
- **1,000+ lines of procedural 3D architectural engineering** in Three.js and OrbitControls.
- Real-time procedural cutaway rendering of walls, floors, ceilings, furniture, pooja/mandir, living salon, master suite, kitchen, balconies, and windows with true spatial depth.
- **Day & Evening Dynamic Lighting Modes:** Instant toggle between solar directional daylight and warm 2700K recessed interior point lights.
- **Smooth Camera Lerp Transitions:** 1-click focus on specific architectural spaces: Living & Dining Salon, Master Suite & Ensuite, Traditional Mandir/Pooja, Study / Bedroom 2, Twin Suite / Bedroom 3, Gourmet Kitchen & Utility, and Viewing Balcony.
- **Touch & Mobile Stabilization:** Zero floor flickering, eliminated shadow acne striations, `logarithmicDepthBuffer` implementation, and lerp cancellation on user interaction.

### 2. 📐 Dual-Mode Floor Plan & Isometric Cutaway Viewer (`IsometricFloorPlanViewer.tsx`)
- Instant toggle between interactive real-time 3D WebGL models and high-resolution architectural cutaway photography (`isometric_2bhk.jpg`, `isometric_3bhk.jpg`, `isometric_4bhk_ground.jpg`, `isometric_4bhk_level1.jpg`, `luxe_living_dining.jpg`, `luxe_master_suite.jpg`).
- **Perspective Switcher:** Masterplan Cutaway, Living Salon, and Master Bedroom views.
- **Multi-Level Villa Support:** Seamless floor-level navigation for multi-tier residences and Sky Villas (Ground Floor vs. Level 1).
- **Fullscreen Immersive Lightbox:** Dedicated high-resolution inspection modal with keyboard navigation (`Escape` dismissal) and body scroll locking.

### 3. 🧭 Dynamic Vastu Shastra Compass & Cardinal Calibration
- Mathematical compass needle rotation dynamically aligned to unit orientation: North (0°), North-East (45°), East (90°), South-East (135°), South (180°), South-West (225°), West (270°), and North-West (315°).
- Verified alignment with ancient Sthapatya Veda architectural norms, optimizing natural light ingress and positive spatial energy flow.

### 4. 🗺️ Neopolis Corridor & Western Hyderabad Cartographic Explorer (`/location`)
- High-fidelity interactive cartographic map canvas depicting Kokapet Neopolis, Financial District, Gachibowli, Tellapur, Banjara Hills, and Jubilee Hills.
- **Real-Time Drive-Time Matrix:** Financial District (5 min), Outer Ring Road Exit 1 (3 min), Gachibowli IT Hub (8 min), Rajiv Gandhi International Airport (25 min via ORR Expressway).
- Filterable nearby facilities categorized across Schools (Oakridge, CHIREC), Hospitals (Continental, AIG), Retail (Phoenix Arena, Sarath City), and IT Hubs (Waverock, Wipro Circle).
- Animated pulsing radar pins with interactive hover states and direct Google Maps & Apple Maps route generation.

### 5. 🤖 Grounded AI Private Client Concierge (`FloatingContactWidgets.tsx`)
- In-app conversational AI copilot grounded in verified project JSON ledgers (`properties.json`, `locations.json`).
- Answers HNWI queries regarding Kokapet Neopolis price benchmarks, 2/3/4 BHK unit configurations, RERA/HMDA status, carpet areas, and booking token protocols.
- Contextual suggestion chips (*"Tell me about 3 BHK"*, *"Pricing & Payment Plans"*, *"Kokapet Location Advantages"*, *"Book Site Visit"*).
- Hallucination-free design with direct CTA buttons to masterplans and consultation bookings.

### 6. 💬 Instant Direct WhatsApp Advisory Integration
- Floating physics button with pulsating multi-ring ripple aura.
- Direct integration with League Constructions private site advisory desk (`+91 9550960744`).
- Dynamic URL-encoded pre-filled consultation request templates transmitting buyer unit interest, timeline, and site visit preferences.

### 7. 🎞️ Cinematic Site Walkthrough & Video Showcase
- Native 4K YouTube site walkthrough embed (`L0PSxBh31NI`) with ambient cinema borders.
- Full-bleed video modal with custom playback controls, gold diamond ornaments, and direct private site visit scheduler.

### 8. 🏛️ Heritage & Company Story Scroll (`CompanyStoryScroll.tsx` & `/about`)
- Interactive milestone timeline documenting 25+ years of architectural excellence from 1998 to present.
- Curated material provenance dossiers: direct Tuscan quarrying of Carrara Statuario marble, bespoke Milanese brass casting, and Pritzker-caliber structural forms.
- Statutory integrity records: 100% clear title lands, verified escrow accounting, and transparent allotment safeguards.

### 9. 📊 Live Dynamic Pricing & Unit Inventory Matrix (`properties.json`)
- Complete data-driven ledger of Kokapet residences (Botanika Greens, One Neopolis, Cyber Vista, The Grand Estates).
- Automated financial calculations: carpet area, super built-up area, loading ratio percentage, total INR valuation, display price band, and per-sq.ft / per-sq.yd metrics.

### 10. 📜 Statutory Governance & HMDA Master Plan Intelligence
- Built-in compliance trackers verifying HMDA layout master plan sanctions, 100-foot arterial road approvals, and RERA registration roadmap (Status: TBD).
- Interactive legal FAQ accordion covering booking token amounts, 15-day statutory verification windows, institutional home loan tie-ups (SBI, HDFC, ICICI), and zero-deduction cancellation frameworks.

### 11. 🎨 Bespoke "Quiet Luxury" Design System
- Haute-couture typography pairing: Cormorant Garant (editorial serif displays), Playfair Display (structural headings), and Inter (technical typography).
- Fixed palace filigree background (`luxury-palace-pattern.jpg`) with subtle radial gradients, warm ivory canvases (`#FAF7F2`), deep obsidian accents (`#1c1b1b`), and warm metallic gold accents (`#B08D57`).
- Infinite marquee and parallax stat cards with mouse-reactive depth and smooth pause-on-hover interaction.

### 12. ⚡ Multi-Device Mobile-First Performance & WebGL Hardening
- Mobile-optimized responsive layout with docked cartographic HUDs, horizontal swipe tab filters with hidden scrollbars, and touch gesture stabilization.
- Zero floor flickering, no shadow acne striations, debounced viewport resizers, and neutral PBR tone mapping across iOS, Android, macOS, and Windows.

---

## 🛠️ Architecture & Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Next.js 16 + React 19 + TypeScript 5                │
│         Tailwind CSS v4 • Cormorant Garant • Playfair Display           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Client & SSR Hydration
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   App Router Navigation & Route Engine                  │
│        / (Home) • /gallery • /location • /about • /properties/[id]      │
└──────────────┬─────────────────────┬─────────────────────┬──────────────┘
               │                     │                     │
               ▼                     ▼                     ▼
┌───────────────────────────┐ ┌─────────────┐ ┌───────────────────────────┐
│    Three.js WebGL Engine  │ │ Static JSON │ │   Private Client Comms    │
│ • Procedural 3D Dollhouse │ │   Ledgers   │ │ • Grounded AI Concierge   │
│ • OrbitControls & Camera  │ │ • Properties│ │ • WhatsApp Direct Desk    │
│ • Satin-Matte PBR Shaders │ │ • Locations │ │ • YouTube 4K Walkthrough  │
│ • Day / Evening Lighting  │ │ • Facilities│ │ • Consultation Modals     │
└───────────────────────────┘ └─────────────┘ └───────────────────────────┘
```

| Layer | Technologies & Frameworks | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16.3.4**, **React 19.2.8**, React Compiler | App Router architecture with server and client components, static parameter generation (`generateStaticParams`), and smooth route transitions. |
| **3D Spatial Engine** | **Three.js 0.185.1**, **OrbitControls**, WebGL | High-performance 3D dollhouse model rendering with camera lerping, PBR shaders, dynamic shadow mapping, and day/evening illumination. |
| **Styling & Design** | **Tailwind CSS v4**, `@tailwindcss/postcss`, CSS Variables | Curated quiet-luxury design system, responsive flex/grid layouts, custom keyframe animations, and fixed filigree background textures. |
| **Typography** | Cormorant Garant, Playfair Display, Inter, Material Symbols | Haute-couture editorial serif typography paired with clean sans-serif technical data layouts and Google Material symbols. |
| **Data Architecture** | Strongly-typed JSON (`properties.json`, `locations.json`) | Centralized data ledgers maintaining unit specifications, pricing models, Vastu alignments, room dimensions, and regional connectivity GIS data. |
| **Client Concierge** | Custom Grounded AI Bot, WhatsApp Click-to-Chat API | Real-time interactive chat concierge with pre-trained real estate domain responses and instant dispatch to `+91 9550960744`. |

---

## 📊 Architectural Portfolio & Spatial Benchmark Matrix

Evaluated across the verified Kokapet Neopolis inventory and surrounding Western Hyderabad corridors:

| Project Name | Tower & Unit | Config | Carpet Area | Built-Up Area | Orientation | Price Band | Primary Spatial Feature |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Botanika Greens** | Tower A · A-402 | 2 BHK Flat | 1,180 sq.ft | 1,475 sq.ft | East | ₹1.51 Cr* | Sunset Balcony Deck & Utility |
| **One Neopolis** | Tower B · B-604 | 2 BHK Flat | 1,260 sq.ft | 1,575 sq.ft | North-East | ₹1.61 Cr* | Marble Finish Living Salon |
| **Cyber Vista** | Tower 1 · T1-802 | 2 BHK Flat | 1,350 sq.ft | 1,680 sq.ft | West | ₹1.73 Cr* | Generous Master Suite & Wardrobe |
| **Botanika Greens** | Tower A · A-802 | 3 BHK Luxury | 1,580 sq.ft | 1,975 sq.ft | East | ₹2.02 Cr* | Formal Dining & Traditional Mandir |
| **One Neopolis** | Tower A · A-1402 | 3 BHK Luxury | 1,750 sq.ft | 2,185 sq.ft | North-East | ₹2.24 Cr* | Double-Balcony Neopolis Panorama |
| **Cyber Vista** | Tower 2 · T2-1104 | 3 BHK Luxury | 1,920 sq.ft | 2,400 sq.ft | North | ₹2.46 Cr* | Private Foyer & Study / Bedroom 3 |
| **One Neopolis** | Tower A · A-2201 | 4 BHK Sky Villa | 2,480 sq.ft | 3,100 sq.ft | East | ₹3.17 Cr* | 30-Foot Continuous Panoramic Deck |
| **Botanika Greens** | Tower B · B-2601 | 4 BHK Sky Villa | 2,890 sq.ft | 3,610 sq.ft | North-East | ₹3.70 Cr* | Duplex Double-Height Great Room |
| **The Grand Estates** | Sector 1 · Plot 14 | Villa Plot | 300 Sq.Yds | Custom | East | ₹4.50 Cr* | 100% Freehold Clear Title Parcel |
| **The Grand Estates** | Sector 2 · Plot 28 | Villa Plot | 500 Sq.Yds | Custom | North-East | ₹7.50 Cr* | Corner Estate with 60ft Frontage |

### Spatial Performance & Rendering Standards
- **Framerate Target:** Consistent 60 FPS WebGL rendering across desktop and modern mobile devices.
- **Lighting Fidelity:** Studio 3-point illumination with soft ambient fill, directional sun ray casting, and warm 2700K point fixtures.
- **Depth Precision:** Zero depth buffer z-fighting achieved via `logarithmicDepthBuffer: true`.
- **First Contentful Paint (FCP):** < 1.2s on high-speed 4G/5G connections.

---

## 📡 Route & Navigation Reference

### Primary Pages & Navigation
| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `app/page.tsx` | Cinematic landing showcase: hero Ken Burns banner, infinite gallery marquee, YouTube virtual walkthrough embed, facilities matrix, Kokapet interactive map, and inquiry modals. |
| `/gallery` | `app/gallery/page.tsx` | Comprehensive masterplan gallery: BHK category filters (2 BHK, 3 BHK, 4 BHK, Plots), live inventory summaries, and integrated dual-mode 3D/2D isometric floor plan viewer. |
| `/location` | `app/location/page.tsx` | Strategic location explorer: cartographic Western Hyderabad map, driving time breakdowns, categorized facility list, and direct Apple/Google Maps links. |
| `/about` | `app/about/page.tsx` | Architectural heritage dossier: 25+ year milestone timeline, material provenance (Tuscan marble & Milanese brass), statutory compliance, interactive FAQ accordion, and contact form. |
| `/properties/[id]` | `app/properties/[id]/page.tsx` | Dynamic individual unit dossier: static parameters generation (`generateStaticParams`), detailed dimensional schedules, Vastu compass, and direct Three.js model viewer. |
| `/properties` | `app/properties/page.tsx` | Canonical redirect to `/gallery`. |
| `/locations` | `app/locations/page.tsx` | Canonical redirect to `/location`. |
| `/contact` | `app/contact/page.tsx` | Canonical redirect to `/about#contact`. |

### Client-Side Modals & Interactive Overlays
| Modal / Overlay | Trigger Mechanism | Description |
| :--- | :--- | :--- |
| **Enquire Consultation** | Global CTA / `#enquiry-modal-trigger` | Interactive modal to book private site visits or request unit pricing with automated confirmation dispatch. |
| **Download Brochure** | Navbar / Hero / Footer CTAs | Digital folio requisition modal delivering HMDA layouts and unit floor plan sheets. |
| **Site Walkthrough Video** | Walkthrough Section CTA | Fullscreen cinema video player modal featuring 4K YouTube aerial and interior walkthrough. |
| **Fullscreen Floor Plan** | Isometric Viewer Expand Button | Immersive lightbox view of high-resolution architectural cutaway plans with ESC key support. |
| **AI Concierge Chat** | Floating AI Widget (`FloatingContactWidgets.tsx`) | Real-time conversational assistant providing immediate answers regarding pricing, amenities, and Vastu. |
| **WhatsApp Direct Desk** | Floating WhatsApp Icon | Opens encrypted WhatsApp conversation with `+91 9550960744` pre-filled with client requirements. |

---

## 💻 Local Quickstart Guide

### Prerequisites
- **Node.js:** `≥ 20.0.0` (Node 22 LTS recommended)
- **npm:** `≥ 10.0.0`
- **Git**

### 1. Clone & Configure Environment
```bash
# Clone the repository
git clone https://github.com/shankss-18/Luxehomes.git
cd league-constructions

# Verify Node.js version
node -v
npm -v
```

### 2. Install Dependencies & Launch Dev Server
```bash
# Install all required npm packages
npm install

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Code Validation & Production Build
```bash
# Run ESLint to verify code quality
npm run lint

# Compile optimized Next.js production build
npm run build

# Start production server locally
npm run start
```

---

## 🌐 Production Cloud Deployment

### Deployment on Vercel (Recommended)
The platform is optimized for seamless zero-configuration deployment on the **Vercel Platform**:

1. Push your latest code to GitHub/GitLab.
2. Import the repository into your Vercel Dashboard.
3. Next.js App Router and React 19 build configurations are detected automatically:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Click **Deploy**.

### Deployment on Standalone Node.js / Docker
To containerize or deploy to standard Linux VPS (Ubuntu, Debian, AWS EC2, or DigitalOcean):

```bash
# Build production bundle
npm run build

# Launch production server with PM2 or systemd
pm2 start npm --name "luxehomes" -- start
```

---

## 📂 Project Structure

```
league-constructions/
├── app/                                 # Next.js App Router Pages & Layouts
│   ├── about/                           # Heritage, Material Provenance & FAQ Page
│   │   └── page.tsx
│   ├── contact/                         # Canonical redirect to /about#contact
│   │   └── page.tsx
│   ├── gallery/                         # Masterplans & Interactive 3D Viewer Page
│   │   └── page.tsx
│   ├── location/                        # Cartographic Explorer & Facilities Matrix
│   │   └── page.tsx
│   ├── locations/                       # Canonical redirect to /location
│   │   └── page.tsx
│   ├── properties/                      # Curated Properties Directory & Dynamic Dossiers
│   │   ├── [id]/                        # Dynamic Unit Page (generateStaticParams)
│   │   │   └── page.tsx
│   │   └── page.tsx                     # Canonical redirect to /gallery
│   ├── globals.css                      # Core design system, font imports, & animations
│   ├── layout.tsx                       # Root Layout: metadata, fonts, navbar & footer
│   └── page.tsx                         # Cinematic Home Page (Hero, Walkthrough, Map)
├── components/                          # Modular React Client & UI Components
│   ├── CompanyStoryScroll.tsx           # Interactive 25-Year Milestone & Provenance Scroll
│   ├── FloatingContactWidgets.tsx       # Grounded AI Concierge & WhatsApp Floating Desk
│   ├── Footer.tsx                       # Global Luxury Footer with Sitemap & Disclaimers
│   ├── HomeGalleryMarquee.tsx           # Continuous Smooth Showcase Marquee
│   ├── IsometricFloorPlanViewer.tsx     # Dual-Mode 3D WebGL vs 2D Cutaway Visualizer
│   ├── MarqueeStatCards.tsx             # Continuous Trust Metric Banner
│   ├── Navbar.tsx                       # Glassmorphism Top Navigation with Active States
│   ├── ParallaxStatCards.tsx            # Mouse-reactive Parallax Trust Metrics
│   ├── ScrollAnimationProvider.tsx      # Smooth Scroll & Reveal Intersection Observers
│   └── ThreeDModelViewer.tsx            # 1,000-Line Procedural Three.js WebGL 3D Model
├── data/                                # Centralized Domain Ledgers & GIS Sources
│   ├── locations.json                   # Facilities, Distances, Coordinates & Localities
│   └── properties.json                  # Unit Inventories, Floor Plans, Prices & Dimensions
├── public/                              # Static Public Assets & Floorplan Photography
│   ├── images/
│   │   └── floorplans/                  # Ultra-High-Res Isometric Cutaways & Renderings
│   │       ├── isometric_2bhk.jpg
│   │       ├── isometric_3bhk.jpg
│   │       ├── isometric_4bhk_ground.jpg
│   │       ├── isometric_4bhk_level1.jpg
│   │       ├── luxe_living_dining.jpg
│   │       └── luxe_master_suite.jpg
│   ├── luxury-palace-pattern.jpg        # Filigree palace background texture
│   ├── luxury-arch-pattern.svg          # Architectural motif vector
│   └── favicon.ico
├── eslint.config.mjs                    # ESLint 9 configuration
├── next.config.ts                       # Next.js 16 compiler & experimental options
├── package.json                         # Project dependencies & operational scripts
├── postcss.config.mjs                   # PostCSS configuration for Tailwind CSS v4
├── tailwind.config.ts                   # Tailwind theme tokens, typography, & colors
├── tsconfig.json                        # TypeScript strict compiler options
└── README.md                            # Comprehensive Architectural & Technical Documentation
```

---

## 🛡️ Architectural Quality & Statutory Standards

- **100% Clear Titles & Statutory Integrity:** All featured land parcels are HMDA master-plan approved with verified escrow frameworks and scheduled RERA documentation (Status: TBD).
- **Ancient Vastu Shastra Adherence:** Every residential layout undergoes cardinal orientation verification to ensure harmonious spatial ventilation, morning sunlight ingress, and sacred geometrical harmony.
- **Zero-Touch WebGL Stutter:** Custom rendering pipelines utilize `logarithmicDepthBuffer: true`, optimized satin-matte PBR shaders, and disabled shadow acne striations for silky-smooth 60 FPS mobile navigation.
- **Client Confidentiality & PII Protection:** Advisory contact requests and digital folio downloads are handled through secure client-side flows with instant direct-to-desk WhatsApp dispatch (`+91 9550960744`).

---

## 📄 License

Distributed under the **MIT License**. Copyright © 2026 **LuxeHomes / League Constructions**. All rights reserved.
