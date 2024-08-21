"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PesapalCheckout from "@/components/PesapalCheckout";

const DonatePage: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleProceed = () => {
    if (amount && email && phone) {
      setShowCheckout(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleSuccess = (orderTrackingId: string) => {
    // Handle successful checkout (e.g., show a success message, update database)
    console.log("Checkout successful, Order Tracking ID:", orderTrackingId);
  };

  const handleError = (error: string) => {
    // Handle checkout error (e.g., show error message)
    console.error("Checkout error:", error);
    alert(`Checkout failed: ${error}`);
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
                <Label htmlFor="amount">Donation Amount</Label>
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
            <PesapalCheckout
              amount={parseFloat(amount)}
              description="Charity Donation"
              customerEmail={email}
              customerPhone={phone}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonatePage;
