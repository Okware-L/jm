"use client";

import React from "react";
import { motion } from "framer-motion";
import Blog from "../../components/Blog";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 pt-28 text-slate-900">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden"
        >
          <div className="border-b border-slate-300/50">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-gradient-to-r from-slate-900 to-slate-700 py-32 text-center text-6xl font-extralight text-slate-50 md:text-8xl"
            >
              About Us
            </motion.h1>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mx-auto max-w-4xl space-y-16"
          >
            <div className="border-b border-slate-300/50 pb-12">
              <p className="text-lg font-light leading-relaxed text-slate-700">
                The Jmqafri Network is a dynamic and influential community of
                business leaders, dedicated to fostering collaboration, growth,
                and innovation. Our network brings together forward-thinking
                entrepreneurs, executives, and industry experts from various
                sectors and backgrounds, creating a powerful ecosystem that drives
                meaningful change in the business world.
              </p>
            </div>

            <div className="space-y-12">
              <div className="border-b border-slate-300/50 pb-8">
                <h2 className="mb-6 text-4xl font-extralight text-slate-900">Our Vision</h2>
                <p className="text-lg font-light leading-relaxed text-slate-700">
                  Our vision at the JMQafri Network is to be the premier
                  platform for business leaders, renowned for fostering a
                  dynamic community that fuels collaboration, growth, and
                  continuous learning. We aspire to create an ecosystem where
                  innovative minds converge, exchange ideas, and synergistically
                  build towards shared success.
                </p>
              </div>

              <div className="border-b border-slate-300/50 pb-8">
                <h2 className="mb-6 text-4xl font-extralight text-slate-900">Our Mission</h2>
                <p className="text-lg font-light leading-relaxed text-slate-700">
                  To foster a vibrant community of business leaders, united by a
                  shared vision of collaboration, growth, and knowledge sharing.
                  We aim to bring together forward-thinking individuals who are
                  passionate about building and innovating, creating an
                  environment where they can connect, collaborate, and learn
                  from one another.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="bg-gradient-to-b from-slate-50 to-white py-16"
        >
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-extralight text-slate-800">
              Insights
            </h2>
            <Blog />
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}