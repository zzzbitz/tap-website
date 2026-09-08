'use client';

import { useEffect, useId, useRef, useState, type SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Message,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from '@/components/ui/message';
import { DataTable } from '@/components/tap/data-table';
import {
  advanceDemo,
  demoDateFormats,
  demoDates,
  demoGreetings,
  demoPrompts,
  initialDemoState,
  type DemoProject,
  type DemoState,
} from '@/lib/guided-conversation';

type Turn = { id: number; role: 'user' | 'agent'; text: string };

export function GuidedConversation({ project }: { project: DemoProject }) {
  const name = project === 'prepbench' ? 'PrepBench' : 'CleanAgent';
  const [state, setState] = useState<DemoState>(initialDemoState);
  const [turns, setTurns] = useState<Turn[]>([
    { id: 0, role: 'agent', text: demoGreetings[project] },
  ]);
  const [draft, setDraft] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const hintId = useId();
  const resultId = `${project}-demo-output`;
  const nextId = useRef(1);
  useEffect(() => {
    // Move only the transcript, never the document or the user's keyboard focus.
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns]);

  function send(text: string) {
    const input = text.trim();
    if (!input) return;
    const next = advanceDemo(project, state, input);
    const id = nextId.current;
    nextId.current += 2;
    setTurns((history) => [
      ...history,
      { id, role: 'user', text: input },
      { id: id + 1, role: 'agent', text: next.reply },
    ]);
    setState(next.state);
    setDraft('');
  }
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }
  function reset() {
    setState(initialDemoState);
    setTurns([
      { id: nextId.current++, role: 'agent', text: demoGreetings[project] },
    ]);
    setDraft('');
  }
  const phase =
    state.stage === 'request' ? 0 : state.stage === 'clarify' ? 1 : 2;
  const dateFormat =
    state.choice && state.choice in demoDateFormats
      ? demoDateFormats[state.choice as keyof typeof demoDateFormats]
      : null;
  const january = state.choice === 'include' ? 200 : 120;
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
            Fixed sample data and prepared replies. Choose a suggestion or type
            one below.
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
        {['Describe', 'Clarify', 'Preview'].map((label, i) => (
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
            className="demo-transcript"
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
            <div className="demo-suggestions" aria-label="Suggested messages">
              {demoPrompts[project].map((prompt) => (
                <Button
                  type="button"
                  variant="outline"
                  className="demo-suggestion"
                  key={prompt}
                  onClick={() => send(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
            <form onSubmit={submit}>
              <label className="sr-only" htmlFor={inputId}>
                Message for the {name} example agent
              </label>
              <div className="demo-input-row">
                <Textarea
                  id={inputId}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      send(draft);
                    }
                  }}
                  maxLength={240}
                  rows={2}
                  aria-describedby={hintId}
                  placeholder={
                    project === 'prepbench'
                      ? 'Try “Exclude refunded orders”'
                      : 'Try “Use DD/MM/YYYY”'
                  }
                />
                <Button
                  type="submit"
                  className="demo-send"
                  disabled={!draft.trim()}
                  aria-label={`Send ${name} message`}
                >
                  <span aria-hidden="true">↑</span>
                </Button>
              </div>
              <p id={hintId} className="demo-input-hint">
                Guided replies only · Enter to send · Shift + Enter for a new
                line
              </p>
            </form>
            {state.stage === 'result' && (
              <a className="demo-result-link" href={`#${resultId}`}>
                View the prepared table <span aria-hidden="true">↓</span>
              </a>
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
            className={`demo-output ${state.stage === 'result' ? 'is-ready' : ''}`}
          >
            <div className="demo-panel-heading">
              <span>02 / Prepared table</span>
              <span>
                {state.stage === 'result'
                  ? 'Preview ready'
                  : 'Awaiting your choice'}
              </span>
            </div>
            {state.stage !== 'result' ? (
              <div className="demo-awaiting">
                <span aria-hidden="true">↳</span>
                <p>
                  {state.stage === 'clarify'
                    ? 'Your answer will determine the output.'
                    : 'Start a conversation to prepare the sample.'}
                </p>
              </div>
            ) : (
              <div
                key={`${state.choice}-${turns.length}`}
                className="demo-result-enter"
              >
                {project === 'prepbench' ? (
                  <>
                    <p className="demo-applied-rule">
                      Refunds{' '}
                      {state.choice === 'exclude' ? 'excluded' : 'included'}
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
                      {state.choice === 'exclude'
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
