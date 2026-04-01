import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebseConfig";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShareButtons from "../components/ShareButtons"; // We'll create this client component
import { BlogPostRecord, findSeededBlogPostBySlug } from "@/lib/blog-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPostRecord | null> {
  try {
    const seededPost = findSeededBlogPostBySlug(slug);
    if (seededPost) {
      return seededPost;
    }

    const blogsCollection = collection(db, "blogs");
    const q = query(blogsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        slug: data.slug,
        author: data.author || "JM Group",
        date: data.date || new Date().toISOString().split("T")[0],
        readingTime: Math.ceil(String(data.content || "").split(" ").length / 200) || 1,
        category: data.category || "Research",
        excerpt:
          data.excerpt ||
          String(data.content || "").replace(/<[^>]+>/g, " ").slice(0, 180).trim(),
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div className="mt-8 text-center">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-teal-50 text-slate-900">
      <section className="border-b border-slate-200 px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(40px,6vw,64px)]">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 px-0 font-sans text-[11px] uppercase tracking-[0.18em] text-slate-500 hover:bg-transparent hover:text-slate-900">
            ← Back to Journal
          </Button>
        </Link>
        <div className="max-w-5xl">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.24em] text-slate-500">
            {post.category}
          </p>
          <h1 className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] font-light tracking-[-0.04em] leading-[1.02]">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-5 font-sans text-[12px] uppercase tracking-[0.14em] text-slate-500">
            <span className="flex items-center">
              <User size={16} className="mr-2" /> {post.author}
            </span>
            <span className="flex items-center">
              <Calendar size={16} className="mr-2" /> {post.date}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-2" /> {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-[var(--pad-x)] py-[var(--section-y)]">
        <Card className="mx-auto max-w-5xl overflow-hidden rounded-none border-slate-200 bg-white shadow-none">
          <CardContent className="p-0">
            <div
              className="blog-content prose prose-lg max-w-none px-6 py-10 md:px-12 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-6 [&_h2]:font-serif [&_h2]:font-light [&_h2]:tracking-[-0.02em] [&_li]:font-light [&_ol]:font-light [&_p]:font-light [&_p]:leading-[1.95] [&_ul]:font-light"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
        <div className="mx-auto mt-8 flex max-w-5xl justify-end">
          <ShareButtons title={post.title} />
        </div>
      </section>
    </div>
  );
}
