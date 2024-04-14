import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThirdwebProvider } from "@/app/thirdweb";
import { client } from "@/app/client";
import {
  ConnectButton,
  metamaskConfig,
  walletConnectConfig,
  coinbaseConfig,
  embeddedWalletConfig,
} from "../app/thirdweb";
import { myChain } from "./chains";

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
        <ThirdwebProvider
          chain={myChain}
          client={client}
          wallets={[
            metamaskConfig({ recommended: true }),
            coinbaseConfig(),
            walletConnectConfig(),
            embeddedWalletConfig(),
          ]}
        >
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
