// utils/pesapal.ts

import axios from "axios";

const PESAPAL_BASE_URL = process.env.NEXT_PUBLIC_PESAPAL_BASE_URL;

// Function to get authentication token
export async function getPesapalToken() {
  const PESAPAL_BASE_URL = process.env.NEXT_PUBLIC_PESAPAL_BASE_URL;
  const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
  const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

  console.log("getPesapalToken - PESAPAL_BASE_URL:", PESAPAL_BASE_URL);
  console.log(
    "getPesapalToken - PESAPAL_CONSUMER_KEY:",
    PESAPAL_CONSUMER_KEY ? "Set" : "Not set",
  );
  console.log(
    "getPesapalToken - PESAPAL_CONSUMER_SECRET:",
    PESAPAL_CONSUMER_SECRET ? "Set" : "Not set",
  );

  if (!PESAPAL_BASE_URL) {
    throw new Error("NEXT_PUBLIC_PESAPAL_BASE_URL is not set");
  }
  if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
    throw new Error(
      "PESAPAL_CONSUMER_KEY or PESAPAL_CONSUMER_SECRET is not set",
    );
  }

  try {
    console.log("Sending request to Pesapal for token...");
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Auth/RequestToken`,
      {
        consumer_key: PESAPAL_CONSUMER_KEY,
        consumer_secret: PESAPAL_CONSUMER_SECRET,
      },
    );
    console.log("Response received from Pesapal:");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data, null, 2));

    if (response.data && response.data.token) {
      console.log("Token received successfully");
      return response.data.token;
    } else {
      console.log("No token in response");
      return undefined;
    }
  } catch (error) {
    console.error("Error getting Pesapal token:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response status:", error.response.status);
      console.error(
        "Response data:",
        JSON.stringify(error.response.data, null, 2),
      );
    }
    throw error;
  }
}

// Function to register IPN URL
export async function registerIPN(url: string, token: string | undefined) {
  const PESAPAL_BASE_URL = process.env.NEXT_PUBLIC_PESAPAL_BASE_URL;

  console.log("registerIPN - PESAPAL_BASE_URL:", PESAPAL_BASE_URL);
  console.log("registerIPN - URL:", url);
  console.log(
    "registerIPN - Token:",
    token ? `${token.substring(0, 10)}...` : "Token is undefined",
  );

  if (!PESAPAL_BASE_URL) {
    throw new Error("NEXT_PUBLIC_PESAPAL_BASE_URL is not set");
  }

  if (!token) {
    throw new Error("Token is undefined. Authentication may have failed.");
  }

  try {
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`,
      {
        url: url,
        ipn_notification_type: "GET", // or "POST", depending on your preference
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error registering IPN - Status:", error.response.status);
      console.error("Error registering IPN - Data:", error.response.data);
    }
    throw error;
  }
}

// Function to submit order request
export async function submitOrderRequest(orderData: any, token: string) {
  try {
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting order request:", error);
    throw error;
  }
}

// Function to get transaction status
export async function getTransactionStatus(
  orderTrackingId: string,
  token: string,
) {
  try {
    const response = await axios.get(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error getting transaction status:", error);
    throw error;
  }
}
