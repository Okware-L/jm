"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Wealth Planning",
    desc: "Strategies designed to navigate every stage of your financial life.",
    href: "/wealth",
  },
  {
    num: "02",
    title: "Investing",
    desc: "From traditional markets to blockchain and DeFi protocols.",
    href: "/Invest",
  },
  {
    num: "03",
    title: "Financing",
    desc: "Customised solutions for individual and startup capital needs.",
    href: "/finance",
  },
  {
    num: "04",
    title: "Additional Services",
    desc: "Charity, pharma clinics, education, and acquisition strategies.",
    href: "/services",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label fade
      gsap.fromTo(
        ".sv-label",
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".sv-label", start: "top 88%" },
        }
      );
      // Rows stagger
      gsap.fromTo(
        ".sv-row",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".sv-list", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="px-6 md:px-[clamp(24px,5vw,72px)] py-[clamp(72px,11vw,144px)]"
    >
      {/* Section label */}
      <p className="sv-label flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-[clamp(36px,5vw,72px)] opacity-0">
        01 — What We Offer
        <span className="flex-1 h-px bg-[var(--line)]" aria-hidden="true" />
      </p>

      {/* List */}
      <ul className="sv-list border-t border-[var(--line)] list-none">
        {SERVICES.map(({ num, title, desc, href }) => (
          <li key={num}>
            <Link href={href} className="sv-row block opacity-0">
              <div
                className="grid grid-cols-[clamp(36px,5vw,72px)_1fr_auto] items-start
                            gap-x-[clamp(16px,3vw,44px)] py-[clamp(24px,3.5vw,44px)]
                            border-b border-[var(--line)]"
              >
                {/* Number */}
                <span className="sv-text font-sans text-[11px] font-light tracking-[0.14em] text-[var(--grey)] pt-1 transition-colors duration-300">
                  {num}
                </span>

                {/* Title + desc */}
                <div>
                  <h3 className="sv-text font-serif text-[clamp(1.7rem,4vw,3.4rem)] font-light tracking-[-0.03em] leading-[1.02] transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="sv-muted font-sans text-[13px] font-light leading-[1.7] text-[var(--grey)] max-w-[260px] mt-2 transition-colors duration-300">
                    {desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 pt-1.5 whitespace-nowrap">
                  <span className="sv-text font-sans text-[11px] font-light tracking-[0.14em] uppercase transition-colors duration-300">
                    View
                  </span>
                  <span
                    className="sv-circle flex items-center justify-center w-[30px] h-[30px] rounded-full
                                border border-[var(--black)] flex-shrink-0 transition-[border-color, background] duration-300"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17l10-10M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}