import { Header, Footer } from "@/components/layout";
import Link from "next/link";

const teamMembers = [
  {
    name: "Ravi",
    role: "Lead Electrician",
    bio: "Over 20 years in the field. Previously worked as an electrician's mate on a nuclear submarine. Expert in residential and commercial electrical systems.",
  },
  {
    name: "Alex",
    role: "General Manager",
    bio: "Professional handyman background with expertise in HVAC systems. IKEA Furniture assembly wizard and customer satisfaction specialist.",
  },
  {
    name: "Tim",
    role: "Customer Success Specialist",
    bio: "Handles administrative and paperwork duties. Provides after-hours email support on weekends and holidays. Your first point of contact.",
  },
];

const features = [
  {
    icon: "shield",
    title: "Licensed & Insured",
    description: "Fully licensed with $5M liability coverage for your peace of mind.",
  },
  {
    icon: "clock",
    title: "Prompt Service",
    description: "Same-day service available. We respect your time and schedule.",
  },
  {
    icon: "badge",
    title: "OSHA Certified",
    description: "All technicians are OSHA-certified and regularly trained.",
  },
  {
    icon: "dollar",
    title: "Transparent Pricing",
    description: "Upfront quotes with no hidden fees. The price we quote is the price you pay.",
  },
  {
    icon: "star",
    title: "Quality Guaranteed",
    description: "1-year workmanship warranty on all installations and repairs.",
  },
  {
    icon: "users",
    title: "300+ Happy Clients",
    description: "Trusted by homeowners and businesses across NYC.",
  },
];

const credentials = [
  { value: "10+", label: "Years Experience" },
  { value: "$5M", label: "Insurance Coverage" },
  { value: "300+", label: "Satisfied Clients" },
  { value: "4.8", label: "Star Rating" },
];

function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
    clock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    badge: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    ),
    dollar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    star: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    ),
    users: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    ),
  };

  return (
    <svg
      className="w-8 h-8 text-[var(--color-orange)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[var(--color-navy)] text-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Ductless Crew
              </h1>
              <p className="text-xl text-gray-300">
                Your trusted partner for electrical, HVAC, and handyman services
                in New York City. Over a decade of professional experience
                serving residential and commercial clients.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in Brooklyn, Ductless Crew has been serving the New York
                  metropolitan area for over a decade. We believe in delivering
                  quality workmanship, transparent pricing, and exceptional
                  customer service on every project.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Whether you need a simple outlet repair or a complete smart home
                  installation, our team of licensed professionals treats every
                  job with the same level of care and attention to detail.
                </p>
                <p className="text-lg text-gray-600">
                  We&apos;re not just contractors—we&apos;re your neighbors, committed to
                  keeping NYC homes and businesses safe, comfortable, and
                  efficient.
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {credentials.map((cred) => (
                    <div key={cred.label} className="text-center">
                      <p className="text-4xl font-bold text-[var(--color-orange)]">
                        {cred.value}
                      </p>
                      <p className="text-gray-600 mt-1">{cred.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our experienced professionals are dedicated to providing
                top-quality service for every project.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-xl p-8 shadow-sm text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-navy)] flex items-center justify-center">
                    <span className="text-3xl text-white font-bold">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-navy)]">
                    {member.name}
                  </h3>
                  <p className="text-[var(--color-orange)] font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We&apos;re committed to excellence in every aspect of our service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 p-6 rounded-xl border hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <FeatureIcon name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-[var(--color-navy)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How We Work
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our simple process ensures a smooth experience from start to
                finish.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Contact Us",
                  description: "Reach out via phone, email, or our online form.",
                },
                {
                  step: "02",
                  title: "Free Estimate",
                  description: "We assess your needs and provide a detailed quote.",
                },
                {
                  step: "03",
                  title: "Schedule",
                  description: "Pick a time that works for you—same-day available.",
                },
                {
                  step: "04",
                  title: "Get It Done",
                  description: "Our pros complete the work to your satisfaction.",
                },
              ].map((item, index) => (
                <div key={item.step} className="text-center relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-white/20" />
                  )}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-orange)] flex items-center justify-center">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--color-orange)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Work With Us?
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
