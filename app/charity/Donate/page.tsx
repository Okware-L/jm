"use client";

import React, { useState } from "react";
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
import InstaSendCheckout from "@/components/InstaSendCheckout";

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

  const handleSuccess = (results: any) => {
    console.log("Checkout successful:", results);
    // Handle successful checkout (e.g., show a success message, update database)
  };

  const handleFailure = (error: any) => {
    console.error("Checkout failed:", error);
    alert(`Checkout failed: ${error.message || "An error occurred"}`);
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
            <InstaSendCheckout
              amount={parseFloat(amount)}
              email={email}
              phone={phone}
              onSuccess={handleSuccess}
              onFailure={handleFailure}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonatePage;
