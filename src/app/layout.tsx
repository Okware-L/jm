"use client"



import React from "react";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import { cormorant, dmSans } from "@/lib/Fonts";
import { CursorProvider } from "@/components/CursorProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "JM-Qafri",
//   description: "JM-Qafri Methuselah is a forward-thinking global wealth manager committed to safeguarding your assets through innovative solutions.",
// };



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
    const hideNavRoutes = ["/register", "/signin", "/admin", "/dashboard", "/register/funding", "/register/company", "/register/worker", "/register/client", "/art"];

  const shouldHideNav = hideNavRoutes.includes(pathname);

  return (
    <html lang="en"
     className={`${cormorant.variable} ${dmSans.variable}`}
     >
      <body className={inter.className}>
        <link rel="icon" href="/jmwhite.svg" sizes="any" />
        <ThirdwebProvider>
          {!shouldHideNav && <Navbar />}
          <CursorProvider />
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
