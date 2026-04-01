"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ──────────────────────────────────── */
const LATEST = [
  { href: "/architecture",     title: "JM-QAFRI Network Architecture Contest", date: "01.02.2024" },
  { href: "/Invest", title: "Invest in Farmers' Project",           date: "07.12.2023" },
  { href: "https://learn.jmqafri.org", title: "Education Program Launch",       date: "27.11.2023" },
];

const COMPANY = [
  { href: "/About",     label: "About Us" },
  { href: "/careers",   label: "Careers" },
  { href: "/charity",   label: "Charity" },
  { href: "/FAQ",       label: "F.A.Q" },
  {href: "/membership",   label: "Membership"},
  { href: "/petition",  label: "Sign Our Petition" },
];

const SERVICES = [
  { href: "/Invest",       label: "Invest" },
  { href: "/Acquisitions", label: "Acquisitions" },
  { href: "/pharma",       label: "Pharma" },
  { href: "/partnership",   label: "Partnership" },
  {href: "/art",         label: "Art" },
  { href: "/contact",      label: "Contact" },

];

const SOCIALS = [
  { label: "Facebook", href: "/contact" },
  { label: "Instagram", href: "/contact" },
  { label: "LinkedIn", href: "/contact" },
  { label: "YouTube", href: "/contact" },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      id="footer"
      className="bg-teal-50 border-t border-[var(--line)] px-6 md:px-[clamp(24px,5vw,72px)] pt-[clamp(56px,9vw,112px)] pb-[clamp(28px,4vw,40px)]"
    >
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-x-10 gap-y-12 mb-[clamp(40px,6vw,72px)]">

        {/* Brand */}
        <div className="footer-col">
          <p className="font-serif text-[clamp(1.5rem,3vw,2.6rem)] font-light tracking-[-0.03em] leading-none mb-3">
            JM-Qafri<br />
            <em>Methuselah.</em>
          </p>
          <p className="text-[13px] font-light leading-[1.75] text-[var(--black)] mb-6 max-w-xs">
            Global wealth management reimagined — bridging traditional finance,
            DeFi innovation, and sustainable impact investing.
          </p>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-[11px] font-light tracking-[0.14em] uppercase text-[var(--grey)] hover:text-[var(--black)] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Updates */}
        <div className="footer-col">
          <p className="text-[10px] font-light tracking-[0.25em] uppercase text-[var(--grey)] mb-5">
            Latest
          </p>
          <ul className="space-y-0">
            {LATEST.map(({ href, title, date }) => (
              <li
                key={href}
                className="group pb-4 mb-0 border-b border-[var(--line)] last:border-none last:pb-0"
              >
                <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                  <span className="block text-[13px] font-light leading-[1.5] text-[var(--grey)] group-hover:text-[var(--black)] transition-colors duration-200 mb-1">
                    {title}
                  </span>
                  <span className="text-[10px] font-light tracking-[0.12em] text-[var(--line)]">
                    {date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <p className="text-[10px] font-light tracking-[0.25em] uppercase text-[var(--grey)] mb-5">
            Company
          </p>
          <ul className="space-y-[10px]">
            {COMPANY.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[13px] font-light text-[var(--grey)] hover:text-[var(--black)] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <p className="text-[10px] font-light tracking-[0.25em] uppercase text-[var(--grey)] mb-5">
            Services
          </p>
          <ul className="space-y-[10px]">
            {SERVICES.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[13px] font-light text-[var(--grey)] hover:text-[var(--black)] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t pt-6 border-[var(--line)] pt-6 flex flex-wrap items-center justify-between gap-3"
      style={{ borderColor: "rgba(37, 99, 168, 0.25)" }}
      >
        <p className="text-[11px] font-light tracking-[0.06em] text-[var(--grey)]">
          ©2024 JM-Qafri Methuselah. All rights reserved.
        </p>
        <div className="flex gap-5">
          {["/legal", "/privacy", "/terms"].map((href) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] font-light tracking-[0.1em] text-[var(--grey)] capitalize hover:text-[var(--black)] transition-colors duration-200"
            >
              {href.replace("/", "")}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
