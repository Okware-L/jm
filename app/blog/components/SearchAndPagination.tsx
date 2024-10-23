"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Clock, User, Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  date: string;
  readingTime: number;
}

interface SearchAndPaginationProps {
  blogs: BlogPost[];
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
        className="mb-6"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((blog) => (
          <Card
            key={blog.id}
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {blog.title}
              </CardTitle>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                  className="line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 150) + "...",
                  }}
                />

                <Button variant="ghost" className="m-3">
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
