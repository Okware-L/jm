// In your About page, ensure you're using the same Navbar component
// The scroll detection is already built into the Navbar component

// If you need to customize the scroll threshold for About page,
// modify the Navbar component to accept props:

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConnectButton } from "thirdweb/react";
import { client } from "../app/client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { usePathname } from 'next/navigation';

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "discord", "telegram", "email", "passkey"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Pages where nav should start opaque
  const opaquePages = ['/Architecture', '/About', '/Airdrop', '/Invest', '/user' , '/pharma', '/contact' ,'/petition',
    '/careers' , '/charity', '/blog', '/FAQ', '/patnership', '/Acquisitions', '/Admin'
  ]; // Add your routes
  
  useEffect(() => {
    if (opaquePages.includes(pathname)) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? "border-slate-700/50 bg-slate-900/95 backdrop-blur-lg backdrop-filter text-slate-100" 
          : "border-transparent bg-transparent text-slate-100"
      }`}
    >
      {/* Rest of Navbar component remains the same */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/jmwhite.svg" alt="Logo" width={84} height={54} />

        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={`bg-transparent hover:bg-slate-800 hover:text-slate-300 data-[state=open]:bg-slate-800 data-[state=open]:text-slate-300 ${
                isScrolled ? "text-slate-100" : "text-slate-100"
              }`}>
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white border border-slate-200">
                  <ListItem href="/About" title="About Us">
                    Learn more about our company and mission.
                  </ListItem>
                  <ListItem href="/careers" title="Careers">
                    Join our team and make a difference.
                  </ListItem>
                  <ListItem href="/FAQ" title="FAQ">
                    Frequently asked questions about our services.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={`bg-transparent hover:bg-slate-800 hover:text-slate-300 data-[state=open]:bg-slate-800 data-[state=open]:text-slate-300 ${
                isScrolled ? "text-slate-100" : "text-slate-100"
              }`}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white border border-slate-200">
                  <ListItem href="/Invest" title="Invest">
                    Explore investment opportunities with us.
                  </ListItem>
                  <ListItem href="/Acquisitions" title="Acquisitions">
                    Learn about our acquisition strategies.
                  </ListItem>
                  <ListItem href="/pharma" title="Pharma">
                    Discover our pharmaceutical ventures.
                  </ListItem>
                  <ListItem href="/partnership" title="Partnership">
                    Partner with us for mutual growth.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuList>
              <NavigationMenuLink
                href="/charity"
                className={`hover:bg-slate-800 hover:text-slate-300 px-3 py-2 rounded-md transition-colors ${
                  isScrolled ? "text-slate-100" : "text-slate-100"
                }`}
              >
                Charity
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <ConnectButton
            client={client}
            theme="dark"
            chain={sepolia}
            wallets={wallets}
            connectModal={{
              size: "compact",
              showThirdwebBranding: false,
            }}
            connectButton={{
              label: "Sign in",
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
                  icon: "https://yourdomain.com/icon.png",
                },
              ],
            }}
          />

          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open Menu" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-slate-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent className="bg-slate-800 border-slate-700 text-slate-100">
              <SheetHeader>
                <SheetTitle className="text-slate-100">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  <MobileNavItem href="/about" label="About Us" />
                  <MobileNavItem href="/careers" label="Careers" />
                  <MobileNavItem href="/charity" label="Charity" />
                  <MobileNavItem href="/faq" label="FAQ" />
                  <MobileNavItem href="/invest" label="Invest" />
                  <MobileNavItem href="/acquisitions" label="Acquisitions" />
                  <MobileNavItem href="/pharma" label="Pharma" />
                  <MobileNavItem href="/partnership" label="Partnership" />
                  <MobileNavItem href="/contact" label="Contact" />
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

const ListItem: React.FC<{ href: string; title: string; children: React.ReactNode }> = ({
  href,
  title,
  children,
}) => (
  <li>
    <Link href={href} className="block p-3 text-sm font-medium text-slate-900 hover:bg-slate-100">
      {title}
      <p className="text-sm text-slate-600">{children}</p>
    </Link>
  </li>
);

const MobileNavItem: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <li>
    <Link href={href} className="block p-2 text-base font-medium text-slate-300 hover:bg-slate-700/50">
      {label}
    </Link>
  </li>
);

export default Navbar;