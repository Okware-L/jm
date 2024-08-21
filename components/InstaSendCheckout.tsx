import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface InstaSendCheckoutProps {
  amount: number;
  email: string;
  phone: string;
  onSuccess: (result: any) => void;
  onFailure: (error: any) => void;
}

const InstaSendCheckout: React.FC<InstaSendCheckoutProps> = ({
  amount,
  email,
  phone,
  onSuccess,
  onFailure,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const loadSDK = async () => {
      await import("intasend-inlinejs-sdk");
      initializeIntaSend();
    };

    loadSDK();
  }, []);

  const initializeIntaSend = () => {
    if (typeof window !== "undefined" && window.IntaSend) {
      const publicAPIKey = process.env.NEXT_PUBLIC_INTASEND_PUBLIC_KEY || "";
      const isLive = process.env.NODE_ENV === "production";

      console.log("Initializing IntaSend with:", { publicAPIKey, isLive });

      const intaSend = new window.IntaSend({
        publicAPIKey: publicAPIKey,
        live: isLive,
      });

      intaSend
        .on("COMPLETE", (response: any) => {
          console.log("COMPLETE:", response);
          onSuccess(response);
        })
        .on("FAILED", (response: any) => {
          console.error("FAILED", response);
          onFailure(response);
        })
        .on("IN-PROGRESS", () => {
          console.log("INPROGRESS ...");
        });
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <button
      className="intaSendPayButton"
      data-amount={amount}
      data-currency="KES"
      data-email={email}
      data-phone_number={phone}
      data-comment="Charity Donation"
    >
      Pay Now
    </button>
  );
};

export default dynamic(() => Promise.resolve(InstaSendCheckout), {
  ssr: false,
});
