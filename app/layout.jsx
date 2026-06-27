import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import { getSiteUrl, siteConfig } from "@/lib/site";

const siteUrl = getSiteUrl();
const metadataTitle = siteConfig.title;
const metadataDescription = siteConfig.description;

export const metadata = {
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: {
          canonical: "/",
        },
      }
    : {}),
  title: metadataTitle,
  description: metadataDescription,
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/images/herobg.png",
              width: 1536,
              height: 1024,
              alt: "Premium construction and quality control consultancy in Bali",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: metadataDescription,
    ...(siteUrl
      ? {
          images: ["/images/herobg.png"],
        }
      : {}),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <Script
          strategy="afterInteractive"
          data-domain="iqc-eta.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>

      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
