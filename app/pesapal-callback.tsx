// pages/pesapal-callback.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getPesapalToken, getTransactionStatus } from "@/utils/pesapal";

const PesapalCallback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTransactionStatus = async () => {
      const { OrderTrackingId } = router.query;

      if (OrderTrackingId) {
        try {
          const token = await getPesapalToken();
          const status = await getTransactionStatus(
            OrderTrackingId as string,
            token,
          );

          // Handle the transaction status
          if (status.payment_status_description === "Completed") {
            // Payment successful, update your database and show success message
            console.log("Payment successful");
            router.push("/donation-success");
          } else {
            // Payment failed or pending, handle accordingly
            console.log("Payment status:", status.payment_status_description);
            router.push("/donation-failed");
          }
        } catch (error) {
          console.error("Error checking transaction status:", error);
          router.push("/donation-failed");
        }
      }
    };

    checkTransactionStatus();
  }, [router]);

  return <div>Processing your donation...</div>;
};

export default PesapalCallback;
