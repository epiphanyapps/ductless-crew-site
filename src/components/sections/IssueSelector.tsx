"use client";

import { useState } from "react";
import Link from "next/link";

interface Issue {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "hvac" | "electrical" | "handyman";
  solution: string;
}

const issues: Issue[] = [
  {
    id: "ac-not-cooling",
    title: "AC Not Cooling",
    description: "Air conditioner is running but not producing cold air",
    icon: "snowflake",
    category: "hvac",
    solution: "Could be low refrigerant, dirty filters, or compressor issues. We'll diagnose and fix it same-day.",
  },
  {
    id: "lights-flickering",
    title: "Lights Flickering",
    description: "Lights dim or flicker when appliances turn on",
    icon: "lightbulb",
    category: "electrical",
    solution: "Often indicates overloaded circuits or loose wiring. We'll inspect your electrical panel and connections.",
  },
  {
    id: "breaker-tripping",
    title: "Breaker Keeps Tripping",
    description: "Circuit breaker repeatedly trips and won't stay on",
    icon: "zap",
    category: "electrical",
    solution: "May need a panel upgrade or circuit load rebalancing. We'll identify the root cause.",
  },
  {
    id: "no-heat",
    title: "No Heat",
    description: "Heating system not producing warm air",
    icon: "flame",
    category: "hvac",
    solution: "Could be thermostat, pilot light, or blower motor issues. Emergency service available.",
  },
  {
    id: "outlets-not-working",
    title: "Outlets Not Working",
    description: "One or more outlets have stopped working",
    icon: "plug",
    category: "electrical",
    solution: "May be a tripped GFCI, loose wiring, or failed outlet. Quick diagnosis and repair.",
  },
  {
    id: "strange-noises",
    title: "Strange HVAC Noises",
    description: "Unusual sounds coming from your AC or heating unit",
    icon: "volume",
    category: "hvac",
    solution: "Rattling, squealing, or banging often indicates worn parts. Early repair prevents bigger issues.",
  },
  {
    id: "high-bills",
    title: "High Energy Bills",
    description: "Unexplained increase in electricity or heating costs",
    icon: "dollar",
    category: "hvac",
    solution: "Could be HVAC inefficiency, air leaks, or phantom loads. We offer energy audits.",
  },
  {
    id: "installation",
    title: "New Installation",
    description: "Need new AC, lighting, or electrical work installed",
    icon: "tools",
    category: "handyman",
    solution: "From mini splits to panel upgrades, we handle all installations with warranty.",
  },
];

const iconPaths: Record<string, React.ReactNode> = {
  snowflake: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18M3 12l3-3m-3 3l3 3m15-3l-3-3m3 3l-3 3" />
  ),
  lightbulb: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  ),
  zap: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  ),
  flame: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  ),
  plug: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v3m0-3a6 6 0 00-6-6H3m9 6a6 6 0 006-6h3M7 6V3m10 3V3m-5 9v3" />
  ),
  volume: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  ),
  dollar: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  tools: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  ),
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  hvac: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  electrical: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  handyman: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
};

export default function IssueSelector() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            What Issue Are You Experiencing?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Click on the problem that best describes your situation and we&apos;ll help you find the solution.
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {issues.map((issue) => {
            const colors = categoryColors[issue.category];
            const isSelected = selectedIssue?.id === issue.id;

            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(isSelected ? null : issue)}
                className={`p-4 sm:p-6 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-[var(--color-orange)] bg-white shadow-lg scale-[1.02]"
                    : `${colors.border} ${colors.bg} hover:border-[var(--color-navy)] hover:shadow-md`
                }`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? "bg-[var(--color-orange)] text-white" : `${colors.bg} ${colors.text}`
                  }`}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {iconPaths[issue.icon]}
                  </svg>
                </div>
                <h3 className={`font-semibold text-sm sm:text-base mb-1 ${
                  isSelected ? "text-[var(--color-navy)]" : "text-gray-900"
                }`}>
                  {issue.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {issue.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Issue Details */}
        {selectedIssue && (
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[var(--color-orange)] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[var(--color-orange)] text-white flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {iconPaths[selectedIssue.icon]}
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-2">
                  {selectedIssue.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedIssue.solution}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/contact?issue=${selectedIssue.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Help Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="tel:929-543-5995"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 929-543-5995
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No selection prompt */}
        {!selectedIssue && (
          <div className="text-center text-gray-500">
            <p className="text-sm sm:text-base">
              Select an issue above to see how we can help, or{" "}
              <Link href="/contact" className="text-[var(--color-orange)] font-semibold hover:underline">
                contact us directly
              </Link>{" "}
              for other concerns.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
