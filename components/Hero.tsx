"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="h-[95vh] md:px-10 bg-gradient-to-l from-gray-100 to-gray-200  text-slate-900 overflow-y-scroll">
      {/**top */}
      <div className=" pt-32 px-2 grid md:grid-cols-3 gap-3">
        <div className="col-span-2 sm:py-0">
          <h1 className="text-align-left sm:text-6xl text-4xl my-3 font-bold tracking-wide">
            The <br />
            JM-Qafri
            <br /> Network
          </h1>
          <p className="my-5 text-xl font-extralight">
            We are a support system for you and your business, always.
          </p>
          <Link href="/About">
            <Button variant="outline" className="p-2 flex">
              <p className="text-slate-100 text-sm">Discover More</p>
              <ArrowRight className="h-4 w-4 ml-2 text-slate-100" />
            </Button>
          </Link>
        </div>
        <div className="hidden sm:block w-full bg-hero-third bg-center bg-cover rounded-10px p-20 hover:scale-105 transition"></div>
      </div>

      {/**bottom */}
      <div className="py-5 mx-2 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className=" hidden pb-16">
            <Link href="/contact">
              <h2 className="text-sky-850 underline hover:underline-offset-4 flex">
                Request Demo
                <ArrowRight className="h-3 w-3 ml-2 text-slate-900 mt-2" />
              </h2>
            </Link>
          </div>
          <div className="mt-5 sm:pb-44">
            <h2 className="text-sm text-slate-900 font-bold mb-5">
              TRUSTED PARTNERS:
            </h2>
            <div className="flex space-x-5 font-extralight">
              <p>NWCW</p>
            </div>
          </div>
        </div>

        <div className="sm:hidden bg-hero-third bg-center bg-cover rounded-none p-20 hover:scale-105 transition"></div>
        <div></div>
        <div className="bg-hero-second bg-center bg-cover rounded-none p-20 hover:scale-105 transition"></div>
      </div>
    </div>
  );
}
