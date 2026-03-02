import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  // Compress responses
  compress: true,
  // Generate ETags for caching
  generateEtags: true,
  // Production optimizations
  poweredByHeader: false,
};

export default nextConfig;
