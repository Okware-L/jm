"use client";

import { JSX, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Image from "next/image";
import Link from "next/link";

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
  /** Override col span on mobile (default: always 2 = full width) */
  mobileColSpan?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CELLS: GridCell[] = [
  {
    type: "accent",
    label: "",
    headline: "ART\n&\nCULTURE",
    colSpan: 2,
    rowSpan: 2,
    mobileColSpan: 2,
  },
  {
    type: "image",
    imageUrl: "/fasion.jpeg",
    imageAlt: "Editorial Fashion",
    label: "Fashion",
    colSpan: 1,
    rowSpan: 2,
    mobileColSpan: 2,
  },
  {
    type: "image",
    imageUrl: "/bluefish.jpeg",
    imageAlt: "Bleu de Chanel",
    label: "Bleu de Chanel",
    colSpan: 1,
    rowSpan: 1,
    mobileColSpan: 1,
  },
  {
    type: "accent",
    headline: "PRINT.\nOIL.\nDIGITAL MEDIA.",
    colSpan: 1,
    rowSpan: 1,
    mobileColSpan: 1,
  },
  {
    type: "image",
    imageUrl: "/marry.jpeg",
    imageAlt: "Dom Pérignon",
    label: "Bottle Art",
    colSpan: 1,
    rowSpan: 2,
    mobileColSpan: 2,
  },
  {
    type: "image",
    imageUrl: "/pinkcar.jpeg",
    imageAlt: "Lifestyle",
    label: "Lifestyle",
    colSpan: 2,
    rowSpan: 1,
    mobileColSpan: 2,
  },
  {
    type: "empty",
    colSpan: 1,
    rowSpan: 1,
    mobileColSpan: 2,
  },
  {
    type: "image",
    imageUrl: "/fragrance.jpeg",
    imageAlt: "Fragrance",
    label: "Fragrance Campaign",
    colSpan: 1,
    rowSpan: 2,
    mobileColSpan: 2,
  },
  {
    type: "text",
    label: "— JM-Qafri Studio",
    headline: "PRINT\n& FILM",
    sub: "Caption here",
    colSpan: 2,
    rowSpan: 1,
    mobileColSpan: 2,
  },
  {
    type: "image",
    imageUrl: "/watch.jpeg",
    imageAlt: "Timepiece",
    label: "Timepiece",
    colSpan: 1,
    rowSpan: 2,
    mobileColSpan: 1,
  },
  {
    type: "image",
    imageUrl: "/potrait.jpeg",
    imageAlt: "Portrait Series",
    label: "Portrait Series",
    colSpan: 1,
    rowSpan: 1,
    mobileColSpan: 1,
  },
  {
    type: "accent",
    headline: "LUXURY",
    sub: "Est. 2026",
    colSpan: 1,
    rowSpan: 1,
    mobileColSpan: 1,
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

const NAV_LINKS = [
  { label: "CONTEST", href: "/art/contest" },
  { label: "ARTISTS", href: "/art/artist" },
];

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
      className="fixed top-0 left-0 right-0 flex items-center justify-between"
      style={{
        
        zIndex: 9999,
        padding: "0 clamp(16px, 4vw, 24px)",
        height: "clamp(48px, 7vw, 56px)",
        background: "rgba(0, 3, 8, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(212,168,75,0.14)",
      }}
    >
      <div
        data-nav-item
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 900,
          fontSize: "clamp(14px, 3.5vw, 17px)",
          letterSpacing: "0.22em",
          color: "#ffffff",
        }}
      >
        <Link
        href={'/'}
        >
        <Image
        
          src="/jmwhite.svg"
          alt="JM-Qafri Logo"
          width={0}
          height={0}
          style={{ display: "block", width: "auto", height: "clamp(80px, 4vw, 80px)" }}
        />
        </Link>
      </div>

      <div className="flex gap-6">
        {NAV_LINKS.map((link) => (
  <Link
    key={link.label}
    data-nav-item
    href={link.href}
    style={{
      fontFamily: '"Barlow Condensed", sans-serif',
      fontSize: "11px",
      letterSpacing: "0.18em",
      color: "#ffffff",
      textDecoration: "none",
      opacity: 0,
    }}
    onMouseEnter={(e) =>
      gsap.to(e.currentTarget, { color: "#d4a84b", duration: 0.2 })
    }
    onMouseLeave={(e) =>
      gsap.to(e.currentTarget, { color: "#ffffff", duration: 0.2 })
    }
  >
    {link.label}
  </Link>
))}
      </div>
    </nav>
  );
}

// ─── Responsive col-span helper ───────────────────────────────────────────────

/**
 * Returns a CSS `gridColumn: span N` value.
 * On mobile (≤ 640 px) we always use mobileColSpan (default 2 = full width).
 * We rely on a CSS custom property set on the grid to communicate breakpoint.
 * Simpler approach: just use the mobileColSpan as a data-attr and let a
 * <style> tag handle it.
 */
function colSpanStyle(cell: GridCell) {
  // Desktop spans handled inline; mobile handled via CSS classes below
  return {
    "--col-span": cell.colSpan ?? 1,
    "--row-span": cell.rowSpan ?? 1,
    "--mobile-col-span": cell.mobileColSpan ?? 2,
  } as React.CSSProperties;
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
          start: "top 92%",
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

    // Hover (desktop only — touch devices get label always visible)
    const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

    const onEnter = () => {
      if (isTouchDevice()) return;
      if (img) gsap.to(img, { scale: 1.2, duration: 0.55, ease: "power2.out" });
      if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.3 });
    };
    const onLeave = () => {
      if (isTouchDevice()) return;
      if (img) gsap.to(img, { scale: 1, duration: 0.55, ease: "power2.inOut" });
      if (label) gsap.to(label, { opacity: 0, y: 8, duration: 0.3 });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // On touch devices show label always
    if (isTouchDevice() && label) {
      gsap.set(label, { opacity: 1, y: 0 });
    }

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [index]);

  return (
    <div
      ref={wrapRef}
      className="art-cell relative overflow-hidden cursor-pointer"
      style={{
        ...colSpanStyle(cell),
        opacity: 0,
      }}
    >
      <Image
        ref={imgRef}
        src={cell.imageUrl ?? ""}
        alt={cell.imageAlt ?? ""}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
      <span
        ref={labelRef}
        className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4"
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: "clamp(9px, 2.2vw, 10px)",
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
      className="art-cell flex flex-col justify-end"
      style={{
        ...colSpanStyle(cell),
        padding: "clamp(16px, 4vw, 28px)",
        opacity: 0,
        background:
          "radial-gradient(ellipse at 20% 80%, rgba(212,168,75,0.06) 0%, transparent 60%)",
      }}
    >
      {cell.label && (
        <span
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: "clamp(9px, 2.2vw, 10px)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#d4a84b",
            marginBottom: "10px",
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
          fontSize: "clamp(42px, 10vw, 110px)",
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
            fontSize: "clamp(10px, 2.5vw, 12px)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#64748b",
            marginTop: "14px",
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
      className="art-cell flex flex-col justify-center items-start"
      style={{
        ...colSpanStyle(cell),
        padding: "clamp(14px, 3.5vw, 24px)",
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
          fontSize: "clamp(28px, 6vw, 68px)",
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
            fontSize: "clamp(9px, 2.2vw, 10px)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#7a5c1a",
            marginTop: "10px",
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
      className="art-cell"
      style={{
        ...colSpanStyle(cell),
        background: "rgba(15,23,42,0.4)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(212,168,75,0.05) 0%, transparent 70%)",
        }}
      />
      {(
        [
          { top: 10, left: 10, borderTop: "1px solid #d4a84b", borderLeft: "1px solid #d4a84b" },
          { bottom: 10, right: 10, borderBottom: "1px solid #d4a84b", borderRight: "1px solid #d4a84b" },
        ] as React.CSSProperties[]
      ).map((s, i) => (
        <div
          key={i}
          style={{ position: "absolute", width: 18, height: 18, opacity: 0.25, ...s }}
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
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollSmoother only on non-touch / desktop
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouchDevice && wrapperRef.current && contentRef.current) {
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

  // Custom cursor — desktop only
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`;
        cursorRef.current.style.top = `${event.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const navHeight = "clamp(48px, 7vw, 56px)";

  return (
    <>
      {/* ── Responsive grid styles ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&display=swap');

        * { box-sizing: border-box; }

        /* Mobile: 2-column grid, row = 45vw tall */
        .art-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 45vw;
          gap: 2px;
          padding: 2px;
        }

        /* Desktop: 4-column grid, row = half viewport */
        @media (min-width: 640px) {
          .art-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: calc((100vh - clamp(48px, 7vw, 56px)) / 2);
          }
        }

        /* Cell spans */
        .art-cell {
          grid-column: span var(--mobile-col-span, 2);
          grid-row:    span var(--row-span, 1);
        }

        @media (min-width: 640px) {
          .art-cell {
            grid-column: span var(--col-span, 1);
          }
        }

        /* ScrollSmoother wrapper — only on desktop */
        @media (min-width: 640px) {
          .smooth-wrapper {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            cursor: none;
          }
        }

        /* On mobile: normal scrolling */
        @media (max-width: 639px) {
          .smooth-wrapper {
            position: relative;
            overflow: visible;
            cursor: auto;
          }
        }

        /* Hide custom cursor on touch */
        @media (pointer: coarse) {
          .custom-cursor { display: none !important; }
        }
      `}</style>

      <Grain />
      <Nav />

      {/* Custom cursor (hidden on touch via CSS) */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-10000 rounded-full border border-white bg-white/95"
        style={{
          width: "10px",
          height: "10px",
          transform: "translate(-50%, -50%)",
          transition: "width 0.12s ease, height 0.12s ease, background-color 0.12s ease",
          pointerEvents: "none",
        }}
      />

      <div ref={wrapperRef} className="smooth-wrapper">
        <div
          ref={contentRef}
          style={{
            background:
              "linear-gradient(180deg, #f3f3f3 0%, #1e293b 35%, #a5a5a5 70%, #000000 100%)",
            paddingTop: navHeight,
          }}
        >
          {/* ── Grid ──────────────────────────────────────────── */}
          <div className="art-grid">
            {CELLS.map((cell, i) => {
              switch (cell.type) {
                case "image":  return <ImageCell  key={i} cell={cell} index={i} />;
                case "text":   return <TextCell   key={i} cell={cell} index={i} />;
                case "accent": return <AccentCell key={i} cell={cell} index={i} />;
                default:       return <EmptyCell  key={i} cell={cell} />;
              }
            })}
          </div>

          {/* ── Footer ─────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              padding: "clamp(16px, 4vw, 28px) clamp(14px, 4vw, 24px)",
              borderTop: "1px solid rgba(212,168,75,0.12)",
            }}
          >
            <span
              style={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: "clamp(8px, 2vw, 10px)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#334155",
              }}
            >
              © Jm-qafri Methuselah Art Exhibition || @2026 Contest
            </span>
            <span
              style={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: "clamp(8px, 2vw, 10px)",
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