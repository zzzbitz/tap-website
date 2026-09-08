import { siteOrigin, sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import { PreparationExample } from '@/components/tap/preparation-example';
import { PaperFigure } from '@/components/tap/paper-figure';
import { TextLink } from '@/components/tap/primitives';
import { projects } from '@/lib/tap-content';

export const metadata: Metadata = {
  alternates: { canonical: siteOrigin + '/' },
};

export default function Home() {
  const { prepbench, cleanagent } = projects;
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero shell" aria-labelledby="hero-title">
        <p className="eyebrow">Research on AI and data preparation</p>
        <h1 id="hero-title">
          Trust AI to <span>Prepare Your Data</span>
        </h1>
        <p className="hero-summary">
          We study how AI can turn a request and a set of tables into data ready
          for analysis.
        </p>
        <a href="#research" className="hero-research-link link-arrow">
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
          <div className="section-intro research-intro" data-reveal>
            <h2 id="research-title">Research</h2>
            <p>Benchmarks and methods for data preparation.</p>
          </div>
          <article
            className="research-feature illustrated-feature prepbench-feature"
            aria-labelledby="prepbench-title"
          >
            <div className="feature-copy" data-reveal>
              <div className="feature-heading">
                <p className="project-name">PrepBench</p>
                <p className="feature-meta">Benchmark · {prepbench.venue}</p>
                <div className="feature-visual" data-reveal>
                  <PaperFigure
                    src={sitePath('/figures/prepbench-evaluation.png')}
                    width={1928}
                    height={1028}
                    title="PrepBench evaluation framework"
                    alt="PrepBench Figure 4: benchmark assets, interactive disambiguation, prep-code generation, code-to-workflow translation, and the metrics used to evaluate each capability."
                    caption="Benchmark assets, three evaluation modes, and their metrics."
                    source={prepbench.paper}
                    figureNumber={4}
                  />
                </div>
                <h3 id="prepbench-title">{prepbench.question}</h3>
              </div>
              <div className="feature-description">
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
            </div>
          </article>
          <article
            className="research-feature illustrated-feature cleanagent-feature"
            aria-labelledby="cleanagent-title"
          >
            <div className="feature-copy" data-reveal>
              <div className="feature-heading">
                <p className="project-name">CleanAgent</p>
                <p className="feature-meta">
                  Agent framework · {cleanagent.venue}
                </p>
                <div className="feature-visual" data-reveal>
                  <PaperFigure
                    src={sitePath('/figures/cleanagent-workflow.png')}
                    width={968}
                    height={624}
                    title="CleanAgent workflow"
                    alt="CleanAgent Figure 2: a Chat Manager coordinates the Column-type Annotator, Python Programmer using Dataprep.Clean, and Code Executor. Success or error feedback returns to the manager."
                    caption="A Chat Manager coordinates type annotation, Python generation, and execution with success or error feedback."
                    source={cleanagent.paper}
                    figureNumber={2}
                  />
                </div>
                <h3 id="cleanagent-title">{cleanagent.question}</h3>
              </div>
              <div className="feature-description">
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
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
