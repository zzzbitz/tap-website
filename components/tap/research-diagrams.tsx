'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Arrow } from '@/components/tap/primitives';
import { DataTable } from '@/components/tap/data-table';
import { projects } from '@/lib/tap-content';

const dateFormats = [
  {
    id: 'iso',
    label: 'ISO',
    pattern: 'YYYY-MM-DD',
    values: ['2026-01-03', '2026-01-04', '2026-02-01'],
  },
  {
    id: 'day-first',
    label: 'Day first',
    pattern: 'DD/MM/YYYY',
    values: ['03/01/2026', '04/01/2026', '01/02/2026'],
  },
  {
    id: 'month-name',
    label: 'Month name',
    pattern: 'MMM D, YYYY',
    values: ['Jan 3, 2026', 'Jan 4, 2026', 'Feb 1, 2026'],
  },
] as const;

function DateTable({ format }: { format?: (typeof dateFormats)[number] }) {
  const values = format?.values ?? ['2026-01-03', 'Jan 4, 2026', '2026/02/01'];
  return (
    <DataTable
      label={
        format
          ? `Illustrative standardized dates: ${format.pattern}`
          : 'Illustrative inconsistent date formats'
      }
      headers={['Order', 'Date']}
      rows={values.map((value, index) => [
        `A10${index + 1}`,
        <span
          className={format ? 'date-value animated-value' : 'date-value'}
          key={`${format?.id ?? 'input'}-${index}`}
          style={{ animationDelay: `${index * 55}ms` }}
        >
          {value}
        </span>,
      ])}
      className={format ? 'green-table' : 'blue-table'}
    />
  );
}

export function StandardizationDiagram({
  withCaption = false,
}: {
  withCaption?: boolean;
}) {
  const [format, setFormat] = useState<(typeof dateFormats)[number]>(
    dateFormats[0],
  );
  return (
    <figure className="original-figure">
      <div className="standardization-scene">
        <p className="diagram-kicker">
          Interactive illustration <span>CleanAgent</span>
        </p>
        <div className="example-controls format-controls">
          <p className="control-label">Choose the output format</p>
          <ToggleGroup
            className="example-segments green-segments"
            value={[format.id]}
            onValueChange={(values) => {
              const next = dateFormats.find((item) => item.id === values[0]);
              if (next) setFormat(next);
            }}
            aria-label="Output date format"
          >
            {dateFormats.map((item) => (
              <ToggleGroupItem
                key={item.id}
                value={item.id}
                aria-label={`${item.label}: ${item.pattern}`}
              >
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="date-transformation">
          <div className="date-stage input-dates">
            <p className="table-title">Different formats.</p>
            <div className="floating-table">
              <DateTable />
            </div>
            <p className="format-label">One column, mixed representations</p>
          </div>
          <div className="date-connector" aria-hidden="true">
            <Arrow />
          </div>
          <div className="date-stage output-dates">
            <p className="table-title">One clear format.</p>
            <div className="floating-table">
              <DateTable format={format} />
            </div>
            <p className="format-label">{format.pattern}</p>
          </div>
        </div>
        <output
          className="example-feedback date-feedback"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="mini-check" aria-hidden="true">
            ✓
          </span>
          <span>
            3 dates, one format.{' '}
            <span className="feedback-detail">Same meaning.</span>
          </span>
          <span className="sr-only">
            Selected format: {format.pattern}. {format.values.join('; ')}.
          </span>
        </output>
        <div
          className="standardization-path"
          aria-label="Standardization process"
        >
          <span>Annotate types</span>
          <Arrow />
          <strong>Dataprep.Clean calls</strong>
          <Arrow />
          <span>Execute</span>
        </div>
        <p className="interactive-footnote">
          A format illustration, not a live CleanAgent run.
        </p>
      </div>
      {withCaption && (
        <figcaption className="visual-caption">
          <span>
            <strong>Different representations, the same dates.</strong> This
            illustration keeps the meaning of each value, with dates written
            consistently in your selected format.
          </span>
          <a href={projects.cleanagent.paper}>
            Research context <Arrow external />
          </a>
        </figcaption>
      )}
    </figure>
  );
}

function MonthlyOutput({
  label,
  january,
  mismatch = false,
}: {
  label: string;
  january: number;
  mismatch?: boolean;
}) {
  return (
    <DataTable
      label={label}
      headers={['Month', 'Sales']}
      numericColumns={[1]}
      rows={[
        [
          '2026-01',
          <span
            key={january}
            className={`animated-value ${mismatch ? 'mismatched-value' : ''}`}
          >
            {january}
          </span>,
        ],
        ['2026-02', '150'],
      ]}
      className="green-table"
    />
  );
}

export function BenchmarkDiagram() {
  const [refundRule, setRefundRule] = useState('exclude');
  const [mistake, setMistake] = useState(false);
  const expected = refundRule === 'exclude' ? 120 : 200;
  const candidate = mistake ? (expected === 120 ? 200 : 120) : expected;
  return (
    <figure
      className="benchmark-scene"
      aria-label="Illustrative benchmark flow: a request and input table go to an AI agent, which can ask for clarification and prepare output for comparison with expected tables."
    >
      <figcaption className="diagram-kicker">
        Interactive illustration <span>PrepBench</span>
      </figcaption>
      <p className="benchmark-request">
        <span>Request</span> Show monthly sales.
      </p>
      <div className="benchmark-work">
        <div className="benchmark-input">
          <p className="diagram-label">Input tables</p>
          <div className="floating-table">
            <DataTable
              label="Illustrative benchmark input"
              headers={['Month', 'Sales', 'Status']}
              numericColumns={[1]}
              rows={[
                ['2026-01', '120', 'Paid'],
                ['2026-01', '80', 'Refunded'],
                ['2026-02', '150', 'Paid'],
              ]}
              className="blue-table"
            />
          </div>
        </div>
        <Arrow className="benchmark-forward" />
        <div className="benchmark-agent">
          <div className="clarification-loop">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 9a8 8 0 0 1 14-3l2 3M20 4v5h-5M20 15a8 8 0 0 1-14 3l-2-3M4 20v-5h5" />
            </svg>{' '}
            Clarify when needed
          </div>
          <div className="agent-node">
            <span className="code-symbol" aria-hidden="true">
              {'{ }'}
            </span>
            <strong>Your AI agent</strong>
            <span>Prepare the data</span>
          </div>
        </div>
      </div>
      <div className="example-controls refund-controls">
        <p className="control-label">Should refunded orders count?</p>
        <ToggleGroup
          className="example-segments"
          value={[refundRule]}
          onValueChange={(values) => {
            if (values[0] === 'exclude' || values[0] === 'include')
              setRefundRule(values[0]);
          }}
          aria-label="Refunded orders rule"
        >
          <ToggleGroupItem value="exclude">Exclude refunds</ToggleGroupItem>
          <ToggleGroupItem value="include">Include refunds</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="comparison-header">
        <span>Compare the final tables</span>
        <Arrow />
      </div>
      <div className="output-comparison">
        <div>
          <p className="diagram-label">Agent output</p>
          <div
            className={`floating-table candidate-table ${mistake ? 'has-mismatch' : ''}`}
          >
            <MonthlyOutput
              label="Illustrative agent output"
              january={candidate}
              mismatch={mistake}
            />
          </div>
        </div>
        <span className="compare-symbol" aria-hidden="true">
          ↔
        </span>
        <div>
          <p className="diagram-label">Expected output</p>
          <div className="floating-table">
            <MonthlyOutput
              label="Illustrative expected output"
              january={expected}
            />
          </div>
        </div>
      </div>
      <div className="evaluation-feedback-row">
        <output
          className={`example-feedback ${mistake ? 'mismatch-feedback' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="feedback-symbol" aria-hidden="true">
            {mistake ? '≠' : '✓'}
          </span>
          <span>
            {mistake ? 'January differs by 80.' : 'Both tables match.'}
            <span className="sr-only">
              {' '}
              Refunded orders{' '}
              {refundRule === 'exclude' ? 'excluded' : 'included'}. January:
              agent {candidate}, expected {expected}. February: 150 in both
              tables.
            </span>
          </span>
        </output>
        <Button
          type="button"
          variant="outline"
          className="mistake-toggle"
          onClick={() => setMistake((value) => !value)}
        >
          {mistake ? 'Show correct output' : 'Show incorrect output'}
        </Button>
      </div>
      <p className="interactive-footnote">
        Explore the example; this is not a live agent run.
      </p>
    </figure>
  );
}
