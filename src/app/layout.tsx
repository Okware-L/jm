import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
//import {Toaster} from "@components"
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import { cormorant, dmSans } from "@/lib/Fonts";
import { CursorProvider } from "@/components/CursorProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JM-Qafri",
  description: "JM-Qafri Methuselah is a forward-thinking global wealth manager committed to safeguarding your assets through innovative solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
     className={`${cormorant.variable} ${dmSans.variable}`}
     >
      <body className={inter.className}>
        <link rel="icon" href="/jmwhite.svg" sizes="any" />
        <ThirdwebProvider>
          <Navbar/>
          <CursorProvider />
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
