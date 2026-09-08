import { DataTable } from '@/components/tap/data-table';
import { Arrow } from '@/components/tap/primitives';

export function PreparationExample() {
  return (
    <section
      id="vision"
      className="vision-section shell"
      aria-labelledby="vision-title"
    >
      <h2 id="vision-title" className="vision-heading">
        You set the goal. <span>AI prepares the data.</span>
      </h2>
      <figure className="vision-scene" aria-describedby="vision-caption">
        <figcaption className="scene-label">Illustrative example</figcaption>
        <div className="goal-statement">
          <span>Your goal</span>
          <p>Show monthly sales.</p>
        </div>
        <div className="vision-flow">
          <div className="vision-stage source-stage">
            <p className="diagram-label">Start with your data</p>
            <div className="floating-table">
              <DataTable
                label="Source orders in the monthly-sales illustration"
                headers={['Date', 'Order', 'Sales', 'Status']}
                numericColumns={[2]}
                rows={[
                  ['2026-01-03', 'A101', '120', 'Paid'],
                  [
                    <span className="mixed-value" key="date">
                      Jan 4, 2026
                    </span>,
                    'A102',
                    '80',
                    <span className="refunded-value" key="refund">
                      Refunded
                    </span>,
                  ],
                  [
                    <span className="mixed-value" key="date">
                      2026/02/01
                    </span>,
                    'A103',
                    '150',
                    'Paid',
                  ],
                ]}
                className="blue-table source-table"
              />
            </div>
          </div>
          <Arrow className="scene-arrow first-arrow" />
          <div className="vision-stage meaning-stage">
            <p className="diagram-label">Clarify what matters</p>
            <div className="meaning-choice">
              <span className="choice-label">
                A choice that changes the answer
              </span>
              <p>Should refunded orders count toward sales?</p>
              <div className="user-decision">
                <span className="mini-check" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <span>Your decision</span>
                  <strong>Exclude refunded orders.</strong>
                </div>
              </div>
            </div>
          </div>
          <Arrow className="scene-arrow second-arrow" />
          <div className="vision-stage result-stage">
            <p className="diagram-label">Ready for analysis</p>
            <div className="floating-table prepared-table">
              <DataTable
                label="Prepared monthly sales after excluding refunded orders"
                headers={['Month', 'Sales']}
                numericColumns={[1]}
                rows={[
                  ['2026-01', '120'],
                  ['2026-02', '150'],
                ]}
                className="green-table"
              />
              <div className="output-signoff">
                <span className="mini-check" aria-hidden="true">
                  ✓
                </span>{' '}
                Monthly sales
              </div>
            </div>
          </div>
        </div>
        <div className="treatment-trace" aria-label="Preparation decisions">
          <span>Dates standardized</span>
          <span>Refunded orders excluded</span>
          <span>Sales grouped by month</span>
        </div>
      </figure>
      <p className="scene-caption" id="vision-caption">
        A static illustration of the behavior we’re working toward.
      </p>
      <p className="vision-explanation">
        People define what matters. AI handles the preparation and asks about
        decisions that change the meaning of the result. The output should make
        important choices and unresolved issues visible.
      </p>
    </section>
  );
}
