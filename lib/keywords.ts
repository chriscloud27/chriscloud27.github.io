/**
 * SEO keyword collections for each page.
 *
 * Tier 1 — low competition, high intent (rank within 60–90 days)
 * Tier 2 — medium competition, high trigger alignment (3–6 months)
 * Tier 3 — long-term authority targets (build domain authority first)
 */

/** Keywords shared across every page of the site */
export const GLOBAL_KEYWORDS = [
  // Tier 1
  "fractional cloud architect",
  "fractional principal architect SaaS",
  "WAF2p",
  "WAF2p framework",
  "AI-native cloud architecture",
  // Tier 2
  "cloud architecture audit SaaS",
  "SaaS architecture Series A technical debt",
  "Series B cloud architecture",
  // Tier 3
  "cloud architecture for SaaS",
  "technical debt SaaS",
];

/** Home page — maximum keyword surface area */
export const HOME_KEYWORDS = [
  ...GLOBAL_KEYWORDS,
  // Tier 1
  "fractional cloud architect vs full-time",
  // Tier 2
  "architectural debt Series B SaaS",
  "cloud costs growing faster than revenue",
  "AI features work in staging fail in production",
  "platform slowing engineering velocity",
  // Tier 3
  "cloud cost optimization SaaS",
  "AI workload scaling",
];

/** About page — personal brand + fractional positioning */
export const ABOUT_KEYWORDS = [
  ...GLOBAL_KEYWORDS,
  "fractional cloud architect vs full-time",
  "cloud architect for hire",
  "cloud architect Series A Series B",
  "Christian Weber cloud architect",
  "AI-native platform design",
];

/** Blog listing page — content discovery */
export const BLOG_KEYWORDS = [
  ...GLOBAL_KEYWORDS,
  "architectural debt Series B SaaS",
  "cloud costs growing faster than revenue",
  "AI features work in staging fail in production",
  "platform slowing engineering velocity",
  "cloud cost optimization SaaS",
  "AI workload scaling",
];

/** WAF2p dedicated framework page — Tier 1 own-namespace keywords */
export const WAF2P_KEYWORDS = [
  "WAF2p",
  "WAF2p framework",
  "Well-Architected Framework for AI-native platforms",
  "AI-native cloud architecture",
  "cloud-agnostic platform design",
  "open-source cloud framework",
  "AI workload scaling",
  "fractional cloud architect",
];

/** Services page — engagement-specific keywords */
export const SERVICES_KEYWORDS = [
  ...GLOBAL_KEYWORDS,
  "architecture audit SaaS",
  "cloud architecture blueprint",
  "fractional architect engagement",
  "cloud architecture consulting Series A",
  "engineering enablement cloud",
  "AI-native platform design",
];

/** Case study: enterprise Kubernetes platform */
export const CASE_KUBERNETES_KEYWORDS = [
  "enterprise Kubernetes platform",
  "multi-tenant Kubernetes Azure",
  "cloud architecture for SaaS",
  "Series B cloud architecture",
  "platform slowing engineering velocity",
  "AI-native cloud architecture",
];

/** Case study: autonomous driving / AWS platform */
export const CASE_AWS_KEYWORDS = [
  "cloud architecture AWS",
  "AI workload scaling",
  "AI features work in staging fail in production",
  "Series B cloud architecture",
  "AI-native cloud architecture",
];

/** Case study: enterprise SaaS optimisation */
export const CASE_SAAS_KEYWORDS = [
  "cloud cost optimization SaaS",
  "cloud costs growing faster than revenue",
  "SaaS architecture Series A technical debt",
  "architectural debt Series B SaaS",
  "cloud architecture audit SaaS",
  "cloud architecture for SaaS",
];

/** Case study: BaaS seed startup to production */
export const CASE_BAAS_KEYWORDS = [
  "SaaS architecture Series A technical debt",
  "fractional cloud architect",
  "cloud architecture for SaaS",
  "Series B cloud architecture",
  "AI-native cloud architecture",
];

export const CASE_KEYWORDS: Record<string, string[]> = {
  "case-01-capgemini-kubernetes": CASE_KUBERNETES_KEYWORDS,
  "case-02-aws-autonomous-driving": CASE_AWS_KEYWORDS,
  "case-03-enterprise-saas-optimization": CASE_SAAS_KEYWORDS,
  "case-04-baas-seed-startup": CASE_BAAS_KEYWORDS,
};
