"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTitle, CardDescription, CardHeader, Card } from "./ui/card";
import Image from "next/image";

interface CategoryItem {
  title: string;
  description: string;
  image: string;
}

const categoryData: CategoryItem[] = [
  {
    title: "Wealth Planning",
    description:
      "Our wealth planning services are designed to help you navigate every stage of your life.",
    image: "./2.svg",
  },
  {
    title: "Investing",
    description:
      "We offer a range of investment services and products to meet all of your investment needs.",
    image: "./3.svg",
  },
  {
    title: "Financing",
    description:
      "We offer customised solutions to meet your individual/startup financing and trading needs.",
    image: "./4.svg",
  },
  {
    title: "Additional Services",
    description:
      "Our additional services have been designed to round out our wealth management offering.",
    image: "./1.svg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const Categories: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-2xl font-light uppercase tracking-widest text-gray-800"
        >
          What We Offer
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categoryData.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <CardHeader className="flex h-full flex-col items-center justify-between space-y-4 text-center">
                  <div className="flex items-center justify-center py-6">
                    <Image
                      src={category.image}
                      alt={category.title}
                      height={40}
                      width={120}
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
