const teamMembers = [
  {
    name: "Ravi",
    role: "Lead Electrician",
    bio: "Over 20 years in the field. Previously worked as an electrician's mate on a nuclear submarine.",
    imageUrl: null,
  },
  {
    name: "Alex",
    role: "General Manager",
    bio: "Professional handyman background. IKEA Furniture assembly wizard.",
    imageUrl: null,
  },
  {
    name: "Tim",
    role: "Customer Success Specialist",
    bio: "Handles administrative and paperwork duties. Provides after-hours email support on weekends and holidays.",
    imageUrl: null,
  },
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our experienced professionals are dedicated to providing top-quality
            service for every project.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="text-center"
            >
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">
                  {member.name[0]}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-navy)]">
                {member.name}
              </h3>
              <p className="text-[var(--color-orange)] font-medium mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "300+", label: "Satisfied Clients" },
            { value: "10+", label: "Years Experience" },
            { value: "OSHA", label: "Certified Technicians" },
            { value: "$5M", label: "Insurance Coverage" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[var(--color-orange)]">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
