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

// SEO Configuration
const siteConfig = {
  name: "VANTAGE",
  title: "VANTAGE — The Ultimate Intelligence Layer for Crypto Markets",
  description:
    "VANTAGE is a next-generation crypto intelligence platform delivering strategic market insights, alpha discovery, and real-time execution tools for traders and institutions.",
  url: "https://vantage-ai.xyz",
  ogImage: "https://vantage-ai.xyz/og-image.jpg",
  ogImagePng: "https://vantage-ai.xyz/og-image.png",
  keywords: [
    "VANTAGE AI",
    "crypto intelligence platform",
    "AI crypto analytics",
    "market alpha signals",
    "Web3 analytics",
    "crypto trading intelligence",
    "DeFi insights",
    "real-time crypto signals",
    "blockchain analytics",
    "AI trading tools",
    "market execution tools",
    "crypto opportunity detection"
  ],
  creator: "VANTAGE Team",
  publisher: "VANTAGE",
  category: "Cryptocurrency & Blockchain",
  twitterHandle: "@AI_VANT",
  locale: "en_US",
  twitterUrl: "https://x.com/AI_VANT",
  docsUrl: "https://vantage-ai.gitbook.io/vantage-ai-docs/"
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  category: siteConfig.category,

  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
      en: siteConfig.url,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        secureUrl: siteConfig.ogImage,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "VANTAGE — Crypto Intelligence Platform",
      },
      {
        url: siteConfig.ogImagePng,
        secureUrl: siteConfig.ogImagePng,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "VANTAGE — Crypto Intelligence Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VANTAGE — Crypto Intelligence Platform",
      },
    ],
  },

  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  other: {
    "application-name": siteConfig.name,
    "mobile-web-app-capable": "yes",
    "theme-color": "#1E6FA8",
    "color-scheme": "dark light",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E6FA8" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1F2E" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicit OG meta tags for maximum crawler compatibility */}
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:secure_url" content={siteConfig.ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VANTAGE — Crypto Intelligence Platform" />

        {/* Twitter image fallback */}
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:image:alt" content="VANTAGE — Crypto Intelligence Platform" />

        <meta
          name="format-detection"
          content="telephone=no, email=no, address=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* WebApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: siteConfig.creator,
                url: siteConfig.url,
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/icon.png`,
              sameAs: [
                siteConfig.twitterUrl,
                siteConfig.docsUrl
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>

      <GoogleAnalytics gaId="G-47896JSPV5" />
    </html>
  );
}
