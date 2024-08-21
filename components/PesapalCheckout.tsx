// components/PesapalCheckout.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
//import { getPesapalToken, submitOrderRequest } from "@/utils/pesapal";

interface PesapalCheckoutProps {
  amount: number;
  description: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (orderTrackingId: string) => void;
  onError: (error: string) => void;
}

const PesapalCheckout: React.FC<PesapalCheckoutProps> = ({
  amount,
  description,
  customerEmail,
  customerPhone,
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Prepare order data
      const orderData = {
        id: `ORDER-${Date.now()}`,
        currency: "USD",
        amount: amount,
        description: description,
        callback_url: `${window.location.origin}/pesapal-callback`,
        notification_id: process.env.NEXT_PUBLIC_PESAPAL_IPN_ID,
        billing_address: {
          email_address: customerEmail,
          phone_number: customerPhone,
          country_code: "KE",
          first_name: "John",
          last_name: "Doe",
        },
      };

      // Submit order request through our new API route
      const response = await axios.post("/api/pesapal/submit-order", orderData);

      // Handle successful response
      if (response.data.redirect_url) {
        onSuccess(response.data.order_tracking_id);
        window.location.href = response.data.redirect_url;
      } else {
        onError("Failed to get redirect URL");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      onError("An error occurred during checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" value={amount} readOnly />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={description} readOnly />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={customerEmail} readOnly />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" value={customerPhone} readOnly />
      </div>
      <Button onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </Button>
    </div>
  );
};

export default PesapalCheckout;
