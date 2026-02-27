import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[var(--color-navy)] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[var(--color-orange)] font-bold">
                    10+
                  </span>
                </div>
                <span className="text-sm text-gray-300">
                  Years
                  <br />
                  Experience
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[var(--color-orange)] font-bold">
                    $5M
                  </span>
                </div>
                <span className="text-sm text-gray-300">
                  Insurance
                  <br />
                  Coverage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[var(--color-orange)] font-bold">
                    4.8
                  </span>
                </div>
                <span className="text-sm text-gray-300">
                  Star
                  <br />
                  Rating
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:929-543-5995"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Call 929-543-5995
              </a>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-2xl bg-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white/60"
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
                <p className="text-white/60">Hero Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
