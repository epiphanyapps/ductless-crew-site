import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AmplifyProvider from "@/components/providers/AmplifyProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ductless Crew | Professional HVAC Services",
  description:
    "Professional HVAC and electrical services with over a decade of experience. Licensed, insured, and committed to quality.",
  keywords: [
    "HVAC",
    "electrical services",
    "handyman",
    "home repairs",
    "installation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
