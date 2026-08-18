# Portfolio

Ein Portfolio in der Formensprache von [rauno.me](https://rauno.me): graues
Papier, weiße Tafeln, Helvetica im Plakatformat, vier ungemischte Farben und
eine Startseite, durch die man waagerecht blättert.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion · Lenis ·
Radix UI · MDX

Die Seite selbst ist auf Englisch (`<html lang="en">`); Kommentare im Code und
diese Dokumentation sind auf Deutsch.

## Loslegen

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build (alle Seiten statisch)
npm run lint
```

## Die Gestaltung in vier Sätzen

**Papier und Tafeln.** Der Hintergrund ist grau (`--paper` auf der Startseite,
`--bg` innen), die Inhalte sitzen auf weißen Flächen mit einer Haarlinie statt
eines Rahmens. Der Kontrast der beiden Grautöne trägt das Layout — es gibt fast
keine Ränder.

**Eine Schriftgröße pro Zweck.** Plakatschrift (`.display`) für Titel und
einzelne Wörter, 15 px für Fließtext, 11 px (`.label`) für alles Beschriftende.
Dazwischen nichts.

**Vier Farben, ungemischt.** Gelb, Orange, Blau, Rot — immer flächig, nie als
Verlauf, meist mit `mix-blend-multiply`, damit Schrift durch die Fläche
hindurch lesbar bleibt.

**Bewegung erklärt, sie schmückt nicht.** Federn für alles, was einer Geste
folgt; Kurven für alles, was von selbst passiert. Sämtliche Animationen
respektieren `prefers-reduced-motion`.

## Aufbau

**Startseite** — eine waagerechte Leinwand aus Tafeln: Titelplakat mit gelber
Fläche, die dem Zeiger nachfedert; drei Plakatwörter, die absichtlich über den
Kartenrand hinauslaufen; das Manifest; die Kontakttafel. Das Mausrad wird auf
die X-Achse übersetzt und von [Lenis](https://lenis.darkroom.engineering)
geglättet, die Pfeiltasten springen von Kante zu Kante.

**Navigation** — kein Menü, sondern eine Skala: ein Kästchen pro Abschnitt, das
aktuelle gelb gefüllt. Beschriftet wird erst beim Zeigen (Radix Tooltip).

**Photography** — Spaltenlayout, damit Hoch- und Querformate lückenlos
nebeneinander stehen. Ein Klick öffnet die Lightbox (Radix Dialog, also mit
Fokusfalle und Escape); Pfeiltasten blättern, der Fokus kehrt beim Schließen
auf das angeklickte Bild zurück.

**Craft** — Raster aus Karten, jede mit einer lauffähigen Interaktion darin.

**Projekte / Notizen** — Zeilen mit Titel links, Zeitraum rechts, Haarlinie
dazwischen; beim Zeigen rückt der Titel ein und die Linie färbt sich.

## Inhalte anpassen

Alles Textliche steht an genau zwei Orten.

### `content/site.ts`

Name, Rolle, E-Mail, Links, Projekte, Werdegang, die Zeilen des Titelplakats
(`heroLines`), das Manifest und die Einträge der Craft-Seite.

In `heroLines` bestimmen die Umbrüche die Silhouette des Satzes — sie sind
gesetzt, nicht automatisch. Zeilen werden abwechselnd links und rechts
ausgerichtet, `[Text](href)` wird zum Link.

Wichtig: `site.url` auf die echte Domain setzen, bevor du deployst. Davon hängen
Open-Graph-Tags, `sitemap.xml` und `robots.txt` ab.

### `content/photos.ts`

Ein Eintrag pro Bild. Die Dateien liegen unter `public/photos/`, `src` ist der
Pfad ab `public`. `width` und `height` müssen den echten Pixelmaßen entsprechen
— daraus reserviert der Browser den Platz, bevor das Bild geladen ist, sonst
springt das Raster.

Die sechs mitgelieferten `placeholder-*.jpg` sind erzeugte Farbflächen, keine
Fotos. Ersetzen und die Liste anpassen.

### `content/notes/*.mdx`

Eine Datei pro Notiz, Dateiname = URL. Frontmatter:

```yaml
---
title: Motion that goes unnoticed # Pflicht
date: 2026-04-18 # Pflicht, YYYY-MM-DD, bestimmt die Sortierung
summary: Ein Satz für die Übersicht. # optional
tags: [Motion, Interface] # optional
draft: true # optional, nur im Dev-Server sichtbar
---
```

Zusätzlich zu Markdown stehen drei Komponenten bereit:

```mdx
<Callout>Ein hervorgehobener Hinweis.</Callout>

<Figure caption="Bildunterschrift">
  <Demo name="slider" />
</Figure>
```

## Craft-Demos

| Name       | Datei                | Worum es geht                                       |
| ---------- | -------------------- | --------------------------------------------------- |
| `dock`     | `magnetic-dock.tsx`  | Vergrößerung nach Zeigerabstand, nicht nach Hover    |
| `tabs`     | `exclusion-tabs.tsx` | Ein wandernder Indikator, der die Schrift invertiert |
| `command`  | `command-menu.tsx`   | Befehlsmenü mit Subsequenz-Suche und Tastaturführung |
| `slider`   | `elastic-slider.tsx` | Gummiband-Widerstand jenseits des Anschlags          |
| `checkbox` | `draw-checkbox.tsx`  | Haken wird gezeichnet statt eingeblendet             |
| `scramble` | `scramble-text.tsx`  | Text-Entschlüsselung über einen einzigen Intervall   |

Eine neue Demo hinzufügen:

1. Komponente in `components/crafts/` anlegen (`"use client"` nicht vergessen).
2. In `components/crafts/registry.tsx` unter einem Kurznamen eintragen.
3. In `content/site.ts` einen `craft`-Eintrag mit `demo: "<kurzname>"` ergänzen.

## Struktur

```
app/
  layout.tsx            Schriften, Metadaten, Navigation
  template.tsx          Aufblenden beim Seitenwechsel
  page.tsx              die waagerechte Leinwand
  craft/                Kartenraster mit lauffähigen Demos
  projects/  notes/     Zeilenlisten, Notizen zusätzlich als [slug]
  sitemap.ts robots.ts  aus content/site.ts erzeugt
components/
  home/                 Leinwand und Tafeln
  crafts/               die interaktiven Stücke + Registry
  nav.tsx               die Skala oben
  ui.tsx                PageShell, Row, Card, CardAction
content/
  site.ts               zentrale Konfiguration
  notes/                MDX-Artikel
lib/
  notes.ts              Frontmatter lesen, sortieren, Nachbarn finden
```

## Deployment

Der Build erzeugt ausschließlich statische Seiten und läuft ohne Anpassung auf
Vercel, Netlify oder jedem Static Host. Vor dem ersten Deploy `site.url` setzen
und optional `public/cv.pdf` hinterlegen (in `secondaryLinks` verlinkt).
