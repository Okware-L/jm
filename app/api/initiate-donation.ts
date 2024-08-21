import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { amount, email, name, phone } = req.body;

  if (!amount || !email || !name || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    console.log("Initiating Paystack transaction with data:", {
      amount,
      email,
      name,
      phone,
    });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: Math.round(parseFloat(amount)), // Convert to kobo and ensure it's an integer
        email,
        metadata: {
          name,
          phone,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Paystack API response:", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error initializing Paystack transaction:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
      });

      // Check if the response is HTML
      if (
        typeof error.response?.data === "string" &&
        error.response.data.trim().startsWith("<!DOCTYPE html>")
      ) {
        console.error("Received HTML response instead of JSON");
        return res.status(500).json({
          message: "Received unexpected HTML response from Paystack",
          error: "Internal Server Error",
        });
      }

      return res.status(error.response?.status || 500).json({
        message: "Error initializing transaction",
        error: error.response?.data || error.message,
      });
    }
    return res.status(500).json({
      message: "Error initializing transaction",
      error: "An unexpected error occurred",
    });
  }
}
