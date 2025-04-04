"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";
import Contact from "@/components/contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-5 py-20"
      >
        <div className="container mx-auto max-w-6xl pt-32">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="mb-12 text-center text-6xl font-extralight text-indigo-800"
          >
            Get in Touch
          </motion.h1>

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            <ContactCard
              icon={<FiMail className="text-indigo-600" />}
              title="Email Us"
              content="support@jmqafri.com"
            />
            <ContactCard
              icon={<FiPhone className="text-indigo-600" />}
              title="Call Us"
              content="0746218717"
            />
            <ContactCard
              icon={<FiClock className="text-indigo-600" />}
              title="Business Hours"
              content="Mon-Fri: 9AM-5PM"
            />
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-white p-8 shadow-lg"
          >
            <h2 className="mb-6 text-2xl font-semibold text-gray-700">
              Send Us a Message
            </h2>
            <Contact />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <button
              onClick={() => setShowFAQ(!showFAQ)}
              className="flex w-full items-center justify-between rounded-lg bg-indigo-600 p-4 text-white transition-colors hover:bg-indigo-700"
            >
              <span className="text-xl font-semibold">
                Frequently Asked Questions
              </span>
              <FiChevronDown
                className={`text-2xl transition-transform ${showFAQ ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showFAQ && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-lg bg-white p-6 shadow-lg">
                    <FAQItem
                      question="What services do you offer?"
                      answer="We offer a wide range of services including..."
                    />
                    <FAQItem
                      question="How can I schedule an appointment?"
                      answer="You can schedule an appointment by..."
                    />
                    <FAQItem
                      question="What are your payment options?"
                      answer="We accept various payment methods including..."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

const ContactCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: string;
}> = ({ icon, title, content }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="rounded-lg bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl"
  >
    <div className="mb-4 flex justify-center text-4xl">{icon}</div>
    <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </motion.div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-gray-700">{question}</span>
        <FiChevronDown
          className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
