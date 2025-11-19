"use client";

import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 pt-32 md:py-24 md:pt-48 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.h1
              className="mb-4 text-4xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              The <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">JM-Qafri</span>
              <br /> Network
            </motion.h1>
          </motion.div>

          <div className="border-t border-slate-700/50 pt-8">
            <motion.p
              className="mb-12 max-w-2xl text-lg font-light text-slate-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We are a dynamic support system, empowering you and your business to
              reach new heights. Our network provides the resources and
              connections you need to succeed in today&apos;s competitive
              landscape.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link href="/contact" passHref>
                <Button
                  variant="outline"
                  className="group inline-flex items-center space-x-2 border-slate-400 bg-slate-800/30 text-slate-200 backdrop-blur-sm hover:bg-slate-700/50 hover:text-slate-100"
                >
                  <span>Discover More</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <div className="text-sm text-slate-400">
                Scroll to find out
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="container mx-auto px-4 py-12 md:py-16 relative z-10"
      >
        <div className="max-w-4xl border-t border-slate-700/50 pt-8">
          <div className="flex flex-col justify-between space-y-8 md:flex-row md:items-center md:space-y-0">
            <div>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Trusted Partners:
              </h2>
              <div className="flex flex-wrap gap-4 text-lg font-light md:gap-6">
                <span className="text-slate-300">NWCV</span>
              </div>
            </div>
            <div className="md:text-right">
              <Link href="/contact" passHref>
                <Button
                  variant="link"
                  className="group inline-flex items-center text-slate-300 hover:text-slate-100"
                >
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
      >
        <ChevronDown className="h-8 w-8 text-slate-400" />
      </motion.div>
    </div>
  );
}