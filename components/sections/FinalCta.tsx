import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Props = {
  locale: string;
};

export default async function FinalCta({ locale }: Props) {
  const t = await getTranslations("finalCta");

  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.06] text-center">
      <div className="wrap">
        <h2 className="mb-6 max-w-3xl mx-auto">
          {t("heading1")} <em>{t("headingEmphasis")}</em>
        </h2>
        <p className="hero-sub mx-auto text-center mb-12">{t("sub")}</p>
        <div className="flex flex-col items-center gap-4">
          <Link href={`/${locale}/diagnosis`} className="btn btn-p btn-p-lg">
            {t("cta")}
          </Link>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-grey-mid">
            {t("proofLine")}
          </p>
        </div>
      </div>
    </section>
  );
}
