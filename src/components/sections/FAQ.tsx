"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What training and education do your technicians have?",
    answer:
      "All our technicians are fully licensed and OSHA-certified. They undergo regular training on new products and technologies, and must pass required qualification tests before working on any project.",
  },
  {
    question: "Do you offer any warranties on your work?",
    answer:
      "Yes, we stand behind our work with a comprehensive warranty. All installations and repairs come with a workmanship guarantee, and we use high-quality materials that often include manufacturer warranties.",
  },
  {
    question: "How do you determine pricing?",
    answer:
      "We provide transparent, upfront pricing with no hidden fees. After assessing your project, we give you a detailed estimate that covers labor, materials, and any other costs. The price you agree to is the price you pay.",
  },
  {
    question: "How quickly can you start a project?",
    answer:
      "We understand that some issues can't wait. For emergencies, we offer same-day service when available. For standard projects, we typically can schedule within a few days of your initial contact.",
  },
  {
    question: "Do you serve residential and commercial clients?",
    answer:
      "Absolutely! We work with both residential homeowners and commercial businesses throughout the five boroughs of NYC. No project is too big or too small.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Have questions? We&apos;ve got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="font-semibold text-[var(--color-navy)]">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
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
              {openIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
