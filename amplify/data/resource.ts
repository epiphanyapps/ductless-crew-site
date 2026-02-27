import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Site-wide content (hero text, about text, etc.)
  SiteContent: a
    .model({
      section: a.string().required(),
      key: a.string().required(),
      type: a.enum(["text", "image", "link", "html"]),
      value: a.string().required(),
      metadata: a.json(),
      updatedBy: a.string(),
    })
    .identifier(["section", "key"])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "create", "update", "delete"]),
      allow.group("editor").to(["read", "create", "update"]),
    ]),

  // Team members
  TeamMember: a
    .model({
      name: a.string().required(),
      role: a.string().required(),
      bio: a.string(),
      imageUrl: a.string(),
      order: a.integer().default(0),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "create", "update", "delete"]),
      allow.group("editor").to(["read", "create", "update"]),
    ]),

  // Services offered
  Service: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      icon: a.string(),
      features: a.string().array(),
      order: a.integer().default(0),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "create", "update", "delete"]),
      allow.group("editor").to(["read", "create", "update"]),
    ]),

  // Customer testimonials
  Testimonial: a
    .model({
      customerName: a.string().required(),
      rating: a.integer().required(),
      text: a.string().required(),
      order: a.integer().default(0),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "create", "update", "delete"]),
      allow.group("editor").to(["read", "create", "update"]),
    ]),

  // Blog posts
  BlogPost: a
    .model({
      title: a.string().required(),
      slug: a.string().required(),
      excerpt: a.string(),
      content: a.string().required(),
      category: a.string(),
      author: a.string(),
      featuredImage: a.string(),
      publishedAt: a.datetime(),
      status: a.enum(["draft", "published"]),
    })
    .secondaryIndexes((index) => [index("slug")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "create", "update", "delete"]),
      allow.group("editor").to(["read", "create", "update"]),
    ]),

  // FAQ items
  FAQ: a
    .model({
      question: a.string().required(),
      answer: a.string().required(),
      order: a.integer().default(0),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "create", "update", "delete"]),
      allow.group("editor").to(["read", "create", "update"]),
    ]),

  // Contact form submissions
  ContactSubmission: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      phone: a.string(),
      message: a.string().required(),
      status: a.enum(["new", "read", "responded", "archived"]),
    })
    .authorization((allow) => [
      allow.guest().to(["create"]),
      allow.authenticated().to(["read"]),
      allow.group("admin").to(["read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
