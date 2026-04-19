"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import WebGLParticles from "@/components/WebGLParticles";

interface HeroSectionProps {
  triggerAnimation: boolean;
}

export default function HeroSection({ triggerAnimation }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const animated   = useRef(false); // prevent double-fire
  

  useEffect(() => {
    // Don't run until loader says go, and only once
    if (!triggerAnimation || animated.current) return;
    if (!sectionRef.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      const words  = gsap.utils.toArray<HTMLElement>(".hero-word");
      const kicker = sectionRef.current!.querySelector<HTMLElement>(".hero-kicker");
      const foot   = sectionRef.current!.querySelector<HTMLElement>(".hero-foot");
      const side   = sectionRef.current!.querySelector<HTMLElement>(".hero-side");
      const scroll = sectionRef.current!.querySelector<HTMLElement>(".hero-scroll");

      // ── 1. Set FROM states now (not in JSX) ──────────────────
      gsap.set(words,  { yPercent: 110 });
      gsap.set([kicker, foot, side, scroll], { opacity: 0 });
      gsap.set(foot,   { y: 18 });
      gsap.set(kicker, { y: 10 });

      // ── 2. Animate in ─────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(kicker, { opacity: 1, y: 0, duration: 0.6 })
        .to(words,  { yPercent: 0, duration: 1.1, stagger: 0.12 }, "-=0.35")
        .to(foot,   { opacity: 1, y: 0, duration: 0.75 }, "-=0.5")
        .to(side,   { opacity: 1, duration: 0.5 }, "-=0.5")
        .to(scroll, { opacity: 1, duration: 0.5 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerAnimation]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-teal-50 relative min-h-svh grid grid-rows-[1fr_auto] overflow-hidden
                 px-6 md:px-[clamp(24px,5vw,72px)]"
      style={{ paddingTop: "calc(clamp(18px, 2.5vw, 32px) * 2 + 40px)" }}
    >
      <WebGLParticles />
      {/* Vertical side label — desktop */}

      <p
        className="hero-side hidden lg:block absolute right-6 md:right-[clamp(24px,5vw,72px)]
                   top-1/2 -translate-y-1/2 rotate-90 origin-center
                   font-sans text-[10px] font-light tracking-[0.3em] uppercase
                   text-[var(--black)] whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      >
        Global Wealth Management &nbsp;·&nbsp; Est. 2018
      </p>

      {/* ── Headline block ───────────────────────────────────── */}
      <div className="flex flex-col justify-end pb-[clamp(36px,5vw,64px)]">
        {/* Kicker */}
        <p className="hero-kicker flex items-center gap-4 mb-[clamp(20px,3.5vw,44px)]
                      font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--black)]">
          <span className="block w-6 h-px bg-[var(--grey)]" aria-hidden="true" />
          Redefining financial futures
        </p>

        {/* Headline — each word gets its own overflow clip */}
        <h1
          className="font-serif font-light leading-[0.88] tracking-[-0.05em]
                     text-[clamp(3.6rem,12vw,12.5rem)] text-[var(--black)]"
          
        >
          {(["Connect", "Grow.","Prosper."] as const).map((word, i) => (
            <span key={i} className="block overflow-hidden leading-[1]">
              {/* .hero-word is the GSAP target — starts at yPercent 110 via gsap.set */}
              <span className={`hero-word block ${i % 2 === 1 ? "italic" : ""}`}
              style={ i === 1 ? { color: "var(--accent)" } : undefined }
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* ── Footer row ───────────────────────────────────────── */}
      <div
        className="hero-foot grid grid-cols-1 sm:grid-cols-[1fr_auto] items-end gap-5
                   border-t border-[var(--line)] pt-[clamp(20px,3vw,32px)]
                   pb-[clamp(56px,8vw,80px)]"
      >
        <p className="max-w-[340px] font-sans text-[clamp(13px,1.2vw,15px)]
                      font-light leading-[1.8] text-[var(--black)]">
          JM-Qafri Methuselah is a global wealth manager committed to safeguarding
          your futures through innovative solutions.
        </p>

        <Link
          href="#services"
          className="group flex items-center gap-3 font-sans text-[11px] font-light
                     tracking-[0.18em] uppercase text-[var(--black)]
                     transition-[gap] duration-300 hover:gap-6 whitespace-nowrap w-fit"
        >
          Explore
          <span
            className="flex items-center justify-center w-[34px] h-[34px] rounded-full
                       border border-[var(--accent)] flex-shrink-0
                       transition-[background] duration-300 group-hover:bg-[var(--accent)]"
          >
            <svg
              width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              className="transition-[stroke] duration-300 group-hover:stroke-white"
            >
              <path d="M7 17l10-10M7 7h10v10" />
            </svg>
          </span>
        </Link>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div
        className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-px h-11 bg-[var(--line)] overflow-hidden relative">
          <div className="scroll-line-inner absolute top-[-100%] left-0 w-full h-full bg-[var(--black)]" />
        </div>
        <span
          className="font-sans text-[9px] font-light tracking-[0.28em] uppercase text-[var(--grey)]"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}