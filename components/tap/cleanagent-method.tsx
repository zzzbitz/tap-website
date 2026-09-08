'use client';

import { useState } from 'react';
import { DataTable } from '@/components/tap/data-table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { demoDates, demoDateFormats } from '@/lib/guided-conversation';

const steps = [
  ['Mixed input', 'Start with a request and a table.'],
  ['Identify types', 'Recognize what each column contains.'],
  ['Call the tools', 'Write short Dataprep.Clean calls.'],
  ['Run and revise', 'Use execution feedback to revise code.'],
  ['Preview output', 'Return values in a consistent format.'],
] as const;
type Format = keyof typeof demoDateFormats;

export function CleanAgentMethod() {
  const [step, setStep] = useState(2);
  const [format, setFormat] = useState<Format>('iso');
  const selectedFormat = demoDateFormats[format];
  return (
    <div className="method-explorer tone-green">
      <div className="method-explorer-head">
        <span className="demo-label">Scripted walkthrough</span>
        <p>Select a step to inspect it.</p>
      </div>
      <div className="method-explorer-body">
        <ol className="method-step-list" aria-label="CleanAgent method steps">
          {steps.map(([title, description], i) => (
            <li key={title}>
              <button
                type="button"
                aria-pressed={step === i}
                aria-controls="cleanagent-method-panel"
                onClick={() => setStep(i)}
              >
                <span className="research-step-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <section
          className="method-panel"
          id="cleanagent-method-panel"
          aria-labelledby="cleanagent-step-title"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow">Step {step + 1} of 5</p>
          <h3 id="cleanagent-step-title">{steps[step][0]}</h3>
          {step === 0 && (
            <>
              <p className="method-request">
                “Standardize the dates in this column.”
              </p>
              <DataTable
                label="Method example input dates"
                headers={['Date']}
                rows={demoDates.map((date) => [date])}
              />
              <p className="method-panel-note">
                Different strings represent dates. The goal is a common format.
              </p>
            </>
          )}
          {step === 1 && (
            <>
              <div className="type-detection">
                <span>Column</span>
                <strong>Date</strong>
                <span>Semantic type</span>
                <strong>Datetime</strong>
                <span>Selected tool</span>
                <code>clean_date</code>
              </div>
              <p className="method-panel-note">
                The column type determines the cleaning function. The same API
                pattern applies to other types, such as addresses.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <p>
                Dataprep.Clean handles type-specific parsing and formatting
                behind a short call.
              </p>
              <pre className="method-code">
                <code>{`from dataprep.clean import clean_date\n\ndf = clean_date(\n    df,\n    column="Date",\n    output_format="${selectedFormat.label}"\n)`}</code>
              </pre>
              <p className="method-panel-note">
                The agent composes tool calls instead of implementing each
                parsing step.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <div className="feedback-path">
                <div>
                  <strong>Code executor</strong>
                  <p>
                    Runs the generated code and returns success or an error.
                  </p>
                </div>
                <span aria-hidden="true">↓</span>
                <div>
                  <strong>Chat manager → agents</strong>
                  <p>
                    Records the error and restarts the standardization workflow
                    with the updated history.
                  </p>
                </div>
              </div>
              <p className="method-panel-note">
                Execution success is feedback for the agent. Output quality is
                evaluated separately in the paper.
              </p>
            </>
          )}
          {step === 4 && (
            <>
              <p className="control-label">Output preview format</p>
              <ToggleGroup
                className="example-segments green-segments"
                value={[format]}
                onValueChange={(values) => {
                  if (values[0] && values[0] in demoDateFormats)
                    setFormat(values[0] as Format);
                }}
                aria-label="Output preview format"
              >
                {Object.entries(demoDateFormats).map(([key, value]) => (
                  <ToggleGroupItem key={key} value={key}>
                    {value.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <DataTable
                label="Method standardized date preview"
                headers={['Date']}
                rows={selectedFormat.values.map((date) => [date])}
              />
              <p className="method-panel-note">
                Same dates, one format. Return to “Call the tools” to see the
                selected format in the example call.
              </p>
            </>
          )}
        </section>
      </div>
      <p className="method-scope">
        An illustrative walkthrough with fixed sample data, not a live
        CleanAgent or Dataprep.Clean run.
      </p>
    </div>
  );
}
