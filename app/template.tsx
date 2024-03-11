"use client"

import {
  ThirdwebProvider,
  embeddedWallet,
} from "@thirdweb-dev/react";


export default function Template({ children }: { children: React.ReactNode }) {
  return(
<>
    <ThirdwebProvider
      activeChain="goerli"
      clientId="dd2c97d0c572e2b8a570ec077c6b75c7"
      supportedWallets={[embeddedWallet()]}
>
    {children}
    </ThirdwebProvider>
</>
  ) 
}