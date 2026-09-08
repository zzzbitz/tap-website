import type { Metadata } from 'next';
import { PreparationExample } from '@/components/tap/preparation-example';
import {
  BenchmarkDiagram,
  StandardizationDiagram,
} from '@/components/tap/research-diagrams';
import { ResourceLink, TextLink } from '@/components/tap/primitives';
import { projects } from '@/lib/tap-content';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const { prepbench, cleanagent } = projects;
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero shell" aria-labelledby="hero-title">
        <p className="eyebrow">A research initiative</p>
        <h1 id="hero-title">
          Trust AI to <span>Prepare Your Data</span>
        </h1>
        <p className="hero-summary">
          <strong>
            We’re working toward AI that prepares data you can trust.
          </strong>{' '}
          Describe what you need, clarify the choices that matter, and get data
          ready for analysis.
        </p>
        <a href="#research" className="button-link">
          Explore the research <span aria-hidden="true">↓</span>
        </a>
      </section>

      <PreparationExample />

      <section
        id="research"
        className="research-section"
        aria-labelledby="research-title"
      >
        <div className="shell">
          <div className="section-intro centered research-intro">
            <p className="eyebrow">Two complementary directions</p>
            <h2 id="research-title">
              Building the capability.
              <br />
              <span>Measuring the progress.</span>
            </h2>
          </div>
          <article
            className="research-feature prepbench-feature"
            aria-labelledby="prepbench-title"
          >
            <div className="feature-copy">
              <p className="project-name">PrepBench</p>
              <p className="feature-meta">Benchmark · {prepbench.venue}</p>
              <h3 id="prepbench-title">{prepbench.question}</h3>
              <p className="feature-summary">{prepbench.summary}</p>
              <p className="feature-facts">
                <span>
                  <strong>306</strong> cases
                </span>
                <span>
                  <strong>829</strong> input tables
                </span>
              </p>
              <TextLink href={prepbench.href} className="feature-primary">
                Explore PrepBench
              </TextLink>
              <div className="feature-links">
                <TextLink href={prepbench.paper} external>
                  Paper
                </TextLink>
                <TextLink href={prepbench.code} external>
                  Code
                </TextLink>
              </div>
            </div>
            <div className="feature-visual">
              <BenchmarkDiagram />
            </div>
          </article>
          <article
            className="research-feature cleanagent-feature"
            aria-labelledby="cleanagent-title"
          >
            <div className="feature-copy">
              <p className="project-name">CleanAgent</p>
              <p className="feature-meta">
                Agent framework · {cleanagent.venue}
              </p>
              <h3 id="cleanagent-title">{cleanagent.question}</h3>
              <p className="feature-summary">{cleanagent.summary}</p>
              <TextLink href={cleanagent.href} className="feature-primary">
                Explore CleanAgent
              </TextLink>
              <div className="feature-links">
                <TextLink href={cleanagent.paper} external>
                  Paper
                </TextLink>
                <TextLink href={cleanagent.code} external>
                  Code
                </TextLink>
              </div>
            </div>
            <div className="feature-visual">
              <StandardizationDiagram />
            </div>
          </article>
        </div>
      </section>

      <section
        className="resources-section shell"
        aria-labelledby="resources-title"
      >
        <div className="section-intro centered">
          <p className="eyebrow">Read. Use. Contribute.</p>
          <h2 id="resources-title">Build on the research.</h2>
        </div>
        <div className="resource-links">
          <ResourceLink
            href={prepbench.evaluation}
            title="Evaluate your agent"
            description="Start with the PrepBench evaluation guide."
          />
          <ResourceLink
            href={cleanagent.code}
            title="Explore CleanAgent"
            description="Read the implementation and setup instructions."
          />
          <ResourceLink
            href={prepbench.contribute}
            title="Contribute to PrepBench"
            description="Follow the repository’s contribution guide."
          />
        </div>
      </section>
    </main>
  );
}
