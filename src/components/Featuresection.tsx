"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left col reveals
      gsap.fromTo(".ft-label", { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: ".ft-label", start: "top 88%" },
      });
      gsap.fromTo(".ft-title", { opacity: 0, x: -32 }, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ft-title", start: "top 85%" },
      });
      gsap.fromTo(".ft-body", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".ft-body", start: "top 88%" },
      });
      gsap.fromTo(".ft-link", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: ".ft-link", start: "top 90%" },
      });
      // Big ghost type — parallax scrub
      if (bigRef.current) {
        gsap.fromTo(bigRef.current, { opacity: 0 }, {
          opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
        gsap.to(bigRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feature"
      className="bg-teal-50 border-t border-[var(--line)] px-6 md:px-[clamp(24px,5vw,72px)] py-[clamp(72px,11vw,144px)]
                 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 items-center"
    >
      {/* Left */}
      <div>
        <p className="ft-label font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-4 opacity-0">
          Featured Research — 2024
        </p>
        <h2 className="ft-title font-serif text-[clamp(2rem,5vw,4.6rem)] font-light tracking-[-0.04em] leading-[0.93] mb-[clamp(20px,3.5vw,36px)] opacity-0">
          AI's Rapid Growth<br />
          Spurs a <em>New</em><br />
          Investment Cycle.
        </h2>
        <p className="ft-body font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-[var(--black] mb-[clamp(28px,4vw,44px)] opacity-0">
          The rapid development of Artificial Intelligence has initiated a new investment cycle.
          JM-Qafri's global forum is at the forefront of this conversation, exploring what the
          future holds for investors across healthcare, agriculture, and finance.
        </p>
        <Link
          href="/blog/ai-investment"
          className="ft-link group inline-flex items-center font-sans text-[11px] font-light
                     tracking-[0.2em] uppercase px-7 py-3.5 border border-[var(--black)]
                     transition-[background,color] duration-300 hover:bg-[var(--black)] hover:text-[var(--white)] opacity-0"
        >
          Read the Research
        </Link>
      </div>

      {/* Right — ghost type */}
      <div className="flex items-end justify-end overflow-hidden" aria-hidden="true">
        <div
          ref={bigRef}
          className="font-serif italic font-light leading-[0.8] tracking-[-0.08em]
                     text-[clamp(8rem,20vw,20rem)] text-[var(--line)] pointer-events-none select-none opacity-0"
        >
          JM-QAFRI
        </div>
      </div>
    </section>
  );
}