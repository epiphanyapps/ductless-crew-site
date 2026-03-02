"use client";

import { useState } from "react";
import { client } from "@/lib/amplify-client";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface LeadGenFormProps {
  title?: string;
  subtitle?: string;
  service?: string;
  variant?: "inline" | "card" | "hero";
  className?: string;
}

export default function LeadGenForm({
  title = "Get a Free Estimate",
  subtitle = "Fill out this quick form and we'll get back to you within 24 hours.",
  service = "General Inquiry",
  variant = "card",
  className = "",
}: LeadGenFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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
      const recaptchaToken = await getToken("lead_gen_form");

      const { errors } = await client.models.ContactSubmission.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: `[Lead Gen - ${service}] Request for estimate${recaptchaToken ? "\n[reCAPTCHA verified]" : ""}`,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className={`${getContainerStyles(variant)} ${className}`}>
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">Thank You!</h3>
          <p className="text-sm text-gray-600 mb-4">We&apos;ll contact you within 24 hours.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", phone: "", email: "" });
            }}
            className="text-sm text-[var(--color-orange)] font-semibold hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getContainerStyles(variant)} ${className}`}>
      {(title || subtitle) && (
        <div className={`mb-4 ${variant === "hero" ? "text-white" : ""}`}>
          {title && (
            <h3 className={`font-bold mb-1 ${
              variant === "hero" ? "text-xl text-white" : "text-lg text-[var(--color-navy)]"
            }`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-sm ${variant === "hero" ? "text-white/80" : "text-gray-600"}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className={getFormStyles(variant)}>
        {error && (
          <div className="col-span-full mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className={getInputStyles(variant)}
        />

        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className={getInputStyles(variant)}
        />

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className={getInputStyles(variant)}
        />

        <button
          type="submit"
          disabled={isSubmitting || !recaptchaReady}
          className={getButtonStyles(variant)}
        >
          {isSubmitting ? "Sending..." : !recaptchaReady ? "Loading..." : "Get Free Estimate"}
        </button>
      </form>
    </div>
  );
}

function getContainerStyles(variant: string): string {
  switch (variant) {
    case "hero":
      return "bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6";
    case "inline":
      return "";
    case "card":
    default:
      return "bg-white rounded-xl p-4 sm:p-6 shadow-lg border";
  }
}

function getFormStyles(variant: string): string {
  switch (variant) {
    case "inline":
      return "flex flex-col sm:flex-row gap-2 sm:gap-3";
    case "hero":
    case "card":
    default:
      return "grid grid-cols-1 sm:grid-cols-2 gap-3";
  }
}

function getInputStyles(variant: string): string {
  const base = "px-3 py-2.5 rounded-lg text-sm outline-none transition-shadow";

  switch (variant) {
    case "hero":
      return `${base} bg-white/90 border border-white/20 focus:bg-white focus:ring-2 focus:ring-[var(--color-orange)]`;
    case "inline":
      return `${base} border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent flex-1`;
    case "card":
    default:
      return `${base} border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent`;
  }
}

function getButtonStyles(variant: string): string {
  const base = "px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50";

  switch (variant) {
    case "hero":
      return `${base} bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white sm:col-span-2`;
    case "inline":
      return `${base} bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white whitespace-nowrap`;
    case "card":
    default:
      return `${base} bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white sm:col-span-2`;
  }
}
