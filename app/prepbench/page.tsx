import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import { DetailSection, ProjectHero } from '@/components/tap/project-layout';
import { PaperFigure } from '@/components/tap/paper-figure';
import { PrepBenchResults } from '@/components/tap/paper-results';
import {
  PrepCapabilities,
  EvaluationRoles,
} from '@/components/tap/research-overview';
import { PaperCitation } from '@/components/tap/paper-citation';
import { GuidedConversation } from '@/components/tap/guided-conversation';
import { ResourceLink } from '@/components/tap/primitives';
import { projects, siteOrigin } from '@/lib/tap-content';

const project = projects.prepbench;

export const metadata: Metadata = {
  title: 'PrepBench — Evaluating AI Data Preparation',
  description:
    'PrepBench evaluates natural-language-driven data preparation with 306 cases and 829 input tables. VLDB 2026. Paper, code, dataset, and evaluation resources.',
  alternates: { canonical: siteOrigin + '/prepbench/' },
  openGraph: {
    title: project.title,
    description: project.summary,
    url: `${siteOrigin}/prepbench/`,
    type: 'article',
    siteName: 'TAP',
  },
};

export default function PrepBenchPage() {
  return (
    <main id="main-content" className="detail-page shell" tabIndex={-1}>
      <ProjectHero project={project} context={project.summary} />

      <PrepCapabilities />

      <DetailSection
        id="prepbench-conversation"
        label="Interactive disambiguation"
        title="Clarifying a refund rule"
      >
        <EvaluationRoles />
        <GuidedConversation project="prepbench" />
      </DetailSection>

      <DetailSection
        id="prepbench-example"
        title="From a request to a prepared table"
        description="User requests can be ambiguous, and input tables may contain mismatched schemas or inconsistent values. Even correct preparation code can be difficult for users to verify."
      >
        <PaperFigure
          src={sitePath('/figures/prepbench-example.png')}
          width={2016}
          height={984}
          title="GUI-driven and natural-language-driven data preparation"
          alt="PrepBench Figure 1: two registration tables, a prepared table, a graphical operator workflow, and a natural-language request with generated code. Duplicate attendee handling is an unresolved choice in the request."
          caption="Users can define transformations with graphical operators or describe their requirements in natural language. In the latter setting, an agent generates the preparation code."
          source={project.paper}
          figureNumber={1}
        />
      </DetailSection>

      <DetailSection
        id="prepbench-evaluation"
        title="The evaluation setup"
        description="The agent receives a request and input tables, asks questions when needed, and prepares the data. PrepBench then checks the output tables."
      >
        <PaperFigure
          src={sitePath('/figures/prepbench-evaluation.png')}
          width={1928}
          height={1028}
          title="The paper’s experimental setup"
          alt="PrepBench Figure 4: source and constructed benchmark assets; interactive disambiguation, prep-code generation, and code-to-workflow translation; and the paper’s evaluation metrics."
          caption="The paper’s assets, evaluation modes, and metrics. See the repository’s evaluation documentation for current execution instructions."
          source={project.paper}
          figureNumber={4}
        />
        <p className="scope-note">
          <strong>You supply the agent.</strong> PrepBench supplies the tasks
          and evaluates the outputs.
        </p>
      </DetailSection>

      <DetailSection
        id="prepbench-results"
        title="Accuracy and cost"
        description="Compare accuracy and cost for 10 models. Switch between code and graphical workflows."
      >
        <div
          className="research-findings"
          aria-label="Main findings from the PrepBench paper"
        >
          <p>
            <strong>Ambiguity is a major bottleneck.</strong> GPT-5.1-Codex
            improves from 54.9% to 85.3% prep-code accuracy when requirements
            are disambiguated.
          </p>
          <p>
            <strong>
              Interaction helps, but questions can be incomplete or ineffective.
            </strong>{' '}
            Agents also struggle to translate correct preparation code into
            workflows that perform the intended transformations.
          </p>
          <span className="finding-source">Paper · Sections 5.3–5.6</span>
        </div>
        <PrepBenchResults />
      </DetailSection>

      <DetailSection
        id="prepbench-dataset"
        title="306 tasks from Preppin’ Data"
        description="Tasks vary in table size, ambiguous requirements, and required operations."
      >
        <dl className="dataset-facts">
          <div>
            <dt>cases</dt>
            <dd>306</dd>
          </div>
          <div>
            <dt>input tables</dt>
            <dd>829</dd>
          </div>
        </dl>
        <PaperFigure
          src={sitePath('/figures/prepbench-statistics.png')}
          width={940}
          height={396}
          title="Task statistics"
          alt="PrepBench Figure 3: six plots showing distributions of table counts, ambiguity counts, preparation steps, row counts, lines of code, and operator counts."
          caption="Distributions of table counts, ambiguity counts, preparation steps, row counts, code length, and operator counts."
          source={project.paper}
          figureNumber={3}
        />
      </DetailSection>

      <DetailSection id="prepbench-resources" title="Use PrepBench">
        <div className="detail-resource-links">
          <ResourceLink href={project.dataset} title="Dataset documentation" />
          <ResourceLink
            href={project.evaluation}
            title="Evaluation documentation"
          />
          <ResourceLink href={project.contribute} title="Contribution guide" />
        </div>
      </DetailSection>

      <PaperCitation project="prepbench" />
    </main>
  );
}
