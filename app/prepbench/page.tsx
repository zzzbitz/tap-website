import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import {
  ComplementaryProject,
  DetailSection,
  ProjectHero,
} from '@/components/tap/project-layout';
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
      <ProjectHero
        project={project}
        context="PrepBench evaluates three abilities: clarifying ambiguous requests, generating code that handles messy tables, and translating that code into inspectable, executable workflows."
      />

      <PrepCapabilities />

      <DetailSection
        id="prepbench-conversation"
        label="An evaluation example"
        title="An agent prepares. PrepBench checks."
        description="Explore a refund example. You provide the simulated user’s answer; the agent prepares the table for evaluation."
      >
        <EvaluationRoles />
        <GuidedConversation project="prepbench" />
      </DetailSection>

      <DetailSection
        id="prepbench-example"
        label="The problem"
        title="What makes data preparation hard?"
        description="An agent must match columns, fix inconsistent values, and clarify missing rules. For example, should duplicate registrations count once or twice?"
      >
        <PaperFigure
          src={sitePath('/figures/prepbench-example.png')}
          width={2016}
          height={984}
          title="From raw registration tables to a preparation task"
          alt="PrepBench Figure 1: two registration tables, a prepared table, a graphical operator workflow, and a natural-language request with generated code. Duplicate attendee handling is an unresolved choice in the request."
          caption="The example connects imperfect input tables with the operations needed to prepare them. Handling duplicate attendee records is one choice that changes the meaning of the result."
          source={project.paper}
          figureNumber={1}
        />
      </DetailSection>

      <DetailSection
        id="prepbench-evaluation"
        label="The method"
        title="How PrepBench evaluates agents."
        description="The agent receives a request and input tables, asks questions when needed, and prepares the data. PrepBench then checks the output tables."
      >
        <PaperFigure
          src={sitePath('/figures/prepbench-evaluation.png')}
          width={1928}
          height={1028}
          title="The paper’s experimental setup"
          alt="PrepBench Figure 4: source and constructed benchmark assets; interactive disambiguation, prep-code generation, and code-to-workflow translation; and the paper’s evaluation metrics."
          caption="This original figure organizes the paper’s assets, experimental modes, and metrics. Current public execution modes and setup are described in the repository’s evaluation documentation."
          source={project.paper}
          figureNumber={4}
        />
        <p className="scope-note">
          <strong>You supply the agent.</strong> PrepBench provides evaluation
          assets. Results describe agent performance on the benchmark’s
          preparation tasks.{' '}
          <a href={project.evaluation}>Read the current evaluation guide.</a>
        </p>
      </DetailSection>

      <DetailSection
        id="prepbench-results"
        label="The results"
        title="How accurate are the agents?"
        description="Compare accuracy and cost for 10 models. Switch between code and graphical workflows."
      >
        <div
          className="research-findings"
          aria-label="Main findings from the PrepBench paper"
        >
          <p className="eyebrow">What the experiments reveal</p>
          <p>
            <strong>Ambiguity is a major bottleneck.</strong> GPT-5.1-Codex
            improves from 54.9% to 85.3% prep-code accuracy when requirements
            are disambiguated.
          </p>
          <p>
            <strong>More questions do not guarantee clarity.</strong> Agents
            often miss important ambiguities or ask ineffective questions.
            Correct code can still become an incorrect workflow.
          </p>
          <span className="finding-source">Paper · Sections 5.3–5.6</span>
        </div>
        <PrepBenchResults />
      </DetailSection>

      <DetailSection
        id="prepbench-dataset"
        label="The dataset"
        title="306 data preparation tasks."
        description="Based on the Preppin’ Data challenges, the tasks vary in table size, unclear requirements, and required operations."
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
          title="A closer look at the tasks"
          alt="PrepBench Figure 3: six plots showing distributions of table counts, ambiguity counts, preparation steps, row counts, lines of code, and operator counts."
          caption="The distributions show variation in data volume and task complexity across the benchmark, from the number of input tables to the operations needed to prepare them."
          source={project.paper}
          figureNumber={3}
        />
      </DetailSection>

      <DetailSection
        id="prepbench-resources"
        label="Work with PrepBench"
        title="Test your agent with PrepBench."
      >
        <div className="detail-resource-links">
          <ResourceLink
            href={project.dataset}
            title="Dataset documentation"
            description="Understand the cases, input tables, and dataset organization."
          />
          <ResourceLink
            href={project.evaluation}
            title="Evaluation documentation"
            description="Follow the current setup and execution instructions."
          />
          <ResourceLink
            href={project.code}
            title="Code repository"
            description="Explore the benchmark implementation and evaluation assets."
          />
          <ResourceLink
            href={project.contribute}
            title="Contribution guide"
            description="Find the repository’s process for contributing to PrepBench."
          />
        </div>
      </DetailSection>

      <PaperCitation project="prepbench" />

      <ComplementaryProject
        project={projects.cleanagent}
        description="See how CleanAgent uses Dataprep.Clean to make data formats consistent."
      />
    </main>
  );
}
