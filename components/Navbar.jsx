"use client"

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ConnectButton, embeddedWalletConfig, walletConnectConfig , coinbaseConfig, metamaskConfig } from '../app/thirdweb';
import { myChain } from '../app/chains'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"






const Navbar = () => { 



  return (
    <div>
<div className="navbar bg-gray-100 text-black border-b border-gray-500 fixed z-10 backdrop-filter backdrop-blur-lg bg-opacity-70">
  <div className="navbar-start">
    <div className="dropdown rounded">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-200 text-black font-light rounded-sm after:w-52 ">
        <li><a href='/About'>About us</a></li>
      
        <li><a href ='/Invest'>Invest</a></li>
      
        <li className='md:hidden'><a href='/careers'>Careers</a></li>
      
        <li><a href='/charity'>Charity</a></li>
      
        <li><a href='/Acquisitions'>Acquisitions</a></li>
      
        <li className='md:hidden'><a href='/membership'>Affiliates</a></li>
      
        <li><a href='https://jmqafri.org'>JM-Qafri Forum</a></li>
      
        <li><a href='/FAQ'>F.A.Q</a></li>
      
        <li className='md:hidden'><a href='/contact'>Contact</a></li>
      

      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a href="/">
    <Image src="/jmlogoblack.svg" alt='img' width="84" height="54" />
    </a>
  </div>
  <div className="navbar-end">
    <div className='dropdown'>
      <div tabIndex={0} role="button" className="">
        <p className='font-normal mx-3 text-sm'>Affiliates</p>
      </div>
       <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-200 text-black font-light rounded-sm after:w-52 ">
        <li><a href='/pharma'>Pharma</a></li>
      
        <li><a href ='/membership'>Membership</a></li>
      
        <li className='md:hidden'><a href='/careers'>Careers</a></li>

      </ul>

    </div>
     <Separator orientation="vertical"/>
    <Link href="/careers" className=' hidden md:block text-sm hover:underline font-normal'>Careers</Link>
    <Separator orientation="vertical"/>
    <Link href="/contact" className=' hidden md:block text-sm hover:underline mx-3 font-normal'>Contact</Link>
    <Separator orientation="vertical"/>

   

    <div>

    </div>

  <Sheet>
  <SheetTrigger>
        <Avatar className='mx-3'>
          <AvatarImage src="/user.png" />
          <AvatarFallback>.</AvatarFallback>
        </Avatar>  
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Welcome to De-fi</SheetTitle>
      <SheetDescription>
       
      </SheetDescription>
    </SheetHeader>
      <ConnectButton 
      chain= {myChain}
              wallets={[
          metamaskConfig({ recommended: true }),

        ]}
      />    
  </SheetContent>
</Sheet>


   
    
</div>
</div>
    </div>
  )
}

export default Navbar