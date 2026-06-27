export const siteConfig = {
  name: "iQC",
  title: "iQC | Premium Construction & Quality Control Consultants in Bali",
  description:
    "Iconic Quality Consultants is a Bali-based construction and quality control consultancy for premium villas, hospitality projects, and investor-led developments.",
  email: "info@iconicqc.com",
};

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (!rawUrl) return null;

  return rawUrl.replace(/\/$/, "");
}
