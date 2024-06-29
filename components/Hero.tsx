"use client";
import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-slate-900">
      <div className="container mx-auto px-4 py-16 pt-32 md:py-16 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            className="mb-6 text-5xl font-light leading-tight tracking-tight md:text-8xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            The <span className="text-indigo-800">JM-Qafri</span>
            <br /> Network
          </motion.h1>
          <motion.p
            className="text-normal mb-8 max-w-2xl font-light text-gray-600"
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
          >
            <Link href="/contact">
              <Button
                variant="outline"
                className="group flex items-center space-x-2 bg-sky-600 text-white hover:bg-sky-700"
              >
                <span>Discover More</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="flex justify-between space-y-8 md:flex-row md:space-y-0">
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-600">
              Trusted Partners:
            </h2>
            <div className="flex space-x-6 text-lg font-light">
              <span className="text-sky-600">NWCV</span>
              {/* Add more partners here */}
            </div>
          </div>
          <div className="">
            <Link href="/contact">
              <span className="flex items-center text-sky-600 hover:text-sky-700">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-sky-600" />
      </motion.div>
    </div>
  );
}
