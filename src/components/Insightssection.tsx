"use client";

import React, { useRef, useEffect } from "react";
import  Link  from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    n: "01",
    title: "Revolutionising Agriculture with Organic Solutions",
    cat: "Agriculture",
    time: "5 min",
    href: "/blog/agriculture",
  },
  {
    n: "02",
    title: "Mobile Clinics: Diagnostics and Early Disease Detection for Kenya",
    cat: "Pharma",
    time: "6 min",
    href: "/blog/mobile-clinic",
  },
  {
    n: "03",
    title: "Agreement with the Euroasian Trade and Economic Cooperation Agency",
    cat: "Trade",
    time: "4 min",
    href: "/blog/etec",
  },
  {
    n: "04",
    title: "Introduction to AI in Medicine — The Next Investment Frontier",
    cat: "Technology",
    time: "7 min",
    href: "/blog/ai-medicine",
  },
  {
    n: "05",
    title: "Real Estate: Investment and a Home Away from Home",
    cat: "Real Estate",
    time: "5 min",
    href: "/blog/real-estate",
  },
];

export default function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ins-head", { opacity: 0, x: -32 }, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ins-head", start: "top 85%" },
      });
      gsap.fromTo(".ins-all", { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: ".ins-all", start: "top 88%" },
      });
      gsap.fromTo(".ps-row", { opacity: 0, x: -16 }, {
        opacity: 1, x: 0, duration: 0.55, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: ".ps-list", start: "top 90%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="border-t border-slate-700 px-6 md:px-[clamp(24px,5vw,72px)] py-[clamp(72px,11vw,144px)] bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-5 mb-[clamp(40px,6vw,72px)]">
        <h2 className="ins-head font-serif text-[clamp(2.2rem,5.5vw,5rem)] font-light tracking-[-0.04em] leading-[0.92] text-white opacity-0">
          Latest<br /><em style={{ color: "var(--accent)" }}>Insights.</em>
        </h2>
        <Link
          href="/blog"
          className="ins-all group flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.18em] uppercase text-slate-400 hover:text-white transition-colors duration-200 opacity-0"
        >
          All Posts
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Posts list */}
      <ul className="ps-list list-none">
        {POSTS.map(({ n, title, cat, time, href }) => (
          <li key={n} className="ps-row border-b border-slate-700 first:border-t opacity-0">
            <Link
              href={href}
              className="group grid grid-cols-[clamp(36px,4.5vw,60px)_1fr] md:grid-cols-[clamp(36px,4.5vw,60px)_1fr_auto]
                         items-baseline gap-x-[clamp(16px,3vw,40px)]
                         py-[clamp(18px,2.5vw,28px)]"
            >
              {/* Number */}
              <span className="font-sans text-[11px] font-light tracking-[0.1em] text-slate-400">
                {n}
              </span>

              {/* Title */}
              <h3 className="font-serif text-[clamp(1.1rem,2.6vw,2rem)] font-light tracking-[-0.02em] text-white transition-[letter-spacing] duration-400 group-hover:tracking-[-0.05em]">
                {title}
              </h3>

              {/* Meta — hidden on mobile */}
              <div className="hidden md:flex items-center gap-3 font-sans text-[11px] font-light tracking-[0.12em] uppercase text-slate-400 whitespace-nowrap">
                <span className="border border-slate-700 px-2.5 py-0.5 text-[10px] tracking-[0.14em]">
                  {cat}
                </span>
                <span>{time}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}