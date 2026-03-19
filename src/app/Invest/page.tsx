"use client"

import React, { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ASSET_CLASSES = [
  {
    num: "01",
    title: "Traditional Equities",
    desc: "Blue-chip stocks and dividend aristocrats across global markets."
  },
  {
    num: "02",
    title: "DeFi Protocols",
    desc: "Carefully audited decentralized finance platforms with proven track records."
  },
  {
    num: "03",
    title: "Private Equity",
    desc: "Pre-IPO opportunities in healthcare, agriculture, and fintech."
  },
  {
    num: "04",
    title: "Real Assets",
    desc: "Farmland, real estate, and commodities with intrinsic value."
  },
  {
    num: "05",
    title: "Structured Products",
    desc: "Custom-built financial instruments tailored to your risk profile."
  },
];

const OPPORTUNITIES = [
  { amount: "$150M", sector: "Pharma Tech", name: "Mobile Diagnostics Expansion", status: "Open" },
  { amount: "$75M", sector: "Agriculture", name: "Organic Fertilizer Scale-Up", status: "Open" },
  { amount: "$200M", sector: "Real Estate", name: "Nairobi Commercial Development", status: "Closing Soon" },
];

export default function InvestPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".invest-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".invest-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      gsap.fromTo(".service-card", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
      });

      gsap.fromTo(".philosophy-section", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".philosophy-section", start: "top 88%" },
      });

      gsap.fromTo(".desc-paragraph", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: ".desc-paragraph", start: "top 85%" },
      });

      gsap.fromTo(".asset-row", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.06,
        scrollTrigger: { trigger: ".asset-list", start: "top 90%" },
      });

      gsap.fromTo(".opp-row", { opacity: 0, x: -16 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.08,
        scrollTrigger: { trigger: ".opportunities-list", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="invest-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          Investment <em className="italic" style={{ color: "var(--accent)" }}>Excellence</em>
        </h1>
        <p className="invest-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          Disciplined, data-driven strategies across traditional and emerging markets.
        </p>
      </section>

      {/* Service Cards */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Our Services
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
          <div className="service-card border border-slate-200 p-8 bg-white hover:border-[var(--accent)] transition-colors duration-300">
            <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em] leading-[1.2] mb-4">
              Enhanced Advisory Services
            </h3>
            <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.8] text-slate-600 mb-6">
              Access JM-Qafri's extensive knowledge and capabilities to optimize your investment strategies with our advisory mandates.
            </p>
            <a href="#" className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.2em] uppercase text-[var(--accent)] hover:gap-3 transition-all duration-200">
              Discover more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17l10-10M7 7h10v10" />
              </svg>
            </a>
          </div>

          <div className="service-card border border-slate-200 p-8 bg-white hover:border-[var(--accent)] transition-colors duration-300">
            <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em] leading-[1.2] mb-4">
              Expert-Managed Investments
            </h3>
            <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.8] text-slate-600 mb-6">
              Let our committed specialists take charge of your investments, ensuring tailored solutions and expert oversight.
            </p>
            <a href="#" className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.2em] uppercase text-[var(--accent)] hover:gap-3 transition-all duration-200">
              Discover more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17l10-10M7 7h10v10" />
              </svg>
            </a>
          </div>

          <div className="service-card border border-slate-200 p-8 bg-white hover:border-[var(--accent)] transition-colors duration-300">
            <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em] leading-[1.2] mb-4">
              Other Solutions
            </h3>
            <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.8] text-slate-600 mb-6">
              Explore our comprehensive range of additional solutions and products.
            </p>
            <a href="#" className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.2em] uppercase text-[var(--accent)] hover:gap-3 transition-all duration-200">
              Discover more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17l10-10M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="philosophy-section border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <p className="font-serif text-[clamp(1.7rem,4vw,3.4rem)] font-light tracking-[-0.03em] leading-[1.25] max-w-5xl mx-auto text-left text-slate-700">
          We invest where others hesitate. Our thesis is simple: the future belongs to those who can see past volatility to value,
          past disruption to infrastructure, and past innovation to impact.
        </p>
      </section>

      {/* Descriptive Paragraph */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="desc-paragraph font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600 max-w-5xl mx-auto">
          At JM-Qafri, we've been cultivating our investment expertise and offerings for generations. Throughout our history, we've recognized
          that each individual's investment requirements are distinct and personalized. That's why our first priority is gaining a
          comprehensive understanding of your circumstances, aspirations, and risk tolerance. With a clear grasp of your needs and objectives, we can then
          assist you in pinpointing and executing the ideal solution. Whether it involves a discretionary or advisory mandate, investing in a particular
          asset class, crafting a customized structured product, or providing execution support, you'll leverage our extensive investment
          experience and global network to your advantage.
        </p>
      </section>

      {/* Asset Classes - Accordion */}
      <section className="border-t border-slate-700 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-900">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          01 — Asset Classes
          <span className="flex-1 h-px bg-slate-700" />
        </p>

        <div className="asset-list space-y-0">
          {ASSET_CLASSES.map(({ num, title, desc }, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div key={num} className="asset-row border-b border-slate-700">
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full text-left grid grid-cols-[clamp(36px,5vw,72px)_1fr_auto] items-start gap-x-[var(--gap-md)] py-[var(--gap-md)] group"
                >
                  <span className="font-sans text-[11px] font-light tracking-[0.14em] text-slate-400 pt-1">
                    {num}
                  </span>
                  <h3 className="font-serif text-[clamp(1.7rem,4vw,3.4rem)] font-light tracking-[-0.03em] leading-[1.02] text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                    {title}
                  </h3>
                  <span
                    className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-white flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M7 17l10-10M7 7h10v10" />
                    </svg>
                  </span>
                </button>
                
                {isExpanded && (
                  <div className="pl-[clamp(52px,8vw,116px)] pb-[var(--gap-md)] animate-fadeIn">
                    <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.8] text-slate-300 max-w-2xl">
                      {desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

 

      <Footer />
    </div>
  );
}