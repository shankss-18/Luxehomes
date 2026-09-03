import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import FloatingContactWidgets from "@/components/FloatingContactWidgets";

export const metadata: Metadata = {
  title: "LUXEHOMES — The Epitome of Quiet Luxury",
  description:
    "Discover an unparalleled collection of luxury residences. LuxeHomes curates exclusive properties for the discerning few across India's most coveted addresses.",
  keywords: ["luxury real estate", "premium residences", "luxury homes India", "LuxeHomes", "quiet luxury"],
  openGraph: {
    title: "LUXEHOMES — The Epitome of Quiet Luxury",
    description: "Discover an unparalleled collection of luxury residences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Fonts: Playfair Display + Inter (Stitch design system) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        <ScrollAnimationProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingContactWidgets />
      </body>
    </html>
  );
}
