import type { JSX } from "react";

// Re-export Amplify generated types
export type { Schema } from "../../amplify/data/resource";

// UI Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "linkedin" | "twitter";
  url: string;
}

// Component Props
export interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

export interface TestimonialCardProps {
  customerName: string;
  rating: number;
  text: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface BlogPostCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  featuredImage?: string;
  publishedAt?: string;
}

// CMS Types
export interface EditableContentProps {
  contentKey: string;
  defaultValue?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export interface EditableImageProps {
  contentKey: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}
