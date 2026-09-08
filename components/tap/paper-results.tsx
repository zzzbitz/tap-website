'use client';

import { sitePath } from '@/lib/site-path';

/* oxlint-disable nextjs/no-html-link-for-pages -- The license is a static text asset, not a client-router page. */
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- SVG groups need explicit button/group semantics; native HTML buttons cannot be children of SVG. */
/* Adapted from Lieflat Charts by 躺在废墟里: F5 Tick Rows, F8 Plumb Scatter,
 * L15 Ballot Tally. https://polyformproject.org/licenses/noncommercial/1.0.0/
 * Template lineage and adaptations: public/charts/SOURCES.md. */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DataTable } from '@/components/tap/data-table';
import { cleanResults, prepResults, type PrepMode } from '@/lib/paper-results';

const noise = (i: number, k: number) =>
  Math.abs(((i * 73856093) ^ (k * 19349663)) % 1000) / 1000;
const delay = (seconds: number): CSSProperties => ({
  animationDelay: `${seconds}s`,
});

function ChartCard({
  title,
  subtitle,
  sourceLabel,
  tone = 'blue',
  children,
}: {
  title: string;
  subtitle: string;
  sourceLabel: string;
  tone?: 'blue' | 'green';
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const titleId = useId();
  const [revealed, setRevealed] = useState(false);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    // React equivalent of MONO.obsReveal: one viewport entrance, explicit replay,
    // no interval/timer accumulation, observer released on entrance or unmount.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <figure
      ref={ref}
      className={`paper-chart tone-${tone}`}
      aria-labelledby={titleId}
    >
      <figcaption className="paper-chart-head">
        <div>
          <h3 id={titleId}>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <button
          type="button"
          className="chart-replay"
          aria-label={`Replay animation: ${title}`}
          onClick={() => {
            setRevealed(true);
            setReplay((n) => n + 1);
          }}
        >
          <span aria-hidden="true">↻</span> Replay animation
        </button>
      </figcaption>
      <div
        key={replay}
        className={revealed ? 'chart-content chart-revealed' : 'chart-content'}
      >
        {children}
      </div>
      <div className="chart-source">
        <span>{sourceLabel}</span>
        <a
          href={sitePath('/licenses/lieflat-charts.txt')}
          className="chart-credit"
          rel="license"
        >
          Chart credits
        </a>
      </div>
    </figure>
  );
}

// F5/L15 unit geometry: each tick spans a percentage-point interval. The final
// fractional tick has proportional height; the end marker is at the exact value.
// Ticks represent units of the aggregate rate, never individual observations.
function RateTicks({
  value,
  row,
  ballot = false,
}: {
  value: number;
  row: number;
  ballot?: boolean;
}) {
  return (
    <svg
      className="rate-ticks"
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="0" y1="29" x2="600" y2="29" className="chart-gridline" />
      {Array.from({ length: 100 }, (_, k) => {
        const fraction = Math.max(0, Math.min(1, value - k));
        const x = (k + 0.5) * 6;
        const height = 12 + noise(k + 1, row + 2) * 6;
        return (
          <g
            key={k}
            className="chart-unit"
            style={delay(row * 0.08 + k * 0.006)}
          >
            {ballot && (
              <line
                x1={x}
                x2={x}
                y1="29"
                y2={29 - 5 - noise(k + 1, row + 5) * 2}
                className="chart-quiet-tick"
              />
            )}
            {fraction > 0 && (
              <line
                x1={x}
                x2={x}
                y1="29"
                y2={29 - height * fraction}
                className="chart-ink-tick"
              />
            )}
            {k % (ballot ? 10 : 5) === 4 && (
              <circle cx={x} cy="35" r="1" className="chart-floor-dot" />
            )}
          </g>
        );
      })}
      <line
        x1={value * 6}
        x2={value * 6}
        y1="6"
        y2="30"
        className="chart-end-marker"
      />
    </svg>
  );
}

function RateAxis() {
  return (
    <div className="rate-axis" aria-hidden="true">
      <span>0</span>
      <span>25</span>
      <span>50</span>
      <span>75</span>
      <span>100%</span>
    </div>
  );
}

function PrepScatter({ mode }: { mode: PrepMode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [selected, setSelected] = useState(2);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(220, entry.contentRect.width)),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const left = 36,
    right = width - 18,
    base = 280,
    top = 30;
  const maxCost = mode === 'code' ? 150 : 300;
  const x = (cost: number) => left + (cost / maxCost) * (right - left);
  const y = (accuracy: number) => base - (accuracy / 60) * (base - top);
  const point = prepResults[selected];
  return (
    <div className="scatter-layout">
      <div className="scatter-main" ref={ref}>
        <p className="chart-axis-caption">Accuracy (%) · higher is better</p>
        <svg
          className="plumb-scatter"
          viewBox={`0 0 ${width} 322`}
          role="group"
          aria-label="Model accuracy versus average cost. Select a numbered point or use the model list."
        >
          {[0, 20, 40, 60].map((v) => (
            <g key={v}>
              <line
                x1={left}
                x2={right}
                y1={y(v)}
                y2={y(v)}
                className="chart-gridline"
              />
              <text x={left - 9} y={y(v) + 5} textAnchor="end">
                {v}
              </text>
            </g>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <line
              key={i}
              x1={left + (i / 30) * (right - left)}
              x2={left + (i / 30) * (right - left)}
              y1={base}
              y2={base - (i % 10 === 0 ? 8 : 4)}
              className="chart-gridline"
            />
          ))}
          {[0, maxCost / 3, (maxCost * 2) / 3, maxCost].map((v) => (
            <text key={v} x={x(v)} y={base + 25} textAnchor="middle">
              {v}
            </text>
          ))}
          {/* Paint the selected point last so a nearby model cannot hide it. */}
          {prepResults
            .map((model, i) => ({ model, i }))
            .sort((a, b) => Number(a.i === selected) - Number(b.i === selected))
            .map(({ model, i }) => {
              const [accuracy, cost] = model[mode];
              return (
                <g
                  key={model.name}
                  className={`scatter-point chart-unit ${i === selected ? 'is-selected' : ''}`}
                  style={delay(0.2 + i * 0.05)}
                >
                  <line
                    x1={x(cost)}
                    x2={x(cost)}
                    y1={base}
                    y2={y(accuracy)}
                    className="plumb-line"
                  />
                  <g
                    role="button"
                    tabIndex={0}
                    aria-pressed={i === selected}
                    aria-label={`${model.name}: ${accuracy.toFixed(1)} percent accuracy, ${cost.toFixed(2)} millidollars per task`}
                    onClick={() => setSelected(i)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelected(i);
                      }
                    }}
                  >
                    <circle
                      cx={x(cost)}
                      cy={y(accuracy)}
                      r="17"
                      className="scatter-hit-area"
                    />
                    <circle
                      cx={x(cost)}
                      cy={y(accuracy)}
                      r={i === selected ? 12 : 10}
                      className="scatter-dot"
                    />
                    <text
                      x={x(cost)}
                      y={y(accuracy) + 4.5}
                      textAnchor="middle"
                      className="scatter-number"
                    >
                      {i + 1}
                    </text>
                  </g>
                </g>
              );
            })}
        </svg>
        <p className="chart-axis-caption scatter-x-label">
          Cost per task (USD × 10⁻³) · lower is better
        </p>
      </div>
      <fieldset className="scatter-model-list" aria-label="Select a model">
        {prepResults.map((model, i) => (
          <button
            key={model.name}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="model-number">{i + 1}</span>
            {model.name}
          </button>
        ))}
      </fieldset>
      <div className="scatter-readout" aria-live="polite" aria-atomic="true">
        <strong>{point.name}</strong>
        <span>
          <b>{point[mode][0].toFixed(1)}%</b> accuracy
        </span>
        <span>
          <b>${(point[mode][1] / 1000).toFixed(5)}</b> / task
        </span>
      </div>
    </div>
  );
}

export function PrepBenchResults() {
  const [mode, setMode] = useState<PrepMode>('code');
  const [family, setFamily] = useState('proprietary');
  const models = prepResults
    .filter((model) => model.family === family)
    .sort((a, b) => b[mode][0] - a[mode][0]);
  return (
    <div className="paper-results">
      <div className="results-controls">
        <span className="control-label">End-to-end output</span>
        <ToggleGroup
          className="example-segments"
          value={[mode]}
          onValueChange={(values) => {
            if (values[0]) setMode(values[0] as PrepMode);
          }}
          aria-label="End-to-end output"
        >
          <ToggleGroupItem value="code">Prep code</ToggleGroupItem>
          <ToggleGroupItem value="workflow">GUI workflow</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ChartCard
        title={`${models[0][mode][0].toFixed(1)}% is the best accuracy in this group.`}
        subtitle="306 preparation tasks · accuracy measures correct final outputs."
        sourceLabel="PrepBench · Table 6"
      >
        <div className="chart-family-controls">
          <ToggleGroup
            className="example-segments"
            value={[family]}
            onValueChange={(values) => {
              if (values[0]) setFamily(values[0]);
            }}
            aria-label="Model family"
          >
            <ToggleGroupItem value="proprietary">Proprietary</ToggleGroupItem>
            <ToggleGroupItem value="open">Open-weight</ToggleGroupItem>
          </ToggleGroup>
          <span>5 of 10 models · ranked by accuracy</span>
        </div>
        <div className="tick-row-list" key={`${mode}-${family}`}>
          {models.map((model, i) => (
            <div className="tick-row" key={model.name}>
              <div className="tick-row-label">
                <span>{model.name}</span>
                <strong>
                  {model[mode][0].toFixed(1)}
                  <small>%</small>
                </strong>
              </div>
              <RateTicks value={model[mode][0]} row={i} />
            </div>
          ))}
          <RateAxis />
        </div>
        <p className="chart-reading-note">
          One full tick = 1 percentage point. The marker shows the exact rate.
        </p>
        <p className="sr-only" aria-live="polite">
          Showing {family === 'open' ? 'open-weight' : 'proprietary'} models,
          end-to-end {mode === 'code' ? 'prep code' : 'GUI workflow'} accuracy.
        </p>
      </ChartCard>
      <ChartCard
        title="Similar accuracy can come at different costs."
        subtitle="All 10 models · each point is one reported result. Select a model to inspect it."
        sourceLabel="PrepBench · Table 6"
      >
        <PrepScatter mode={mode} />
        <details className="chart-data-details">
          <summary>View all reported values</summary>
          <DataTable
            label={`PrepBench end-to-end ${mode} results`}
            headers={['Model', 'Accuracy (%)', 'Cost (USD × 10⁻³ / task)']}
            rows={prepResults.map((model) => [
              model.name,
              model[mode][0].toFixed(1),
              model[mode][1].toFixed(2),
            ])}
            numericColumns={[1, 2]}
          />
        </details>
      </ChartCard>
      <p className="scope-note">
        Paper evaluation settings: original requests with agent clarification;
        up to two profiling attempts and three code or translation attempts.
        Costs average all model calls and retries per task. These are the
        paper’s reported runs, not a live leaderboard.
      </p>
    </div>
  );
}

export function CleanAgentResults() {
  return (
    <ChartCard
      tone="green"
      title="CleanAgent reaches a 42.5% matching rate."
      subtitle="Flights dataset · datetime standardization across four columns · higher is better."
      sourceLabel="CleanAgent · Table 1"
    >
      <div className="ballot-list">
        {cleanResults.map((model, i) => (
          <div className="tick-row" key={model.name}>
            <div className="tick-row-label">
              <span>{model.name}</span>
              <strong>
                {model.matching.toFixed(1)}
                <small>%</small>
              </strong>
            </div>
            <RateTicks value={model.matching} row={i} ballot />
          </div>
        ))}
        <RateAxis />
      </div>
      <p className="chart-reading-note">
        One full tick = 1 percentage point of the reported cell-level matching
        rate.
      </p>
      <div className="latency-strip">
        <p>
          Reported latency <span>seconds · lower is better</span>
        </p>
        <dl>
          {cleanResults.map((model) => (
            <div key={model.name}>
              <dt>{model.name}</dt>
              <dd>
                {model.latency.toFixed(2)}
                <small> s</small>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="chart-experiment-note">
        All methods use GPT-4o (2024-08-06); reference values were generated
        with GPT-4o. CleanAgent has the highest matching rate in this
        experiment. It runs faster than Cocoon, while direct prompting has the
        lowest latency.
      </p>
      <details className="chart-data-details">
        <summary>View values and experiment settings</summary>
        <DataTable
          label="CleanAgent reported results"
          headers={['System', 'Matching rate (%)', 'Latency (s)']}
          rows={cleanResults.map((model) => [
            model.name,
            model.matching.toFixed(1),
            model.latency.toFixed(2),
          ])}
          numericColumns={[1, 2]}
        />
        <p className="chart-experiment-note">
          Paper §4 and Appendix B: four datetime columns in Flights; M1 MacBook
          Pro, 16 GB RAM. Temperature: 0 for CleanAgent and direct prompting, 1
          for Cocoon. Results describe this standardization experiment.
        </p>
      </details>
    </ChartCard>
  );
}
