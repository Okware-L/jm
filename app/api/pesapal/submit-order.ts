// pages/api/pesapal/submit-order.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getPesapalToken, submitOrderRequest } from "@/utils/pesapal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getPesapalToken();
    const orderData = req.body;
    const response = await submitOrderRequest(orderData, token);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error submitting order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the order" });
  }
}
