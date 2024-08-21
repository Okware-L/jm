// scripts/registerIPN.ts

import dotenv from "dotenv";
import path from "path";
import { getPesapalToken, registerIPN } from "../utils/pesapal";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("Environment variables:");
console.log(
  "NEXT_PUBLIC_PESAPAL_BASE_URL:",
  process.env.NEXT_PUBLIC_PESAPAL_BASE_URL,
);
console.log(
  "PESAPAL_CONSUMER_KEY:",
  process.env.PESAPAL_CONSUMER_KEY ? "Set" : "Not set",
);
console.log(
  "PESAPAL_CONSUMER_SECRET:",
  process.env.PESAPAL_CONSUMER_SECRET ? "Set" : "Not set",
);

async function registerIPNAndGetId() {
  try {
    console.log("Getting Pesapal token...");
    const token = await getPesapalToken();

    if (!token) {
      throw new Error("Failed to get a valid token from Pesapal");
    }

    const ipnUrl = "http://localhost:3000/ipn"; // Replace with your webhook.site URL

    console.log("Registering IPN...");
    const response = await registerIPN(ipnUrl, token);

    if (response.ipn_id) {
      console.log("IPN registered successfully. IPN ID:", response.ipn_id);
    } else {
      console.error("Failed to register IPN:", response);
    }
  } catch (error) {
    console.error("Error in IPN registration process:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
}

registerIPNAndGetId();
