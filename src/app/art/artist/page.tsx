"use client";

import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ─────────────────────────────────────────────────────────────────

interface Artist {
  id: number;
  name: string;
  origin: string;
  medium: string[];
  bio: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  year: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const ARTISTS: Artist[] = [
  {
    id: 1, name: "Amara Osei-Bonsu", origin: "Accra, Ghana", medium: ["Digital", "Mixed Media"], bio: "Amara's work dissolves the boundary between the ancestral and the digital. Drawing from Akan textile patterns and re-weaving them through algorithmic processes, her pieces interrogate cultural memory in an age of synthetic reproduction.", imageUrl: "/potrait.jpeg", tags: ["Digital", "Identity", "Diaspora"], featured: true, year: "2025",
  },
  {
    id: 2, name: "Atieno Otieno", origin: "Nairobi, Kenya", medium: ["Oil", "Photography"], bio: "Atieno's work explores the intersection of memory and landscape. His photographs capture the quiet moments of fashion, revealing the complexity of urban existence.", imageUrl: "/fasion.jpeg", tags: ["Oil", "Landscape", "Light"], featured: true, year: "2024",
  },
  {
    id: 3, name: "Anastasia Volkova", origin: "Saint Petersburg, Russia", medium: ["3D", "CGI", "Sculpture"], bio: "Anastasia builds speculative structures that feel half-monument, half-memory. Her digital environments borrow from stage design, public architecture, and ceremonial objects, creating works that feel both futuristic and haunted by history.", imageUrl: "/watch.jpeg", tags: ["3D", "Architecture", "Digital"], year: "2023",
  },
  {
    id: 4, name: "Seun Adeyemi", origin: "Lagos, Nigeria", medium: ["Photography", "Film"], bio: "Seun's lens is forensic. His documentary-style photography and short films capture Lagos in motion — the infrastructure of hustle, the choreography of survival. He was shortlisted for the JM-Qafri Prize in its inaugural year.", imageUrl: "/bluefish.jpeg", tags: ["Photography", "Documentary", "Urban"], year: "2023",
  },
  {
    id: 5, name: "Naledi Mokoena", origin: "Johannesburg, South Africa", medium: ["Print", "Installation"], bio: "Naledi's print practice draws from protest posters, township signage, and hand-cut stencil language. Her installations layer repetition with interruption, turning each edition into a record of movement, labor, and collective voice.", imageUrl: "/fragrance.jpeg", tags: ["Print", "Abstraction", "Series"], year: "2024",
  },
  {
    id: 6, name: "Kioni Waweru", origin: "Nairobi, Kenya", medium: ["Oil", "Mural"], bio: "Born and raised in Nairobi, Kioni's massive oil canvases channel the energy of East African street art while speaking the language of classical figuration. Her murals are landmarks; her studio work, intimate revelations.", imageUrl: "/marry.jpeg", tags: ["Oil", "Figurative", "East Africa"], year: "2025",
  },
  {
    id: 7, name: "Wambui Njoroge", origin: "Nairobi, Kenya", medium: ["AI", "Digital"], bio: "Wambui works with machine learning as a cultural tool rather than a shortcut. Training systems on oral fragments, matatu graphics, and family archives, she builds digital pieces that ask who gets preserved, translated, and remembered.", imageUrl: "/pinkcar.jpeg", tags: ["AI", "Generative", "Digital"], year: "2026",
  },
];

const ALL_TAGS = ["All", "Digital", "Oil", "Photography", "3D", "Print", "AI", "Film"];

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

// ─── Shared ────────────────────────────────────────────────────────────────

const label10: React.CSSProperties = { fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#d4a84b" };
const heading: React.CSSProperties = { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, lineHeight: 0.86, letterSpacing: "-0.02em", textTransform: "uppercase" as const, color: "#f1f5f9" };

function Grain(): JSX.Element {
  return <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />;
}

// ─── Nav ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [{ label: "CONTEST", href: "/art/contest" }, { label: "ARTISTS", href: "/art/artist" }];

function Nav(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 h-14" style={{ zIndex: 9999, background: "rgba(0,3,8,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(212,168,75,0.14)" }}>
        <Link href="/" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "17px", letterSpacing: "0.22em", color: "#ffffff", textDecoration: "none" }}>JM-QAFRI</Link>
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "11px", letterSpacing: "0.18em", color: "#ffffff", textDecoration: "none" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "#d4a84b", duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { color: "#ffffff", duration: 0.2 })}>{l.label}</Link>
          ))}
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: "22px", height: "1px", background: menuOpen && i === 1 ? "transparent" : "#d4a84b", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none") : "none", transition: "all 0.25s ease" }} />)}
        </button>
      </nav>
      <div className="md:hidden fixed top-14 left-0 right-0 flex flex-col" style={{ zIndex: 9998, background: "rgba(0,3,8,0.97)", borderBottom: "1px solid rgba(212,168,75,0.14)", transform: menuOpen ? "translateY(0)" : "translateY(-100%)", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)", pointerEvents: menuOpen ? "all" : "none" }}>
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "22px", fontWeight: 700, letterSpacing: "0.18em", color: "#ffffff", textDecoration: "none", padding: "20px 24px", borderBottom: "1px solid rgba(212,168,75,0.08)" }}>{l.label}</Link>
        ))}
      </div>
    </>
  );
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
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2");
    if (headRef.current) tl.call(() => { if (headRef.current) scrambleText(headRef.current, "THE\nARTISTS", 1.2, 0); }, [], "-=0.3");
  }, []);

  return (
    <section style={{ minHeight: "80svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#000308 0%,#0c0800 60%,#000000 100%)", zIndex: 0 }} />
      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 0, left: "60%", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(212,168,75,0.1), transparent)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "30%", left: "-10%", width: "340px", height: "340px", borderRadius: "50%", border: "1px solid rgba(212,168,75,0.05)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div ref={lineRef} style={{ width: "48px", height: "2px", background: "#d4a84b", marginBottom: "24px", transformOrigin: "left" }} />
        <div ref={badgeRef} style={{ opacity: 0, display: "inline-block", ...label10, border: "1px solid rgba(212,168,75,0.3)", padding: "6px 12px", marginBottom: "28px" }}>JM-QAFRI · {ARTISTS.length} FEATURED ARTISTS</div>
        <div ref={headRef} className="whitespace-pre-line" style={{ ...heading, fontSize: "clamp(64px,16vw,140px)" }}>THE ARTISTS</div>
        <p ref={subRef} style={{ opacity: 0, marginTop: "28px", fontFamily: '"Barlow Condensed", sans-serif', fontSize: "16px", lineHeight: 1.6, letterSpacing: "0.04em", color: "#64748b", maxWidth: "520px" }}>
          A curated roster of visual artists from Kenya, across Africa, and one Russian voice working across print, oil, digital media, film, and emerging technologies — recognised and championed by JM-Qafri.
        </p>
      </div>
    </section>
  );
}

// ─── Artist Modal ──────────────────────────────────────────────────────────

function ArtistModal({ artist, onClose }: { artist: Artist; onClose: () => void }): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current) gsap.fromTo(modalRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0" }} onClick={onClose}>
      <div ref={modalRef} onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "680px", maxHeight: "90svh", overflowY: "auto", background: "#0a0600", borderTop: "2px solid #d4a84b", padding: "0 0 40px" }}>
        {/* Image */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
          <img src={artist.imageUrl} alt={artist.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,6,0,1) 0%, transparent 60%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(212,168,75,0.3)", color: "#d4a84b", width: "36px", height: "36px", cursor: "pointer", fontFamily: '"Barlow Condensed", sans-serif', fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {/* Content */}
        <div style={{ padding: "28px 24px 0" }}>
          <div style={{ ...label10, fontSize: "9px", marginBottom: "8px" }}>{artist.origin} · {artist.year}</div>
          <div style={{ ...heading, fontSize: "clamp(32px,8vw,52px)", marginBottom: "20px" }}>{artist.name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
            {artist.medium.map((m) => <span key={m} style={{ ...label10, fontSize: "9px", border: "1px solid rgba(212,168,75,0.25)", padding: "4px 10px" }}>{m}</span>)}
          </div>
          <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "16px", lineHeight: 1.65, letterSpacing: "0.04em", color: "#94a3b8", marginBottom: "28px" }}>{artist.bio}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {artist.tags.map((t) => <span key={t} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.14em", color: "#475569", background: "rgba(255,255,255,0.04)", padding: "4px 10px" }}>#{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Featured Strip ────────────────────────────────────────────────────────

function FeaturedSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const featured = ARTISTS.filter((a) => a.featured);
  const [active, setActive] = useState<Artist | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" } });
  }, []);

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#050505", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— PRIZE ALUMNI</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(44px,11vw,86px)", marginBottom: "40px" }}>GRAND PRIX<br />WINNERS</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px" }}>
        {featured.map((a) => (
          <div key={a.id} data-reveal onClick={() => setActive(a)} style={{ opacity: 0, position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "3/4" }}
            onMouseEnter={(e) => { const img = e.currentTarget.querySelector("img"); const overlay = e.currentTarget.querySelector(".hover-info") as HTMLElement; if (img) gsap.to(img, { scale: 1.07, duration: 0.5, ease: "power2.out" }); if (overlay) gsap.to(overlay, { opacity: 1, y: 0, duration: 0.3 }); }}
            onMouseLeave={(e) => { const img = e.currentTarget.querySelector("img"); const overlay = e.currentTarget.querySelector(".hover-info") as HTMLElement; if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" }); if (overlay) gsap.to(overlay, { opacity: 0, y: 8, duration: 0.3 }); }}>
            <img src={a.imageUrl} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16 }}>
              <span style={{ ...label10, fontSize: "9px", background: "#d4a84b", color: "#000308", padding: "4px 10px" }}>GRAND PRIX {a.year}</span>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
              <div style={{ ...heading, fontSize: "clamp(22px,5vw,32px)", marginBottom: "4px" }}>{a.name}</div>
              <div style={{ ...label10, fontSize: "9px", color: "#94a3b8" }}>{a.origin}</div>
              <div className="hover-info" style={{ opacity: 0, transform: "translateY(8px)", marginTop: "12px", fontFamily: '"Barlow Condensed", sans-serif', fontSize: "13px", letterSpacing: "0.06em", color: "#d4a84b" }}>VIEW PROFILE →</div>
            </div>
          </div>
        ))}
      </div>
      {active && <ArtistModal artist={active} onClose={() => setActive(null)} />}
    </section>
  );
}

// ─── All Artists Grid ──────────────────────────────────────────────────────

function AllArtistsSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Artist | null>(null);

  const filtered = filter === "All" ? ARTISTS : ARTISTS.filter((a) => a.medium.some((m) => m.toLowerCase().includes(filter.toLowerCase())) || a.tags.includes(filter));

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" } });
  }, []);

  return (
    <section ref={ref} style={{ padding: "80px 24px 120px", background: "linear-gradient(180deg,#050505,#000308)", borderTop: "1px solid rgba(212,168,75,0.1)" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— THE ROSTER</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(44px,11vw,86px)", marginBottom: "36px" }}>ALL<br />ARTISTS</div>

      {/* Filter pills */}
      <div data-reveal style={{ opacity: 0, display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "40px" }}>
        {ALL_TAGS.map((tag) => (
          <button key={tag} onClick={() => setFilter(tag)} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "8px 16px", background: filter === tag ? "#d4a84b" : "transparent", color: filter === tag ? "#000308" : "#64748b", border: `1px solid ${filter === tag ? "#d4a84b" : "rgba(212,168,75,0.2)"}`, cursor: "pointer", transition: "all 0.2s ease" }}>{tag}</button>
        ))}
      </div>

      {/* List — mobile: stacked cards; desktop: two cols */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
        {filtered.map((a, i) => (
          <div key={a.id} data-reveal onClick={() => setSelected(a)} style={{ opacity: 0, display: "flex", gap: "0", cursor: "pointer", overflow: "hidden", background: "rgba(212,168,75,0.02)", border: "1px solid rgba(212,168,75,0.07)", transition: "border-color 0.25s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,75,0.3)"; const img = e.currentTarget.querySelector("img"); if (img) gsap.to(img, { scale: 1.06, duration: 0.4 }); }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,75,0.07)"; const img = e.currentTarget.querySelector("img"); if (img) gsap.to(img, { scale: 1, duration: 0.4 }); }}>
            {/* Thumbnail */}
            <div style={{ width: "100px", flexShrink: 0, overflow: "hidden", position: "relative" }}>
              <img src={a.imageUrl} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            {/* Info */}
            <div style={{ padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ ...label10, fontSize: "9px", color: "#475569", marginBottom: "6px" }}>{a.origin} · {a.year}</div>
                <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "18px", letterSpacing: "0.04em", color: "#f1f5f9", textTransform: "uppercase", marginBottom: "8px" }}>{a.name}</div>
                <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "12px", lineHeight: 1.5, letterSpacing: "0.04em", color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.bio}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "12px" }}>
                {a.medium.map((m) => <span key={m} style={{ ...label10, fontSize: "8px", border: "1px solid rgba(212,168,75,0.2)", padding: "2px 8px" }}>{m}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", padding: "0 14px", color: "rgba(212,168,75,0.3)", fontFamily: '"Barlow Condensed", sans-serif', fontSize: "18px" }}>→</div>
          </div>
        ))}
      </div>

      {selected && <ArtistModal artist={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────

function CTASection(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 86%", toggleActions: "play none none none" } });
  }, []);

  return (
    <section ref={ref} style={{ padding: "80px 24px 100px", background: "linear-gradient(145deg,#0c0800 0%,#000308 100%)", borderTop: "2px solid #d4a84b" }}>
      <div data-reveal style={{ opacity: 0, ...label10, marginBottom: "12px" }}>— JOIN THE ROSTER</div>
      <div data-reveal style={{ opacity: 0, ...heading, fontSize: "clamp(44px,12vw,96px)", marginBottom: "24px" }}>ARE YOU<br />AN ARTIST?</div>
      <p data-reveal style={{ opacity: 0, fontFamily: '"Barlow Condensed", sans-serif', fontSize: "16px", lineHeight: 1.6, letterSpacing: "0.04em", color: "#64748b", maxWidth: "500px", marginBottom: "40px" }}>
        JM-Qafri champions emerging and established artists from Kenya, across Africa, and the wider global conversation. Enter the 2026 Prize and join a roster shaped by regional memory, craft, and contemporary vision.
      </p>
      <div data-reveal style={{ opacity: 0 }}>
        <Link href="/art/contest" style={{ display: "inline-block", fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000308", background: "#d4a84b", padding: "18px 40px", textDecoration: "none", transition: "background 0.2s ease" }}
          onMouseEnter={(e) => gsap.to(e.currentTarget, { background: "#e8c060", duration: 0.2 })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { background: "#d4a84b", duration: 0.2 })}>
          Enter the 2026 Prize →
        </Link>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer(): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "28px 24px", borderTop: "1px solid rgba(212,168,75,0.12)", background: "#000308" }}>
      <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#334155" }}>© JM-Qafri Art Prize · Nairobi · Kisumu . Moscow , Saint Petersburg . 2026</span>
      <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4a84b" }}>Print · Film · AI · 3D · CGI</span>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ArtistsPage(): JSX.Element {
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
        <FeaturedSection />
        <AllArtistsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
