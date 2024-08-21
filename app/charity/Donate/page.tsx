"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Dynamically import PaystackCheckout with SSR disabled
const PaystackCheckout = dynamic(
  () => import("@/components/PaystackCheckout"),
  { ssr: false },
);

const DonatePage: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // Replace with your actual Paystack public key
  const PAYSTACK_PUBLIC_KEY =
    "pk_test_3002a3e73511984bf02142d82035025df6cda668";

  // Set the currency based on your Paystack account settings
  const CURRENCY = "KES"; // Change this to match your account currency (e.g., "USD", "GHS", etc.)

  const handleProceed = () => {
    if (amount && email && phone && name) {
      setShowCheckout(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleSuccess = (reference: string) => {
    console.log("Checkout successful. Reference:", reference);
    alert("Thank you for your donation!");
    setShowCheckout(false);
    // Reset form fields
    setAmount("");
    setEmail("");
    setPhone("");
    setName("");
  };

  const handleClose = () => {
    console.log("Checkout closed");
    setShowCheckout(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Support Our Cause
          </CardTitle>
          <CardDescription className="text-center">
            Enter your donation details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showCheckout ? (
            <form className="space-y-4">
              <div>
                <Label htmlFor="amount">Donation Amount ({CURRENCY})</Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleProceed}>
                Proceed to Donate
              </Button>
            </form>
          ) : (
            <PaystackCheckout
              publicKey={PAYSTACK_PUBLIC_KEY}
              amount={parseFloat(amount)}
              email={email}
              name={name}
              phone={phone}
              currency={CURRENCY}
              onSuccess={handleSuccess}
              onClose={handleClose}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonatePage;
