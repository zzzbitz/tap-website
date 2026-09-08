/* oxlint-disable nextjs/no-html-link-for-pages -- Static export uses native navigation to avoid vinext client-router errors. */
import type { ReactNode } from 'react';
import type { Project } from '@/lib/tap-content';
import { Arrow, TextLink } from '@/components/tap/primitives';

export function ProjectHero({
  project,
  context,
}: {
  project: Project;
  context: string;
}) {
  return (
    <header className="detail-hero">
      <a className="link-arrow back-link" href="/">
        <span aria-hidden="true">←</span> Back to TAP
      </a>
      <div className="detail-heading">
        <p className="eyebrow">{project.type}</p>
        <h1>{project.name}</h1>
        <p className="paper-title">{project.title}</p>
        <p className="paper-authors">{project.authors.join(' · ')}</p>
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
      <p className="project-context">{context}</p>
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
      <div className="detail-section-head">
        <p className="eyebrow">{label}</p>
        <h2 id={id}>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function ComplementaryProject({
  project,
  description,
}: {
  project: Project;
  description: string;
}) {
  return (
    <section className="complementary" aria-labelledby="complementary-title">
      <div>
        <p className="eyebrow">A complementary direction</p>
        <h2 id="complementary-title">{project.name}</h2>
        <p>{description}</p>
      </div>
      <TextLink href={project.href}>Explore {project.name}</TextLink>
    </section>
  );
}
