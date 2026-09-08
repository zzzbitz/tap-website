import { siteOrigin } from '@/lib/site-path';
import type { Metadata } from 'next';
import { PreparationExample } from '@/components/tap/preparation-example';
import {
  PrepCapabilities,
  CleanMethodOverview,
} from '@/components/tap/research-overview';
import { ResourceLink, TextLink } from '@/components/tap/primitives';
import { projects } from '@/lib/tap-content';

export const metadata: Metadata = {
  alternates: { canonical: siteOrigin + '/' },
};

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
            Describe the data you need—not every step to prepare it.
          </strong>
        </p>
        <p className="hero-research-context">
          TAP is a research initiative toward AI that turns raw tables into
          analysis-ready data, clarifies ambiguous requirements, and makes
          transformations easier to check. We develop methods and benchmarks
          toward this goal.
        </p>
        <a href="#research" className="button-link">
          Explore the research <span aria-hidden="true">↓</span>
        </a>
      </section>

      <div className="research-goals shell" aria-label="TAP research goals">
        <div>
          <span>01 / Clarify intent</span>
          <p>Ask about important requirements before choosing a rule.</p>
        </div>
        <div>
          <span>02 / Inspect the process</span>
          <p>Make the transformations easier for people to check.</p>
        </div>
        <div>
          <span>03 / Evaluate the result</span>
          <p>Test whether the prepared tables match the intended output.</p>
        </div>
      </div>
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
              Build better agents.
              <br />
              <span>Test their results.</span>
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
              <PrepCapabilities compact />
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
              <CleanMethodOverview />
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
