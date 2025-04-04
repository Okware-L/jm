"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../firebseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ethers } from "ethers";

interface AirdropSubmission {
  id: string;
  name: string;
  email: string;
  ethWallet: string;
  message?: string;
}

// Your JM token contract
const JM_TOKEN_ADDRESS = "0xYourJMTokenAddressHere"; // Replace with your contract address
const JM_TOKEN_ABI = [
  "function transfer(address to, uint amount) public returns (bool)",
];

const AIRDROP_AMOUNT = ethers.utils.parseUnits("20", 18); // 20 JM (18 decimals)

const AirdropSubmissions = () => {
  const [submissions, setSubmissions] = useState<AirdropSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingTo, setSendingTo] = useState<string | null>(null);

  const getSigner = async () => {
    if (!window.ethereum) throw new Error("No Ethereum provider found");
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  };

  const fetchSubmissions = async () => {
    const snapshot = await getDocs(collection(db, "airdropApplications"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AirdropSubmission[];
    setSubmissions(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "airdropApplications", id));
    setSubmissions(submissions.filter((sub) => sub.id !== id));
  };

  const sendAirdrop = async (recipient: string) => {
    try {
      setSendingTo(recipient);
      const signer = await getSigner();
      const contract = new ethers.Contract(JM_TOKEN_ADDRESS, JM_TOKEN_ABI, signer);
      const tx = await contract.transfer(recipient, AIRDROP_AMOUNT);
      await tx.wait();
      alert(`Airdrop sent to ${recipient}`);
    } catch (err) {
      console.error("Airdrop error:", err);
      alert(`Airdrop failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSendingTo(null);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Airdrop Submissions</h2>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Wallet", "Message", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">{s.ethWallet}</td>
                <td className="px-6 py-4">{s.message || "—"}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                  <button
                    disabled={sendingTo === s.ethWallet}
                    onClick={() => sendAirdrop(s.ethWallet)}
                    className={`text-blue-600 hover:text-blue-900 ${sendingTo === s.ethWallet ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {sendingTo === s.ethWallet ? "Sending..." : "Airdrop 20 JM"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AirdropSubmissions;