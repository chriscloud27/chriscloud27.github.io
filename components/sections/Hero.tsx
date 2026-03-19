import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section id="header">
      <div className="wrap">
        <div className="hgrid">
          <div>
            <div className="eyebrow rise r1">{t("eyebrow")}</div>
            <h1 className="rise r2">
              {t("h1Part1")}
              <br />
              <em>{t("h1Emphasis")}</em> {t("h1Part2")}
            </h1>
            <p className="hero-sub rise r3">
              I help{" "}
              <strong>Seed–Series C SaaS CTOs and engineering leaders</strong>{" "}
              build scalable SaaS infrastructure for growth-stage velocity. I
              design{" "}
              <strong>automated, secure, high-leverage cloud platforms</strong>{" "}
              that scale AI-native products without architectural rewrites.
            </p>
            <div className="hero-btns rise r4">
              <Link href="/en/diagnosis" className="btn btn-p">
                {t("cta")}
              </Link>
              <a href="#portfolio" className="btn btn-g">
                {t("ctaSecondary")}
              </a>
            </div>
            <div className="trust rise r5">
              <div className="t-item">
                <span className="t-n">{t("stat1Value")}</span>
                <span className="t-l">{t("stat1Label")}</span>
              </div>
              <div className="t-item">
                <span className="t-n">{t("stat2Value")}</span>
                <span className="t-l">{t("stat2Label")}</span>
              </div>
              <div className="t-item">
                <span className="t-n">{t("stat3Value")}</span>
                <span className="t-l">{t("stat3Label")}</span>
              </div>
              <div className="t-item">
                <span className="t-n">{t("stat4Value")}</span>
                <span className="t-l">{t("stat4Label")}</span>
              </div>
            </div>
          </div>

          <div className="hphoto rise r6">
            <Image
              src="https://mach2.cloud/assets/img/Chris.png"
              alt="Christian Weber"
              width={272}
              height={340}
              priority
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "6px",
                filter: "grayscale(15%)",
              }}
            />
            <div className="pbadge">
              <span className="pb-l">{t("available")}</span>
              <span className="pb-v">{t("availableLocation")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
