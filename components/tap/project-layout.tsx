import type { ReactNode } from 'react';
import type { Project } from '@/lib/tap-content';
import { Arrow, TextLink } from '@/components/tap/primitives';

export function ProjectHero({
  project,
  direction,
  context,
}: {
  project: Project;
  direction: string;
  context: string;
}) {
  return (
    <header className="detail-hero">
      <a className="link-arrow back-link" href="/">
        <span aria-hidden="true">←</span> Back to TAP
      </a>
      <div className="detail-heading">
        <div>
          <p className="eyebrow blue">{project.type}</p>
          <h1>{project.name}</h1>
          <p className="paper-title">{project.title}</p>
          <p className="paper-authors">{project.authors.join(' · ')}</p>
          <p className="detail-venue">{project.venue}</p>
        </div>
        <aside className="detail-aside" aria-label="Role in TAP">
          <span className="eyebrow blue">{direction}</span>
          <p>{context}</p>
        </aside>
      </div>
      <div className="detail-actions">
        <a href={project.paper} className="button-link">
          Read the paper <Arrow external />
        </a>
        <a href={project.code} className="button-link secondary">
          View repository <Arrow external />
        </a>
      </div>
    </header>
  );
}

export function DetailSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="detail-section" aria-labelledby={id}>
      <div>
        <p className="eyebrow blue">{number}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="detail-content">{children}</div>
    </section>
  );
}

export function ProcessDiagram({
  label,
  steps,
}: {
  label: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <ol className="process-diagram" aria-label={label}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="stage-number" aria-hidden="true">
            0{index + 1}
          </span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <Arrow className="step-arrow" />
        </li>
      ))}
    </ol>
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
      <p className="eyebrow blue">A complementary direction</p>
      <div>
        <h2 id="complementary-title">{project.name}</h2>
        <p>{description}</p>
        <TextLink href={project.href}>Explore {project.name}</TextLink>
      </div>
    </section>
  );
}
