import { Arrow } from '@/components/tap/primitives';
import { DataTable } from '@/components/tap/data-table';
import { projects } from '@/lib/tap-content';

function DateTable({ output = false }: { output?: boolean }) {
  return (
    <DataTable
      label={
        output
          ? 'Illustrative standardized dates'
          : 'Illustrative inconsistent date formats'
      }
      headers={['Order', 'Date']}
      rows={[
        [
          'A101',
          <span className="date-value" key="a">
            2026-01-03
          </span>,
        ],
        [
          'A102',
          <span className="date-value" key="b">
            {output ? '2026-01-04' : 'Jan 4, 2026'}
          </span>,
        ],
        [
          'A103',
          <span className="date-value" key="c">
            {output ? '2026-02-01' : '2026/02/01'}
          </span>,
        ],
      ]}
      className={output ? 'green-table' : 'blue-table'}
    />
  );
}

export function StandardizationDiagram({
  withCaption = false,
}: {
  withCaption?: boolean;
}) {
  return (
    <figure className="original-figure">
      <div className="standardization-scene">
        <p className="diagram-kicker">
          Illustrative example <span>Date standardization</span>
        </p>
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
              <DateTable output />
            </div>
            <p className="format-label">YYYY-MM-DD</p>
          </div>
        </div>
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
      </div>
      {withCaption && (
        <figcaption className="visual-caption">
          <span>
            <strong>Different representations, the same dates.</strong> This
            illustration keeps the meaning of each value, with dates written
            consistently as YYYY-MM-DD.
          </span>
          <a href={projects.cleanagent.paper}>
            Research context <Arrow external />
          </a>
        </figcaption>
      )}
    </figure>
  );
}

function MonthlyOutput({ label }: { label: string }) {
  return (
    <DataTable
      label={label}
      headers={['Month', 'Sales']}
      numericColumns={[1]}
      rows={[
        ['2026-01', '120'],
        ['2026-02', '150'],
      ]}
      className="green-table"
    />
  );
}

export function BenchmarkDiagram() {
  return (
    <figure
      className="benchmark-scene"
      aria-label="Illustrative benchmark flow: a request and input table go to an AI agent, which can ask for clarification and prepare output for comparison with expected tables."
    >
      <figcaption className="diagram-kicker">
        Illustrative evaluation flow <span>PrepBench</span>
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
      <p className="benchmark-rule">
        <span className="mini-check" aria-hidden="true">
          ✓
        </span>{' '}
        Example decision: exclude refunded orders.
      </p>
      <div className="comparison-header">
        <span>Compare the final tables</span>
        <Arrow />
      </div>
      <div className="output-comparison">
        <div>
          <p className="diagram-label">Agent output</p>
          <div className="floating-table">
            <MonthlyOutput label="Illustrative agent output" />
          </div>
        </div>
        <span className="compare-symbol" aria-hidden="true">
          ↔
        </span>
        <div>
          <p className="diagram-label">Expected output</p>
          <div className="floating-table">
            <MonthlyOutput label="Illustrative expected output" />
          </div>
        </div>
      </div>
    </figure>
  );
}
