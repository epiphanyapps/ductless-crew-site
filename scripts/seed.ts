import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import outputs from "../amplify_outputs.json";

// Configure Amplify
Amplify.configure(outputs);

const client = generateClient<Schema>();

// Seed data
const teamMembers = [
  {
    name: "Ravi",
    role: "Lead Electrician",
    bio: "Over 20 years in the field. Previously worked as an electrician's mate on a nuclear submarine. Expert in residential and commercial electrical systems.",
    imageUrl: null,
    order: 1,
    isActive: true,
  },
  {
    name: "Alex",
    role: "General Manager",
    bio: "Professional handyman background with expertise in HVAC systems. IKEA Furniture assembly wizard and customer satisfaction specialist.",
    imageUrl: null,
    order: 2,
    isActive: true,
  },
  {
    name: "Tim",
    role: "Customer Success Specialist",
    bio: "Handles administrative and paperwork duties. Provides after-hours email support on weekends and holidays. Your first point of contact.",
    imageUrl: null,
    order: 3,
    isActive: true,
  },
];

const services = [
  {
    title: "Light Installation",
    description:
      "Architectural, recessed, track, undercabinet, pendant, and outdoor lighting solutions for any space.",
    icon: "lightbulb",
    features: [
      "Recessed lighting",
      "Pendant lights",
      "Track lighting",
      "Outdoor lighting",
      "Undercabinet lighting",
    ],
    order: 1,
    isActive: true,
  },
  {
    title: "Electrical Services",
    description:
      "Complete wiring, sockets, circuit breakers, and voltage management services for residential and commercial properties.",
    icon: "bolt",
    features: [
      "Wiring installation",
      "Circuit breakers",
      "Panel upgrades",
      "Safety inspections",
      "Outlet installation",
    ],
    order: 2,
    isActive: true,
  },
  {
    title: "Smart Home",
    description:
      "Smart lighting, media rooms, doorbells, thermostats, and smart lock installation to modernize your home.",
    icon: "home",
    features: [
      "Smart lighting",
      "Smart thermostats",
      "Video doorbells",
      "Home automation",
      "Smart locks",
    ],
    order: 3,
    isActive: true,
  },
  {
    title: "Handyman Services",
    description:
      "Painting, carpentry, flooring, plumbing, and furniture assembly services for all your home improvement needs.",
    icon: "wrench",
    features: [
      "Painting",
      "Carpentry",
      "Flooring",
      "Furniture assembly",
      "Minor plumbing",
    ],
    order: 4,
    isActive: true,
  },
  {
    title: "Appliance Services",
    description:
      "Oven, refrigerator, dishwasher, and washing machine repairs and installation by certified technicians.",
    icon: "plug",
    features: [
      "Oven repair",
      "Refrigerator service",
      "Dishwasher repair",
      "Washer/dryer installation",
      "Appliance hookup",
    ],
    order: 5,
    isActive: true,
  },
  {
    title: "HVAC & Ductless",
    description:
      "Ductless mini-split installation, maintenance, and repair. Energy-efficient heating and cooling solutions.",
    icon: "thermometer",
    features: [
      "Mini-split installation",
      "AC maintenance",
      "Heating repair",
      "Ductless systems",
      "Energy audits",
    ],
    order: 6,
    isActive: true,
  },
];

const testimonials = [
  {
    customerName: "Elena M.",
    rating: 5,
    text: "Excellent service! The team was punctual, professional, and did an amazing job installing our new lighting system. Our living room looks completely transformed.",
    order: 1,
    isActive: true,
  },
  {
    customerName: "Lana K.",
    rating: 5,
    text: "Very professional and knowledgeable. They fixed our electrical issues quickly and at a fair price. Highly recommend for any electrical work.",
    order: 2,
    isActive: true,
  },
  {
    customerName: "Russell P.",
    rating: 5,
    text: "Great experience from start to finish. The smart home installation exceeded our expectations. Now we can control everything from our phones!",
    order: 3,
    isActive: true,
  },
  {
    customerName: "Angelisa R.",
    rating: 5,
    text: "Reliable and trustworthy. They showed up on time and completed the work exactly as promised. Will definitely use them again.",
    order: 4,
    isActive: true,
  },
  {
    customerName: "Michael T.",
    rating: 5,
    text: "The ductless mini-split installation was flawless. The team explained everything clearly and left the workspace spotless. A+ service!",
    order: 5,
    isActive: true,
  },
  {
    customerName: "Sarah L.",
    rating: 5,
    text: "Called them for an emergency electrical issue on a weekend. They responded within the hour and fixed the problem quickly. True professionals.",
    order: 6,
    isActive: true,
  },
  {
    customerName: "David W.",
    rating: 5,
    text: "Best handyman service in Brooklyn! They assembled all our IKEA furniture and even helped with some minor repairs. Very reasonable prices.",
    order: 7,
    isActive: true,
  },
];

const faqs = [
  {
    question: "What training and education do your technicians have?",
    answer:
      "All our technicians are fully licensed and OSHA-certified. They undergo regular training on new products and technologies, and must pass required qualification tests before working on any project. Our lead electrician has over 20 years of experience, including specialized training from the US Navy.",
    order: 1,
    isActive: true,
  },
  {
    question: "Do you offer any warranties on your work?",
    answer:
      "Yes, we stand behind our work with a comprehensive warranty. All installations and repairs come with a 1-year workmanship guarantee, and we use high-quality materials that often include manufacturer warranties of 5-10 years.",
    order: 2,
    isActive: true,
  },
  {
    question: "How do you determine pricing?",
    answer:
      "We provide transparent, upfront pricing with no hidden fees. After assessing your project, we give you a detailed estimate that covers labor, materials, and any other costs. The price you agree to is the price you pay - no surprises.",
    order: 3,
    isActive: true,
  },
  {
    question: "How quickly can you start a project?",
    answer:
      "We understand that some issues can't wait. For emergencies, we offer same-day service when available. For standard projects, we typically can schedule within 2-3 business days of your initial contact.",
    order: 4,
    isActive: true,
  },
  {
    question: "Do you serve residential and commercial clients?",
    answer:
      "Absolutely! We work with both residential homeowners and commercial businesses throughout the five boroughs of NYC. No project is too big or too small - from single outlet repairs to complete office rewiring.",
    order: 5,
    isActive: true,
  },
  {
    question: "What areas do you service?",
    answer:
      "We proudly serve all five boroughs of New York City: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. We also serve parts of Long Island and Westchester County for larger projects.",
    order: 6,
    isActive: true,
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, we are fully licensed, bonded, and insured with $5 million in liability coverage. This protects both you and our team throughout every project. We're happy to provide documentation upon request.",
    order: 7,
    isActive: true,
  },
];

const blogPosts = [
  {
    title: "5 Signs Your Home Needs an Electrical Panel Upgrade",
    slug: "signs-home-needs-electrical-panel-upgrade",
    excerpt:
      "Is your electrical panel keeping up with modern demands? Learn the warning signs that indicate it's time for an upgrade.",
    content: `Your electrical panel is the heart of your home's electrical system. As our reliance on electronic devices grows, older panels may struggle to keep up. Here are five signs that indicate you might need an upgrade:

## 1. Frequent Circuit Breaker Trips
If you're constantly resetting circuit breakers, your panel may be overloaded. This is more than an inconvenience—it's a safety concern.

## 2. Flickering or Dimming Lights
When lights flicker or dim when you turn on appliances, it suggests your panel can't handle the electrical load.

## 3. Your Panel Uses Fuses
Fuse boxes are outdated technology. Modern circuit breaker panels are safer and more convenient.

## 4. Burning Smell or Scorch Marks
These are serious warning signs of potential fire hazards. If you notice either, call an electrician immediately.

## 5. Your Home is Over 25 Years Old
Older homes weren't designed for today's electrical demands. An upgrade ensures safety and accommodates modern needs.

If you notice any of these signs, contact us for a professional assessment. We'll evaluate your panel and recommend the best solution for your home.`,
    category: "Electrical",
    author: "Ravi",
    featuredImage: null,
    publishedAt: new Date("2024-01-15").toISOString(),
    status: "published" as const,
  },
  {
    title: "The Benefits of Ductless Mini-Split Systems",
    slug: "benefits-ductless-mini-split-systems",
    excerpt:
      "Discover why ductless mini-splits are becoming the preferred choice for efficient home heating and cooling.",
    content: `Ductless mini-split systems have revolutionized home climate control. Here's why more homeowners are making the switch:

## Energy Efficiency
Mini-splits use up to 30% less energy than traditional HVAC systems. Their inverter technology adjusts compressor speed based on demand, reducing energy waste.

## Easy Installation
Without the need for ductwork, installation is faster, less invasive, and more affordable. Most installations can be completed in a single day.

## Zone Control
Each indoor unit operates independently, allowing you to heat or cool specific rooms. No more wasting energy on unoccupied spaces.

## Improved Air Quality
Mini-splits offer multi-stage filtration that reduces dust, allergens, and other particles. They also don't circulate air through dusty ductwork.

## Quiet Operation
Modern mini-splits are remarkably quiet—some as low as 19 decibels, quieter than a whisper.

## Year-Round Comfort
Heat pumps provide both heating and cooling, making them a versatile year-round solution.

Interested in learning if a ductless system is right for your home? Contact us for a free consultation.`,
    category: "HVAC",
    author: "Alex",
    featuredImage: null,
    publishedAt: new Date("2024-02-01").toISOString(),
    status: "published" as const,
  },
  {
    title: "Smart Home Upgrades That Add Value to Your Property",
    slug: "smart-home-upgrades-add-value",
    excerpt:
      "Looking to increase your home's value? These smart home upgrades offer the best return on investment.",
    content: `Smart home technology isn't just about convenience—it can significantly increase your property value. Here are the upgrades that offer the best ROI:

## Smart Thermostats
A smart thermostat can reduce heating and cooling costs by 10-15%. Brands like Nest and Ecobee are buyer favorites.

## Smart Lighting Systems
Programmable lighting adds ambiance and security. Systems like Lutron and Philips Hue are popular choices.

## Video Doorbells
Security features are high on buyers' wish lists. Ring and Nest doorbells offer peace of mind and convenience.

## Smart Locks
Keyless entry systems add both security and convenience. Many integrate with other smart home systems.

## Smart Smoke and CO Detectors
Connected safety devices provide real-time alerts to your phone, even when you're away.

## Whole-Home Audio
Multi-room audio systems like Sonos add luxury appeal without extensive wiring.

When implementing smart home upgrades, consider a cohesive system that works together. We can help design and install a smart home solution tailored to your needs and budget.`,
    category: "Smart Home",
    author: "Tim",
    featuredImage: null,
    publishedAt: new Date("2024-02-15").toISOString(),
    status: "published" as const,
  },
  {
    title: "Spring Maintenance Checklist for Your Home",
    slug: "spring-maintenance-checklist-home",
    excerpt:
      "Get your home ready for the warmer months with this comprehensive spring maintenance checklist.",
    content: `Spring is the perfect time to address home maintenance tasks that were put off during winter. Here's your comprehensive checklist:

## Electrical Systems
- Test all GFCI outlets and reset if needed
- Check outdoor lighting fixtures
- Inspect extension cords for damage
- Test smoke and carbon monoxide detectors

## HVAC Maintenance
- Replace air filters
- Schedule AC tune-up before summer
- Clean outdoor condenser units
- Check thermostat batteries

## Exterior Checks
- Inspect outdoor outlets and covers
- Check landscape lighting
- Examine weatherstripping on doors
- Clean gutters and downspouts

## Indoor Tasks
- Test garage door sensors
- Check ceiling fan direction (counterclockwise for summer)
- Inspect appliance cords and plugs
- Clean dryer vents

## Safety Items
- Test all smoke alarms
- Check fire extinguisher expiration
- Review emergency plans with family

Tackling these items now prevents costly repairs later. Need help with any electrical or HVAC maintenance? Give us a call!`,
    category: "Maintenance",
    author: "Ravi",
    featuredImage: null,
    publishedAt: new Date("2024-03-01").toISOString(),
    status: "published" as const,
  },
  {
    title: "Understanding LED Lighting: A Complete Guide",
    slug: "understanding-led-lighting-complete-guide",
    excerpt:
      "Everything you need to know about LED lighting—from benefits to selection tips for your home.",
    content: `LED lighting has transformed how we illuminate our homes. Here's everything you need to know:

## Why Choose LED?
- Use 75% less energy than incandescent bulbs
- Last up to 25 times longer
- Produce less heat, reducing cooling costs
- Available in various color temperatures

## Understanding Color Temperature
- Warm White (2700K-3000K): Cozy, yellowish light ideal for living rooms and bedrooms
- Neutral White (3500K-4000K): Clean, balanced light good for kitchens and bathrooms
- Cool White (5000K-6500K): Bright, energizing light perfect for workspaces

## Lumens vs. Watts
Forget watts—focus on lumens for brightness:
- 450 lumens ≈ 40W incandescent
- 800 lumens ≈ 60W incandescent
- 1100 lumens ≈ 75W incandescent
- 1600 lumens ≈ 100W incandescent

## Dimmable Options
Not all LEDs are dimmable. Look for "dimmable" on the packaging and ensure your dimmer switch is LED-compatible.

## Smart LED Options
Smart bulbs offer color changing, scheduling, and voice control. They're perfect for creating ambiance and improving energy efficiency.

Ready to upgrade your lighting? We offer free consultations to help you choose the perfect LED solution for every room.`,
    category: "Lighting",
    author: "Ravi",
    featuredImage: null,
    publishedAt: new Date("2024-03-15").toISOString(),
    status: "published" as const,
  },
];

const siteContent = [
  // Hero Section
  {
    section: "hero",
    key: "headline",
    type: "text" as const,
    value: "Electrical & Handyman Services in New York",
  },
  {
    section: "hero",
    key: "subheadline",
    type: "text" as const,
    value:
      "Over a decade of professional experience in all facets of electrical repairs, HVAC installation, and home improvement. Licensed, bonded, and fully insured.",
  },
  {
    section: "hero",
    key: "cta_primary",
    type: "text" as const,
    value: "Get a Free Quote",
  },
  {
    section: "hero",
    key: "cta_secondary",
    type: "text" as const,
    value: "Call 929-543-5995",
  },
  // About Section
  {
    section: "about",
    key: "title",
    type: "text" as const,
    value: "About Ductless Crew",
  },
  {
    section: "about",
    key: "description",
    type: "text" as const,
    value:
      "Founded in Brooklyn, Ductless Crew has been serving the New York metropolitan area for over a decade. Our team of licensed professionals specializes in electrical work, HVAC installation, and general handyman services. We pride ourselves on quality workmanship, transparent pricing, and exceptional customer service.",
  },
  // Contact Section
  {
    section: "contact",
    key: "phone",
    type: "text" as const,
    value: "929-543-5995",
  },
  {
    section: "contact",
    key: "email",
    type: "text" as const,
    value: "contact@ductlesscrew.com",
  },
  {
    section: "contact",
    key: "address",
    type: "text" as const,
    value: "1938 Stillwell Ave, Suite 2, Brooklyn, NY 11223",
  },
  {
    section: "contact",
    key: "hours",
    type: "text" as const,
    value: "Monday - Friday: 10:00 AM - 6:00 PM",
  },
];

async function seed() {
  console.log("Starting seed...\n");

  // Seed Team Members
  console.log("Seeding team members...");
  for (const member of teamMembers) {
    try {
      const result = await client.models.TeamMember.create(member);
      if (result.errors) {
        console.error(`  Error creating ${member.name}:`, result.errors);
      } else {
        console.log(`  Created team member: ${member.name}`);
      }
    } catch (error) {
      console.error(`  Failed to create ${member.name}:`, error);
    }
  }

  // Seed Services
  console.log("\nSeeding services...");
  for (const service of services) {
    try {
      const result = await client.models.Service.create(service);
      if (result.errors) {
        console.error(`  Error creating ${service.title}:`, result.errors);
      } else {
        console.log(`  Created service: ${service.title}`);
      }
    } catch (error) {
      console.error(`  Failed to create ${service.title}:`, error);
    }
  }

  // Seed Testimonials
  console.log("\nSeeding testimonials...");
  for (const testimonial of testimonials) {
    try {
      const result = await client.models.Testimonial.create(testimonial);
      if (result.errors) {
        console.error(
          `  Error creating testimonial from ${testimonial.customerName}:`,
          result.errors
        );
      } else {
        console.log(`  Created testimonial from: ${testimonial.customerName}`);
      }
    } catch (error) {
      console.error(
        `  Failed to create testimonial from ${testimonial.customerName}:`,
        error
      );
    }
  }

  // Seed FAQs
  console.log("\nSeeding FAQs...");
  for (const faq of faqs) {
    try {
      const result = await client.models.FAQ.create(faq);
      if (result.errors) {
        console.error(`  Error creating FAQ:`, result.errors);
      } else {
        console.log(`  Created FAQ: ${faq.question.substring(0, 50)}...`);
      }
    } catch (error) {
      console.error(`  Failed to create FAQ:`, error);
    }
  }

  // Seed Blog Posts
  console.log("\nSeeding blog posts...");
  for (const post of blogPosts) {
    try {
      const result = await client.models.BlogPost.create(post);
      if (result.errors) {
        console.error(`  Error creating blog post ${post.title}:`, result.errors);
      } else {
        console.log(`  Created blog post: ${post.title}`);
      }
    } catch (error) {
      console.error(`  Failed to create blog post ${post.title}:`, error);
    }
  }

  // Seed Site Content
  console.log("\nSeeding site content...");
  for (const content of siteContent) {
    try {
      const result = await client.models.SiteContent.create(content);
      if (result.errors) {
        console.error(
          `  Error creating site content ${content.section}/${content.key}:`,
          result.errors
        );
      } else {
        console.log(`  Created site content: ${content.section}/${content.key}`);
      }
    } catch (error) {
      console.error(
        `  Failed to create site content ${content.section}/${content.key}:`,
        error
      );
    }
  }

  console.log("\nSeed completed!");
}

seed().catch(console.error);
