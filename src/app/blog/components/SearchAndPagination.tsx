"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Clock, User, Calendar } from "lucide-react";
import { BlogPostRecord } from "@/lib/blog-content";

interface SearchAndPaginationProps {
  blogs: BlogPostRecord[];
}

const SearchAndPagination: React.FC<SearchAndPaginationProps> = ({ blogs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 h-12 max-w-xl rounded-none border-slate-300 bg-white shadow-none"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((blog) => (
          <Card
            key={blog.id}
            className="rounded-none border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-none"
          >
            <CardHeader className="space-y-4 border-b border-slate-100">
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-slate-500">
                {blog.category}
              </p>
              <CardTitle className="font-serif text-2xl font-light tracking-[-0.02em]">
                {blog.title}
              </CardTitle>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center">
                  <User size={16} className="mr-1" /> {blog.author}
                </span>
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" /> {blog.date}
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" /> {blog.readingTime} min
                  read
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${blog.slug}`}>
                <div
                  className="line-clamp-4 pt-6 font-sans text-[14px] font-light leading-[1.8] text-slate-600"
                  dangerouslySetInnerHTML={{
                    __html: `${blog.excerpt}...`,
                  }}
                />

                <Button variant="ghost" className="mt-4 px-0 font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:bg-transparent hover:text-slate-900">
                  Read More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredBlogs.length / postsPerPage) },
          (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              className="mx-1"
            >
              {i + 1}
            </Button>
          ),
        )}
      </div>
    </>
  );
};

export default SearchAndPagination;
