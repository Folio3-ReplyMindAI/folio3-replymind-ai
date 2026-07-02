import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PageLoader } from "@/components/loader/PageLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReplyMind — Replies that write themselves.",
  description:
    "ReplyMind is the AI-native inbox behind every customer conversation — it drafts a grounded reply the moment a message lands, then waits for your call.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* General Sans isn't on Google Fonts / next/font, so it's loaded from
            Fontshare directly, same as the original design export. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
