"use client";

// components/SubmissionsTable.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  timestamp: any;
}

const SubmissionsTable: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const fetchSubmissions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const submissionsData: Submission[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Submission[];
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions: ", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setSubmissions((prevSubmissions) =>
        prevSubmissions.filter((submission) => submission.id !== id),
      );
      console.log(`Submission with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting submission: ", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.firstName}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.lastName}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {submission.email}
                </td>
                <td className="max-w-xs overflow-hidden text-ellipsis px-6 py-4">
                  <div className="max-h-20 overflow-y-auto">
                    {submission.message}
                  </div>
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

export default SubmissionsTable;
