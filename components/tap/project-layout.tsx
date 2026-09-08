import { sitePath } from '@/lib/site-path';
/* oxlint-disable nextjs/no-html-link-for-pages -- Static export uses native navigation to avoid vinext client-router errors. */
import type { ReactNode } from 'react';
import type { Project } from '@/lib/tap-content';
import { Arrow } from '@/components/tap/primitives';

export function ProjectHero({
  project,
  context,
}: {
  project: Project;
  context: string;
}) {
  return (
    <header className="detail-hero">
      <a className="link-arrow back-link" href={sitePath('/')}>
        <span aria-hidden="true">←</span> Back to TAP
      </a>
      <div className="detail-heading">
        <p className="eyebrow">{project.type}</p>
        <h1>{project.name}</h1>
        <p className="paper-title">{project.title}</p>
        <p className="paper-authors">
          {project.authors.map((author, i) => (
            <span key={author}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <a href={project.authorLinks[author]}>{author}</a>
            </span>
          ))}
        </p>
        <p className="paper-affiliation">
          <span>Paper affiliation</span>
          {project.affiliation}
        </p>
        <p className="detail-venue">{project.venue}</p>
      </div>
      <div className="detail-actions">
        <a href={project.paper} className="button-link">
          Read the paper <Arrow external />
        </a>
        <a href={project.code} className="button-link secondary">
          View repository <Arrow external />
        </a>
      </div>
      <a
        className="citation-jump"
        href={`#${project.name.toLowerCase()}-citation`}
      >
        Cite this work
      </a>
      <p className="project-context">{context}</p>
      <nav
        className="project-jump-links"
        aria-label={`${project.name} page sections`}
      >
        <a href={`#${project.name.toLowerCase()}-conversation`}>
          {project.name === 'PrepBench'
            ? 'Explore an evaluation example'
            : 'Explore the method'}{' '}
          <span aria-hidden="true">↓</span>
        </a>
        <a href={`#${project.name.toLowerCase()}-results`}>
          Explore the results <span aria-hidden="true">↓</span>
        </a>
        {'video' in project && (
          <a href="#cleanagent-demonstration">
            Watch the demo <span aria-hidden="true">↓</span>
          </a>
        )}
      </nav>
    </header>
  );
}

export function DetailSection({
  id,
  label,
  title,
  description,
  children,
}: {
  id: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="detail-section" aria-labelledby={id}>
      <div className="detail-section-head" data-reveal>
        <p className="eyebrow">{label}</p>
        <h2 id={id}>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      <div className="detail-section-content" data-reveal>
        {children}
      </div>
    </section>
  );
}
