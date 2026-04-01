"use client";


import React, { useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link  from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CORE_PILLARS = [
  { title: "Innovation", desc: "Crafting cutting-edge solutions." },
  { title: "Collaboration", desc: "Amplifying impact through partnerships." },
  { title: "Expertise", desc: "Applying knowledge to solve challenges." },
  { title: "Impact", desc: "Transforming communities worldwide." }
];

const BENEFITS = [
  "Unique Engagement Opportunities",
  "Targeted Audience Reach",
  "Collaborative Knowledge Exchange",
  "Enhanced Visibility through JM-Qafri Channels"
];

const OPPORTUNITIES = [
  { title: "Solution Provider", desc: "Integrate identity solutions." },
  { title: "Distributor", desc: "Expand our reach in new markets." },
  { title: "System Integrator", desc: "Implement our enterprise solutions." },
  { title: "Managed Service Provider", desc: "Offer managed identity services." },
  { title: "Technology Partner", desc: "Collaborate on tech solutions." },
  { title: "Consultant", desc: "Advise on identity management." }
];

export default function IntermediariesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".intermediaries-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".intermediaries-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Vision text
      gsap.fromTo(".vision-text", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".vision-text", start: "top 88%" },
      });

      // Core pillars
      gsap.fromTo(".pillar-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".pillars-grid", start: "top 85%" },
      });

      // Benefits section
      gsap.fromTo(".benefits-content", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".benefits-section", start: "top 85%" },
      });

      // Opportunities
      gsap.fromTo(".opportunity-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08,
        scrollTrigger: { trigger: ".opportunities-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="intermediaries-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          JM-Qafri <em className="italic" style={{ color: "var(--accent)" }}>Intermediary</em> Network
        </h1>
        <p className="intermediaries-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          We believe in the power of collaboration to revolutionize identity-powered technology solutions. Join our ecosystem to drive impact and innovation.
        </p>
      </section>

      {/* Collaborative Vision */}
      <section className="vision-text border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="max-w-4xl">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-6">
            Our Collaborative <em style={{ color: "var(--accent)" }}>Vision</em>
          </h2>
          <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
            Partnering with JM-Qafri means aligning with leading organizations like JM-Q Methuselah, NWCV, Scorpion Group, and CPJ Farms to create solutions that address global challenges in business, healthcare, education, and community development.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Our Core Pillars
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_PILLARS.map((pillar, idx) => (
            <div key={idx} className="pillar-card border border-slate-200 p-[var(--gap-md)] bg-slate-50">
              <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em] leading-[1.1] mb-2" style={{ color: "var(--accent)" }}>
                {pillar.title}
              </h3>
              <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intermediary Program Benefits */}
      <section className="benefits-section border-t border-[#2c5aa0]/30 px-6 md:px-[var(--pad-x)] py-[var(--section-y)]" style={{ backgroundColor: "#2c5aa0" }}>
        <div className="benefits-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-[var(--gap-md)] text-white">
              Program <em className="text-white">Benefits</em>
            </h2>
            <ul className="space-y-4">
              {BENEFITS.map((benefit, idx) => (
                <li key={idx} className="flex items-start font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.7] text-white/90">
                  <span className="mr-3 mt-1" style={{ color: "white" }}>→</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Intermediary Opportunities */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Intermediary Opportunities
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="opportunities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPPORTUNITIES.map((opportunity, idx) => (
            <div key={idx} className="opportunity-card border border-slate-200 p-[var(--gap-md)] bg-white">
              <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.02em] leading-[1.1] mb-2">
                {opportunity.title}
              </h3>
              <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600 mb-4">
                {opportunity.desc}
              </p>
              <Link
                href="/partnership/apply"
                className="font-sans text-[11px] font-light tracking-[0.16em] uppercase hover:text-[var(--accent)] transition-colors duration-200"
                style={{ color: "var(--accent)" }}
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[clamp(2.6rem,7vw,6.5rem)] font-light tracking-[-0.05em] leading-[0.9] mb-6">
            Join Our <em className="italic" style={{ color: "var(--accent)" }}>Ecosystem</em>
          </h2>
          <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600 mb-[var(--gap-lg)]">
            Partner with JM-Qafri to shape the future. Together, we can create sustainable, impactful solutions.
          </p>
          <Link
            href="/partnership/apply"
            className="inline-flex items-center font-sans text-[11px] font-light tracking-[0.2em] uppercase
                       px-7 py-3.5 border border-[var(--accent)] text-[var(--accent)]
                       transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
          >
            Apply Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
