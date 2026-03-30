"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import { CursorProvider } from "@/components/CursorProvider";
import { Toaster } from "@/components/ui/sonner";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavPrefixes = [
    "/register",
    "/signin",
    "/sign-up",
    "/admin",
    "/dashboard",
    "/company",
    "/worker",
    "/client",
    "/funding",
    "/art",
  ];

  const shouldHideNav = hideNavPrefixes.some((route) => pathname.startsWith(route));

  return (
    <ThirdwebProvider>
      {!shouldHideNav && <Navbar />}
      <CursorProvider />
      {children}
      <Toaster />
    </ThirdwebProvider>
  );
}
