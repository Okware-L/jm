import React from "react";
import { PaystackButton } from "react-paystack";

// Define the props interface for the component
interface PaystackCheckoutProps {
  publicKey: string;
  amount: number;
  email: string;
  name: string;
  phone: string;
  currency: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

const PaystackCheckout: React.FC<PaystackCheckoutProps> = ({
  publicKey,
  amount,
  email,
  name,
  phone,
  currency,
  onSuccess,
  onClose,
}) => {
  // Prepare custom fields for Paystack metadata
  const customFields = [
    { display_name: "Name", variable_name: "name", value: name },
    { display_name: "Phone", variable_name: "phone", value: phone },
  ];

  // Paystack component props
  const componentProps = {
    email,
    amount: amount * 100, // Convert to smallest currency unit
    metadata: {
      custom_fields: customFields,
    },
    publicKey,
    text: "Donate Now",
    onSuccess: (reference: { reference: string }) =>
      onSuccess(reference.reference),
    onClose: onClose,
    currency: currency, // Add currency to the component props
  };

  return (
    <div className="w-full">
      <PaystackButton
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        {...componentProps}
      />
    </div>
  );
};

export default PaystackCheckout;
