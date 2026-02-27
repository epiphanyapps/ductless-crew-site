const testimonials = [
  {
    customerName: "Elena",
    rating: 5,
    text: "Excellent service! The team was punctual, professional, and did an amazing job installing our new lighting system.",
  },
  {
    customerName: "Lana",
    rating: 5,
    text: "Very professional and knowledgeable. They fixed our electrical issues quickly and at a fair price.",
  },
  {
    customerName: "Russel",
    rating: 5,
    text: "Great experience from start to finish. The smart home installation exceeded our expectations.",
  },
  {
    customerName: "Angelisa",
    rating: 5,
    text: "Reliable and trustworthy. They showed up on time and completed the work exactly as promised.",
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

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            customers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 text-gray-600 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-[var(--color-navy)]">
                {testimonial.customerName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
