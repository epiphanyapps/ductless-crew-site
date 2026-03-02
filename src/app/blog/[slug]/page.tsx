import { Header, Footer } from "@/components/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
  }
> = {
  "signs-home-needs-electrical-panel-upgrade": {
    title: "5 Signs Your Home Needs an Electrical Panel Upgrade",
    excerpt:
      "Is your electrical panel keeping up with modern demands? Learn the warning signs that indicate it's time for an upgrade.",
    content: `Your electrical panel is the heart of your home's electrical system. As our reliance on electronic devices grows, older panels may struggle to keep up. Here are five signs that indicate you might need an upgrade:

## 1. Frequent Circuit Breaker Trips

If you're constantly resetting circuit breakers, your panel may be overloaded. This is more than an inconvenience—it's a safety concern. Modern homes with multiple devices, appliances, and HVAC systems require more power than older panels were designed to handle.

## 2. Flickering or Dimming Lights

When lights flicker or dim when you turn on appliances, it suggests your panel can't handle the electrical load. This is especially common when running high-draw appliances like air conditioners, washing machines, or electric dryers.

## 3. Your Panel Uses Fuses

Fuse boxes are outdated technology. Modern circuit breaker panels are safer and more convenient. If you still have a fuse box, it's definitely time to upgrade to a modern panel that meets current safety codes.

## 4. Burning Smell or Scorch Marks

These are serious warning signs of potential fire hazards. If you notice either, call an electrician immediately. Burning smells near your panel indicate overheating wires, which can lead to electrical fires.

## 5. Your Home is Over 25 Years Old

Older homes weren't designed for today's electrical demands. An upgrade ensures safety and accommodates modern needs like home offices, entertainment systems, and electric vehicle chargers.

## What to Expect During an Upgrade

A panel upgrade typically involves:
- Assessment of your current electrical needs
- Removal of the old panel
- Installation of a new, higher-capacity panel
- Updating wiring connections
- Final inspection and testing

If you notice any of these signs, contact us for a professional assessment. We'll evaluate your panel and recommend the best solution for your home.`,
    category: "Electrical",
    author: "Ravi",
    date: "January 15, 2024",
  },
  "benefits-ductless-mini-split-systems": {
    title: "The Benefits of Ductless Mini-Split Systems",
    excerpt:
      "Discover why ductless mini-splits are becoming the preferred choice for efficient home heating and cooling.",
    content: `Ductless mini-split systems have revolutionized home climate control. Here's why more homeowners are making the switch:

## Energy Efficiency

Mini-splits use up to 30% less energy than traditional HVAC systems. Their inverter technology adjusts compressor speed based on demand, reducing energy waste. This means lower utility bills and a smaller carbon footprint.

## Easy Installation

Without the need for ductwork, installation is faster, less invasive, and more affordable. Most installations can be completed in a single day. Only a small hole is needed to connect the indoor and outdoor units.

## Zone Control

Each indoor unit operates independently, allowing you to heat or cool specific rooms. No more wasting energy on unoccupied spaces. Set different temperatures in different rooms based on preference and usage.

## Improved Air Quality

Mini-splits offer multi-stage filtration that reduces dust, allergens, and other particles. They also don't circulate air through dusty ductwork, which can harbor mold, dust mites, and other allergens.

## Quiet Operation

Modern mini-splits are remarkably quiet—some as low as 19 decibels, quieter than a whisper. This makes them ideal for bedrooms, home offices, and living areas where noise is a concern.

## Year-Round Comfort

Heat pumps provide both heating and cooling, making them a versatile year-round solution. They're effective even in cold weather, with some models working efficiently down to -15°F.

## Ideal Applications

Mini-splits are perfect for:
- Room additions and converted spaces
- Homes without existing ductwork
- Garages and workshops
- Home offices
- Sunrooms and enclosed porches

Interested in learning if a ductless system is right for your home? Contact us for a free consultation.`,
    category: "HVAC",
    author: "Alex",
    date: "February 1, 2024",
  },
  "smart-home-upgrades-add-value": {
    title: "Smart Home Upgrades That Add Value to Your Property",
    excerpt:
      "Looking to increase your home's value? These smart home upgrades offer the best return on investment.",
    content: `Smart home technology isn't just about convenience—it can significantly increase your property value. Here are the upgrades that offer the best ROI:

## Smart Thermostats

A smart thermostat can reduce heating and cooling costs by 10-15%. Brands like Nest and Ecobee are buyer favorites. They learn your schedule, adjust automatically, and can be controlled from anywhere via smartphone.

## Smart Lighting Systems

Programmable lighting adds ambiance and security. Systems like Lutron and Philips Hue are popular choices. Features include dimming, color changing, scheduling, and voice control.

## Video Doorbells

Security features are high on buyers' wish lists. Ring and Nest doorbells offer peace of mind and convenience. See who's at your door from anywhere and communicate with visitors remotely.

## Smart Locks

Keyless entry systems add both security and convenience. Many integrate with other smart home systems. Grant temporary access codes for guests, service providers, or house sitters.

## Smart Smoke and CO Detectors

Connected safety devices provide real-time alerts to your phone, even when you're away. They can distinguish between smoke and steam, reducing false alarms.

## Whole-Home Audio

Multi-room audio systems like Sonos add luxury appeal without extensive wiring. Stream music throughout your home with voice control.

## Installation Considerations

When implementing smart home upgrades, consider:
- A cohesive system that works together
- Future-proof technology choices
- Professional installation for reliability
- User-friendly interfaces for all family members

We can help design and install a smart home solution tailored to your needs and budget.`,
    category: "Smart Home",
    author: "Tim",
    date: "February 15, 2024",
  },
  "spring-maintenance-checklist-home": {
    title: "Spring Maintenance Checklist for Your Home",
    excerpt:
      "Get your home ready for the warmer months with this comprehensive spring maintenance checklist.",
    content: `Spring is the perfect time to address home maintenance tasks that were put off during winter. Here's your comprehensive checklist:

## Electrical Systems

- Test all GFCI outlets and reset if needed
- Check outdoor lighting fixtures
- Inspect extension cords for damage
- Test smoke and carbon monoxide detectors
- Replace batteries in all detectors

## HVAC Maintenance

- Replace air filters
- Schedule AC tune-up before summer
- Clean outdoor condenser units
- Check thermostat batteries
- Clear debris from around outdoor units

## Exterior Checks

- Inspect outdoor outlets and covers
- Check landscape lighting
- Examine weatherstripping on doors
- Clean gutters and downspouts
- Inspect roof for winter damage

## Indoor Tasks

- Test garage door sensors
- Check ceiling fan direction (counterclockwise for summer)
- Inspect appliance cords and plugs
- Clean dryer vents
- Check for water damage signs

## Safety Items

- Test all smoke alarms
- Check fire extinguisher expiration
- Review emergency plans with family
- Update emergency contact lists
- Check first aid kit supplies

## Energy Efficiency

- Inspect window seals
- Check insulation in attic
- Consider a home energy audit
- Review utility bills for unusual spikes

Tackling these items now prevents costly repairs later. Need help with any electrical or HVAC maintenance? Give us a call!`,
    category: "Maintenance",
    author: "Ravi",
    date: "March 1, 2024",
  },
  "understanding-led-lighting-complete-guide": {
    title: "Understanding LED Lighting: A Complete Guide",
    excerpt:
      "Everything you need to know about LED lighting—from benefits to selection tips for your home.",
    content: `LED lighting has transformed how we illuminate our homes. Here's everything you need to know:

## Why Choose LED?

- Use 75% less energy than incandescent bulbs
- Last up to 25 times longer
- Produce less heat, reducing cooling costs
- Available in various color temperatures
- Environmentally friendly (no mercury)

## Understanding Color Temperature

Color temperature is measured in Kelvin (K):

- **Warm White (2700K-3000K)**: Cozy, yellowish light ideal for living rooms and bedrooms
- **Neutral White (3500K-4000K)**: Clean, balanced light good for kitchens and bathrooms
- **Cool White (5000K-6500K)**: Bright, energizing light perfect for workspaces

## Lumens vs. Watts

Forget watts—focus on lumens for brightness:

- 450 lumens ≈ 40W incandescent
- 800 lumens ≈ 60W incandescent
- 1100 lumens ≈ 75W incandescent
- 1600 lumens ≈ 100W incandescent

## Dimmable Options

Not all LEDs are dimmable. Look for "dimmable" on the packaging and ensure your dimmer switch is LED-compatible. Older dimmers designed for incandescent bulbs may cause flickering.

## Smart LED Options

Smart bulbs offer:
- Color changing capabilities
- Scheduling and automation
- Voice control compatibility
- Remote access via smartphone
- Integration with smart home systems

## CRI (Color Rendering Index)

CRI measures how accurately colors appear under the light:
- 80-89 CRI: Good for general use
- 90+ CRI: Excellent for task lighting and areas where color accuracy matters

Ready to upgrade your lighting? We offer free consultations to help you choose the perfect LED solution for every room.`,
    category: "Lighting",
    author: "Ravi",
    date: "March 15, 2024",
  },
};

const relatedPosts = [
  {
    title: "The Benefits of Ductless Mini-Split Systems",
    slug: "benefits-ductless-mini-split-systems",
    category: "HVAC",
  },
  {
    title: "Smart Home Upgrades That Add Value to Your Property",
    slug: "smart-home-upgrades-add-value",
    category: "Smart Home",
  },
  {
    title: "Spring Maintenance Checklist for Your Home",
    slug: "spring-maintenance-checklist-home",
    category: "Maintenance",
  },
];

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://ductlesscrew.com/blog/${slug}`,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Electrical: "bg-blue-100 text-blue-700",
    HVAC: "bg-green-100 text-green-700",
    "Smart Home": "bg-purple-100 text-purple-700",
    Lighting: "bg-yellow-100 text-yellow-700",
    Maintenance: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[category] || "bg-gray-100 text-gray-700"
      }`}
    >
      {category}
    </span>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[var(--color-navy)] text-white py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <CategoryBadge category={post.category} />
              <span className="text-gray-300">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-semibold">{post.author[0]}</span>
              </div>
              <span>By {post.author}</span>
            </div>
          </div>
        </section>

        {/* Featured Image Placeholder */}
        <div className="bg-gray-200 h-64 md:h-96 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400"
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

        {/* Content */}
        <article className="py-16 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none prose-headings:text-[var(--color-navy)] prose-a:text-[var(--color-orange)]">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-600">
                          {item.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith("**")) {
                  return (
                    <p key={index} className="text-gray-600 my-4">
                      <strong>{paragraph.replace(/\*\*/g, "")}</strong>
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-gray-600 my-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t">
              <p className="font-semibold text-[var(--color-navy)] mb-4">
                Share this article
              </p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--color-orange)] hover:text-white flex items-center justify-center text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--color-orange)] hover:text-white flex items-center justify-center text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--color-orange)] hover:text-white flex items-center justify-center text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <CategoryBadge category={post.category} />
                    <h3 className="mt-3 text-lg font-bold text-[var(--color-navy)] hover:text-[var(--color-orange)]">
                      {post.title}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-orange)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help With Your Project?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Our team of experts is ready to help. Contact us for a free
              consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[var(--color-orange)] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
