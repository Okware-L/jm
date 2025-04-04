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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy } from "lucide-react";

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
  const [paymentMethod, setPaymentMethod] = useState("fiat");

  // Replace with your actual Paystack public key and Ethereum address
  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
  const ETH_ADDRESS = "0xb00d34824C7B43c4Ca570D9dab3B69De96e8ceE8"; // Replace with your actual Ethereum address

  // Set the currency based on your Paystack account settings
  const CURRENCY = "KES"; // Change this to match your account currency (e.g., "USD", "GHS", etc.)

  const handleProceed = () => {
    if (amount && email && phone && name) {
      if (paymentMethod === "fiat") {
        setShowCheckout(true);
      } else {
        // For crypto payments, you might want to implement a different flow
        alert(`Please send ${amount} worth of ETH to ${ETH_ADDRESS}`);
      }
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
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
              <RadioGroup
                defaultValue="fiat"
                onValueChange={(value) => setPaymentMethod(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fiat" id="fiat" />
                  <Label htmlFor="fiat">Pay with {CURRENCY}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto">Pay with ETH</Label>
                </div>
              </RadioGroup>
              {paymentMethod === "crypto" && (
                <div className="mt-4">
                  <Label>ETH Address</Label>
                  <div className="mt-2 flex items-center">
                    <Input type="text" value={ETH_ADDRESS} readOnly />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={() => copyToClipboard(ETH_ADDRESS)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
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
