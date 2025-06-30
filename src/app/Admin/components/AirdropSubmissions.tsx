"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../firebseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface AirdropSubmission {
  id: string;
  name: string;
  email: string;
  ethWallet: string;
  amount: string;
  message?: string;
}

const AirdropSubmissions = () => {
  const [submissions, setSubmissions] = useState<AirdropSubmission[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDownloadCSV = () => {
    const header = "address,quantity\n";
    const rows = submissions
      .map((s) => `${s.ethWallet},${s.amount}`)
      .join("\n");
    const csvContent = header + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "airdrop_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              {["Name", "Email", "Wallet", "Message", "Amount", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
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
                <td className="px-6 py-4">{s.amount}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                  <a
                    href="https://thirdweb.com/team/okware/dd2c97d0c572e2b8a570ec077c6b75c7/contract/sepolia/0x973C22B3b109E94Fdf90F65E98cdABc5D7E1aCAd/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
                  >
                    Airdrop JM
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDownloadCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default AirdropSubmissions;
