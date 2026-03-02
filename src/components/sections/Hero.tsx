import Link from "next/link";
import LeadGenForm from "./LeadGenForm";

export default function Hero() {
  return (
    <section className="relative bg-[var(--color-navy)] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Electrical & Handyman Services in New York
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Over a decade of professional experience in all facets of
              electrical repairs and installations. Licensed, bonded, and fully
              insured.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[var(--color-orange)] font-bold text-sm sm:text-base">
                    10+
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-300">
                  Years
                  <br />
                  Experience
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[var(--color-orange)] font-bold text-sm sm:text-base">
                    $5M
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-300">
                  Insurance
                  <br />
                  Coverage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[var(--color-orange)] font-bold text-sm sm:text-base">
                    4.8
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-300">
                  Star
                  <br />
                  Rating
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:929-543-5995"
                className="bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Call 929-543-5995
              </a>
            </div>
          </div>

          {/* Lead Gen Form */}
          <div className="relative hidden lg:block">
            <LeadGenForm
              title="Request a Free Estimate"
              subtitle="Get a quote within 24 hours - no obligation"
              service="Hero Form"
              variant="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
