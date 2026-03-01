import { Header, Footer } from "@/components/layout";
import Link from "next/link";

const posts = [
  {
    title: "5 Signs Your Home Needs an Electrical Panel Upgrade",
    slug: "signs-home-needs-electrical-panel-upgrade",
    excerpt:
      "Is your electrical panel keeping up with modern demands? Learn the warning signs that indicate it's time for an upgrade.",
    category: "Electrical",
    author: "Ravi",
    date: "January 15, 2024",
    image: null,
  },
  {
    title: "The Benefits of Ductless Mini-Split Systems",
    slug: "benefits-ductless-mini-split-systems",
    excerpt:
      "Discover why ductless mini-splits are becoming the preferred choice for efficient home heating and cooling.",
    category: "HVAC",
    author: "Alex",
    date: "February 1, 2024",
    image: null,
  },
  {
    title: "Smart Home Upgrades That Add Value to Your Property",
    slug: "smart-home-upgrades-add-value",
    excerpt:
      "Looking to increase your home's value? These smart home upgrades offer the best return on investment.",
    category: "Smart Home",
    author: "Tim",
    date: "February 15, 2024",
    image: null,
  },
  {
    title: "Spring Maintenance Checklist for Your Home",
    slug: "spring-maintenance-checklist-home",
    excerpt:
      "Get your home ready for the warmer months with this comprehensive spring maintenance checklist.",
    category: "Maintenance",
    author: "Ravi",
    date: "March 1, 2024",
    image: null,
  },
  {
    title: "Understanding LED Lighting: A Complete Guide",
    slug: "understanding-led-lighting-complete-guide",
    excerpt:
      "Everything you need to know about LED lighting—from benefits to selection tips for your home.",
    category: "Lighting",
    author: "Ravi",
    date: "March 15, 2024",
    image: null,
  },
];

const categories = ["All", "Electrical", "HVAC", "Smart Home", "Lighting", "Maintenance"];

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Electrical: "bg-blue-100 text-blue-700",
    HVAC: "bg-green-100 text-green-700",
    "Smart Home": "bg-purple-100 text-purple-700",
    Lighting: "bg-yellow-100 text-yellow-700",
    Maintenance: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[category] || "bg-gray-100 text-gray-700"
      }`}
    >
      {category}
    </span>
  );
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[var(--color-navy)] text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
              <p className="text-xl text-gray-300">
                Tips, guides, and insights on electrical, HVAC, and home
                improvement from our expert team.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "All"
                      ? "bg-[var(--color-navy)] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="md:flex">
                    {/* Image Placeholder */}
                    <div className="md:w-72 md:flex-shrink-0">
                      <div className="h-48 md:h-full bg-gray-200 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <CategoryBadge category={post.category} />
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl md:text-2xl font-bold text-[var(--color-navy)] hover:text-[var(--color-orange)] transition-colors mb-3">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 mb-4">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          By{" "}
                          <span className="font-medium text-gray-700">
                            {post.author}
                          </span>
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[var(--color-orange)] font-semibold hover:gap-3 transition-all"
                        >
                          Continue Reading
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-[var(--color-navy)] text-white font-medium">
                  1
                </button>
                <button className="px-4 py-2 rounded-lg bg-white border text-gray-600 hover:bg-gray-50 font-medium">
                  2
                </button>
                <button className="px-4 py-2 rounded-lg bg-white border text-gray-600 hover:bg-gray-50 font-medium">
                  3
                </button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-4 py-2 rounded-lg bg-white border text-gray-600 hover:bg-gray-50 font-medium">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
