const steps = [
  {
    number: "01",
    title: "Send Request",
    description:
      "Fill out our simple form or give us a call to describe your project needs.",
  },
  {
    number: "02",
    title: "Get Estimate",
    description:
      "We'll assess your project and provide a transparent, no-obligation quote.",
  },
  {
    number: "03",
    title: "Confirm & Schedule",
    description:
      "Approve the estimate and we'll schedule a time that works for you.",
  },
];

export default function Process() {
  return (
    <section className="py-20 bg-[var(--color-navy)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to get your
            project underway.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-white/20" />
              )}

              {/* Step Number */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-orange)] flex items-center justify-center">
                <span className="text-2xl font-bold">{step.number}</span>
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
