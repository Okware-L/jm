import React from "react";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebseConfig";
import SearchAndPagination from "./components/SearchAndPagination"; // We'll create this client component

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  date: string;
  readingTime: number;
}

async function getBlogs(): Promise<BlogPost[]> {
  const blogsCollection = collection(db, "blogs");
  const blogSnapshot = await getDocs(blogsCollection);
  return blogSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    title: doc.data().title,
    content: doc.data().content,
    slug: doc.data().slug,
    author: doc.data().author || "JM",
    date: doc.data().date || new Date().toISOString().split("T")[0],
    readingTime: Math.ceil(doc.data().content.split(" ").length / 200) || 1,
  }));
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="mb-6 text-4xl font-light">JM-Qafri Blogs & News.</h1>
      <SearchAndPagination blogs={blogs} />
    </div>
  );
}
