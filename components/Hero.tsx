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
        <div className="col-span-2">
          <h1 className="text-align-left text-5xl my-3 tracking-wide">
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
        <div className="bg-hero-first bg-center bg-cover rounded-2xl hidden md:block">
          <div className="hero-overlay bg-opacity-30  rounded-2xl ">
            <h2 className="text-slate-100 text-center font-extralight text-xl pt-3 tracking-widest">
              Smart Investing.
            </h2>
          </div>
        </div>

        <div className="space-y-5 w-96">
          <div className="bg-hero-first bg-center bg-cover rounded-2xl md:hidden">
            <div className="hero-overlay bg-opacity-30  rounded-2xl ">
              <h2 className="text-slate-100 text-center font-extralight text:sm md:text-xl pt-3 tracking-widest p-10">
                Smart Investing.
              </h2>
            </div>
          </div>
          <div className="bg-hero-second bg-center bg-cover rounded-2xl md:hidden ">
            <div className="hero-overlay bg-opacity-50  rounded-2xl">
              <h2 className="text-slate-100 text-center font-extralight text:sm md:text-xl pt-3 tracking-widest p-10">
                Start navigating your finance
              </h2>
            </div>
          </div>
          <div className="bg-hero-third bg-center bg-cover rounded-2xl md:hidden">
            <div className="hero-overlay bg-opacity-20  rounded-2xl">
              <h2 className="text-slate-100 text-center font-extralight text:sm md:text-xl pt-3 tracking-widest p-10">
                Securing Futures
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/**bottom */}
      <div className="py-5 mx-2 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="flex py-16">
            <Link href="/contact">
              <h2 className="text-sky-850 underline hover:underline-offset-4 flex">
                Request Demo
                <ArrowRight className="h-3 w-3 ml-2 text-slate-900 mt-2" />
              </h2>
            </Link>
          </div>
          <div>
            <h2 className="text-sm text-slate-900 font-bold mb-5">
              TRUSTED PARTNERS:
            </h2>
            <div className="flex space-x-5 font-extralight mb-10">
              <p>NWCW</p>
            </div>
          </div>
        </div>

        <div className="bg-hero-second bg-center bg-cover rounded-2xl hidden md:block">
          <div className="hero-overlay bg-opacity-50  rounded-2xl">
            <h2 className="text-slate-100 text-center font-extralight text-xl pt-3 tracking-widest">
              Start navigating your finance
            </h2>
          </div>
        </div>
        <div className="bg-hero-third bg-center bg-cover rounded-2xl hidden md:block">
          <div className="hero-overlay bg-opacity-20  rounded-2xl">
            <h2 className="text-slate-100 text-center font-extralight text-xl pt-3 tracking-widest">
              Securing Futures
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}