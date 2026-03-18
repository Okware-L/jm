"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "15+", label: "Countries" },
  { value: "$2.4B", label: "Assets" },
  { value: "6",   label: "Sectors" },
  { value: "24%", label: "AUM Growth" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.fromTo(".ab-ey", { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".ab-ey", start: "top 88%" },
      });
      // Title slides from left
      gsap.fromTo(".ab-title", { opacity: 0, x: -36 }, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-title", start: "top 85%" },
      });
      // Stats
      gsap.fromTo(".ab-stats", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 88%" },
      });
      // CTA
      gsap.fromTo(".ab-cta", { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".ab-cta", start: "top 90%" },
      });
      // Body text
      gsap.fromTo(".ab-body", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-body", start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-[var(--line)] px-6 md:px-[clamp(24px,5vw,72px)] py-[clamp(72px,11vw,144px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 items-start">

        {/* Left column */}
        <div>
          <p className="ab-ey font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-[clamp(16px,2.5vw,28px)] opacity-0">
            About JM-Qafri Methuselah
          </p>

          <h2 className="ab-title font-serif text-[clamp(2.4rem,6vw,5.8rem)] font-light tracking-[-0.045em] leading-[0.93] opacity-0">
            Forward-thinking.<br />
            <em>Deeply human.</em>
          </h2>

          {/* Stats grid */}
          <div className="ab-stats grid grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] mt-[clamp(32px,5vw,56px)] opacity-0">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-[var(--white)] p-[clamp(20px,2.5vw,32px)]">
                <p className="font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] font-light tracking-[-0.04em] leading-none mb-1">
                  {value}
                </p>
                <p className="font-sans text-[11px] font-light tracking-[0.16em] uppercase text-[var(--grey)]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/About"
            className="ab-cta group inline-flex items-center gap-4 font-sans text-[11px] font-light tracking-[0.18em] uppercase mt-[clamp(28px,4vw,48px)] opacity-0"
          >
            Learn More
            <span className="block w-9 h-px bg-[var(--black)] transition-[width] duration-300 group-hover:w-16" />
          </Link>
        </div>

        {/* Right column — body text */}
        <div className="ab-body font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-[var(--grey)] space-y-6 opacity-0">
          <p>
            As a global wealth manager, we recognise the significance of your financial
            objectives and adopt a forward-thinking approach to safeguarding your assets.
            Whether you're embarking on a new venture, strategising for retirement, or
            securing the future of your family — our team identifies tailored solutions
            that resonate with you.
          </p>
          <p>
            In today's rapidly evolving financial landscape, our commitment to
            understanding your needs and leveraging innovative solutions, including DeFi,
            ensures that we remain equipped to guide you toward your financial goals.
          </p>
        </div>
      </div>
    </section>
  );
}