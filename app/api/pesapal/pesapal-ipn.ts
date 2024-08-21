// pages/api/pesapal-ipn.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getPesapalToken, getTransactionStatus } from "@/utils/pesapal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Verify that the request is from Pesapal (you might want to add more security checks)
  const { OrderTrackingId, OrderMerchantReference } = req.query;

  if (!OrderTrackingId || !OrderMerchantReference) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const token = await getPesapalToken();
    const status = await getTransactionStatus(OrderTrackingId as string, token);

    // Update your database with the payment status
    // This is where you'd mark the order as paid, failed, etc.
    await updateOrderStatus(
      OrderMerchantReference as string,
      status.payment_status_description,
    );

    // Respond to Pesapal
    res.status(200).json({
      OrderNotificationType: "IPNCHANGE",
      OrderTrackingId: OrderTrackingId,
      OrderMerchantReference: OrderMerchantReference,
      status: 200,
    });
  } catch (error) {
    console.error("Error processing IPN:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateOrderStatus(orderReference: string, status: string) {
  // Implement this function to update your database
  // For example, using Firebase:
  // await db.collection('orders').doc(orderReference).update({ status: status });
}
