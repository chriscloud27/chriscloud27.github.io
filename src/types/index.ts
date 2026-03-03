/** Shared TypeScript types used across the site */

export interface TimelineEntry {
  period: string
  company: string
  companyUrl?: string
  location: string
  role: string
  description: string
  tags: string[]
  logoSrc?: string
  customLogo?: React.ReactNode
}

export interface CaseStudy {
  num: string
  title: string
  client: string
  href: string
  situation: string
  outcome: string
  metric: string
  tags: string[]
}

export interface Achievement {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  btnLabel?: string
  btnHref?: string
}

export interface TrustStat {
  value: string
  label: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}
