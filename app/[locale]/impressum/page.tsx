import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }, { locale: "es" }];
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="pt-24">
      <div className="wrap max-w-2xl py-16">
        <h1 className="font-display text-3xl text-white mb-10">Impressum</h1>

        <section className="mb-8">
          <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="text-grey-mid text-sm leading-relaxed">
            {SITE_CONFIG.company.name} (Manager-Managed Limited Liability
            Company)
            <br />
            30 N Gould St Ste N<br />
            Sheridan, WY 82801
            <br />
            United States of America
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
            EIN
          </h2>
          <p className="text-grey-mid text-sm">{SITE_CONFIG.company.ein}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
            Kontakt / Contact
          </h2>
          <p className="text-grey-mid text-sm">
            E-Mail:{" "}
            <a
              href={`mailto:${SITE_CONFIG.legalEmail}`}
              className="text-electric-cyan hover:underline"
            >
              {SITE_CONFIG.legalEmail}
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
            Hosting
          </h2>
          <p className="text-grey-mid text-sm leading-relaxed">
            Diese Website wird über GitHub Pages bereitgestellt.
            <br />
            GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA
            <br />
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-cyan hover:underline"
            >
              GitHub Privacy Statement
            </a>
          </p>
        </section>

        <hr className="border-white/10 my-10" />

        <section className="mb-4">
          <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
            Legal Notice (English)
          </h2>
          <p className="text-grey-mid text-sm leading-relaxed">
            {SITE_CONFIG.company.name} is a limited liability company registered
            in Wyoming, USA. For questions regarding data protection, please
            refer to our{" "}
            <Link
              href={`/${locale}/datenschutz`}
              className="text-electric-cyan hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
