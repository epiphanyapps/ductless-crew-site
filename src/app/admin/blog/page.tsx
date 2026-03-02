"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/amplify-client";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  category?: string | null;
  author?: string | null;
  featuredImage?: string | null;
  publishedAt?: string | null;
  status?: "draft" | "published" | null;
  createdAt?: string;
  updatedAt?: string;
}

function BlogListContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, errors } = await client.models.BlogPost.list();

      if (errors) {
        throw new Error(errors[0]?.message || "Failed to load posts");
      }

      setPosts((data || []) as BlogPost[]);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("Failed to load blog posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    try {
      await client.models.BlogPost.delete({ id: post.id });
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete post. Please try again.");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center"
        >
          Add New Post
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "All" },
          { id: "published", label: "Published" },
          { id: "draft", label: "Drafts" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === tab.id
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--color-orange)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500 mb-2">No blog posts found</p>
          <Link
            href="/admin/blog/new"
            className="text-[var(--color-orange)] hover:underline"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Title</th>
                  <th className="text-left p-4 font-semibold text-gray-900 hidden md:table-cell">Category</th>
                  <th className="text-left p-4 font-semibold text-gray-900 hidden sm:table-cell">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-900 hidden lg:table-cell">Date</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{post.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          /{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-gray-600">{post.category || "—"}</span>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.status || "draft"}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-gray-600">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="p-2 text-gray-600 hover:text-[var(--color-orange)] transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
                          title="View"
                          target="_blank"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(post)}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function BlogAdminPage() {
  return (
    <Authenticator>
      <BlogListContent />
    </Authenticator>
  );
}
