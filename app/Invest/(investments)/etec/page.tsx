"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AgreementUpdate = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-32">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-3xl font-light text-indigo-900"
        >
          Agreement with International Agency for the Euroasian Trade and
          Economic Cooperation
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden rounded-lg bg-white shadow-lg">
            <CardHeader className="border-b border-indigo-100 bg-indigo-50">
              <CardTitle className="text-xl text-indigo-900">update</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our company has entered into an agreement with the
                  International Agency for the Euroasian Trade and Economic
                  Cooperation during the Caucus Investment Forum held in Grozny,
                  Russia on July 15-17, 2024.
                </p>

                <div className="rounded-lg bg-indigo-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-indigo-900">
                    About the Agency
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Established in 2017 in Vladikavkaz, North Ossetia</li>
                    <li>
                      Conducts foreign trade activities in agriculture,
                      industry, and trade
                    </li>
                    <li>Works with over 100 Russian companies</li>
                    <li>
                      Supplies agricultural products to Iran and Caucasus
                      countries
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-indigo-900">
                    Cooperation Benefits
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Partner search for Kenyan entrepreneurs</li>
                    <li>Transaction accompaniment</li>
                    <li>Legal assistance in contract signing</li>
                    <li>
                      Expanded presence of African businesses in southern Russia
                    </li>
                    <li>Distribution of Russian goods in Africa</li>
                  </ul>
                </div>

                <blockquote className="border-l-4 border-indigo-300 pl-4 italic text-gray-600">
                  &#34;This cooperation will give our members and non-members
                  access to the equipment they need for agriculture. We trust
                  that our cooperation will result in an improvement in the
                  agricultural sector and result in an increase in our
                  members&apos; capacity and overall economic growth fueled by
                  investment in the agriculture sector.&#34;
                </blockquote>

                <p className="text-gray-700">
                  This cooperation will also improve the terms of trade for
                  goods and agricultural products produced in Africa and other
                  members&apos; regions. We look forward to cooperating with
                  both companies and encourage our members to take advantage of
                  this new opportunity.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AgreementUpdate;
