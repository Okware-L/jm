import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebseConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShareButtons from "../components/ShareButtons"; // We'll create this client component

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  date: string;
  readingTime: number;
}

interface PageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
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
        author: data.author || "Anonymous",
        date: data.date || new Date().toISOString().split("T")[0],
        readingTime: Math.ceil(data.content.split(" ").length / 200) || 1,
      } as BlogPost;
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
  const post = await getPost(params.slug);

  if (!post) {
    return <div className="mt-8 text-center">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <Link href="/blog">
        <Button variant="ghost" className="mb-4">
          ← Back to Blogs
        </Button>
      </Link>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <User size={16} className="mr-1" /> {post.author}
            </span>
            <span className="flex items-center">
              <Calendar size={16} className="mr-1" /> {post.date}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-1" /> {post.readingTime} min read
            </span>
          </div>
        </CardHeader>

        <CardContent className="prose max-w-none p-6">
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </CardContent>
      </Card>
      <ShareButtons title={post.title} />
    </div>
  );
}
