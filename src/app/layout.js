import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO CONFIG
const siteConfig = {
  name: "VANTAGE",
  title: "VANTAGE — The Ultimate Intelligence Layer for Crypto Markets",
  description:
    "VANTAGE is a next-generation crypto intelligence platform delivering strategic market insights, alpha discovery, and real-time execution tools.",
  url: "https://www.vantage-ai.xyz",

  // 🔥 MUST BE ABSOLUTE URL
  ogImage: "https://www.vantage-ai.xyz/og-image.png",

  twitterHandle: "@AI_VANT",
  locale: "en_US",
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  // ✅ IMPORTANT: keep minimal, clean
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",

    // 🔥 FIX: ADD BOTH STRING + OBJECT
    images: [
      siteConfig.ogImage, // fallback for crawlers
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VANTAGE",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,

    // 🔥 MUST BE ABSOLUTE
    images: [siteConfig.ogImage],

    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "theme-color": "#1E6FA8",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1E6FA8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🔥 CRITICAL FIX: FORCE OG FOR CRAWLERS */}
        <meta property="og:image" content="https://www.vantage-ai.xyz/og-image.png" />
        <meta name="twitter:image" content="https://www.vantage-ai.xyz/og-image.png" />

        {/* Mobile */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>

      <GoogleAnalytics gaId="G-47896JSPV5" />
    </html>
  );
}