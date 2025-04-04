"use client";

import { db } from "../../firebseConfig";
import { addDoc, collection } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Createdtender() {
  const router = useRouter();
  const [tenders, setTenders] = useState({
    title: "",
    badge: "",
    description: "",
    Items: [],
  });

  const onChange = (e) => {
    setTenders({ ...tenders, [e.target.title]: e.target.value });
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...tenders.Items];
    updatedItems[index] = e.target.value;
    setTenders({ ...tenders, Items: updatedItems });
  };

  const handleAddItem = () => {
    setTenders({ ...tenders, Items: [...tenders.Items, ""] });
  };

  const handleCreate = async () => {
    const col = collection(db, "tenders");
    try {
      addDoc(col, {
        title: tenders.title,
        description: tenders.description,
        Items: tenders.Items,
      });

      toast("Tender has been created successfully", {
        variant: "success",
        duration: 5000,
      });

    // Reset the state after successfully adding a tender
      setTenders({
        title: "",
        badge: "",
        description: "",
        Items: [],
      });

    } catch (error) {
        console.error("Error creating tender:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Create new tender listing</h1>
        </div>
        <form>
          <div className="mb-4">
            <label>Tender category</label>
            <Input
              placeholder="category"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
              type="text"
              title="title"
              value={tenders?.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Badge Info</label>
            <Input
            placeholder="badge"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
              type="text"
              title="badge"
              value={tenders?.badge}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <Textarea
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
              type="text"
              title="description"
              value={tenders?.description}
              onChange={onChange}
            />
          </div>

          <div className="mb-4">
            <label>Items</label>
            {tenders.Items.map((item, index) => (
              <Input
                key={index}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
                type="text"
                value={item}
                onChange={(e) => handleItemChange(e, index)}
              />
            ))}
            <button
              className="bg-gray-900 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full my-5"
              type="button"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </div>
          <button
            className="bg-gray-900 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="button"
            onClick={handleCreate}
          >
            Create new Tender
          </button>
        </form>
      </div>
      <Head>
        <title> Admin Create Tender</title>
      </Head>
    </>
  );
}
