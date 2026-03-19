"use client";

import { JSX, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ─── Types ────────────────────────────────────────────────────────────────────

type CellType = "image" | "text" | "accent" | "empty";

interface GridCell {
  type: CellType;
  imageUrl?: string;
  imageAlt?: string;
  label?: string;
  headline?: string;
  sub?: string;
  colSpan?: number;
  rowSpan?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CELLS: GridCell[] = [
  {
    type: "text",
    label: "— JM-Qafri · 2026",
    headline: "ART\nCULTURE",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1762843354674-adabdd6c4072?w=800&q=80",
    imageAlt: "Editorial Fashion",
    label: "Fashion",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1734600446034-8908c30ba715?w=800&q=80",
    imageAlt: "Bleu de Chanel",
    label: "Bleu de Chanel",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "accent",
    headline: "PRINT.\nOIL.\nCGI.\nNFT",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1763129636673-df7c37cf251d?w=800&q=80",
    imageAlt: "Dom Pérignon",
    label: "Bottle Art",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1761382691150-e84983807653?w=800&q=80",
    imageAlt: "Lifestyle",
    label: "Lifestyle",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    type: "empty",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1737920459846-2d0318700658?w=800&q=80",
    imageAlt: "Fragrance",
    label: "Fragrance Campaign",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    type: "text",
    label: "— JM-Qafri Studio",
    headline: "PRINT\n& FILM",
    sub: "Caption here",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1554151447-b9d2197448f9?w=800&q=80",
    imageAlt: "Timepiece",
    label: "Timepiece",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1760595955091-fb86f40bc5be?w=800&q=80",
    imageAlt: "Portrait Series",
    label: "Portrait Series",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "accent",
    headline: "LUX\nURY",
    sub: "Est. 2026",
    colSpan: 1,
    rowSpan: 1,
  },
];

// ─── Scramble util ────────────────────────────────────────────────────────────

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";

function scrambleText(
  el: HTMLElement,
  finalText: string,
  duration = 1.0,
  delay = 0
): void {
  const lines = finalText.split("\n");
  const flatLen = lines.join("").length;
  let frame = 0;
  const totalFrames = Math.round(duration * 60);

  setTimeout(() => {
    const iv = setInterval(() => {
      let out = "";
      let charIdx = 0;
      for (let l = 0; l < lines.length; l++) {
        for (let c = 0; c < lines[l].length; c++) {
          if (frame / totalFrames > charIdx / flatLen) {
            out += lines[l][c];
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          charIdx++;
        }
        if (l < lines.length - 1) out += "\n";
      }
      el.textContent = out;
      frame++;
      if (frame > totalFrames) {
        el.textContent = finalText;
        clearInterval(iv);
      }
    }, 1000 / 60);
  }, delay * 1000);
}

// ─── Grain overlay ────────────────────────────────────────────────────────────

function Grain(): JSX.Element {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9998,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS: string[] = ["TALENTS", "PROJECTS", "SHOP", "CONTEST"];

function Nav(): JSX.Element {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    const items = navRef.current.querySelectorAll<HTMLElement>("[data-nav-item]");
    gsap.fromTo(
      items,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 h-14"
      style={{
        zIndex: 9999,
        background: "rgba(15,23,42,0.88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(212,168,75,0.14)",
      }}
    >
      <div
        data-nav-item
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 900,
          fontSize: "17px",
          letterSpacing: "0.22em",
          color: "#d4a84b",
          opacity: 0,
        }}
      >
        JM-QAFRI
      </div>

      <div className="flex gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            data-nav-item
            href="#"
            style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#94a3b8",
              textDecoration: "none",
              opacity: 0,
            }}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { color: "#d4a84b", duration: 0.2 })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { color: "#94a3b8", duration: 0.2 })
            }
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── Cell components ──────────────────────────────────────────────────────────

function ImageCell({ cell, index }: { cell: GridCell; index: number }): JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
        delay: (index % 4) * 0.07,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    const img = imgRef.current;
    const label = labelRef.current;

    const onEnter = () => {
      if (img) gsap.to(img, { scale: 1.2, duration: 0.55, ease: "power2.out" });
      if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.3 });
    };
    const onLeave = () => {
      if (img) gsap.to(img, { scale: 1, duration: 0.55, ease: "power2.inOut" });
      if (label) gsap.to(label, { opacity: 0, y: 8, duration: 0.3 });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [index]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden cursor-pointer"
      style={{
        gridColumn: `span ${cell.colSpan ?? 1}`,
        gridRow: `span ${cell.rowSpan ?? 1}`,
        opacity: 0,
      }}
    >
      <img
        ref={imgRef}
        src={cell.imageUrl}
        alt={cell.imageAlt ?? ""}
        className="w-full h-full object-cover"
        style={{ transformOrigin: "center center", willChange: "transform" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.1) 45%, transparent 100%)",
        }}
      />
      {/* Gold hover line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "2px",
          background: "linear-gradient(to right, #d4a84b, transparent)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }}
      />
      <span
        ref={labelRef}
        className="absolute bottom-4 left-4"
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#d4a84b",
          opacity: 0,
          transform: "translateY(8px)",
          zIndex: 2,
        }}
      >
        {cell.label}
      </span>
    </div>
  );
}

function TextCell({ cell, index }: { cell: GridCell; index: number }): JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          if (headRef.current && cell.headline) {
            scrambleText(headRef.current, cell.headline, 1.1, 0.05);
          }
        },
      }
    );
  }, [cell.headline, index]);

  return (
    <div
      ref={wrapRef}
      className="flex flex-col justify-end p-7"
      style={{
        gridColumn: `span ${cell.colSpan ?? 1}`,
        gridRow: `span ${cell.rowSpan ?? 1}`,
        opacity: 0,
        background:
          "radial-gradient(ellipse at 20% 80%, rgba(212,168,75,0.06) 0%, transparent 60%)",
      }}
    >
      {cell.label && (
        <span
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: "10px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#d4a84b",
            marginBottom: "12px",
          }}
        >
          {cell.label}
        </span>
      )}
      <div
        ref={headRef}
        className="whitespace-pre-line"
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 900,
          fontSize: "clamp(56px, 7vw, 110px)",
          lineHeight: 0.86,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "#f1f5f9",
        }}
      >
        {cell.headline}
      </div>
      {cell.sub && (
        <p
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#64748b",
            marginTop: "16px",
          }}
        >
          {cell.sub}
        </p>
      )}
    </div>
  );
}

function AccentCell({ cell, index }: { cell: GridCell; index: number }): JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.88 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.6)",
        delay: index * 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          if (headRef.current && cell.headline) {
            scrambleText(headRef.current, cell.headline, 0.9, 0.0);
          }
        },
      }
    );
  }, [cell.headline, index]);

  return (
    <div
      ref={wrapRef}
      className="flex flex-col justify-center items-start p-6"
      style={{
        gridColumn: `span ${cell.colSpan ?? 1}`,
        gridRow: `span ${cell.rowSpan ?? 1}`,
        opacity: 0,
        background: "linear-gradient(145deg, #140e00 0%, #2a1c00 100%)",
        borderLeft: "2px solid #d4a84b",
      }}
    >
      <div
        ref={headRef}
        className="whitespace-pre-line"
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 900,
          fontSize: "clamp(36px, 4vw, 68px)",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "#d4a84b",
        }}
      >
        {cell.headline}
      </div>
      {cell.sub && (
        <span
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: "10px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#7a5c1a",
            marginTop: "12px",
          }}
        >
          {cell.sub}
        </span>
      )}
    </div>
  );
}

function EmptyCell({ cell }: { cell: GridCell }): JSX.Element {
  return (
    <div
      style={{
        gridColumn: `span ${cell.colSpan ?? 1}`,
        gridRow: `span ${cell.rowSpan ?? 1}`,
        background: "rgba(15,23,42,0.4)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gold radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(212,168,75,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Corner brackets */}
      {(
        [
          { top: 10, left: 10, borderTop: "1px solid #d4a84b", borderLeft: "1px solid #d4a84b" },
          { bottom: 10, right: 10, borderBottom: "1px solid #d4a84b", borderRight: "1px solid #d4a84b" },
        ] as React.CSSProperties[]
      ).map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            opacity: 0.25,
            ...s,
          }}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArtPage(): JSX.Element {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.8,
        effects: true,
      });
    }
    return () => {
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Grain />
      <Nav />

      {/* ScrollSmoother outer wrapper — must be fixed+overflow hidden */}
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* ScrollSmoother inner content */}
        <div
          ref={contentRef}
          style={{
            background:
              "linear-gradient(180deg, #0f172a 0%, #1e293b 35%, #0f172a 70%, #020617 100%)",
            paddingTop: "56px",
          }}
        >
          {/* ── Fluid grid ───────────────────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "calc((100vh - 56px) / 2)",
              gap: "2px",
              padding: "2px",
            }}
          >
            {CELLS.map((cell, i) => {
              switch (cell.type) {
                case "image":  return <ImageCell  key={i} cell={cell} index={i} />;
                case "text":   return <TextCell   key={i} cell={cell} index={i} />;
                case "accent": return <AccentCell key={i} cell={cell} index={i} />;
                default:       return <EmptyCell  key={i} cell={cell} />;
              }
            })}
          </div>

          {/* ── Footer ───────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "28px 24px",
              borderTop: "1px solid rgba(212,168,75,0.12)",
            }}
          >
            <span
              style={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#334155",
              }}
            >
              © Detroit Paris — AI Production House
            </span>
            <span
              style={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#d4a84b",
              }}
            >
              Print · Film · AI · 3D · CGI
            </span>
          </div>
        </div>
      </div>
    </>
  );
}