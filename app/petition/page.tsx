"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// This is a simplified smart contract ABI. You'd need to deploy an actual smart contract for this to work.
const contractABI = [
  {
    inputs: [],
    name: "signPetition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getSignatureCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0x1234567890123456789012345678901234567890"; // Replace with your actual contract address

export default function PetitionComponent() {
  const [signatureCount, setSignatureCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    checkConnection();
    getSignatureCount();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_accounts" });
        setIsConnected(true);
      } catch (err) {
        console.error(err);
        setIsConnected(false);
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to connect wallet. Please try again.");
      }
    } else {
      setErrorMsg("Please install MetaMask to use this feature.");
    }
  }

  async function getSignatureCount() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      );
      try {
        const count = await contract.getSignatureCount();
        setSignatureCount(count.toNumber());
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to get signature count. Please try again later.");
      }
    }
  }

  async function signPetition() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      );
      try {
        const transaction = await contract.signPetition();
        await transaction.wait();
        getSignatureCount();
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to sign petition. Please try again.");
      }
    }
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          Petition for Mandatory Annual Free Healthcare via Mobile Clinics for
          Kenyans
        </CardTitle>
        <CardDescription>
          Sign this petition to support a healthier Kenya
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          We, the undersigned Kenyan citizens, firmly believe that access to
          high-quality healthcare is a fundamental human right. We hereby
          petition for the immediate implementation of a mandatory annual free
          healthcare program delivered through mobile clinics, fully funded by
          the government.
        </p>
        <p className="mb-4">
          This initiative is essential to bridge the healthcare gap,
          particularly in rural and underserved urban areas, by providing
          accessible, affordable, and quality healthcare services to all
          Kenyans, including vulnerable groups such as children, pregnant women,
          the elderly, people with disabilities, and refugees.
        </p>
        {errorMsg && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
        <p className="font-bold">Current Signature Count: {signatureCount}</p>
      </CardContent>
      <CardFooter>
        {!isConnected ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <Button onClick={signPetition}>Sign Petition</Button>
        )}
      </CardFooter>
    </Card>
  );
}
