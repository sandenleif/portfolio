import type { Metadata } from "next";

import { PageShell } from "@/components/ui";
import { imprint, privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Impressum & Datenschutz",
  description:
    "Anbieterkennzeichnung nach § 5 DDG und Hinweise zum Datenschutz.",
  // Pflichtangaben gehören nicht in den Index — auffindbar sein müssen sie
  // über die Seite selbst, nicht über die Suche.
  robots: { index: false, follow: true },
};

/** Ein Abschnitt der Rechtsseite: kleine Überschrift, darunter der Fließtext. */
function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="label mb-2">{heading}</h2>
      <div className="space-y-3 text-[15px] leading-[1.6] text-fg-muted">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage() {
  return (
    <PageShell
      title="Impressum"
      description="Anbieterkennzeichnung und Datenschutzhinweise. Auf Deutsch, weil beides deutschem Recht folgt."
    >
      <Block heading={imprint.heading}>
        <p>
          {imprint.operator}
          <br />
          {imprint.legalForm}
        </p>
        <p>
          {imprint.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p>
          <a
            href={imprint.phoneHref}
            className="text-fg underline decoration-line-strong underline-offset-[3px] transition-colors duration-150 hover:decoration-fg"
          >
            {imprint.phone}
          </a>
          <br />
          <a
            href={`mailto:${imprint.email}`}
            className="text-fg underline decoration-line-strong underline-offset-[3px] transition-colors duration-150 hover:decoration-fg"
          >
            {imprint.email}
          </a>
        </p>
      </Block>

      <Block heading={imprint.responsible.heading}>
        <p>{imprint.responsible.text}</p>
      </Block>

      <Block heading={imprint.tax.heading}>
        <p>
          Steuernummer {imprint.tax.number}
          <br />
          Umsatzsteuer-Identifikationsnummer {imprint.tax.vatId}
        </p>
        <p>{imprint.tax.note}</p>
      </Block>

      <Block heading={imprint.disputeResolution.heading}>
        <p>{imprint.disputeResolution.text}</p>
      </Block>

      <Block heading={imprint.liability.heading}>
        <p>{imprint.liability.text}</p>
      </Block>

      <Block heading={imprint.copyright.heading}>
        <p>{imprint.copyright.text}</p>
      </Block>

      <hr className="mt-20 border-line" />

      <h2
        id="datenschutz"
        className="mt-20 mb-2 scroll-mt-24 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.05] font-normal tracking-[-0.035em]"
      >
        Datenschutz
      </h2>

      {privacy.sections.map((section) => (
        <Block key={section.heading} heading={section.heading}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>
      ))}
    </PageShell>
  );
}
