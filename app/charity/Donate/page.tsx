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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Bitcoin } from "lucide-react";

const DonatePage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    // Implement donation logic based on the selected payment method
    console.log(`Donating ${amount} via ${paymentMethod}`);
    // Here you would integrate with the respective payment APIs
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Support Our Cause
          </CardTitle>
          <CardDescription className="text-center">
            Choose your preferred payment method and amount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <RadioGroup
                defaultValue="stripe"
                onValueChange={(value) => setPaymentMethod(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label
                    htmlFor="stripe"
                    className="flex cursor-pointer items-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Credit Card (Stripe)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label
                    htmlFor="paypal"
                    className="flex cursor-pointer items-center space-x-2"
                  >
                    <span>PayPal</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label
                    htmlFor="crypto"
                    className="flex cursor-pointer items-center space-x-2"
                  >
                    <Bitcoin className="h-5 w-5" />
                    <span>Cryptocurrency</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount</Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleDonate}>
            Donate Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonatePage;
