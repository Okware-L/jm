"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import gsap from "gsap";

/* ── Wallets ──────────────────────────────── */
const wallets = [
  inAppWallet({
    auth: { options: ["google", "discord", "telegram", "email", "passkey"] },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

/* ── Opaque-from-load pages ───────────────── */
const OPAQUE_PAGES = [
  "/Architecture", "/About", "/Airdrop", "/Invest", "/user",
  "/pharma", "/contact", "/petition", "/careers", "/charity",
  "/blog", "/FAQ", "/patnership", "/Acquisitions", "/Admin",
];

/* ── Nav link data ────────────────────────── */
const NAV_LINKS = [
  { href: "/About",    label: "About" },
  { href: "/Invest",   label: "Services" },
  { href: "/charity",  label: "Charity" },
  { href: "/contact",  label: "Contact" },
];

const MOBILE_LINKS = [
  { href: "/About",        label: "About" },
  { href: "/Invest",       label: "Invest" },
  { href: "/Acquisitions", label: "Acquisitions" },
  { href: "/pharma",       label: "Pharma" },
  { href: "/charity",      label: "Charity" },
  { href: "/FAQ",          label: "FAQ" },
  { href: "/contact",      label: "Contact" },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* Scroll detection */
  useEffect(() => {
    if (OPAQUE_PAGES.includes(pathname)) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* GSAP entrance — runs once after mount */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 2.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={[
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between",
        "px-6 md:px-[clamp(24px,5vw,72px)] py-5 md:py-6",
        "transition-all duration-500",
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--white)]/95 backdrop-blur-md"
          : "border-b border-accent bg-transparent",
      ].join(" ")}
      style={{ opacity: 0 }} // GSAP will reveal
    >

      {/* Logo */}
      <Link
        href="/"
        className="font-sans text-[15px] font-normal tracking-[0.22em] uppercase text-[var(--black)] leading-none"
      >
        JM-Qafri
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={[
                "relative text-[11px] font-light tracking-[0.16em] uppercase transition-colors duration-200",
                pathname.startsWith(href)
                  ? "text-[var(--black)]"
                  : "text-[var(--grey)] hover:text-[var(--black)]",
                "after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px",
                "after:bg-[var(--black)] after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
              ].join(" ")}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* ConnectButton — thirdweb */}
        <div className="hidden sm:block">
          <ConnectButton
            client={client}
            theme="light"
            chain={sepolia}
            wallets={wallets}
            connectModal={{ size: "compact", showThirdwebBranding: false }}
            connectButton={{
              label: "Sign In",
              className:
                "!text-[11px] !font-light !tracking-[0.18em] !uppercase !px-5 !py-2.5 !border !border-[var(--black)] !bg-transparent !text-[var(--black)] !rounded-none hover:!bg-[var(--black)] hover:!text-[var(--white)] !transition-all !duration-300",
            }}
            detailsButton={{
              displayBalanceToken: {
                [sepolia.id]: "0x973C22B3b109E94Fdf90F65E98cdABc5D7E1aCAd",
              },
            }}
            supportedTokens={{
              [sepolia.id]: [
                {
                  address: "0x973C22B3b109E94Fdf90F65E98cdABc5D7E1aCAd",
                  name: "JM-Qafri Token",
                  symbol: "JMQ",
                  icon: "",
                },
              ],
            }}
          />
        </div>

        {/* Mobile menu — shadcn Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              aria-label="Open menu"
            >
              <span
                className={[
                  "block w-[20px] h-px bg-[var(--black)] transition-all duration-300",
                  sheetOpen ? "rotate-45 translate-y-[6px]" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-[20px] h-px bg-[var(--black)] transition-all duration-300",
                  sheetOpen ? "-rotate-45 -translate-y-[1.5px]" : "",
                ].join(" ")}
              />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full max-w-sm bg-[var(--white)] border-l border-[var(--line)] p-0 flex flex-col justify-end"
          >
            <nav className="px-8 pb-16 pt-24 flex flex-col">
              {MOBILE_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSheetOpen(false)}
                  className={[
                    "block font-serif text-[clamp(2.2rem,8vw,4.5rem)] font-light",
                    "tracking-[-0.025em] leading-[1.05]",
                    "border-t border-[var(--line)] py-3",
                    "text-[var(--black)] hover:text-[var(--grey)] transition-colors duration-200",
                    "last:border-b",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
              {/* ConnectButton mobile */}
              <div className="mt-8">
                <ConnectButton
                  client={client}
                  theme="light"
                  chain={sepolia}
                  wallets={wallets}
                  connectModal={{ size: "compact", showThirdwebBranding: false }}
                  connectButton={{ label: "Sign In" }}
                />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}