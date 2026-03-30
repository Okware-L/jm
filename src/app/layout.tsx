import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { cormorant, dmSans } from "@/lib/Fonts";
import AppChrome from "@/components/AppChrome";

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
  return (
    <html lang="en"
     className={`${cormorant.variable} ${dmSans.variable}`}
     >
      <body className={inter.className}>
        <link rel="icon" href="/jmwhite.svg" sizes="any" />
        <ClerkProvider>
          <AppChrome>{children}</AppChrome>
        </ClerkProvider>
      </body>
    </html>
  );
}
