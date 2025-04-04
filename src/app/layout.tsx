import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
//import {Toaster} from "@components"
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JM-Qafri",
  description: "The JM-Qafri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/jmwhite.svg" sizes="any" />
        <ThirdwebProvider>
          <Navbar />
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
