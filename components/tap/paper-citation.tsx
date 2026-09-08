'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { citations } from '@/lib/citations';
import { sitePath } from '@/lib/site-path';

export function PaperCitation({
  project,
}: {
  project: keyof typeof citations;
}) {
  const [status, setStatus] = useState('');
  const name = project === 'prepbench' ? 'PrepBench' : 'CleanAgent';
  async function copy() {
    try {
      await navigator.clipboard.writeText(citations[project]);
      setStatus('Copied.');
    } catch {
      setStatus(
        'Copy unavailable. Select the text below or download the file.',
      );
    }
  }
  return (
    <section
      className="paper-citation"
      id={`${project}-citation`}
      aria-label={`Cite ${name}`}
    >
      <details>
        <summary>Cite {name}</summary>
        <div className="citation-actions">
          <Button type="button" variant="outline" onClick={copy}>
            Copy BibTeX
          </Button>
          <a href={sitePath(`/citations/${project}.bib`)} download>
            Download .bib
          </a>
          <output>{status}</output>
        </div>
        <pre
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Keyboard users need to scroll long citation lines.
          tabIndex={0}
          aria-label={`${name} BibTeX`}
        >
          <code>{citations[project]}</code>
        </pre>
      </details>
    </section>
  );
}
