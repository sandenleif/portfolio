import { Canvas } from "@/components/home/canvas";
import { ContactPanel } from "@/components/home/contact-panel";
import { IntroPanel } from "@/components/home/intro-panel";
import { ManifestoPanel } from "@/components/home/manifesto-panel";
import { Panel } from "@/components/home/panel";
import { PosterPanel } from "@/components/home/poster-panel";
import { craft, projects, site } from "@/content/site";
import { getNotes } from "@/lib/notes";

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <Canvas>
      <Panel label={site.role} width={1060}>
        <IntroPanel />
      </Panel>

      <Panel label="Craft" width={620}>
        <PosterPanel
          word="Craft"
          href="/craft"
          accent="orange"
          shape="half"
          meta={`${craft.length} pieces, all of them live`}
        />
      </Panel>

      <Panel label="Projects" width={620}>
        <PosterPanel
          word="Projects"
          href="/projects"
          accent="yellow"
          shape="bar"
          meta={`${projects.length} selected pieces of work`}
        />
      </Panel>

      <Panel label="Notes" width={620}>
        <PosterPanel
          word="Notes"
          href="/notes"
          accent="blue"
          shape="circle"
          meta={`${notes.length} written so far`}
        />
      </Panel>

      <Panel label="Manifesto" width={780}>
        <ManifestoPanel />
      </Panel>

      <Panel label="Contact" width={700}>
        <ContactPanel />
      </Panel>
    </Canvas>
  );
}
