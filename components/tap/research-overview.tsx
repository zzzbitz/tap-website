const capabilities = [
  [
    'Interactive disambiguation',
    'Ask users to clarify ambiguous preparation requests.',
  ],
  [
    'Prep-code generation',
    'Produce preparation code that handles irregularities in the data.',
  ],
  [
    'Code-to-workflow translation',
    'Convert preparation code into visual workflows for users to check.',
  ],
] as const;

export function PrepCapabilities({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={compact ? 'research-map' : 'capability-grid'}
      aria-label="Three capabilities evaluated by PrepBench"
    >
      {compact && <p className="diagram-kicker">What PrepBench evaluates</p>}
      {!compact && <h2 className="sr-only">Three capabilities</h2>}
      <ol>
        {capabilities.map(([title, description], i) => (
          <li key={title}>
            <span className="research-step-number" aria-hidden="true">
              0{i + 1}
            </span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CleanMethodOverview() {
  return (
    <div className="research-map tone-green">
      <p className="diagram-kicker">The CleanAgent approach</p>
      <div className="api-example">
        <span>A unified API for column types</span>
        <code>clean_type(df, column_name, target_format)</code>
      </div>
      <ol>
        <li>
          <span className="research-step-number" aria-hidden="true">
            01
          </span>
          <div>
            <strong>Dataprep.Clean</strong>
            <p>
              Type-specific functions standardize each column in one line of
              code.
            </p>
          </div>
        </li>
        <li>
          <span className="research-step-number" aria-hidden="true">
            02
          </span>
          <div>
            <strong>CleanAgent</strong>
            <p>
              Agents annotate column types, generate Python calls, and execute
              the standardization code.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}

export function EvaluationRoles() {
  return (
    <ol className="evaluation-roles" aria-label="PrepBench evaluation roles">
      <li>
        <span>01 / Benchmark inputs</span>
        <strong>Task + simulated user</strong>
        <p>Tables, a request, and answers to clarification questions.</p>
      </li>
      <li>
        <span>02 / System being tested</span>
        <strong>Your agent</strong>
        <p>Clarifies the request and prepares the output.</p>
      </li>
      <li>
        <span>03 / Evaluation</span>
        <strong>PrepBench</strong>
        <p>Checks the output against the reference tables.</p>
      </li>
    </ol>
  );
}
