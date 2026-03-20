"use client";

import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ─────────────────────────────────────────────────────────────────

interface Winner {
  year: string;
  name: string;
  title: string;
  medium: string;
  award: string;
  imageUrl: string;
}

interface FormData {
  fullName: string;
  email: string;
  country: string;
  medium: string;
  projectTitle: string;
  statement: string;
  portfolioUrl: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const WINNERS: Winner[] = [
  { year: "2025", name: "Amara Osei-Bonsu", title: "Fractured Meridian", medium: "Digital Mixed Media", award: "Grand Prix — $15,000", imageUrl: "/potrait.jpeg" },
  { year: "2024", name: "Leilani Nakamura", title: "Silk & Static", medium: "Oil on Canvas", award: "Grand Prix — $12,000", imageUrl: "/fasion.jpeg" },
  { year: "2023", name: "Théo Marchetti", title: "The Weight of Gold", medium: "3D / CGI", award: "Grand Prix — $10,000", imageUrl: "/watch.jpeg" },
];

const PRIZES = [
  { rank: "01", title: "Grand Prix", value: "$20,000", desc: "Solo exhibition at JM-Qafri Gallery, Nairobi + International press feature" },
  { rank: "02", title: "Excellence Award", value: "$8,000", desc: "Group exhibition inclusion + Collector introduction programme" },
  { rank: "03", title: "Emerging Voice", value: "$4,000", desc: "Mentorship residency with JM-Qafri studio + Publication feature" },
  { rank: "04", title: "Jury Commendation", value: "$1,500", desc: "Digital portfolio publication + Certificate of distinction" },
];

const TIMELINE = [
  { date: "01 MAY 2026", event: "Submissions Open" },
  { date: "30 JUL 2026", event: "Early Entry Deadline" },
  { date: "15 SEP 2026", event: "Final Submission Deadline" },
  { date: "10 OCT 2026", event: "Shortlist Announced" },
  { date: "07 NOV 2026", event: "Winners Ceremony, Nairobi" },
];

const MEDIUMS = ["Photography", "Oil Painting", "Digital Illustration", "3D / CGI", "Mixed Media", "Sculpture / Installation", "Film / Video Art", "AI-Assisted Art", "Other"];

// ─── Scramble ──────────────────────────────────────────────────────────────

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";
function scrambleText(el: HTMLElement, finalText: string, duration = 1.0, delay = 0): void {
  const lines = finalText.split("\n");
  const flatLen = lines.join("").length;
  let frame = 0;
  const totalFrames = Math.round(duration * 60);
  setTimeout(() => {
    const iv = setInterval(() => {
      let out = ""; let charIdx = 0;
      for (let l = 0; l < lines.length; l++) {
        for (let c = 0; c < lines[l].length; c++) {
          out += frame / totalFrames > charIdx / flatLen ? lines[l][c] : CHARS[Math.floor(Math.random() * CHARS.length)];
          charIdx++;
        }
        if (l < lines.length - 1) out += "\n";
      }
      el.textContent = out; frame++;
      if (frame > totalFrames) { el.textContent = finalText; clearInterval(iv); }
    }, 1000 / 60);
  }, delay * 1000);
}

// ─── Shared styles ─────────────────────────────────────────────────────────

const label10: React.CSSProperties = { fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#d4a84b" };
const heading: React.CSSProperties = { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, lineHeight: 0.86, letterSpacing: "-0.02em", textTransform: "uppercase" as const, color: "#f1f5f9" };

// ─── Grain ─────────────────────────────────────────────────────────────────

function Grain(): JSX.Element {
  return <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />;
}

// ─── Nav ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [{ label: "CONTEST", href: "/contest" }, { label: "ARTISTS", href: "/artists" }];

function Nav(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 h-14" style={{ zIndex: 9999, background: "rgba(0,3,8,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(212,168,75,0.14)" }}>
        <Link href="/" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "17px", letterSpacing: "0.22em", color: "#ffffff", textDecoration: "none" }}>JM-QAFRI</Link>
        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "11px", letterSpacing: "0.18em", color: "#ffffff", textDecoration: "none" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "#d4a84b", duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { color: "#ffffff", duration: 0.2 })}>{l.label}</Link>
          ))}
        </div>
        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: "22px", height: "1px", background: menuOpen && i === 1 ? "transparent" : "#d4a84b", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none") : "none", transition: "all 0.25s ease" }} />)}
        </button>
      </nav>
      {/* Mobile menu */}
      <div className="md:hidden fixed top-14 left-0 right-0 flex flex-col" style={{ zIndex: 9998, background: "rgba(0,3,8,0.97)", borderBottom: "1px solid rgba(212,168,75,0.14)", transform: menuOpen ? "translateY(0)" : "translateY(-100%)", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)", pointerEvents: menuOpen ? "all" : "none" }}>
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "22px", fontWeight: 700, letterSpacing: "0.18em", color: "#ffffff", textDecoration: "none", padding: "20px 24px", borderBottom: "1px solid rgba(212,168,75,0.08)" }}>{l.label}</Link>
        ))}
      </div>
    </>
  );
}

// ─── useReveal hook ────────────────────────────────────────────────────────

function useReveal(ref: React.RefObject<HTMLElement | null>, props?: gsap.TweenVars) {
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.09, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" }, ...props });
  }, []);
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection(): JSX.Element {
  const headRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (lineRef.current) tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.out" });
    if (badgeRef.current) tl.fromTo(badgeRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2");
    if (headRef.current) tl.call(() => { if (headRef.current) scrambleText(headRef.current, "THE\nJM-QAFRI\nART PRIZE\n2026", 1.4, 0); }, [], "-=0.3");
  }, []);

  return (
    <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#000308 0%,#0c0800 55%,#000000 100%)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "10%", right: "-20%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(212,168,75,0.07)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, right: "28%", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(212,168,75,0.12), transparent)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div ref={lineRef} style={{ width: "48px", height: "2px", background: "#d4a84b", marginBottom: "24px", transformOrigin: "left" }} />
        <div ref={badgeRef} style={{ opacity: 0, display: "inline-block", ...label10, border: "1px solid rgba(212,168,75,0.3)", padding: "6px 12px", marginBottom: "28px" }}>OPEN FOR SUBMISSIONS · 2026</div>
        <div ref={headRef} className="whitespace-pre-line" style={{ ...heading, fontSize: "clamp(58px,14vw,130px)" }}>THE JM-QAFRI ART PRIZE 2026</div>
        <div ref={subRef} style={{ opacity: 0, marginTop: "32px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[["PRIZE FUND", "$33,500"], ["CATEGORIES", "9 MEDIUMS"], ["DEADLINE", "15 SEP 2026"]].map(([k, v]) => (
            <div key={k}>
              <div style={{ ...label10, fontSize: "9px", marginBottom: "4px" }}>{k}</div>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: "20px", letterSpacing: "0.06em", color: "#d4a84b" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Details ───────────────────────────────────────────────────────────────

function DetailsSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  useReveal(ref, { onStart: () => { if (!fired.current && headRef.current) { fired.current = true; scrambleText(headRef.current, "CONTEST\nDETAILS", 1.0, 0.2); } } });

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#050505", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "16px" }}>— ABOUT THE PRIZE</div>
      <div ref={headRef} data-reveal className="whitespace-pre-line" style={{ opacity: 0, ...heading, fontSize: "clamp(48px,12vw,86px)", marginBottom: "32px" }}>CONTEST DETAILS</div>
      <div data-reveal style={{ opacity: 0, width: "40px", height: "2px", background: "#d4a84b", marginBottom: "32px" }} />
      <p data-reveal style={{ opacity: 0, fontFamily: '"Barlow Condensed", sans-serif', fontSize: "16px", lineHeight: 1.65, letterSpacing: "0.03em", color: "#94a3b8", marginBottom: "40px" }}>
        The JM-Qafri Art Prize is an internationally recognised open-call competition celebrating artists who push the boundaries of visual language — across print, oil, digital media, film, sculpture, and emerging technologies. Now in its third edition, the Prize draws entries from over 60 countries and awards more than $33,500 in prizes, exhibition opportunities, and collector introductions.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px" }}>
        {[
          ["THEME", "LIMINAL — Art at the threshold of identity, memory, and transformation."],
          ["ELIGIBILITY", "Open to all artists 18 years and older, worldwide. All experience levels welcome."],
          ["FORMAT", "Submit up to 3 original works per application. Physical or digital delivery accepted."],
          ["JURY", "International panel of curators, collectors, and cultural critics. Results are final."],
        ].map(([k, v]) => (
          <div key={k} data-reveal style={{ opacity: 0, padding: "24px", background: "rgba(212,168,75,0.03)", borderLeft: "2px solid rgba(212,168,75,0.18)" }}>
            <div style={{ ...label10, fontSize: "9px", marginBottom: "10px" }}>{k}</div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "14px", lineHeight: 1.55, letterSpacing: "0.04em", color: "#94a3b8" }}>{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Prizes ────────────────────────────────────────────────────────────────

function PrizesSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "linear-gradient(180deg,#050505 0%,#0c0800 100%)", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— AWARDS</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(44px,11vw,90px)", marginBottom: "48px" }}>PRIZES &<br />RECOGNITION</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px" }}>
        {PRIZES.map((p) => (
          <div key={p.rank} data-reveal style={{ opacity: 0, padding: "32px 24px", background: "rgba(212,168,75,0.03)", borderTop: "2px solid #d4a84b", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 12, right: 16, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "64px", lineHeight: 1, color: "rgba(212,168,75,0.04)" }}>{p.rank}</div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "clamp(26px,6vw,40px)", color: "#d4a84b", marginBottom: "6px" }}>{p.value}</div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f1f5f9", marginBottom: "12px" }}>{p.title}</div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "13px", lineHeight: 1.55, letterSpacing: "0.04em", color: "#64748b" }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Timeline ──────────────────────────────────────────────────────────────

function TimelineSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#050505", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— SCHEDULE</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(44px,11vw,80px)", marginBottom: "48px" }}>KEY<br />DATES</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {TIMELINE.map((t, i) => (
          <div key={i} data-reveal style={{ opacity: 0, display: "flex", alignItems: "flex-start", gap: "20px", padding: "24px 0", borderBottom: "1px solid rgba(212,168,75,0.08)" }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: "12px", letterSpacing: "0.16em", color: "#d4a84b", minWidth: "120px", paddingTop: "3px" }}>{t.date}</div>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d4a84b", flexShrink: 0, marginTop: "5px" }} />
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: "18px", letterSpacing: "0.06em", color: "#f1f5f9", textTransform: "uppercase" }}>{t.event}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Winners ───────────────────────────────────────────────────────────────

function WinnersSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useReveal(ref);
  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "linear-gradient(180deg,#050505,#0c0800)", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— HALL OF DISTINCTION</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(44px,11vw,90px)", marginBottom: "40px" }}>PREVIOUS<br />WINNERS</div>
      {/* Featured image */}
      <div data-reveal style={{ opacity: 0, position: "relative", overflow: "hidden", aspectRatio: "4/3", marginBottom: "2px" }}>
        <img src={WINNERS[active].imageUrl} alt={WINNERS[active].name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24 }}>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "clamp(22px,5vw,32px)", letterSpacing: "-0.01em", color: "#f1f5f9", textTransform: "uppercase" }}>{WINNERS[active].title}</div>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "12px", letterSpacing: "0.16em", color: "#d4a84b", marginTop: "4px" }}>{WINNERS[active].medium}</div>
        </div>
      </div>
      {/* Winner tabs */}
      {WINNERS.map((w, i) => (
        <div key={i} data-reveal onClick={() => setActive(i)} style={{ opacity: 0, padding: "24px 20px", cursor: "pointer", borderLeft: `2px solid ${active === i ? "#d4a84b" : "rgba(212,168,75,0.1)"}`, background: active === i ? "rgba(212,168,75,0.05)" : "transparent", transition: "all 0.3s ease", marginBottom: "2px" }}>
          <div style={{ ...label10, fontSize: "9px", color: active === i ? "#d4a84b" : "#475569", marginBottom: "6px" }}>GRAND PRIX — {w.year}</div>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "20px", letterSpacing: "0.04em", color: active === i ? "#f1f5f9" : "#64748b", textTransform: "uppercase", marginBottom: "2px" }}>{w.name}</div>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "12px", letterSpacing: "0.1em", color: active === i ? "#94a3b8" : "#334155" }}>{w.award}</div>
        </div>
      ))}
    </section>
  );
}

// ─── Form ──────────────────────────────────────────────────────────────────

function FormSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>({ fullName: "", email: "", country: "", medium: "", projectTitle: "", statement: "", portfolioUrl: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  useReveal(ref);

  const inp = (name: string): React.CSSProperties => ({
    width: "100%", background: "rgba(212,168,75,0.03)", border: `1px solid ${focused === name ? "rgba(212,168,75,0.6)" : "rgba(212,168,75,0.15)"}`,
    borderRadius: 0, padding: "14px 16px", fontFamily: '"Barlow Condensed", sans-serif', fontSize: "15px",
    letterSpacing: "0.06em", color: "#f1f5f9", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s ease",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.medium) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} style={{ padding: "80px 24px 120px", background: "#020202", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— ENTER THE PRIZE</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(48px,12vw,96px)", marginBottom: "16px" }}>SUBMIT<br />YOUR WORK</div>
      <p data-reveal style={{ opacity: 0, fontFamily: '"Barlow Condensed", sans-serif', fontSize: "14px", lineHeight: 1.6, letterSpacing: "0.04em", color: "#64748b", marginBottom: "48px" }}>
        Complete the form below to register your entry. A confirmation email will be sent within 48 hours. Submission fee: $25 USD per entry.
      </p>
      {submitted ? (
        <div style={{ padding: "48px 28px", background: "rgba(212,168,75,0.05)", borderLeft: "2px solid #d4a84b", textAlign: "center" }}>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "36px", color: "#d4a84b", textTransform: "uppercase", marginBottom: "10px" }}>Entry Received</div>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "14px", letterSpacing: "0.08em", color: "#94a3b8" }}>Thank you, {form.fullName}. Check your inbox for confirmation.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {[
            { name: "fullName", label: "FULL NAME *", placeholder: "Your full name", type: "text" },
            { name: "email", label: "EMAIL ADDRESS *", placeholder: "artist@email.com", type: "email" },
            { name: "country", label: "COUNTRY", placeholder: "Country of residence", type: "text" },
            { name: "projectTitle", label: "PROJECT TITLE", placeholder: "Title of your submitted work", type: "text" },
            { name: "portfolioUrl", label: "PORTFOLIO URL", placeholder: "https://yourportfolio.com", type: "url" },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name} data-reveal style={{ opacity: 0 }}>
              <div style={{ ...label10, fontSize: "9px", color: "#475569", marginBottom: "8px" }}>{label}</div>
              <input name={name} type={type} value={(form as unknown as Record<string,string>)[name]} onChange={handleChange} placeholder={placeholder}
                style={inp(name)} onFocus={() => setFocused(name)} onBlur={() => setFocused(null)} />
            </div>
          ))}
          <div data-reveal style={{ opacity: 0 }}>
            <div style={{ ...label10, fontSize: "9px", color: "#475569", marginBottom: "8px" }}>MEDIUM *</div>
            <select name="medium" value={form.medium} onChange={handleChange} style={{ ...inp("medium"), appearance: "none" }} onFocus={() => setFocused("medium")} onBlur={() => setFocused(null)}>
              <option value="">Select a medium</option>
              {MEDIUMS.map((m) => <option key={m} value={m} style={{ background: "#0c0800" }}>{m}</option>)}
            </select>
          </div>
          <div data-reveal style={{ opacity: 0 }}>
            <div style={{ ...label10, fontSize: "9px", color: "#475569", marginBottom: "8px" }}>ARTIST STATEMENT</div>
            <textarea name="statement" value={form.statement} onChange={handleChange} rows={5} placeholder="Briefly describe your work and its relationship to this year's theme: LIMINAL"
              style={{ ...inp("statement"), resize: "vertical" }} onFocus={() => setFocused("statement")} onBlur={() => setFocused(null)} />
          </div>
          <div data-reveal style={{ opacity: 0, marginTop: "12px" }}>
            <button onClick={handleSubmit} style={{ width: "100%", fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000308", background: "#d4a84b", border: "none", padding: "20px 24px", cursor: "pointer", transition: "background 0.2s ease" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { background: "#e8c060", duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { background: "#d4a84b", duration: 0.2 })}>
              Submit Entry →
            </button>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "11px", letterSpacing: "0.1em", color: "#334155", marginTop: "14px" }}>
              * Required fields. By submitting you agree to the JM-Qafri Prize Terms & Conditions.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer(): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "28px 24px", borderTop: "1px solid rgba(212,168,75,0.12)", background: "#000308" }}>
      <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#334155" }}>© JM-Qafri Art Prize · Nairobi · 2026</span>
      <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4a84b" }}>Print · Film · AI · 3D · CGI</span>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ContestPage(): JSX.Element {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (cursorRef.current) { cursorRef.current.style.left = `${e.clientX}px`; cursorRef.current.style.top = `${e.clientY}px`; } };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <Grain />
      <Nav />
      <div ref={cursorRef} className="fixed pointer-events-none hidden md:block" style={{ zIndex: 9999, width: "10px", height: "10px", borderRadius: "50%", border: "1px solid white", background: "rgba(255,255,255,0.95)", transform: "translate(-50%,-50%)", transition: "width 0.12s ease, height 0.12s ease", pointerEvents: "none" }} />
      <main style={{ paddingTop: "56px", background: "#000308", cursor: "none" }}>
        <HeroSection />
        <DetailsSection />
        <PrizesSection />
        <TimelineSection />
        <WinnersSection />
        <FormSection />
        <Footer />
      </main>
    </>
  );
}