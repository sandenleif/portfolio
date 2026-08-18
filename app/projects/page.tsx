import type { Metadata } from "next";

import { PageShell, Row } from "@/components/ui";
import { career, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work — what it was, and what I contributed.",
};

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="Selected work from the past few years. What it was, what I worked on, and what has lasted."
    >
      <ul>
        {projects.map((project, index) => (
          <Row
            key={project.title}
            href={project.href}
            title={project.title}
            meta={project.period}
            description={`${project.role} · ${project.description}`}
            index={index}
          />
        ))}
      </ul>

      <h2 className="label mt-24 mb-2">Career</h2>
      <ul>
        {career.map((position, index) => (
          <Row
            key={`${position.company}-${position.period}`}
            href={position.href}
            title={position.company}
            meta={position.period}
            description={position.role}
            index={index}
          />
        ))}
      </ul>
    </PageShell>
  );
}
