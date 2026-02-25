import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
 
export const metadata = {
  title: "IQC — Iconic Quality Consulting",
  description:
    "Iconic Quality Consulting is an independent construction and quality control consultancy based in Bali, delivering projects with international standards, clear supervision, and long-term quality.",
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

