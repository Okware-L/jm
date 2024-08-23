"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Latest Updates</h2>
            <UpdateLink
              href="/architecture"
              title="JM-QAFRI Network Architecture Contest"
              date="01.02.2024"
            />
            <UpdateLink
              href="/Invest/Agriculture"
              title="Invest in Farmers' Project"
              date="07.12.2023"
            />
            <UpdateLink
              href="https://learn.jmqafri.org"
              title="Education Program"
              date="27.11.2023"
            />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Quick Links</h2>
            <QuickLink href="/About" text="About Us" />
            <QuickLink href="/contact" text="Contact" />
            <QuickLink href="/legal" text="Legal" />
            <QuickLink href="/FAQ" text="F.A.Q" />
            <QuickLink
              href="/petition"
              text="Sign Our Petition"
              isHighlighted
            />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Connect With Us</h2>
            <div className="flex space-x-4">
              <SocialIcon Icon={FacebookIcon} href="#" label="Facebook" />
              <SocialIcon Icon={InstagramIcon} href="#" label="Instagram" />
              <SocialIcon Icon={LinkedinIcon} href="#" label="LinkedIn" />
              <SocialIcon Icon={YoutubeIcon} href="#" label="YouTube" />
              <SocialIcon Icon={MessageCircleIcon} href="#" label="Message" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="mb-4 text-sm">
            Users may consult their legal/tax advisors should they require any
            clarifications on the interpretation of the Terms of use.
          </p>
          <p className="text-sm">©2024 JM-Qafri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const UpdateLink = ({ href, title, date }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="mb-4 border-b border-gray-300 pb-2"
  >
    <Link href={href} className="block hover:text-indigo-600">
      <h3 className="text-base font-medium">{title}</h3>
      <time className="text-sm text-gray-600" dateTime={date}>
        {date}
      </time>
    </Link>
  </motion.div>
);

const QuickLink = ({ href, text, isHighlighted = false }) => (
  <motion.div whileHover={{ x: 5 }} className="mb-2">
    <Link
      href={href}
      className={`text-sm hover:text-indigo-600 ${
        isHighlighted ? "font-bold text-indigo-600" : ""
      }`}
    >
      {text}
    </Link>
  </motion.div>
);

const SocialIcon = ({ Icon, href, label }) => (
  <motion.a
    href={href}
    whileHover={{ y: -3 }}
    className="text-gray-600 hover:text-indigo-600"
    aria-label={label}
  >
    <Icon className="h-6 w-6" />
  </motion.a>
);

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
