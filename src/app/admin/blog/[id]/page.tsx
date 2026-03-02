"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, use } from "react";
import { client } from "@/lib/amplify-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  status: "draft" | "published";
}

const defaultForm: BlogPostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  featuredImage: "",
  status: "draft",
};

const categories = [
  "Electrical",
  "HVAC",
  "Smart Home",
  "Lighting",
  "Maintenance",
  "Tips",
];

function BlogEditorContent({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === "new";
  const [form, setForm] = useState<BlogPostForm>(defaultForm);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;

    const loadPost = async () => {
      try {
        const { data, errors } = await client.models.BlogPost.get({ id });

        if (errors || !data) {
          throw new Error(errors?.[0]?.message || "Post not found");
        }

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          category: data.category || "",
          author: data.author || "",
          featuredImage: data.featuredImage || "",
          status: data.status || "draft",
        });
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id, isNew]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (!form.title || !form.slug || !form.content) {
        throw new Error("Title, slug, and content are required");
      }

      if (isNew) {
        const { errors } = await client.models.BlogPost.create({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt || undefined,
          content: form.content,
          category: form.category || undefined,
          author: form.author || undefined,
          featuredImage: form.featuredImage || undefined,
          status: form.status,
          publishedAt: form.status === "published" ? new Date().toISOString() : undefined,
        });

        if (errors) {
          throw new Error(errors[0]?.message || "Failed to create post");
        }
      } else {
        const { errors } = await client.models.BlogPost.update({
          id,
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt || undefined,
          content: form.content,
          category: form.category || undefined,
          author: form.author || undefined,
          featuredImage: form.featuredImage || undefined,
          status: form.status,
          publishedAt: form.status === "published" ? new Date().toISOString() : undefined,
        });

        if (errors) {
          throw new Error(errors[0]?.message || "Failed to update post");
        }
      }

      router.push("/admin/blog");
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Failed to save post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--color-orange)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading post...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? "New Blog Post" : "Edit Blog Post"}
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">/blog/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none"
                      placeholder="post-url-slug"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none resize-none"
                    placeholder="Brief description for SEO and previews"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content * (Markdown supported)
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={15}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none resize-y font-mono text-sm"
                    placeholder="Write your post content here. Use ## for headings, - for lists, etc."
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Publish</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] disabled:opacity-50 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  {isSaving ? "Saving..." : isNew ? "Create Post" : "Update Post"}
                </button>
              </div>
            </div>

            {/* Post Details */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={form.featuredImage}
                    onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload images in Media Library, then paste URL here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}

export default function BlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <Authenticator>
      <BlogEditorContent id={resolvedParams.id} />
    </Authenticator>
  );
}
