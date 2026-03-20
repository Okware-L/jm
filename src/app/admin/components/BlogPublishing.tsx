"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { db } from "../../../../firebseConfig";
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
import RichTextEditor from "./RichTextEditor";

const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogPost extends BlogFormData {
  id: string;
  slug: string;
}

const BlogPublishing: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editorContent, setEditorContent] = useState("");

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Update form content field when editor content changes
  useEffect(() => {
    form.setValue("content", editorContent, {
      shouldValidate: true,
    });
  }, [editorContent, form]);

  // Set editor content when editing a blog
  useEffect(() => {
    if (editingBlog) {
      setEditorContent(editingBlog.content);
    }
  }, [editingBlog]);

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

  const onSubmit = async (data: BlogFormData) => {
    const slug = slugify(data.title, { lower: true, strict: true });
    const blogData = { ...data, content: editorContent, slug };

    try {
      if (editingBlog) {
        await updateDoc(
          doc(db, "blogs", editingBlog.id),
          blogData as DocumentData,
        );
      } else {
        await addDoc(collection(db, "blogs"), blogData as DocumentData);
      }
      form.reset();
      setEditorContent("");
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    form.reset({
      title: blog.title,
      content: blog.content,
    });
    setEditorContent(blog.content);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleReset = () => {
    setEditingBlog(null);
    setEditorContent("");
    form.reset();
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          {editingBlog ? "Edit Blog" : "Create New Blog"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your blog post a clear, engaging title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({  }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      onChange={setEditorContent}
                      initialContent={editingBlog ? editingBlog.content : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">
                {editingBlog ? "Update Post" : "Publish Post"}
              </Button>
              {editingBlog && (
                <Button type="button" variant="outline" onClick={handleReset}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">Published Blogs</h2>
        <div className="my-5">
          <Button variant="link">
            <Link href="/blog" className="font-light text-sky-600">
              See All Blogs
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded border p-4">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <div
                className="mt-2 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: stripHtml(blog.content).substring(0, 100) + "...",
                }}
              />
              <div className="mt-4 space-x-2">
                <Button onClick={() => handleEdit(blog)} variant="ghost">
                  Edit
                </Button>

                <Button
                  onClick={() => handleDelete(blog.id)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPublishing;
