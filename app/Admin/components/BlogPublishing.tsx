"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "../../../firebseConfig"; // Adjust the import path as needed
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

// Zod schema for blog post
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be 10000 characters or less"),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogPost extends BlogFormData {
  id: string;
  slug: string;
}

const BlogPublishing: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const blogsCollection = collection(db, "blogs");
    const blogSnapshot = await getDocs(blogsCollection);
    const blogList: BlogPost[] = blogSnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        slug: doc.data().slug,
      }),
    );
    setBlogs(blogList);
  };

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    const slug = slugify(data.title, { lower: true, strict: true });
    const blogData = { ...data, slug };

    console.log("Storing blog data:", blogData); // Log the data being stored

    if (editingBlog) {
      await updateDoc(
        doc(db, "blogs", editingBlog.id),
        blogData as DocumentData,
      );
    } else {
      await addDoc(collection(db, "blogs"), blogData as DocumentData);
    }
    reset();
    setEditingBlog(null);
    fetchBlogs();
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setValue("title", blog.title);
    setValue("content", blog.content);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input {...register("title")} placeholder="Blog Title" />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <Textarea
                {...register("content")}
                placeholder="Blog Content"
                rows={6}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>
            <Button type="submit">{editingBlog ? "Update" : "Publish"}</Button>
            {editingBlog && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingBlog(null)}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Published Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          {blogs.map((blog) => (
            <div key={blog.id} className="mb-4 rounded border p-4">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="mt-2">{blog.content.substring(0, 100)}...</p>
              <div className="mt-2 space-x-2">
                <Button onClick={() => handleEdit(blog)} variant="outline">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(blog.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPublishing;
