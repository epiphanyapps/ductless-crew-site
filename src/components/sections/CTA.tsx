import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-[var(--color-orange)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Contact us today for a free estimate. Our experienced team is ready
          to help with your next project.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="bg-white text-[var(--color-orange)] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Request a Quote
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
  );
}
