const services = [
  {
    title: "Light Installation",
    description:
      "Architectural, recessed, track, undercabinet, pendant, and outdoor lighting solutions.",
    icon: "💡",
    features: [
      "Recessed lighting",
      "Pendant lights",
      "Track lighting",
      "Outdoor lighting",
    ],
  },
  {
    title: "Electrical Services",
    description:
      "Complete wiring, sockets, circuit breakers, and voltage management services.",
    icon: "⚡",
    features: [
      "Wiring installation",
      "Circuit breakers",
      "Panel upgrades",
      "Safety inspections",
    ],
  },
  {
    title: "Smart Home",
    description:
      "Smart lighting, media rooms, doorbells, thermostats, and smart lock installation.",
    icon: "🏠",
    features: [
      "Smart lighting",
      "Smart thermostats",
      "Video doorbells",
      "Home automation",
    ],
  },
  {
    title: "Handyman Services",
    description:
      "Painting, carpentry, flooring, plumbing, and furniture assembly.",
    icon: "🔧",
    features: [
      "Painting",
      "Carpentry",
      "Flooring",
      "Assembly",
    ],
  },
  {
    title: "Appliance Services",
    description:
      "Oven, refrigerator, dishwasher, and washing machine repairs and installation.",
    icon: "🔌",
    features: [
      "Oven repair",
      "Refrigerator service",
      "Dishwasher repair",
      "Washer/dryer",
    ],
  },
  {
    title: "Repairs",
    description:
      "General home repairs, maintenance, and emergency repair services.",
    icon: "🛠️",
    features: [
      "Emergency repairs",
      "Maintenance",
      "Troubleshooting",
      "Upgrades",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional services for all your home electrical and handyman
            needs. Quality work, fair prices, and guaranteed satisfaction.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-[var(--color-orange)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
