"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CursorProvider() {
  useEffect(() => {
    // ── Custom cursor ──────────────────────────────────
    const cursor = document.getElementById("jm-cursor");
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);

    const addHover = () => document.body.classList.add("cursor-hover");
    const rmHover = () => document.body.classList.remove("cursor-hover");

    const targets = document.querySelectorAll("a, button, input, textarea, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", rmHover);
    });

    // ── Scroll progress ────────────────────────────────
    const prog = document.getElementById("jm-progress");
    if (prog) {
      gsap.to(prog, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", rmHover);
      });
    };
  }, []);

  return (
    <>
      <div id="jm-cursor" aria-hidden="true" />
      <div id="jm-progress" aria-hidden="true" />
    </>
  );
}