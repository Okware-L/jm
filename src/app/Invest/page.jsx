"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { investmentData } from "../../../investments";
import Footer from "../../components/Footer";
import Insight from "@/components/investInsight";
import { motion } from "framer-motion";

export default function Component() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pb-10 pt-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-5xl font-light text-indigo-900">
            INVESTING
          </h1>
          <p className="text-lg font-light text-gray-700">
            Secure our insights, advice, and solutions to help you invest
            successfully.
          </p>
        </motion.div>
        <div className="grid justify-center space-y-3 sm:flex sm:space-x-8">
          {[
            {
              title: "Enhanced Advisory Services",
              description:
                "Access JM-Qafri's extensive knowledge and capabilities to optimize your investment strategies with our advisory mandates.",
              link: "#",
            },
            {
              title: "Expert-Managed Investments",
              description:
                "Let our committed specialists take charge of your investments, ensuring tailored solutions and expert oversight.",
              link: "#",
            },
            {
              title: "Other Solutions",
              description:
                "Explore our comprehensive range of additional solutions and products.",
              link: "#",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="w-80 rounded-lg bg-white p-6 shadow-lg"
            >
              <h2 className="mb-2 text-xl font-normal text-indigo-900">
                {item.title}
              </h2>
              <p className="mb-4 font-light text-gray-600">
                {item.description}
              </p>
              <Link
                className="text-indigo-600 hover:underline"
                href={item.link}
              >
                Discover more →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-inherit p-10 text-base font-light text-gray-800 sm:px-40 sm:py-10"
      >
        At JM-Qafri, we&apos;ve been cultivating our investment expertise and
        offerings for generations. Throughout our history, we&apos;ve recognized
        that each individual&apos;s investment requirements are distinct and
        personalized. That&apos;s why our first priority is gaining a
        comprehensive understanding of your circumstances, aspirations, and risk
        tolerance. With a clear grasp of your needs and objectives, we can then
        assist you in pinpointing and executing the ideal solution. Whether it
        involves a discretionary or advisory mandate, investing in a particular
        asset class, crafting a customized structured product, or providing
        execution support, you&apos;ll leverage our extensive investment
        experience and global network to your advantage.
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl font-light text-indigo-900"
      >
        Investment Opportunities
      </motion.h1>
      <div className="overflow-x-auto">
        <div className="mx-10 flex space-x-3 space-y-3 py-10 md:flex-nowrap md:justify-start md:space-y-0">
          {investmentData.map((investmentData, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="min-w-[300px] md:w-1/4"
            >
              <Card className="rounded-lg bg-white shadow-lg">
                <CardHeader>
                  <div className="space-y-1">
                    <CardTitle className="text-indigo-900">
                      {investmentData.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {investmentData.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium tracking-wide text-gray-800">
                        Current Value
                      </h3>
                      <p className="text-sm font-medium tracking-wide text-gray-600">
                        {investmentData.value}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium tracking-wide text-gray-800">
                        Return Rate
                      </h3>
                      <p className="text-sm font-medium tracking-wide text-gray-600">
                        {investmentData.roi} (YTD)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium tracking-wide text-gray-800">
                        Investment Period
                      </h3>
                      <p className="text-sm font-medium tracking-wide text-gray-600">
                        {investmentData.period}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-center">
                  <Button size="sm" className="btn btn-wide">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="p-5">
        <Insight />
      </div>
      <Footer />
    </div>
  );
}
