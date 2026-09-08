'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Message,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from '@/components/ui/message';
import { DataTable } from '@/components/tap/data-table';
import {
  demoDateFormats,
  demoDates,
  demoTrees,
  getDemoBranch,
  type DemoProject,
  type DemoChoice,
} from '@/lib/guided-conversation';

type Turn = { id: number; role: 'user' | 'agent'; text: string };

export function GuidedConversation({ project }: { project: DemoProject }) {
  const name = project === 'prepbench' ? 'PrepBench' : 'CleanAgent';
  const tree = demoTrees[project];
  const [selected, setSelected] = useState<DemoChoice>(tree.branches[0].id);
  const [confirmed, setConfirmed] = useState<DemoChoice | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusStep = useRef(false);
  const questionId = useId();
  const resultId = `${project}-demo-output`;
  const branch = confirmed ? getDemoBranch(project, confirmed) : null;
  const ready = Boolean(branch);
  const turns: Turn[] = [
    { id: 0, role: 'user', text: tree.request },
    { id: 1, role: 'agent', text: tree.context },
    ...(branch
      ? [
          { id: 2, role: 'user' as const, text: branch.answer },
          { id: 3, role: 'agent' as const, text: branch.reply },
        ]
      : []),
  ];
  useEffect(() => {
    // Scroll only the history. Focus follows an explicit Continue / Back action.
    const log = logRef.current;
    if (log) log.scrollTop = confirmed ? log.scrollHeight : 0;
    if (shouldFocusStep.current) {
      stepRef.current?.focus({ preventScroll: true });
      shouldFocusStep.current = false;
    }
  }, [confirmed]);

  function reset() {
    setSelected(tree.branches[0].id);
    setConfirmed(null);
  }
  function confirm() {
    if (!getDemoBranch(project, selected)) return;
    shouldFocusStep.current = true;
    setConfirmed(selected);
  }
  function back() {
    shouldFocusStep.current = true;
    setConfirmed(null);
  }
  const phase = ready ? 2 : 1;
  const dateFormat =
    confirmed && confirmed in demoDateFormats
      ? demoDateFormats[confirmed as keyof typeof demoDateFormats]
      : null;
  const january = confirmed === 'include' ? 200 : 120;
  return (
    <div className={`guided-demo ${project}-demo`}>
      <header className="demo-heading">
        <div>
          <span className="demo-label">Scripted demo</span>
          <h3>
            {project === 'prepbench'
              ? 'One question changes the answer.'
              : 'A conversation about the right format.'}
          </h3>
          <p>
            A prepared conversation with fixed sample data. Choose an answer and
            see how it shapes the result.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="demo-reset"
          onClick={reset}
          aria-label={`Restart ${name} conversation`}
        >
          <span aria-hidden="true">↺</span> Restart
        </Button>
      </header>
      <ol className="demo-steps" aria-label="Conversation progress">
        {['Request', 'Choose', 'Preview'].map((label, i) => (
          <li
            key={label}
            aria-current={phase === i ? 'step' : undefined}
            className={i <= phase ? 'reached' : ''}
          >
            <span aria-hidden="true">{i < phase ? '✓' : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="demo-workspace">
        <div className="demo-chat">
          <div className="demo-chat-title">
            <span className="demo-agent-mark" aria-hidden="true">
              {project === 'prepbench' ? '?' : '{ }'}
            </span>
            <div>
              <strong>Example agent</strong>
              <span>
                {project === 'prepbench'
                  ? 'Resolve the refund rule'
                  : 'Choose a date format'}
              </span>
            </div>
          </div>
          <div
            ref={logRef}
            className={`demo-transcript ${ready ? 'has-result' : ''}`}
            role="log"
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- A focusable transcript lets keyboard users scroll earlier messages.
            tabIndex={0}
            aria-label={`${name} example conversation`}
            aria-live="polite"
            aria-relevant="additions"
            aria-atomic="false"
          >
            <MessageGroup>
              {turns.map((turn) => (
                <Message
                  key={turn.id}
                  align={turn.role === 'user' ? 'end' : 'start'}
                  className={`demo-message ${turn.role}-message`}
                >
                  <MessageContent>
                    <MessageHeader>
                      {turn.role === 'user' ? 'You' : 'Example agent'}
                    </MessageHeader>
                    <p className="demo-bubble">{turn.text}</p>
                  </MessageContent>
                </Message>
              ))}
            </MessageGroup>
          </div>
          <div className="demo-compose">
            <div className="demo-question-topline">
              <span>
                {ready ? 'Choice applied' : 'Agent question · Select one'}
              </span>
            </div>
            <h4
              id={questionId}
              ref={stepRef}
              tabIndex={-1}
              className="demo-question"
            >
              {ready ? branch?.label : tree.question}
            </h4>
            {ready ? (
              <div className="demo-complete demo-result-enter">
                <p>
                  {project === 'prepbench'
                    ? 'Change the refund rule to compare the monthly totals.'
                    : 'Choose another format to compare the same dates.'}
                </p>
                <div className="demo-choice-actions">
                  <Button
                    type="button"
                    variant="outline"
                    className="demo-back"
                    onClick={back}
                  >
                    {project === 'prepbench'
                      ? 'Change refund rule'
                      : 'Change date format'}
                  </Button>
                  <a className="demo-result-link" href={`#${resultId}`}>
                    Jump to prepared table <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  confirm();
                }}
              >
                <RadioGroup
                  value={selected}
                  onValueChange={(value) => {
                    const next = getDemoBranch(project, String(value));
                    if (next) setSelected(next.id);
                  }}
                  aria-labelledby={questionId}
                  className="demo-choice-list"
                >
                  {tree.branches.map((option, index) => {
                    const optionId = `${questionId}-${option.id}`;
                    return (
                      <label
                        key={option.id}
                        htmlFor={optionId}
                        className={`demo-choice-card ${selected === option.id ? 'is-selected' : ''}`}
                      >
                        <span className="demo-choice-number" aria-hidden="true">
                          {index + 1}
                        </span>
                        <span className="demo-choice-copy">
                          <span
                            id={`${optionId}-label`}
                            className="demo-choice-title"
                          >
                            {option.label}
                          </span>
                          <span
                            id={`${optionId}-description`}
                            className="demo-choice-description"
                          >
                            {option.description}
                          </span>
                        </span>
                        <RadioGroupItem
                          id={optionId}
                          value={option.id}
                          aria-labelledby={`${optionId}-label`}
                          aria-describedby={`${optionId}-description`}
                        />
                      </label>
                    );
                  })}
                </RadioGroup>
                <div className="demo-choice-actions">
                  <span className="demo-choice-hint">
                    Apply your choice to update the table.
                  </span>
                  <Button type="submit" className="demo-continue">
                    Apply choice
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
        <aside
          className="demo-data"
          aria-label={`${name} sample data and preview`}
        >
          <div className="demo-source">
            <div className="demo-panel-heading">
              <span>01 / Sample input</span>
              <span>3 rows</span>
            </div>
            {project === 'prepbench' ? (
              <DataTable
                label="Conversation sample sales"
                headers={['Month', 'Sales', 'Status']}
                rows={[
                  ['2026-01', 120, 'Paid'],
                  ['2026-01', 80, 'Refunded'],
                  ['2026-02', 150, 'Paid'],
                ]}
                numericColumns={[1]}
              />
            ) : (
              <DataTable
                label="Conversation sample dates"
                headers={['Date']}
                rows={demoDates.map((date) => [date])}
              />
            )}
          </div>
          <div
            id={resultId}
            tabIndex={-1}
            className={`demo-output ${ready ? 'is-ready' : ''}`}
          >
            <div className="demo-panel-heading">
              <span>02 / Prepared table</span>
              <span>{ready ? 'Preview ready' : 'Awaiting your choice'}</span>
            </div>
            {!ready ? (
              <div className="demo-awaiting">
                <span aria-hidden="true">↳</span>
                <p>
                  Choose an answer, then select Apply choice to see the table.
                </p>
              </div>
            ) : (
              <div key={confirmed} className="demo-result-enter">
                {project === 'prepbench' ? (
                  <>
                    <p className="demo-applied-rule">
                      Refunds{' '}
                      {confirmed === 'exclude' ? 'excluded' : 'included'}
                    </p>
                    <DataTable
                      label="Conversation monthly sales output"
                      headers={['Month', 'Sales']}
                      rows={[
                        ['2026-01', january],
                        ['2026-02', 150],
                      ]}
                      numericColumns={[1]}
                    />
                    <p className="demo-result-note">
                      January:{' '}
                      {confirmed === 'exclude'
                        ? '120 (paid order only)'
                        : '120 + 80 = 200'}
                      . February: 150.
                    </p>
                  </>
                ) : (
                  dateFormat && (
                    <>
                      <p className="demo-applied-rule">{dateFormat.label}</p>
                      <DataTable
                        label="Conversation standardized dates output"
                        headers={['Date']}
                        rows={dateFormat.values.map((date) => [date])}
                      />
                      <p className="demo-result-note">
                        3 dates · same calendar values · one format
                      </p>
                    </>
                  )
                )}
              </div>
            )}
          </div>
          <p className="demo-scope">
            {project === 'prepbench'
              ? 'An original illustration of clarification, not a PrepBench test case or benchmark run. PrepBench evaluates the agent you supply.'
              : 'An original illustration of format selection, not an execution of CleanAgent or Dataprep.Clean.'}
          </p>
        </aside>
      </div>
      <noscript>
        <p className="demo-no-script">
          Enable JavaScript to try the guided conversation. The paper and
          reported results below remain available.
        </p>
      </noscript>
    </div>
  );
}
