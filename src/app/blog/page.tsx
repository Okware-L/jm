import React from "react";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebseConfig";
import SearchAndPagination from "./components/SearchAndPagination"; // We'll create this client component
import { BlogPostRecord, mergeBlogPosts } from "@/lib/blog-content";

async function getBlogs(): Promise<BlogPostRecord[]> {
  try {
    const blogsCollection = collection(db, "blogs");
    const blogSnapshot = await getDocs(blogsCollection);
    const firestoreBlogs = blogSnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        slug: doc.data().slug,
        author: doc.data().author || "JM Group",
        date: doc.data().date || new Date().toISOString().split("T")[0],
        readingTime: Math.ceil(String(doc.data().content || "").split(" ").length / 200) || 1,
        category: doc.data().category || "Research",
        excerpt:
          doc.data().excerpt ||
          String(doc.data().content || "").replace(/<[^>]+>/g, " ").slice(0, 180).trim(),
      }),
    );

    return mergeBlogPosts(firestoreBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return mergeBlogPosts([]);
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-teal-50 text-slate-900">
      <section className="border-b border-slate-200 px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)]">
        <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.24em] text-slate-500">
          Research & Updates
        </p>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.02]">
          JM-Qafri <em style={{ color: "var(--accent)" }}>Journal</em>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
          Current thinking, platform notes, and published research from across the JM-Qafri
          network.
        </p>
      </section>

      <section className="px-6 md:px-[var(--pad-x)] py-[var(--section-y)]">
        <SearchAndPagination blogs={blogs} />
      </section>
    </div>
  );
}
