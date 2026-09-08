import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import {
  ComplementaryProject,
  DetailSection,
  ProjectHero,
} from '@/components/tap/project-layout';
import { PaperFigure } from '@/components/tap/paper-figure';
import { CleanAgentResults } from '@/components/tap/paper-results';
import { CleanAgentMethod } from '@/components/tap/cleanagent-method';
import { PaperCitation } from '@/components/tap/paper-citation';
import { ResourceLink } from '@/components/tap/primitives';
import { projects, siteOrigin } from '@/lib/tap-content';

const project = projects.cleanagent;

export const metadata: Metadata = {
  title: 'CleanAgent — Automating Data Standardization',
  description:
    'CleanAgent combines LLM-based agents with Dataprep.Clean to automate data standardization. DataAI Workshop @ VLDB 2025. Paper, code, and repository demonstration.',
  alternates: { canonical: siteOrigin + '/cleanagent/' },
  openGraph: {
    title: project.title,
    description: project.summary,
    url: `${siteOrigin}/cleanagent/`,
    type: 'article',
    siteName: 'TAP',
  },
};

export default function CleanAgentPage() {
  return (
    <main id="main-content" className="detail-page shell" tabIndex={-1}>
      <ProjectHero
        project={project}
        context="CleanAgent turns standardization requests into short Dataprep.Clean calls. Agents identify column types, generate the code, and use execution feedback to revise it."
      />

      <DetailSection
        id="cleanagent-conversation"
        label="The method in action"
        title="From column types to tool calls."
        description="Unified APIs handle the details of each data type, reducing the custom code an agent needs to write. Explore the steps, then choose an output format."
      >
        <CleanAgentMethod />
      </DetailSection>

      <DetailSection
        id="cleanagent-workflow"
        label="The method"
        title="How CleanAgent standardizes data."
        description="Agents identify column types, write code using Dataprep.Clean, and run it. A chat manager coordinates the steps."
      >
        <PaperFigure
          src={sitePath('/figures/cleanagent-workflow.png')}
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
        title="How well does CleanAgent work?"
        description="The paper compares CleanAgent, direct GPT-4o prompting, and Cocoon on irregular datetime values in the Flights dataset."
      >
        <CleanAgentResults />
      </DetailSection>

      <DetailSection
        id="cleanagent-demonstration"
        label="The demonstration"
        title="Watch CleanAgent in action."
        description="Watch the demo and explore the interface shown in the paper."
      >
        <figure
          className="project-video"
          aria-labelledby="cleanagent-video-caption"
        >
          <iframe
            src={project.videoEmbed}
            title="CleanAgent: Automating Data Standardization with LLM-based Agents — demonstration video"
            width={960}
            height={540}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <figcaption id="cleanagent-video-caption">
            <div>
              <strong>CleanAgent in action</strong>
              <span>
                The original demonstration linked from the project repository.
              </span>
            </div>
            <a href={project.video} target="_blank" rel="noopener noreferrer">
              Watch on YouTube <span aria-hidden="true">↗</span>
            </a>
          </figcaption>
        </figure>
        <PaperFigure
          src={sitePath('/figures/cleanagent-interface.png')}
          width={1624}
          height={860}
          title="A recorded interaction with the system"
          alt="CleanAgent Figure 3: the system interface shows a table upload, user requirements, column-type annotations, generated Python, an execution error, and a later completion message."
          caption="The conversation shows type annotation, generated code, an execution error, and a later completion message."
          source={project.paper}
          figureNumber={3}
        />
        <p className="scope-note">
          Presented at the DataAI Workshop @ VLDB 2025.
        </p>
      </DetailSection>

      <DetailSection
        id="cleanagent-resources"
        label="Explore the work"
        title="Explore the paper and code."
      >
        <div className="detail-resource-links">
          <ResourceLink
            href={project.paper}
            title="Read the paper"
            description="The published workshop paper: motivation, framework, and evaluation."
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

      <PaperCitation project="cleanagent" />

      <ComplementaryProject
        project={projects.prepbench}
        description="Test how well your agent prepares data with PrepBench."
      />
    </main>
  );
}
