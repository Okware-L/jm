"use client";

import React, { useRef, useEffect } from "react";
//import  Link  from "next/link";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".about-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".about-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Intro paragraph
      gsap.fromTo(".intro-paragraph", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".intro-paragraph", start: "top 88%" },
      });

      // Bento boxes
      gsap.fromTo(".bento-box", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".bento-grid", start: "top 85%" },
      });

      // What sets us apart cards
      gsap.fromTo(".apart-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: ".apart-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="about-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          About <em className="italic" style={{ color: "var(--accent)" }}>Us</em>
        </h1>
        <p className="about-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          A dynamic community of business leaders fostering collaboration, growth, and innovation.
        </p>
      </section>

      {/* Intro Paragraph */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="intro-paragraph font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600 max-w-5xl mx-auto">
          The JM-Qafri Network is a dynamic and influential community of business leaders, dedicated to fostering collaboration, growth,
          and innovation. Our network brings together forward-thinking entrepreneurs, executives, and industry experts from various
          sectors and backgrounds, creating a powerful ecosystem that drives meaningful change in the business world.
        </p>
      </section>

      {/* Bento Box Layout - Vision & Mission */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          02 — Our Philosophy
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        {/* Asymmetric Bento Grid */}
        <div className="bento-grid grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Vision - Large Box */}
          <div className="bento-box lg:col-span-7 lg:row-span-2 border border-slate-200 p-[var(--gap-lg)] bg-slate-50">
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-6">
              Our <em style={{ color: "var(--accent)" }}>Vision</em>
            </h2>
            <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
              Our vision at the JM-Qafri Network is to be the premier platform for business leaders, renowned for fostering a
              dynamic community that fuels collaboration, growth, and continuous learning. We aspire to create an ecosystem where
              innovative minds converge, exchange ideas, and synergistically build towards shared success.
            </p>
          </div>

          {/* Mission - Medium Box */}
          <div className="bento-box lg:col-span-5 border border-slate-200 p-[var(--gap-lg)] bg-white">
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-6">
              Our <em style={{ color: "var(--accent)" }}>Mission</em>
            </h2>
            <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
              To foster a vibrant community of business leaders, united by a shared vision of collaboration, growth, and knowledge sharing.
            </p>
          </div>

          {/* Values - Small Box */}
          <div className="bento-box lg:col-span-5 border border-slate-200 p-[var(--gap-md)]" style={{ backgroundColor: "var(--accent)" }}>
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-[-0.02em] leading-[1.1] mb-4 text-white">
              Core Values
            </h3>
            <ul className="space-y-2">
              <li className="font-sans text-[13px] font-light text-white/90">→ Integrity</li>
              <li className="font-sans text-[13px] font-light text-white/90">→ Innovation</li>
              <li className="font-sans text-[13px] font-light text-white/90">→ Collaboration</li>
              <li className="font-sans text-[13px] font-light text-white/90">→ Excellence</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          03 — What Sets Us Apart
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="apart-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Card 1: Value Beyond Wealth */}
          <div className="apart-card space-y-4">
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-[-0.02em] leading-[1.1]">
              Helping you create value <em style={{ color: "var(--accent)" }}>beyond wealth</em>
            </h3>
            <p className="font-sans text-[clamp(13px,1.3vw,15px)] font-light leading-[1.8] text-slate-600">
              We guide you along your personal sustainability journey by providing you with opportunities to share expertise and experiences, 
              and giving you access to in-depth insights and advice to help you make informed decisions.
            </p>
          </div>

          {/* Card 2: Pure Wealth Management */}
          <div className="apart-card space-y-4">
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-[-0.02em] leading-[1.1]">
              Pure <em style={{ color: "var(--accent)" }}>wealth management</em>
            </h3>
            <p className="font-sans text-[clamp(13px,1.3vw,15px)] font-light leading-[1.8] text-slate-600">
              We have a holistic wealth management offering with comprehensive investment solutions built on our long-standing expertise 
              and proprietary research.
            </p>
          </div>

          {/* Card 3: Local and Global */}
          <div className="apart-card space-y-4">
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-[-0.02em] leading-[1.1]">
              Local <em style={{ color: "var(--accent)" }}>and global</em>
            </h3>
            <p className="font-sans text-[clamp(13px,1.3vw,15px)] font-light leading-[1.8] text-slate-600">
              Our international wealth management network enables us to be in close proximity to our clients while benefiting from 
              our international centres of expertise.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
