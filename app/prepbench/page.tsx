import type { Metadata } from 'next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ComplementaryProject,
  DetailSection,
  ProcessDiagram,
  ProjectHero,
} from '@/components/tap/project-layout';
import { ResourceLink } from '@/components/tap/primitives';
import { projects, siteOrigin } from '@/lib/tap-content';

const project = projects.prepbench;

export const metadata: Metadata = {
  title: 'PrepBench — Evaluating AI Data Preparation',
  description:
    'PrepBench evaluates natural-language-driven data preparation with 306 cases and 829 input tables. VLDB 2026 (PVLDB Volume 19). Paper, code, dataset, and evaluation resources.',
  alternates: { canonical: '/prepbench' },
  openGraph: {
    title: project.title,
    description: project.summary,
    url: `${siteOrigin}/prepbench`,
    type: 'article',
    siteName: 'TAP',
  },
};

export default function PrepBenchPage() {
  return (
    <main id="main-content" className="shell" tabIndex={-1}>
      <ProjectHero
        project={project}
        direction="Measuring the progress"
        context="A benchmark for asking whether an agent actually prepares the right data."
      />

      <DetailSection
        id="prepbench-overview"
        number="01 / The research question"
        title="From a request to the right result."
      >
        <p className="intro-paragraph">
          An agent can produce a plausible answer and still prepare the wrong
          data. PrepBench asks how well agents turn a natural-language request
          and input tables into correct output tables.
        </p>
        <p>
          Within TAP’s broader research vision, PrepBench supplies a way to
          evaluate progress. It brings the intended result into focus: what data
          an agent produces, including when it needs clarification to understand
          the request.
        </p>
        <p>The benchmark builds on the Preppin’ Data challenges.</p>
        <div className="stats-table">
          <Table className="tap-table" aria-label="PrepBench dataset scale">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Cases</TableHead>
                <TableHead scope="col">Input tables</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="stat-value">306</span>
                </TableCell>
                <TableCell>
                  <span className="stat-value">829</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DetailSection>

      <DetailSection
        id="prepbench-method"
        number="02 / What the benchmark does"
        title="Evaluate the prepared data."
      >
        <p>
          Each case starts with a preparation request and input tables. The
          agent performs the preparation, with clarification where applicable.
          Evaluation then examines the final output tables.
        </p>
        <ProcessDiagram
          label="PrepBench evaluation process"
          steps={[
            {
              title: 'Request + tables',
              description:
                'Start from the natural-language preparation task and its source data.',
            },
            {
              title: 'Your agent prepares',
              description:
                'Resolve the request, clarify when applicable, and transform the data.',
            },
            {
              title: 'Evaluate the output',
              description:
                'Assess the final tables using the benchmark’s evaluation assets.',
            },
          ]}
        />
        <p className="diagram-caption">
          Conceptual evaluation flow. Refer to the evaluation documentation for
          current execution modes and setup.
        </p>
        <div className="scope-note">
          <strong>You supply the agent.</strong>PrepBench provides evaluation
          assets. Results describe agent performance on the benchmark’s
          preparation tasks.
        </div>
      </DetailSection>

      <DetailSection
        id="prepbench-resources"
        number="03 / Work with PrepBench"
        title="Bring your agent. Start here."
      >
        <div className="resource-list detail-resources">
          <ResourceLink
            href={project.dataset}
            title="Dataset documentation"
            description="Understand the cases, input tables, and dataset organization."
          />
          <ResourceLink
            href={project.evaluation}
            title="Evaluation documentation"
            description="Follow the current evaluation setup and execution instructions."
          />
          <ResourceLink
            href={project.code}
            title="Code repository"
            description="Explore the public benchmark implementation and assets."
          />
          <ResourceLink
            href={project.contribute}
            title="Contribution guide"
            description="Find the repository’s process for contributing to PrepBench."
          />
        </div>
      </DetailSection>

      <ComplementaryProject
        project={projects.cleanagent}
        description="CleanAgent explores the capability side: using language models and Dataprep.Clean to automate column-format standardization. The two projects address complementary questions within TAP."
      />
    </main>
  );
}
