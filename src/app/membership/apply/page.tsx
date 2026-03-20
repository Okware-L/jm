"use client"


import React, { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MEMBERSHIP_TIERS = ["Associate", "Partner", "Patron"];
const INVESTMENT_INTERESTS = [
  "Agriculture",
  "Healthcare/Pharma",
  "Technology/DeFi",
  "Real Estate",
  "Education",
  "Sustainable Impact"
];

export default function MembershipApplyPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    industry: "",
    netWorthRange: "",
    investmentCapacity: "",
    referralSource: "",
    message: ""
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".apply-hero-title", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.fromTo(".apply-hero-desc", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power3.out"
      });

      // Form sections
      gsap.fromTo(".form-section", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9,
        scrollTrigger: { trigger: ".form-section", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", {
      ...formData,
      selectedTier,
      selectedInterests
    });
  };

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Compact Hero */}
      <section className="px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-slate-200">
        <h1 className="apply-hero-title font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
          Membership <em className="italic" style={{ color: "var(--accent)" }}>Application</em>
        </h1>
        <p className="apply-hero-desc font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-2xl">
          Complete the form below to begin your membership journey. Our team will review your application within 3-5 business days.
        </p>
      </section>

      {/* Application Form */}
      <section className="form-section border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="border border-slate-200 p-[var(--gap-lg)] bg-white">
            {/* Personal Information */}
            <div className="mb-[var(--gap-lg)] pb-[var(--gap-lg)] border-b border-slate-200">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.03em] leading-[1.1] mb-6">
                Personal <em style={{ color: "var(--accent)" }}>Information</em>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3 transition-border-color duration-300"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  />
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div className="mb-[var(--gap-lg)] pb-[var(--gap-lg)] border-b border-slate-200">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.03em] leading-[1.1] mb-6">
                Professional <em style={{ color: "var(--accent)" }}>Background</em>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Position/Title
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                    placeholder="e.g., Finance, Technology, Healthcare"
                  />
                </div>
              </div>
            </div>

            {/* Membership Tier Selection */}
            <div className="mb-[var(--gap-lg)] pb-[var(--gap-lg)] border-b border-slate-200">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.03em] leading-[1.1] mb-6">
                Membership <em style={{ color: "var(--accent)" }}>Tier</em>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MEMBERSHIP_TIERS.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`p-6 border transition-all duration-300 text-left ${
                      selectedTier === tier
                        ? "border-[var(--accent)] bg-slate-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light">
                        {tier}
                      </span>
                      {selectedTier === tier && (
                        <Check size={20} strokeWidth={2} style={{ color: "var(--accent)" }} />
                      )}
                    </div>
                    <span className="font-sans text-[11px] font-light text-slate-400 tracking-[0.12em] uppercase">
                      {tier === "Associate" && "$5,000/year"}
                      {tier === "Partner" && "$25,000/year"}
                      {tier === "Patron" && "Custom Pricing"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Profile */}
            <div className="mb-[var(--gap-lg)] pb-[var(--gap-lg)] border-b border-slate-200">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.03em] leading-[1.1] mb-6">
                Investment <em style={{ color: "var(--accent)" }}>Profile</em>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Net Worth Range *
                  </label>
                  <select
                    name="netWorthRange"
                    required
                    value={formData.netWorthRange}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  >
                    <option value="">Select range</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m-10m">$5M - $10M</option>
                    <option value="10m-50m">$10M - $50M</option>
                    <option value="50m+">$50M+</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Annual Investment Capacity *
                  </label>
                  <select
                    name="investmentCapacity"
                    required
                    value={formData.investmentCapacity}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  >
                    <option value="">Select capacity</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-250k">$100K - $250K</option>
                    <option value="250k-500k">$250K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-4">
                  Investment Interests (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INVESTMENT_INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-3 border text-left transition-all duration-300 ${
                        selectedInterests.includes(interest)
                          ? "border-[var(--accent)] bg-slate-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[12px] font-light">
                          {interest}
                        </span>
                        {selectedInterests.includes(interest) && (
                          <Check size={14} strokeWidth={2} style={{ color: "var(--accent)" }} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-[var(--gap-lg)]">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.03em] leading-[1.1] mb-6">
                Additional <em style={{ color: "var(--accent)" }}>Information</em>
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    How did you hear about JM-Qafri? *
                  </label>
                  <select
                    name="referralSource"
                    required
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               pb-3"
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                  >
                    <option value="">Select source</option>
                    <option value="existing-member">Referral from Existing Member</option>
                    <option value="event">Industry Event/Conference</option>
                    <option value="website">Website/Online Search</option>
                    <option value="social-media">Social Media</option>
                    <option value="press">Press/Publications</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-3">
                    Tell us about your investment goals and what you hope to achieve through membership
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border outline-none
                               font-sans text-[clamp(14px,1.4vw,17px)] font-light text-slate-900
                               p-4 resize-none transition-border-color duration-300"
                    style={{ borderColor: "rgba(148,163,184,0.3)" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(148,163,184,0.3)"}
                    placeholder="Share your investment philosophy, goals, and what you hope to gain from JM-Qafri membership..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <p className="font-sans text-[11px] font-light leading-[1.7] text-slate-500 max-w-md">
                  By submitting this application, you agree to our membership terms and acknowledge that all information provided is accurate and complete.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center font-sans text-[11px] font-light tracking-[0.2em] uppercase
                             px-8 py-4 border border-[var(--accent)] text-[var(--accent)]
                             transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="border-t border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-[-0.04em] leading-[1.1] mb-[var(--gap-md)]">
            What Happens <em style={{ color: "var(--accent)" }}>Next?</em>
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
              <span className="font-serif text-[1.4rem] font-light flex-shrink-0" style={{ color: "var(--accent)" }}>01</span>
              <div>
                <h3 className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-[-0.01em] mb-1">
                  Application Review
                </h3>
                <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                  Our membership committee will carefully review your application within 3-5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
              <span className="font-serif text-[1.4rem] font-light flex-shrink-0" style={{ color: "var(--accent)" }}>02</span>
              <div>
                <h3 className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-[-0.01em] mb-1">
                  Discovery Call
                </h3>
                <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                  If approved, we&apos;ll schedule a confidential video call to discuss your goals and answer any questions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="font-serif text-[1.4rem] font-light flex-shrink-0" style={{ color: "var(--accent)" }}>03</span>
              <div>
                <h3 className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-[-0.01em] mb-1">
                  Welcome Package
                </h3>
                <p className="font-sans text-[13px] font-light leading-[1.7] text-slate-600">
                  Upon final approval, you&apos;ll receive your membership materials, directory access, and first investment opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
