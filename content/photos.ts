/**
 * Die Bilder der Fotoseite.
 *
 * Dateien liegen unter `public/photos/`, `src` ist der Pfad ab `/public`.
 * `width` und `height` müssen den echten Pixelmaßen entsprechen — daraus
 * berechnet der Browser den Platz, bevor das Bild geladen ist, sonst
 * springt das Raster beim Laden.
 *
 * ACHTUNG: Die sechs `placeholder-*.jpg` sind erzeugte Farbflächen, keine
 * Fotos. Ersetzen und diese Liste entsprechend anpassen.
 */

export type Photo = {
  src: string;
  /** Bildbeschreibung für Screenreader — beschreibt das Motiv, nicht den Titel. */
  alt: string;
  width: number;
  height: number;
  title?: string;
  year?: string;
  location?: string;
};

export const photos: Photo[] = [
  {
    src: "/photos/placeholder-01.jpg",
    alt: "Orangefarbener Kreis auf dunkelgrauem Verlauf",
    width: 1200,
    height: 800,
    title: "Placeholder I",
    year: "2026",
    location: "Pforzheim",
  },
  {
    src: "/photos/placeholder-02.jpg",
    alt: "Heller Verlauf in Sand- und Grautönen, hochformat",
    width: 800,
    height: 1200,
    title: "Placeholder II",
    year: "2026",
  },
  {
    src: "/photos/placeholder-03.jpg",
    alt: "Tiefblauer Verlauf mit gelbem Balken",
    width: 1200,
    height: 800,
    title: "Placeholder III",
    year: "2025",
    location: "Karlsruhe",
  },
  {
    src: "/photos/placeholder-04.jpg",
    alt: "Dunkelrote Fläche mit rotem Kreis, quadratisch",
    width: 1200,
    height: 1200,
    title: "Placeholder IV",
    year: "2025",
  },
  {
    src: "/photos/placeholder-05.jpg",
    alt: "Kühler Grauverlauf mit hellem Balken, hochformat",
    width: 800,
    height: 1200,
    title: "Placeholder V",
    year: "2025",
    location: "Stuttgart",
  },
  {
    src: "/photos/placeholder-06.jpg",
    alt: "Dunkelgrüner Verlauf mit gelbem Kreis",
    width: 1200,
    height: 800,
    title: "Placeholder VI",
    year: "2024",
  },
];
