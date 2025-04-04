import { useEffect, useState } from "react";
import { db } from "../../../../firebseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

interface Application {
  id: string;
  name: string;
  email: string;
  organization: string;
  partnershipType: string;
  message: string;
  status: "pending" | "approved" | "rejected";
}

const PartnerApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const querySnapshot = await getDocs(
        collection(db, "partnerApplications"),
      );
      const apps = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Application[];
      setApplications(apps);
    };

    fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: Application["status"]) => {
    const applicationRef = doc(db, "partnerApplications", id);
    await updateDoc(applicationRef, { status });
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app)),
    );
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-indigo-900">
        Partner Applications
      </h2>
      <table className="min-w-full border-collapse text-left text-sm text-gray-600">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Organization</th>
            <th className="border-b px-4 py-2">Type</th>
            <th className="border-b px-4 py-2">Message</th>
            <th className="border-b px-4 py-2">Status</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-indigo-50">
              <td className="border-b px-4 py-2">{app.name}</td>
              <td className="border-b px-4 py-2">{app.organization}</td>
              <td className="border-b px-4 py-2">{app.partnershipType}</td>
              <td className="border-b px-4 py-2">{app.message}</td>
              <td className="border-b px-4 py-2">{app.status}</td>
              <td className="border-b px-4 py-2">
                <button
                  onClick={() => updateStatus(app.id, "approved")}
                  className="mr-2 rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app.id, "rejected")}
                  className="mr-2 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(app.id, "pending")}
                  className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                >
                  Pending
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerApplications;
