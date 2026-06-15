import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MycelX — The Next Community Layer",
  description:
    "A text-first anonymous social platform with a real token economy. Speak freely, build wealth, and grow with text-only communities.",
  keywords: ["MycelX", "Waitlist", "Web3", "Anonymous Social", "Token Economy", "Substrate", "Crypto Community", "Text-first Social"],
  authors: [{ name: "Pope" }, { name: "Sanskar Jain" }],
  openGraph: {
    title: "MycelX — Speak Freely. Build Wealth.",
    description: "The next-generation text-first social layer with a native token economy.",
    url: "https://mycelx.com",
    siteName: "MycelX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MycelX — The Next Community Layer",
    description: "Speak freely. Build wealth. A text-first anonymous social platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}