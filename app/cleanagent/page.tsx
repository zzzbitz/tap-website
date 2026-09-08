import type { Metadata } from 'next';
import {
  ComplementaryProject,
  DetailSection,
  ProjectHero,
} from '@/components/tap/project-layout';
import { PaperFigure } from '@/components/tap/paper-figure';
import { CleanAgentResults } from '@/components/tap/paper-results';
import { StandardizationDiagram } from '@/components/tap/research-diagrams';
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
    <main id="main-content" className="detail-page shell" tabIndex={-1}>
      <ProjectHero
        project={project}
        context="CleanAgent develops one capability within TAP’s vision: reducing the manual work of standardizing data. Language models work with Dataprep.Clean to express preparation through concise library calls."
      />

      <DetailSection
        id="cleanagent-example"
        label="The problem"
        title="Same information. Different formats."
        description="Even a single date column can arrive in several representations. Standardization brings these values into a common format while preserving what they mean."
      >
        <StandardizationDiagram withCaption />
      </DetailSection>

      <DetailSection
        id="cleanagent-workflow"
        label="The method"
        title="Let agents work with the right tools."
        description="Annotate column types, generate concise Dataprep.Clean calls, and execute them to produce standardized output. The framework coordinates these steps through a chat manager."
      >
        <PaperFigure
          src="/figures/cleanagent-workflow.png"
          width={968}
          height={624}
          title="The CleanAgent workflow"
          alt="CleanAgent Figure 2: a chat manager coordinates a column-type annotator, Python programmer using Dataprep, and code executor. Success or error feedback returns to the manager."
          caption="Column-type annotation guides the programmer’s tool calls. The code executor returns success or error feedback to the chat manager, connecting execution back to the preparation process."
          source={project.paper}
          figureNumber={2}
        />
        <p className="scope-note">
          <strong>Research scope: data standardization.</strong> CleanAgent
          studies how agents standardize heterogeneous column formats using
          Dataprep.Clean.
        </p>
      </DetailSection>

      <DetailSection
        id="cleanagent-results"
        label="The results"
        title="Measure the standardized output."
        description="The paper compares CleanAgent, direct GPT-4o prompting, and Cocoon on irregular datetime values in the Flights dataset."
      >
        <CleanAgentResults />
      </DetailSection>

      <DetailSection
        id="cleanagent-demonstration"
        label="The demonstration"
        title="See the interaction behind the output."
        description="The original system interface records the agents’ work as it unfolds, including generated code and execution feedback."
      >
        <PaperFigure
          src="/figures/cleanagent-interface.png"
          width={1624}
          height={860}
          title="A recorded interaction with the system"
          alt="CleanAgent Figure 3: the system interface shows a table upload, user requirements, column-type annotations, generated Python, an execution error, and a later completion message."
          caption="The conversation shows type annotation, generated code, an execution error, and a later completion message."
          source={project.paper}
          figureNumber={3}
        />
        <p className="scope-note">
          Presented at the DataAI Workshop @ VLDB 2025. The arXiv paper was
          first submitted in 2024.
        </p>
      </DetailSection>

      <DetailSection
        id="cleanagent-resources"
        label="Explore the work"
        title="From the paper to the implementation."
      >
        <div className="detail-resource-links">
          <ResourceLink
            href={project.paper}
            title="Read the paper"
            description="The motivation, framework, and technical scope on arXiv."
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
        description="Explore the measurement question: how well can agents turn requests and input tables into correct prepared data?"
      />
    </main>
  );
}
