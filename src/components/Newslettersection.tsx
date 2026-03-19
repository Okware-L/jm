"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nl-label", { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: ".nl-label", start: "top 88%" },
      });
      gsap.fromTo(".nl-title", { opacity: 0, x: -32 }, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".nl-title", start: "top 85%" },
      });
      gsap.fromTo(".nl-form-wrap", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: ".nl-form-wrap", start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="border-t border-[var(--line)] bg-slate-900 text-[var(--white)]
                 px-6 md:px-[clamp(24px,5vw,72px)] py-[clamp(72px,11vw,144px)]"
    >
      {/* Section label */}
      <p className="nl-label flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-white/30 mb-[clamp(36px,5vw,72px)] opacity-0">
        Stay Informed
        <span className="flex-1 h-px bg-white/10" aria-hidden="true" />
      </p>

      {/* Title */}
      <h2 className="nl-title font-serif text-[clamp(2.6rem,8vw,8rem)] font-light tracking-[-0.05em] leading-[0.88] mb-[clamp(28px,5vw,56px)] opacity-0">
        Subscribe.<br />
        <em>Stay Ahead.</em>
      </h2>

      {/* Form */}
      <div className="nl-form-wrap max-w-xl opacity-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-0 border-b border-white/20 mb-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-[180px] bg-transparent border-none outline-none
                       font-sans text-[clamp(14px,1.4vw,17px)] font-light text-white
                       placeholder:text-white/28 pb-4"
          />
          <button
            type="submit"
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase
                       text-white/45 hover:text-white transition-colors duration-200
                       pb-4 pl-7"
          >
            Subscribe →
          </button>
        </form>

        {/* Confirmation */}
        <p
          className={[
            "font-sans text-[11px] font-light tracking-[0.18em] text-white/45 transition-opacity duration-300",
            submitted ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
          ].join(" ")}
        >
          ✓ &nbsp;You're subscribed.
        </p>

        <p className="font-sans text-[11px] font-light tracking-[0.1em] text-white/28 mt-1">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}