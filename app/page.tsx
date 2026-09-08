import type { Metadata } from 'next';
import { PreparationExample } from '@/components/tap/preparation-example';
import { Arrow, ResourceLink, TextLink } from '@/components/tap/primitives';
import { projects } from '@/lib/tap-content';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  const { prepbench, cleanagent } = projects;
  return (
    <main id="main-content" className="shell" tabIndex={-1}>
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow blue">
            A research initiative for AI + data preparation
          </p>
          <h1>
            <span>Trust AI to</span> <span>Prepare</span>{' '}
            <span className="editorial">Your Data</span>
          </h1>
          <p className="hero-lead">
            We build and evaluate AI systems that turn raw data and human intent
            into reliable, analysis-ready data.
          </p>
          <p className="hero-aspiration">
            Our goal is to let people focus on the questions they want to
            answer, with confidence in the data behind them.
          </p>
          <div className="hero-action">
            <a href="#research" className="button-link">
              Explore the research <Arrow />
            </a>
          </div>
        </div>
        <PreparationExample />
      </div>

      <section className="vision-note" aria-labelledby="vision-note-title">
        <h2 id="vision-note-title" className="eyebrow blue">
          The research objective
        </h2>
        <p>
          People define what matters. AI handles the preparation and asks about
          decisions that change the meaning of the result. The output should
          make important choices and unresolved issues visible.
        </p>
      </section>

      <section id="research" aria-labelledby="research-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow blue">
              Research / Two complementary directions
            </p>
            <h2 id="research-title">
              Building the capability. <span>Measuring the progress.</span>
            </h2>
          </div>
          <p>
            Different research questions.
            <br />A shared direction for data preparation.
          </p>
        </div>
        <article className="research-entry" aria-labelledby="prepbench-title">
          <span className="entry-number" aria-hidden="true">
            01 /
          </span>
          <div className="entry-title">
            <h3 id="prepbench-title">
              <a href={prepbench.href}>{prepbench.name}</a>
            </h3>
            <p className="entry-type">{prepbench.type}</p>
            <p className="entry-venue">{prepbench.venue}</p>
          </div>
          <div className="entry-body">
            <p className="entry-question">{prepbench.question}</p>
            <p className="entry-summary">{prepbench.summary}</p>
            <p className="entry-facts">
              <span>
                <strong>306</strong> cases
              </span>
              <span>
                <strong>829</strong> input tables
              </span>
            </p>
            <div className="entry-links">
              <TextLink href={prepbench.href} className="entry-primary">
                Explore PrepBench
              </TextLink>
              <TextLink href={prepbench.paper} external>
                Paper
              </TextLink>
              <TextLink href={prepbench.code} external>
                Code
              </TextLink>
            </div>
          </div>
        </article>
        <article
          className="research-entry cleanagent-entry"
          aria-labelledby="cleanagent-title"
        >
          <span className="entry-number" aria-hidden="true">
            02 /
          </span>
          <div className="entry-title">
            <h3 id="cleanagent-title">
              <a href={cleanagent.href}>{cleanagent.name}</a>
            </h3>
            <p className="entry-type">{cleanagent.type}</p>
            <p className="entry-venue">{cleanagent.venue}</p>
          </div>
          <div className="entry-body">
            <p className="entry-question">{cleanagent.question}</p>
            <p className="entry-summary">{cleanagent.summary}</p>
            <p className="mini-process">
              <span>Column types</span>
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
              <span>Dataprep.Clean calls</span>
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
              <span>Standardized output</span>
            </p>
            <div className="entry-links">
              <TextLink href={cleanagent.href} className="entry-primary">
                Explore CleanAgent
              </TextLink>
              <TextLink href={cleanagent.paper} external>
                Paper
              </TextLink>
              <TextLink href={cleanagent.code} external>
                Code
              </TextLink>
            </div>
          </div>
        </article>
      </section>

      <section className="resources-section" aria-labelledby="resources-title">
        <div className="resources-intro">
          <p className="eyebrow blue">Read. Use. Contribute.</p>
          <h2 id="resources-title">
            Take the next
            <br />
            research step.
          </h2>
          <p>
            Evaluate your agent, explore an implementation, or contribute to the
            benchmark.
          </p>
        </div>
        <div className="resource-list">
          <ResourceLink
            href={prepbench.evaluation}
            title="Evaluate with PrepBench"
            description="Bring your agent. Start with the evaluation guide."
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
