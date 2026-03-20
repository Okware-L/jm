"use client"


import React, { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const OFFICES = [
  { num: "02", city: "Nairobi", address: "Westlands Road, Nairobi, Kenya", phone: "+254 20 123 4567" },
];

const FAQ_ITEMS = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive wealth management services including investment advisory, DeFi ventures, pharmaceutical investments, agricultural development, and strategic acquisitions across emerging markets."
  },
  {
    question: "How can I schedule a consultation?",
    answer: "You can schedule a consultation by filling out the contact form above, emailing us directly at invest@jmqafri.com, or calling any of our office locations. Our team will respond within 24 hours."
  },
  {
    question: "What is your minimum investment threshold?",
    answer: "Our minimum investment threshold varies by sector and strategy. Please contact our investment team to discuss your specific interests and requirements."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, we work with clients globally. Our offices in Zurich, Nairobi, and Dubai enable us to serve clients across multiple time zones and regions with local expertise."
  }
];

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".contact-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".contact-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Contact cards
      gsap.fromTo(".contact-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".contact-cards", start: "top 85%" },
      });

      // Form and details
      gsap.fromTo(".form-col", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".form-col", start: "top 88%" },
      });

      gsap.fromTo(".details-col", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, delay: 0.2,
        scrollTrigger: { trigger: ".details-col", start: "top 88%" },
      });

      // Office rows
      gsap.fromTo(".office-row", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.06,
        scrollTrigger: { trigger: ".offices-list", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="contact-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          Get in <em className="italic" style={{ color: "var(--accent)" }}>Touch</em>
        </h1>
        <p className="contact-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          Whether you&apos;re exploring investment opportunities or seeking strategic advice, we&apos;re here to listen.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="contact-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="contact-card border border-slate-200 p-[var(--gap-md)] bg-white">
            <div className="flex justify-center mb-4">
              <Mail size={32} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.02em] leading-[1.1] mb-2 text-center">
              Email Us
            </h3>
            <a 
              href="mailto:support@jmqafri.com" 
              className="block font-sans text-[13px] font-light text-slate-600 text-center hover:text-[var(--accent)] transition-colors duration-200"
            >
              support@jmqafri.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="contact-card border border-slate-200 p-[var(--gap-md)] bg-white">
            <div className="flex justify-center mb-4">
              <Phone size={32} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.02em] leading-[1.1] mb-2 text-center">
              Call Us
            </h3>
            <a 
              href="tel:0746218717" 
              className="block font-sans text-[13px] font-light text-slate-600 text-center hover:text-[var(--accent)] transition-colors duration-200"
            >
              0746 218 717
            </a>
          </div>

          {/* Hours Card */}
          <div className="contact-card border border-slate-200 p-[var(--gap-md)] bg-white">
            <div className="flex justify-center mb-4">
              <Clock size={32} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.02em] leading-[1.1] mb-2 text-center">
              Business Hours
            </h3>
            <p className="font-sans text-[13px] font-light text-slate-600 text-center">
              Mon-Fri: 9AM-5PM
            </p>
          </div>
        </div>
      </section>

      {/* Form + Details */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <div className="form-col">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.8rem)] font-light tracking-[-0.04em] leading-[0.95] mb-[var(--gap-lg)]">
              Send us a<br /><em style={{ color: "var(--accent)" }}>message.</em>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-none border-b outline-none
                             font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                             pb-3 transition-border-color duration-300"
                  style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                  onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-none border-b outline-none
                             font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                             pb-3"
                  style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                  onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-none border-b outline-none
                             font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                             pb-3 resize-none"
                  style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                  onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center font-sans text-[11px] font-light tracking-[0.2em] uppercase
                           px-7 py-3.5 border border-[var(--accent)] text-[var(--accent)]
                           transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
              >
                Send Message
              </button>

              {submitted && (
                <p className="font-sans text-[11px] font-light tracking-[0.18em] text-[var(--accent)]">
                  ✓ Message sent. We&apos;ll respond within 24 hours.
                </p>
              )}
            </form>
          </div>

          {/* Contact Details */}
          <div className="details-col">
            <h3 className="font-serif text-[clamp(1.7rem,4vw,3rem)] font-light tracking-[-0.03em] leading-[1.05] mb-[var(--gap-md)]">
              Direct<br /><em style={{ color: "var(--accent)" }}>Contact.</em>
            </h3>

            <div className="space-y-6">
              <div>
                <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-2">
                  General Inquiries
                </p>
                <a href="mailto:info@jmqafri.com" className="font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900 hover:text-[var(--accent)] transition-colors duration-200">
                  info@jmqafri.com
                </a>
              </div>

              <div>
                <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-2">
                  Investment Team
                </p>
                <a href="mailto:invest@jmqafri.com" className="font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900 hover:text-[var(--accent)] transition-colors duration-200">
                  invest@jmqafri.com
                </a>
              </div>

              <div>
                <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-2">
                  Charity Programs
                </p>
                <a href="mailto:charity@jmqafri.com" className="font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900 hover:text-[var(--accent)] transition-colors duration-200">
                  charity@jmqafri.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Frequently Asked Questions
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="max-w-4xl space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <FAQItem key={idx} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      {/* Office Locations */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
          Our Offices
          <span className="flex-1 h-px bg-slate-200" />
        </p>

        <div className="offices-list space-y-0">
          {OFFICES.map(({ num, city, address, phone }) => (
            <div key={num} className="office-row border-b border-slate-200 grid grid-cols-[clamp(36px,5vw,72px)_1fr] gap-x-[var(--gap-md)] py-[var(--gap-md)]">
              <span className="font-sans text-[11px] font-light tracking-[0.14em] text-slate-400">
                {num}
              </span>
              <div>
                <h3 className="font-serif text-[clamp(1.7rem,4vw,3.4rem)] font-light tracking-[-0.03em] leading-[1.02] mb-2">
                  {city}
                </h3>
                <p className="font-sans text-[11px] font-light leading-[1.7] text-slate-600 mb-1">
                  {address}
                </p>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-sans text-[11px] font-light tracking-[0.12em] text-slate-600 hover:text-[var(--accent)] transition-colors duration-200">
                  {phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
      >
        <span className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-[-0.01em] text-slate-900 pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <p className="font-sans text-[13px] font-light leading-[1.8] text-slate-600 border-t border-slate-200 pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
