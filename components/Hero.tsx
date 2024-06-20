"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="h-[95vh] overflow-y-scroll bg-gradient-to-l from-gray-100 to-gray-200 text-slate-900 md:px-10">
      {/**top */}
      <div className="grid gap-3 px-2 pt-32 md:grid-cols-3">
        <div className="col-span-2 sm:py-0">
          <h1 className="text-align-left my-3 text-4xl font-bold tracking-wide sm:text-6xl">
            The <br />
            JM-Qafri
            <br /> Network
          </h1>
          <p className="my-5 text-xl font-extralight">
            We are a support system for you and your business, always.
          </p>
          <Link href="/About">
            <Button variant="outline" className="flex p-2">
              <p className="text-sm text-slate-100">Discover More</p>
              <ArrowRight className="ml-2 h-4 w-4 text-slate-100" />
            </Button>
          </Link>
        </div>
        <div className="rounded-10px hidden w-full bg-hero-third bg-cover bg-center p-20 transition hover:scale-105 sm:block"></div>
      </div>

      {/**bottom */}
      <div className="mx-2 grid grid-cols-1 gap-3 py-5 md:grid-cols-3">
        <div>
          <div className="hidden pb-16">
            <Link href="/contact">
              <h2 className="text-sky-850 flex underline hover:underline-offset-4">
                Request Demo
                <ArrowRight className="ml-2 mt-2 h-3 w-3 text-slate-900" />
              </h2>
            </Link>
          </div>
          <div className="mt-5 sm:pb-44">
            <h2 className="mb-5 text-sm font-bold text-slate-900">
              TRUSTED PARTNERS:
            </h2>
            <div className="flex space-x-5 font-extralight">
              <p>NWCV</p>
            </div>
          </div>
        </div>

        <div className="rounded-none bg-hero-third bg-cover bg-center p-20 transition hover:scale-105 sm:hidden"></div>
        <div></div>
        <div className="rounded-none bg-hero-second bg-cover bg-center p-20 transition hover:scale-105"></div>
      </div>
    </div>
  );
}
