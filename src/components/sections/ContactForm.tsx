"use client";

import { useState } from "react";
import { client } from "@/lib/amplify-client";
import { useRecaptcha } from "@/hooks/useRecaptcha";

type FormType = "lighting" | "general";

export default function ContactForm() {
  const [formType, setFormType] = useState<FormType>("lighting");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isReady: recaptchaReady, getToken } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get reCAPTCHA token if enabled
      const recaptchaToken = await getToken("contact_form");

      const serviceType = formType === "lighting" ? "Lighting Installation" : "General Service";
      const fullMessage = `[${serviceType}] ${formData.description}${recaptchaToken ? `\n[reCAPTCHA verified]` : ""}`;

      const { errors } = await client.models.ContactSubmission.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: fullMessage,
        status: "new",
      });

      if (errors) {
        throw new Error(errors[0]?.message || "Failed to submit form");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-4">
              We&apos;ve received your request and will get back to you within 24
              hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", phone: "", email: "", description: "" });
              }}
              className="text-[var(--color-orange)] font-semibold hover:underline"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            Request a Service
          </h2>
          <p className="text-lg text-gray-600">
            Fill out the form below and we&apos;ll get back to you with a free
            estimate.
          </p>
        </div>

        {/* Form Type Toggle */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => setFormType("lighting")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
              formType === "lighting"
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white text-gray-600 border hover:border-[var(--color-navy)]"
            }`}
          >
            Lighting Installation
          </button>
          <button
            type="button"
            onClick={() => setFormType("general")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
              formType === "general"
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white text-gray-600 border hover:border-[var(--color-navy)]"
            }`}
          >
            General Service
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border"
        >
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-shadow"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-shadow"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-shadow"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {formType === "lighting"
                ? "Describe your lighting project *"
                : "Describe your service needs *"}
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-shadow resize-none"
              placeholder={
                formType === "lighting"
                  ? "Tell us about the lighting you need installed (recessed, pendant, outdoor, etc.)"
                  : "Tell us about your project or repair needs"
              }
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !recaptchaReady}
            className="w-full bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            {isSubmitting ? "Sending..." : !recaptchaReady ? "Loading..." : "Get Free Estimate"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            We typically respond within 24 hours. For urgent requests, call us at{" "}
            <a
              href="tel:929-543-5995"
              className="text-[var(--color-orange)] font-semibold"
            >
              929-543-5995
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
