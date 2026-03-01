"use client";

import { Header, Footer } from "@/components/layout";
import { useState } from "react";
import Link from "next/link";

const stats = [
  { value: "300+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "OSHA", label: "Certified" },
  { value: "$5M", label: "Insured" },
];

const reviews = [
  {
    name: "Elena M.",
    rating: 5,
    text: "Excellent service! The team was punctual, professional, and did an amazing job installing our new lighting system. Our living room looks completely transformed. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    name: "Lana K.",
    rating: 5,
    text: "Very professional and knowledgeable. They fixed our electrical issues quickly and at a fair price. The technician explained everything clearly and left the workspace spotless.",
    date: "1 month ago",
  },
  {
    name: "Russell P.",
    rating: 5,
    text: "Great experience from start to finish. The smart home installation exceeded our expectations. Now we can control everything from our phones! The team was patient with all my questions.",
    date: "1 month ago",
  },
  {
    name: "Angelisa R.",
    rating: 5,
    text: "Reliable and trustworthy. They showed up on time and completed the work exactly as promised. Will definitely use them again for future projects.",
    date: "2 months ago",
  },
  {
    name: "Michael T.",
    rating: 5,
    text: "The ductless mini-split installation was flawless. The team explained everything clearly and left the workspace spotless. A+ service! Our energy bills have already dropped.",
    date: "2 months ago",
  },
  {
    name: "Sarah L.",
    rating: 5,
    text: "Called them for an emergency electrical issue on a weekend. They responded within the hour and fixed the problem quickly. True professionals who care about their customers.",
    date: "3 months ago",
  },
  {
    name: "David W.",
    rating: 5,
    text: "Best handyman service in Brooklyn! They assembled all our IKEA furniture and even helped with some minor repairs. Very reasonable prices and excellent communication.",
    date: "3 months ago",
  },
  {
    name: "Jennifer H.",
    rating: 5,
    text: "Had them install recessed lighting throughout our apartment. The work was done beautifully and on schedule. They were respectful of our home and cleaned up perfectly.",
    date: "4 months ago",
  },
  {
    name: "Robert C.",
    rating: 5,
    text: "Professional, courteous, and skilled. They upgraded our electrical panel and installed new outlets. Everything was done to code and they handled all the permits.",
    date: "4 months ago",
  },
  {
    name: "Maria S.",
    rating: 5,
    text: "Fantastic experience! They installed a new thermostat and fixed some wiring issues we'd been ignoring for years. Fair pricing and quality work. Highly recommend!",
    date: "5 months ago",
  },
  {
    name: "James K.",
    rating: 5,
    text: "These guys are the real deal. Fast, efficient, and reasonably priced. They installed ceiling fans in three rooms and the work was impeccable.",
    date: "5 months ago",
  },
  {
    name: "Patricia N.",
    rating: 5,
    text: "We've used Ductless Crew multiple times now and they never disappoint. Most recently they helped with our bathroom renovation electrical work. Top notch!",
    date: "6 months ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[var(--color-navy)] text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Customer Reviews
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don&apos;t just take our word for it—see what our customers have to
              say about their experience with Ductless Crew.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-gray-300">based on 300+ reviews</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[var(--color-orange)]">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <StarRating rating={review.rating} />
                  <p className="mt-4 text-gray-600">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-navy)] flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {review.name[0]}
                        </span>
                      </div>
                      <span className="font-semibold text-[var(--color-navy)]">
                        {review.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {!showAll && reviews.length > 6 && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 bg-white border-2 border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Show More Reviews
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {showAll && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAll(false)}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-navy)] font-semibold transition-colors"
                >
                  Show Less
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--color-orange)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Our Service?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join hundreds of satisfied customers. Contact us today for a free
              estimate on your next project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-[var(--color-orange)] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:929-543-5995"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Call 929-543-5995
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
