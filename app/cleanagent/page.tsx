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

const project = projects.cleanagent;

export const metadata: Metadata = {
  title: 'CleanAgent — Automating Data Standardization',
  description:
    'CleanAgent combines LLM-based agents with Dataprep.Clean to automate data standardization. DataAI Workshop @ VLDB 2025. Paper, code, and repository demonstration.',
  alternates: { canonical: '/cleanagent' },
  openGraph: {
    title: project.title,
    description: project.summary,
    url: `${siteOrigin}/cleanagent`,
    type: 'article',
    siteName: 'TAP',
  },
};

export default function CleanAgentPage() {
  return (
    <main id="main-content" className="shell" tabIndex={-1}>
      <ProjectHero
        project={project}
        direction="Building the capability"
        context="An agent framework that reduces the manual coding involved in data standardization."
      />

      <DetailSection
        id="cleanagent-overview"
        number="01 / The research question"
        title="Less repetitive standardization work."
      >
        <p className="intro-paragraph">
          Heterogeneous column formats turn routine preparation into repeated
          coding. CleanAgent connects language models with Dataprep.Clean so an
          agent can express standardization through concise library calls.
        </p>
        <p>
          This is one concrete contribution toward TAP’s vision: helping AI
          carry out the mechanical work of preparing data. The research focuses
          on standardizing column formats, with a framework that annotates
          types, generates calls, and executes them.
        </p>
        <div className="scope-note">
          <strong>Research scope: data standardization.</strong>CleanAgent
          explores a specific preparation capability. It studies how agents
          standardize heterogeneous column formats using Dataprep.Clean.
        </div>
      </DetailSection>

      <DetailSection
        id="cleanagent-method"
        number="02 / How it works"
        title="From column types to concise calls."
      >
        <p>
          Column-type annotation guides which standardization operations to use.
          The language model generates concise calls to Dataprep.Clean, which
          are executed to produce standardized output.
        </p>
        <ProcessDiagram
          label="CleanAgent standardization process"
          steps={[
            {
              title: 'Annotate column types',
              description:
                'Identify the types that guide standardization of each column.',
            },
            {
              title: 'Generate library calls',
              description:
                'Express the required operations with concise Dataprep.Clean calls.',
            },
            {
              title: 'Execute + standardize',
              description:
                'Run the generated calls and return the standardized table.',
            },
          ]}
        />
        <div className="definition-table">
          <Table className="tap-table" aria-label="Roles in CleanAgent">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Component</TableHead>
                <TableHead scope="col">Role in standardization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Language models</TableCell>
                <TableCell>
                  Annotate column types and generate concise standardization
                  calls.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dataprep.Clean</TableCell>
                <TableCell>
                  Provide the library operations used to standardize column
                  formats.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DetailSection>

      <DetailSection
        id="cleanagent-resources"
        number="03 / Explore the work"
        title="Paper. Implementation. Demonstration."
      >
        <p>
          Presented at the DataAI Workshop @ VLDB 2025. The arXiv paper was
          first submitted in 2024.
        </p>
        <div className="resource-list detail-resources">
          <ResourceLink
            href={project.paper}
            title="Read the paper"
            description="The framework, motivation, and technical scope on arXiv."
          />
          <ResourceLink
            href={project.code}
            title="Code repository"
            description="Explore the implementation and local setup instructions."
          />
          <ResourceLink
            href={project.demonstration}
            title="Repository demonstration"
            description="View the demonstration section in the project README."
          />
        </div>
      </DetailSection>

      <ComplementaryProject
        project={projects.prepbench}
        description="PrepBench addresses the measurement question: how well can agents turn requests and input tables into correct prepared data? It provides evaluation assets for researchers to use with their own agents."
      />
    </main>
  );
}
