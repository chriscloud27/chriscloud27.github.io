import { getTranslations } from "next-intl/server";
import Mach2Logo from "@/components/Mach2Logo";

interface TimelineEntry {
  period: string;
  company: string;
  companyUrl?: string;
  location: string;
  role: string;
  description: string;
  tags: string[];
  logoSrc?: string;
  useMach2Logo?: boolean;
}

const TIMELINE: TimelineEntry[] = [
  {
    period: "2022 — Present",
    company: "MaCh2.Cloud",
    location: "Remote · Global",
    role: "Principal AI‑Native Cloud & Platform Architect",
    description:
      "Fractional architecture leadership for Growth SaaS companies building or scaling AI-powered products. Designing cloud-agnostic, cost-effective platform foundations that give engineering teams clarity, speed, and cost predictability without the overhead of a full-time Principal hire.",
    tags: [
      "AI-Native Architecture",
      "Cloud-Agnostic",
      "Backend-as-a-Service",
      "IaC",
      "WAF++ Framework",
      "Fractional Leadership",
    ],
    useMach2Logo: true,
  },
  {
    period: "Dec 2024 — Jan 2026",
    company: "FairUp",
    companyUrl: "fairup.dev",
    location: "Remote",
    role: "CIO & Product Owner",
    description:
      "SaaS platform for career and recruiting events. Responsible for product direction, platform architecture, and operational readiness. Led Backend-as-a-Service architecture using AWS Amplify. Ensuring a low-level infrastructure allowing the Staff Engineer to faster time-to-market and improved developer experience.",
    tags: [
      "AWS Amplify",
      "BaaS",
      "Product Leadership",
      "SaaS Architecture",
      "API Design",
      "Developer Experience",
      "Business Strategy",
      "Customer Requirements",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=fairup.dev&sz=32",
  },
  {
    period: "Oct 2023 — Apr 2024",
    company: "FoxBase",
    companyUrl: "foxbase.de",
    location: "Düsseldorf · Germany",
    role: "Tech Team Lead & Co-Innovation Manager",
    description:
      'Led architectural decisions and advised engineering teams to enhance the Sales platform SaaS product "FoxBase". Standardization of incident / request detection and management as basis for company growth (+50% efficiency). Requirement engineering and roadmap creation of co-innovation requests for leading key accounts. Solution rollout and rapid feature delivery for an Enterprise customer across five countries while maintaining scalability.',
    tags: [
      "API first",
      "Product Leadership",
      "SaaS Platform",
      "Developer Experience",
      "International Rollout",
      "ITIL",
      "Management Advisory",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=foxbase.de&sz=32",
  },
  {
    period: "Apr 2022 — Oct 2023",
    company: "Capgemini",
    companyUrl: "capgemini.com",
    location: "Düsseldorf · Germany",
    role: "Enterprise IT Architect",
    description:
      "Led team of 20+ engineers and architects, directing development, contractual obligations, operations, and strategic customer success of highly automated Azure and AWS Cloud platforms. Spearheaded platform automation initiatives achieving 90%+ automation on CDN Platform with Python.",
    tags: [
      "Leadership",
      "Azure",
      "AWS",
      "Team Management",
      "Platform Automation",
      "Strategic Planning",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=32",
  },
  {
    period: "Jul 2020 — Sep 2023",
    company: "Capgemini",
    companyUrl: "capgemini.com",
    location: "Düsseldorf · Germany",
    role: "Cloud Architect",
    description:
      "Built up global Kubernetes platform on Azure with Terraform, increasing efficiency with DevOps. Enhanced VPS Platform with container security (+60%). Automated infrastructure ensuring +99.9% uptime on Azure with Kubernetes, Jenkins, Data Factory, and real-time analytics.",
    tags: [
      "Azure",
      "Kubernetes",
      "Terraform",
      "Platform Engineering",
      "Multi-Tenancy",
      "DevOps",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=32",
  },
  {
    period: "Jul 2019 — Jun 2020",
    company: "BARMER",
    companyUrl: "barmer.de",
    location: "Wuppertal · Germany",
    role: "Cloud Architect",
    description:
      "Implemented automation concepts with AWS CloudFormation achieving +80% increased cost-efficiency on app cloud hosting. Managed operations outsourcing delivering +20% cost-efficiency while ensuring compliance and security.",
    tags: [
      "AWS",
      "CloudFormation",
      "Cost Optimization",
      "Automation",
      "Compliance",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=barmer.de&sz=32",
  },
  {
    period: "Oct 2015 — Jun 2019",
    company: "BWI GmbH",
    companyUrl: "bwi.de",
    location: "Meckenheim · Germany",
    role: "IT Architect",
    description:
      "Designed Container Platform Service on military security standards for 100+ applications. Led IT infrastructure and Security Design achieving 100% perfect score. Developed CloudLab service concept, speeding testing by +95%.",
    tags: [
      "Public Sector",
      "Security-First Design",
      "Container Platform",
      "Military Standards",
      "Compliance Architecture",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=bwi.de&sz=32",
  },
  {
    period: "Oct 2010 — Sep 2015",
    company: "ITK Rheinland",
    companyUrl: "itk-rheinland.de",
    location: "Neuss · Germany",
    role: "IT Specialist",
    description:
      "Implemented on-premise password management (BSI/DSGVO) to 1,000+ IT systems, security +90%. Developed on-premises storage service optimizing workflow of 140 employees by 90%. Implemented Windows server installation system cutting installation times by 90%.",
    tags: [
      "IT Infrastructure",
      "Security",
      "Process Automation",
      "System Administration",
    ],
    logoSrc: "https://www.google.com/s2/favicons?domain=itk-rheinland.de&sz=32",
  },
];

export default async function Experience() {
  const t = await getTranslations("experience");

  return (
    <section id="experience">
      <div className="s-top" />
      <div className="wrap">
        <div className="exp-top reveal">
          <div>
            <div className="eyebrow">{t("eyebrow")}</div>
            <h2>
              Built at
              <br />
              <em>real scale.</em>
            </h2>
          </div>
          <p className="s-sub">
            Since 2010: Building system infrastructure that powers organisations
            at scale.<br></br>
            Since 2019: Architecting cloud platforms that accelerate engineering
            velocity and unlock growth. <br></br>
            <strong>Production systems that shipped.</strong>
          </p>
        </div>

        <div className="timeline">
          {TIMELINE.map((entry, i) => (
            <div key={i} className="tlrow reveal">
              <div className="tlmeta">
                <span className="tl-period">{entry.period}</span>
                <span className="tl-co">
                  {entry.useMach2Logo ? (
                    <Mach2Logo size={24} />
                  ) : entry.logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={entry.logoSrc} alt="" className="co-logo" />
                  ) : null}
                  {entry.company}
                </span>
                <span className="tl-loc">{entry.location}</span>
              </div>
              <div className="tlspine" />
              <div className="tlbody">
                <div className="tl-role">{entry.role}</div>
                <p className="tl-desc">{entry.description}</p>
                <div className="tags">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="creds reveal">
          <div className="cred-title">{t("WAF++Title")}</div>
          <p className="cred-desc">{t("WAF++Desc")}</p>
        </div>
      </div>
    </section>
  );
}
