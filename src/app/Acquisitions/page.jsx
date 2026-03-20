"use client"

import React, { useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AcquisitionsPage() {
  

  useEffect(() => {
    

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".acquisitions-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".acquisitions-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Description text
      gsap.fromTo(".description-text", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".description-text", start: "top 88%" },
      });

      // Form section
      gsap.fromTo(".form-section", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".form-section", start: "top 85%" },
      });
    }, );

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="acquisitions-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          Explore Business Acquisitions & <em className="italic" style={{ color: "var(--accent)" }}>Valuation</em>
        </h1>
        <p className="acquisitions-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          Buy, sell, or value businesses with confidence through our comprehensive platform.
        </p>
      </section>

      {/* Hero Image */}


      {/* Description */}
      <section className="description-text border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
            Our members can explore exciting opportunities to buy or sell businesses, or request accurate business valuations. 
            Whether you are looking to expand your portfolio, sell your company, or understand your business's worth, we provide 
            a seamless platform to support your goals. Our dedicated team ensures a comprehensive due diligence process and trusted 
            valuation framework, so you can make informed, confident decisions. Upload your key documents and let us help guide your 
            next strategic move.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-[var(--gap-lg)]">
            Submit Your <em style={{ color: "var(--accent)" }}>Inquiry</em>
          </h2>

          <form className="space-y-8 border border-slate-200 p-[var(--gap-lg)] bg-white">
            {/* Name */}
            <div>
              <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-none border-b outline-none
                           font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                           pb-3 transition-border-color duration-300"
                style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-none border-b outline-none
                           font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                           pb-3"
                style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                Company Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-none border-b outline-none
                           font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                           pb-3"
                style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
              />
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                Inquiry Type
              </label>
              <select
                required
                className="w-full bg-transparent border-none border-b outline-none
                           font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                           pb-3"
                style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
              >
                <option value="">Select an option</option>
                <option value="buy">Buy a Business</option>
                <option value="sell">Sell a Business</option>
                <option value="valuation">Business Valuation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                Details
              </label>
              <textarea
                required
                rows={4}
                className="w-full bg-transparent border-none border-b outline-none
                           font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                           pb-3 resize-none"
                style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                placeholder="Provide details about your inquiry..."
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                Upload Documents (Optional)
              </label>
              <input
                type="file"
                multiple
                className="w-full font-sans text-[13px] font-light text-slate-600
                           file:mr-4 file:py-2 file:px-4
                           file:border file:border-slate-300
                           file:font-sans file:text-[11px] file:font-light file:tracking-[0.2em] file:uppercase
                           file:bg-white file:text-slate-600
                           hover:file:bg-slate-50 file:transition-colors file:duration-200"
              />
              <p className="font-sans text-[11px] font-light text-slate-400 mt-2">
                Accepted formats: PDF, DOC, DOCX, XLS, XLSX
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center font-sans text-[11px] font-light tracking-[0.2em] uppercase
                         px-7 py-3.5 border border-[var(--accent)] text-[var(--accent)]
                         transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
