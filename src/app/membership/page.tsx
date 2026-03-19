"use client"

import React, { useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link  from "next/link";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MEMBERSHIP_TIERS = [
  {
    name: "Associate",
    price: "$5,000",
    period: "annually",
    description: "For individuals beginning their wealth journey",
    features: [
      "Quarterly market insights reports",
      "Access to exclusive investment webinars",
      "Network directory access",
      "Invitations to annual summit"
    ]
  },
  {
    name: "Partner",
    price: "$25,000",
    period: "annually",
    description: "For established investors seeking deeper engagement",
    features: [
      "All Associate benefits",
      "Direct advisory consultations (4 per year)",
      "Priority access to deal flow",
      "Exclusive partner events and retreats",
      "Co-investment opportunities in pharma & agriculture"
    ],
    featured: true
  },
  {
    name: "Patron",
    price: "Custom",
    period: "bespoke arrangement",
    description: "For family offices and institutional partners",
    features: [
      "All Partner benefits",
      "Dedicated relationship manager",
      "Bespoke investment strategy development",
      "Board advisory opportunities",
      "Influence on charitable allocation decisions"
    ]
  }
];

const WHY_JOIN = [
  {
    title: "Curated Deal Flow",
    desc: "Early access to vetted investment opportunities across emerging markets, with comprehensive due diligence already completed."
  },
  {
    title: "Global Network",
    desc: "Connect with like-minded investors, entrepreneurs, and advisors across our Zurich, Nairobi, and Dubai hubs."
  },
  {
    title: "Impact Alignment",
    desc: "Every investment is screened for ESG compliance and long-term impact potential beyond financial returns."
  },
  {
    title: "Operational Expertise",
    desc: "Leverage our on-the-ground teams in healthcare, agriculture, and technology to derisk and accelerate portfolio companies."
  }
];

export default function MembershipPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".membership-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".membership-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Why join cards
      gsap.fromTo(".why-join-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".why-join-grid", start: "top 85%" },
      });

      // Membership tiers
      gsap.fromTo(".tier-card", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
        scrollTrigger: { trigger: ".tiers-grid", start: "top 85%" },
      });

      // Process section
      gsap.fromTo(".process-content", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".process-section", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="membership-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          Membership <em className="italic" style={{ color: "var(--accent)" }}>Tiers</em>
        </h1>
        <p className="membership-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          Join a community of discerning investors committed to building generational wealth with purpose.
        </p>
      </section>

      {/* Why Join */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Why Join JM-Qafri
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="why-join-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_JOIN.map((item, idx) => (
            <div key={idx} className="why-join-card border border-slate-200 p-[var(--gap-md)] bg-white">
              <div className="font-serif text-[2.2rem] font-light leading-none mb-4" style={{ color: "var(--accent)" }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em] leading-[1.1] mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Choose Your Tier
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="tiers-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBERSHIP_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`tier-card border p-[var(--gap-lg)] ${
                tier.featured
                  ? "border-[var(--accent)] bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.featured && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 border border-[var(--accent)] text-[10px] font-light tracking-[0.14em] uppercase" style={{ color: "var(--accent)" }}>
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em] leading-[1.1] mb-2">
                {tier.name}
              </h3>

              <div className="mb-4">
                <span className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-light tracking-[-0.02em]" style={{ color: "var(--accent)" }}>
                  {tier.price}
                </span>
                <span className="font-sans text-[11px] font-light tracking-[0.12em] text-slate-400 ml-2">
                  / {tier.period}
                </span>
              </div>

              <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600 mb-6 pb-6 border-b border-slate-200">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                    <Check size={16} strokeWidth={2} className="mr-2 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/membership/apply"
                className={`block text-center font-sans text-[11px] font-light tracking-[0.2em] uppercase px-7 py-3.5 border transition-all duration-300 ${
                  tier.featured
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white hover:bg-transparent hover:text-[var(--accent)]"
                    : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                }`}
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Application Process */}
      <section className="process-section border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="process-content max-w-4xl mx-auto">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-[var(--gap-md)]">
            Application <em style={{ color: "var(--accent)" }}>Process</em>
          </h2>

          <div className="space-y-6">
            <div className="border border-slate-200 p-[var(--gap-md)] bg-white">
              <div className="flex items-start gap-4">
                <span className="font-serif text-[1.6rem] font-light flex-shrink-0" style={{ color: "var(--accent)" }}>01</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.01em] mb-2">
                    Submit Application
                  </h3>
                  <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                    Complete our membership form with your investment interests and background. Review typically takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 p-[var(--gap-md)] bg-white">
              <div className="flex items-start gap-4">
                <span className="font-serif text-[1.6rem] font-light flex-shrink-0" style={{ color: "var(--accent)" }}>02</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.01em] mb-2">
                    Discovery Call
                  </h3>
                  <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                    Meet with our membership team to discuss your goals, explore the network, and determine the right tier for your needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 p-[var(--gap-md)] bg-white">
              <div className="flex items-start gap-4">
                <span className="font-serif text-[1.6rem] font-light flex-shrink-0" style={{ color: "var(--accent)" }}>03</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.01em] mb-2">
                    Onboarding
                  </h3>
                  <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                    Upon approval, you'll receive your welcome package, directory access, and invitations to upcoming events and deal flow opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#2c5aa0]/30 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] text-center" style={{ backgroundColor: "#2c5aa0" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[clamp(2.6rem,7vw,6.5rem)] font-light tracking-[-0.05em] leading-[0.9] text-white mb-6">
            Ready to <em className="text-white">Begin?</em>
          </h2>
          <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-white/90 mb-[var(--gap-lg)]">
            Join a community that values both returns and responsibility. Apply today to become a member of JM-Qafri Methuselah.
          </p>
          <Link
            href="/membership/apply"
            className="inline-flex items-center font-sans text-[11px] font-light tracking-[0.2em] uppercase
                       px-7 py-3.5 border border-white text-white
                       transition-all duration-300 hover:bg-white hover:text-[var(--accent)]"
          >
            Start Application
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
