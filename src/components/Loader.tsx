"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef  = useRef<HTMLSpanElement>(null);
  const w1Ref     = useRef<HTMLSpanElement>(null);
  const w2Ref     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    // ── Count-up ──────────────────────────────────────────────
    let n = 0;
    const interval = setInterval(() => {
      n = Math.min(n + Math.floor(Math.random() * 15) + 5, 100);
      if (countRef.current) countRef.current.textContent = String(n).padStart(3, "0");
      if (n >= 100) clearInterval(interval);
    }, 55);

    // ── Timeline ──────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(w1Ref.current,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.85, ease: "power4.out" }
    )
    .fromTo(w2Ref.current,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.85, ease: "power4.out" },
      "-=0.65"
    )
    // Fire onComplete BEFORE the slide-out so hero GSAP has time to set its from-state
    .call(() => {
      onComplete?.();
    })
    // Then slide loader off
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1.05,
      ease: "power4.inOut",
      delay: 0.3,
      onComplete: () => {
        // Just kill pointer events — don't display:none (avoids layout flash)
        if (loaderRef.current) {
          loaderRef.current.style.pointerEvents = "none";
          loaderRef.current.style.visibility = "hidden";
        }
      },
    });

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally no deps — runs once on mount

  return (
    <div
      ref={loaderRef}
      id="jm-loader"
      className="fixed inset-0 z-[9000] bg-[var(--black)] flex flex-col justify-end
                 px-6 pb-[calc(clamp(24px,5vw,72px)+2vw)] md:px-[clamp(24px,5vw,72px)]"
      aria-hidden="true"
    >
      {/* Counter */}
      <span
        ref={countRef}
        className="absolute top-6 right-6 md:top-[clamp(24px,5vw,72px)] md:right-[clamp(24px,5vw,72px)]
                   font-sans text-[11px] font-extralight tracking-[0.25em]"
        style={{ color: "rgba(250,250,248,0.28)" }}
      >
        000
      </span>

      {/* Title */}
      <div
        className="font-serif font-light leading-[0.88] tracking-[-0.05em]"
        style={{ fontSize: "clamp(4rem,13vw,13rem)", color: "var(--white)" }}
      >
        <div className="overflow-hidden">
          <span ref={w1Ref} className="block" style={{ transform: "translateY(110%)" }}>
            Your Wealth.
          </span>
        </div>
        <div className="overflow-hidden">
          <span ref={w2Ref} className="block italic" style={{ transform: "translateY(110%)" }}>
            Reimagined.
          </span>
        </div>
      </div>
    </div>
  );
}