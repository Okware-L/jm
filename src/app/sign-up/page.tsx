"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-md">
        <SignUp
          routing="hash"
          signInUrl="/signin"
          fallbackRedirectUrl="/register"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border border-slate-200 rounded-none w-full",
              headerTitle: "text-slate-900",
              headerSubtitle: "text-slate-500",
              socialButtonsBlockButton: "rounded-none border-slate-200 shadow-none",
              formButtonPrimary: "rounded-none bg-[#2c5aa0] hover:bg-[#1e3f73]",
              footerActionLink: "text-[#2c5aa0]",
            },
          }}
        />
      </div>
    </div>
  );
}
