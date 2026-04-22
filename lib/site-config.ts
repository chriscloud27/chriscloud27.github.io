export const SITE_CONFIG = {
  gtmId: "GTM-M7VZPNZG",
  legalEmail: "chrisallin24@gmail.com",

  company: {
    name: "Mach2Cloud LLC",
    address: "30 N Gould St Ste N, Sheridan, WY 82801, USA",
    ein: "855-641-6935",
  },

  seo: {
    siteUrl: "https://mach2.cloud",

    person: {
      name: "Christian Weber",
      jobTitle: "AI-Native Cloud & Platform Architect",
      image: "https://mach2.cloud/img/Chris.png",
      sameAs: [
        "https://www.linkedin.com/in/christian-weber-0591/",
        "https://github.com/chriscloud27",
        "https://wafplusplus.dev",
      ],
    },

    organization: {
      name: "MaCh2.Cloud",
      url: "https://mach2.cloud",
      logo: "https://mach2.cloud/img/mach2-logo-light.svg",
      sameAs: [
        "https://www.linkedin.com/company/mach2cloud/",
        "https://wafplusplus.dev",
        "https://github.com/chriscloud27",
      ],
    },

    consent: {
      cookieName: "mach2_consent",
      eventName: "mach2_consent_update",
    },
  },
} as const;
