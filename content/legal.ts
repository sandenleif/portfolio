/**
 * Angaben für die Rechtsseite unter /legal.
 *
 * Das Impressum ist von sanden-hosting.org übernommen. Die Datenschutz-
 * angaben beschreiben *diese* Seite — sie hat weder Formulare noch Cookies
 * noch eingebundene Fremddienste, deshalb ist sie deutlich kürzer als die
 * Erklärung der Hosting-Seite.
 *
 * Kein Rechtsrat: vor dem Livegang von jemandem prüfen lassen, der das darf.
 */

import { site } from "@/content/site";

export const imprint = {
  heading: "Angaben gemäß § 5 DDG",
  operator: "Leif Sanden",
  legalForm: "Einzelunternehmen",
  address: ["Schauinslandstr. 47", "75177 Pforzheim", "Deutschland"],
  phone: "+49 1515 3322459",
  phoneHref: "tel:+4915153322459",
  email: site.email,
  responsible: {
    heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    text: "Leif Sanden, Anschrift wie oben.",
  },
  tax: {
    heading: "Steuerliche Angaben",
    number: "41175/40136",
    vatId: "DE464023321",
    note: "Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer berechnet.",
  },
  disputeResolution: {
    heading: "Streitbeilegung",
    text: "Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht bereit.",
  },
  liability: {
    heading: "Haftung für Links",
    text: "Diese Seite enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen; verantwortlich ist stets der jeweilige Anbieter. Werden mir Rechtsverletzungen bekannt, entferne ich die betreffenden Links umgehend.",
  },
  copyright: {
    heading: "Urheberrecht",
    text: "Die von mir erstellten Inhalte auf dieser Seite unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.",
  },
} as const;

/**
 * ANNAHME: gehostet bei IONOS, übernommen aus der Datenschutzerklärung von
 * sanden-hosting.org. Sobald feststeht, wo diese Seite tatsächlich läuft,
 * hier korrigieren — der Abschnitt über Server-Logdateien nennt den Anbieter
 * namentlich. Liegt ein CDN davor (Cloudflare), gehört das ebenfalls hierhin.
 */
const HOST = "IONOS SE, Elgendorfer Str. 57, 56410 Montabaur";

export const privacy = {
  hostingProvider: HOST,
  sections: [
    {
      heading: "Verantwortlich",
      body: [
        "Leif Sanden, Schauinslandstr. 47, 75177 Pforzheim, Deutschland. Erreichbar unter " +
          site.email +
          ".",
      ],
    },
    {
      heading: "Was diese Seite nicht tut",
      body: [
        "Diese Seite setzt keine Cookies, bindet keine Analyse- oder Trackingdienste ein und enthält keine Formulare. Es gibt keine Benutzerkonten und keine Newsletter-Anmeldung.",
        "Auch Schriften werden nicht von einem fremden Server geladen: Sie liegen beim Erzeugen der Seite mit im Auslieferungspaket. Beim Aufruf entsteht damit keine Verbindung zu Dritten.",
      ],
    },
    {
      heading: "Server-Logdateien",
      body: [
        `Beim Abruf der Seite verarbeitet der Hoster (${HOST}) technisch notwendige Zugriffsdaten: IP-Adresse des anfragenden Geräts, Zeitpunkt der Anfrage, aufgerufene Adresse, übertragene Datenmenge, Referrer und Angaben zu Browser und Betriebssystem.`,
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO — das berechtigte Interesse am sicheren und störungsfreien Betrieb. Die Daten werden nach 30 Tagen gelöscht und nicht mit anderen Quellen zusammengeführt.",
      ],
    },
    {
      heading: "Kontaktaufnahme",
      body: [
        "Schreibst du mir an die oben genannte Adresse, verarbeite ich deine Angaben ausschließlich zur Beantwortung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Die Nachrichten werden gelöscht, sobald sie nicht mehr benötigt werden und keine Aufbewahrungspflicht entgegensteht.",
      ],
    },
    {
      heading: "Deine Rechte",
      body: [
        "Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung, auf Datenübertragbarkeit sowie ein Widerspruchsrecht gegen Verarbeitungen auf Grundlage berechtigter Interessen. Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.",
        "Außerdem steht dir ein Beschwerderecht bei einer Aufsichtsbehörde zu — zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.",
      ],
    },
  ],
} as const;
