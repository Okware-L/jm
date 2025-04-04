"use client";

// components/TenderSubmissions.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface TenderSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  category: string;
  message: string;
  timestamp: Timestamp;
}

const TenderSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<TenderSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const q = query(
        collection(db, "tenderApplications"),
        orderBy("timestamp", "desc"),
        limit(100),
      );
      const querySnapshot = await getDocs(q);
      const submissionsData: TenderSubmission[] = querySnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        }),
      ) as TenderSubmission[];
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching tender submissions: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tenderApplications", id));
      setSubmissions((prevSubmissions) =>
        prevSubmissions.filter((submission) => submission.id !== id),
      );
      console.log(`Tender submission with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting tender submission: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-semibold">Tender Submissions</h2>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Contact Person",
                "Company",
                "Email",
                "Tender Title",
                "Proposal",
                "Timestamp",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.company}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.category}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={submission.message}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Proposal
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(
                    submission.timestamp.seconds * 1000,
                  ).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(submission.id)}
                  >
                    Delete
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

export default TenderSubmissions;
