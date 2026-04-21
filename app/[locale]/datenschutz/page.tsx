import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false, follow: false },
};

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
        {label}
      </h2>
      <div className="text-grey-mid text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="pt-24">
      <div className="wrap max-w-2xl py-16">
        <h1 className="font-display text-3xl text-white mb-2">
          Datenschutzerklärung
        </h1>
        <p className="text-grey-mid text-xs mb-10">
          Privacy Policy — Stand: April 2025
        </p>

        <Section label="1. Verantwortlicher">
          <p>
            {SITE_CONFIG.company.name}
            <br />
            {SITE_CONFIG.company.address}
            <br />
            E-Mail:{" "}
            <a
              href={`mailto:${SITE_CONFIG.legalEmail}`}
              className="text-electric-cyan hover:underline"
            >
              {SITE_CONFIG.legalEmail}
            </a>
          </p>
        </Section>

        <Section label="2. Hosting — GitHub Pages">
          <p>
            Diese Website wird statisch auf GitHub Pages gehostet (GitHub, Inc.,
            88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). GitHub
            verarbeitet technische Verbindungsdaten (IP-Adresse, Zeitstempel)
            gemäß ihrer{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-cyan hover:underline"
            >
              Datenschutzerklärung
            </a>
            . Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse am Betrieb der Website).
          </p>
        </Section>

        <Section label="3. Kontaktformular & Whitepaper-Formular">
          <p>
            Wenn Sie das Kontaktformular oder das Whitepaper-Formular ausfüllen,
            werden folgende Daten erhoben: Vorname, Nachname, E-Mail-Adresse,
            Unternehmen (optional).
          </p>
          <p>
            Die Daten werden über einen n8n-Workflow (gehostet bei Hostinger
            UAB, Švitrigailos g. 34, Vilnius, Litauen) verarbeitet und intern
            gespeichert. Es findet keine Weitergabe an Dritte zu
            Marketingzwecken statt.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die
            Einwilligung wird über die Pflicht-Checkbox im Formular eingeholt
            und kann jederzeit widerrufen werden. Speicherdauer: 6 Monate.
          </p>
        </Section>

        <Section label="4. Google Analytics & Google Tag Manager">
          <p>
            Diese Website nutzt Google Analytics 4 über den Google Tag Manager
            (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043,
            USA). Google Analytics setzt Cookies und überträgt Nutzungsdaten an
            Server in den USA. Die Übermittlung erfolgt auf Basis von
            Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO.
          </p>
          <p>
            Google Analytics wird erst nach Ihrer ausdrücklichen Zustimmung über
            das Cookie-Banner aktiviert (Consent Mode V2). Rechtsgrundlage: Art.
            6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über
            das Cookie-Banner am unteren Seitenrand widerrufen.
          </p>
          <p>
            Weitere Informationen:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-cyan hover:underline"
            >
              Google Datenschutzerklärung
            </a>
          </p>
        </Section>

        <Section label="5. Google Search Console">
          <p>
            Wir nutzen die Google Search Console zur Analyse der
            Suchmaschinenperformance dieser Website. Es werden keine
            personenbezogenen Daten einzelner Nutzer an uns übermittelt — nur
            aggregierte Statistiken.
          </p>
        </Section>

        <Section label="6. Notion API (Blog)">
          <p>
            Blog-Inhalte werden über die Notion API (Notion Labs, Inc., 2300
            Harrison St, San Francisco, CA 94110, USA) abgerufen. Dabei werden
            keine personenbezogenen Daten von Seitenbesuchern an Notion
            übermittelt. Weitere Informationen:{" "}
            <a
              href="https://www.notion.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-cyan hover:underline"
            >
              Notion Datenschutzerklärung
            </a>
            .
          </p>
        </Section>

        <Section label="7. Cal.com (Terminbuchung)">
          <p>
            Auf der Seite /diagnosis ist ein Buchungswidget von Cal.com
            (Cal.com, Inc.) eingebunden. Wenn Sie einen Termin buchen, werden
            Ihre Angaben (Name, E-Mail) an Cal.com übermittelt und gemäß deren{" "}
            <a
              href="https://cal.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-cyan hover:underline"
            >
              Datenschutzerklärung
            </a>{" "}
            verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
            (Vertragsanbahnung).
          </p>
        </Section>

        <Section label="8. Ihre Rechte (Art. 15–21 DSGVO)">
          <p>Sie haben das Recht auf:</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>Auskunft über gespeicherte Daten (Art. 15)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16)</li>
            <li>Löschung Ihrer Daten (Art. 17)</li>
            <li>Einschränkung der Verarbeitung (Art. 18)</li>
            <li>Datenübertragbarkeit (Art. 20)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21)</li>
            <li>
              Beschwerde bei einer Aufsichtsbehörde — z. B. dem
              Bundesbeauftragten für den Datenschutz und die
              Informationsfreiheit (BfDI)
            </li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
            <a
              href={`mailto:${SITE_CONFIG.legalEmail}`}
              className="text-electric-cyan hover:underline"
            >
              {SITE_CONFIG.legalEmail}
            </a>
          </p>
        </Section>

        <Section label="9. Widerruf der Einwilligung">
          <p>
            Erteilte Einwilligungen (Cookie-Zustimmung, Formular-Einwilligung)
            können Sie jederzeit ohne Angabe von Gründen widerrufen — entweder
            über das Cookie-Banner am unteren Seitenrand oder per E-Mail an{" "}
            <a
              href={`mailto:${SITE_CONFIG.legalEmail}`}
              className="text-electric-cyan hover:underline"
            >
              {SITE_CONFIG.legalEmail}
            </a>
            . Der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin
            erfolgten Verarbeitung.
          </p>
        </Section>
      </div>
    </main>
  );
}
