"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import HeroSection from "@/components/HeroSection";
import TickerBar from "@/components/TickerBar";
import ServicesSection from "@/components/ServiceSection";
import AboutSection from "@/components/Aboutsection";
import InsightsSection from "@/components/Insightssection";
import FeatureSection from "@/components/Featuresection";
import NewsletterSection from "@/components/Newslettersection";

export default function HomePage() {
  const [ready, setReady] = useState(false);
 
  return (
    <>
      {/* Loader sits on top at z-[9000] — page is mounted underneath immediately */}
      <Loader onComplete={() => setReady(true)} />
 
      {/* Page is always in the DOM — hero manages its own hidden→visible state via GSAP */}
      <Navbar />
 
      <main>
        <HeroSection triggerAnimation={ready} />
        <TickerBar />
        <ServicesSection />
        <AboutSection />
        <InsightsSection />
        <FeatureSection />
        <NewsletterSection />
      </main>
 
      <Footer />
    </>
  );
}