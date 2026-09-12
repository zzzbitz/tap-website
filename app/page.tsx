import type { Metadata } from 'next';
import { siteOrigin, projects } from '@/lib/tap-content';
import { sitePath } from '@/lib/site-path';
import { PreparationExample } from '@/components/tap/preparation-example';
import { PaperFigure } from '@/components/tap/paper-figure';

export const metadata: Metadata = {
  alternates: { canonical: siteOrigin + '/' },
};

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const { prepbench, cleanagent } = projects;

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="prospectus-hero" aria-labelledby="hero-title">
        <div className="prospectus-hero-inner shell">
          <div className="hero-copy" data-reveal>
            <p className="hero-kicker">TAP / VISION</p>
            <h1 id="hero-title">
              Trust AI
              <br />
              <em>to prepare your data.</em>
            </h1>
            <p className="hero-lede">
              The missing layer between a human question and a table you can
              trust.
            </p>
            <div className="hero-actions">
              <a className="hero-action-primary" href="#thesis">
                See the vision <span aria-hidden="true">↓</span>
              </a>
              <a className="hero-action-secondary" href="#evidence">
                Explore the research <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-board" data-reveal data-reveal-delay="1" aria-label="TAP research program in one view">
            <div className="board-topline">
              <span>THE PREPARATION LAYER</span>
              <span>01 / 03</span>
            </div>
            <div className="board-path">
              <div>
                <span className="board-index">01</span>
                <strong>Human intent</strong>
                <small>What should count?</small>
              </div>
              <span className="board-line" aria-hidden="true" />
              <div>
                <span className="board-index">02</span>
                <strong>AI preparation</strong>
                <small>Ask · transform · explain</small>
              </div>
              <span className="board-line" aria-hidden="true" />
              <div className="board-result">
                <span className="board-index">03</span>
                <strong>Trustworthy table</strong>
                <small>Ready for analysis</small>
              </div>
            </div>
            <div className="board-foot">
              <span>OPEN RESEARCH</span>
              <span>MEASURABLE PROGRESS</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll shell" aria-hidden="true">
          <span>Our vision</span>
          <span>↓</span>
        </div>
      </section>

      <section id="thesis" className="thesis-section shell" aria-labelledby="thesis-title">
        <div className="section-marker" data-reveal>
          <span>01</span>
          <span>THE VISION</span>
        </div>
        <div className="thesis-intro" data-reveal>
          <h2 id="thesis-title">Data preparation is where trust begins.</h2>
          <p>
            People know the question they want to answer. The hard part is
            turning that intent into consistent, analysable data without
            hiding the decisions made along the way.
          </p>
        </div>
        <div className="thesis-grid">
          <article data-reveal>
            <span className="thesis-number">01</span>
            <h3>Make intent explicit.</h3>
            <p>
              AI should surface the choices that change the meaning of a
              result, instead of guessing past them.
            </p>
          </article>
          <article data-reveal data-reveal-delay="1">
            <span className="thesis-number">02</span>
            <h3>Turn messy inputs into evidence.</h3>
            <p>
              Preparation is a reasoning task: understand the request, inspect
              the tables, and produce a result people can check.
            </p>
          </article>
          <article data-reveal data-reveal-delay="2">
            <span className="thesis-number">03</span>
            <h3>Measure the gap.</h3>
            <p>
              Reliable systems need benchmarks and open implementations that
              make progress visible before deployment.
            </p>
          </article>
        </div>
      </section>

      <PreparationExample />

      <section id="evidence" className="evidence-section" aria-labelledby="evidence-title">
        <div className="shell">
          <div className="section-marker" data-reveal>
            <span>02</span>
            <span>THE RESEARCH</span>
          </div>
          <div className="evidence-heading" data-reveal>
            <h2 id="evidence-title">Two research directions toward the same vision.</h2>
            <p>
              One project measures whether agents can prepare data correctly.
              The other explores how agents can standardize messy values with
              reusable tools. Both are grounded in public papers and code.
            </p>
          </div>

          <div className="evidence-metrics" data-reveal>
            <div><strong>2</strong><span>research projects</span></div>
            <div><strong>306</strong><span>PrepBench cases</span></div>
            <div><strong>829</strong><span>input tables</span></div>
            <div><strong>OPEN</strong><span>papers + code</span></div>
          </div>

          <div className="evidence-projects">
            <article className="evidence-project evidence-project-blue" data-reveal>
              <div className="evidence-project-copy">
                <p className="project-label">PREPBENCH / VLDB 2026</p>
                <h3>{prepbench.question}</h3>
                <p>
                  A benchmark built from real data-preparation tasks. It tests
                  whether an agent can understand a request, resolve ambiguity,
                  and produce the right output table.
                </p>
                <div className="project-proof">
                  <span><strong>306</strong> cases</span>
                  <span><strong>829</strong> input tables</span>
                </div>
                <div className="project-links">
                  <a className="project-link-primary" href={prepbench.paper} target="_blank" rel="noreferrer">
                    Read the paper <ExternalArrow />
                  </a>
                  <a href={prepbench.code} target="_blank" rel="noreferrer">
                    Open code <ExternalArrow />
                  </a>
                </div>
              </div>
              <div className="evidence-project-visual">
                <PaperFigure
                  src={sitePath('/figures/prepbench-evaluation.png')}
                  width={1928}
                  height={1028}
                  title="PrepBench evaluation framework"
                  alt="PrepBench Figure 4: benchmark assets, interactive disambiguation, prep-code generation, code-to-workflow translation, and evaluation metrics."
                  caption="The benchmark separates the agent's work from the checks that establish whether the output is right."
                  source={prepbench.paper}
                  figureNumber={4}
                />
              </div>
            </article>

            <article className="evidence-project evidence-project-green" data-reveal>
              <div className="evidence-project-copy">
                <p className="project-label">CLEANAGENT / DATAAI @ VLDB 2025</p>
                <h3>{cleanagent.question}</h3>
                <p>
                  An agent framework that combines column-type annotation,
                  reusable cleaning functions, generated Python, and execution
                  feedback to standardize inconsistent data.
                </p>
                <div className="project-proof">
                  <span><strong>4</strong> cooperating roles</span>
                  <span><strong>OPEN</strong> implementation</span>
                </div>
                <div className="project-links">
                  <a className="project-link-primary" href={cleanagent.paper} target="_blank" rel="noreferrer">
                    Read the paper <ExternalArrow />
                  </a>
                  <a href={cleanagent.code} target="_blank" rel="noreferrer">
                    Open code <ExternalArrow />
                  </a>
                </div>
              </div>
              <div className="evidence-project-visual">
                <PaperFigure
                  src={sitePath('/figures/cleanagent-workflow.png')}
                  width={968}
                  height={624}
                  title="CleanAgent workflow"
                  alt="CleanAgent Figure 2: a Chat Manager coordinates column-type annotation, Python generation, and execution with feedback."
                  caption="A feedback loop turns a natural-language request into type-specific cleaning calls."
                  source={cleanagent.paper}
                  figureNumber={2}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="closing-section shell" aria-labelledby="closing-title">
        <div className="section-marker" data-reveal>
          <span>03</span>
            <span>KEEP READING</span>
        </div>
        <div className="closing-grid">
          <div data-reveal>
            <h2 id="closing-title">Read the work. Build on it.</h2>
            <p>
              TAP stays close to the evidence: published papers, reproducible
              code, and benchmarks that make the next improvement concrete.
            </p>
          </div>
          <div className="closing-links" data-reveal data-reveal-delay="1">
            <a href={prepbench.paper} target="_blank" rel="noreferrer">PrepBench paper <ExternalArrow /></a>
            <a href={cleanagent.paper} target="_blank" rel="noreferrer">CleanAgent paper <ExternalArrow /></a>
            <a href={prepbench.code} target="_blank" rel="noreferrer">PrepBench repository <ExternalArrow /></a>
            <a href={cleanagent.code} target="_blank" rel="noreferrer">CleanAgent repository <ExternalArrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
