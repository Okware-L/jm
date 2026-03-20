"use client"


import React, { useRef, useEffect } from "react";
import Link  from "next/link";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARITY_SECTIONS = [
  {
    title: "Collaborating with Charities",
    content: "We actively partner with reputable charities to drive positive change, leveraging our network's resources and expertise."
  },
  {
    title: "Encouraging Donations",
    content: "Every contribution, regardless of size, can significantly impact lives. We encourage both members and non-members to support our causes."
  },
  {
    title: "The Impact of Your Donations",
    content: "Your generosity funds education, medical research, environmental initiatives, and more. Together, we're building a more equitable world."
  }
];

const CHARITY_PROJECTS = [
  {
    name: "Tele Clinic",
    description: "Providing healthcare services to remote areas.",
    url: null
  },
  {
    name: "Community Development",
    description: "Supporting sustainable community development projects.",
    url: null
  },

];

export default function CharityPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".charity-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".charity-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Section cards
      gsap.fromTo(".section-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".sections-grid", start: "top 85%" },
      });

      // Projects
      gsap.fromTo(".projects-container", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".projects-container", start: "top 85%" },
      });

      // Transparency note
      gsap.fromTo(".transparency-note", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: ".transparency-note", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="charity-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          Join Us in Making a <em className="italic" style={{ color: "var(--accent)" }}>Difference</em>
        </h1>
        <p className="charity-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          Leveraging wealth for systemic change across education, healthcare, and sustainable development.
        </p>
      </section>

      {/* Charity Sections */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="sections-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHARITY_SECTIONS.map((section, idx) => (
            <div key={idx} className="section-card border border-slate-200 p-[var(--gap-md)] bg-white">
              <h2 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em] leading-[1.1] mb-3">
                {section.title}
              </h2>
              <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Charity Projects */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <div className="projects-container">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-[var(--gap-lg)] text-center">
            Our Charity <em style={{ color: "var(--accent)" }}>Projects</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-[var(--gap-lg)]">
            {CHARITY_PROJECTS.map((project, idx) => (
              <div key={idx} className="flex items-start border border-slate-200 p-6 bg-slate-50">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center mr-4">
                  <span className="font-serif text-[14px] font-light" style={{ color: "var(--accent)" }}>
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-[-0.01em] mb-1">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] transition-colors duration-200"
                        style={{ color: "var(--accent)" }}
                      >
                        {project.name} →
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="font-sans text-[13px] font-light text-slate-600">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/charity/donate"
              className="inline-flex items-center font-sans text-[11px] font-light tracking-[0.2em] uppercase
                         px-7 py-3.5 border border-[var(--accent)] text-[var(--accent)]
                         transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Transparency Note */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="transparency-note max-w-3xl mx-auto text-center border border-slate-200 p-[var(--gap-lg)] bg-white">
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-[-0.02em] leading-[1.1] mb-4">
            Transparency <em style={{ color: "var(--accent)" }}>Note</em>
          </h2>
          <p className="font-sans text-[13px] font-light leading-[1.8] text-slate-600">
            The JM-Qafri Network ensures that all donations are handled with utmost transparency and allocated responsibly 
            to the intended causes. We regularly review our partnerships to ensure their credibility and impact.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
