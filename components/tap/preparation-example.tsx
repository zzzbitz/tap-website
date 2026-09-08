import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function PreparationExample() {
  return (
    <section
      id="vision"
      className="hero-example"
      aria-labelledby="example-title"
    >
      <h2 id="example-title" className="example-heading">
        You set the goal. <span>AI prepares the data.</span>
      </h2>
      <figure className="data-sheet" aria-describedby="example-note">
        <figcaption className="sheet-caption">
          <span>Illustrative example</span>
          <span className="mono">Intent → Data</span>
        </figcaption>
        <div className="user-goal">
          <span>Your goal</span>
          <p>Show monthly sales.</p>
        </div>
        <div className="source-wrap">
          <p className="stage-label" id="source-label">
            <span className="stage-number">01</span> Source table
          </p>
          <Table
            className="tap-table source-table"
            aria-labelledby="source-label"
          >
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Date</TableHead>
                <TableHead scope="col">Order</TableHead>
                <TableHead scope="col" className="numeric">
                  Sales
                </TableHead>
                <TableHead scope="col">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2026-01-03</TableCell>
                <TableCell>A101</TableCell>
                <TableCell className="numeric">120</TableCell>
                <TableCell>Paid</TableCell>
              </TableRow>
              <TableRow className="excluded-row">
                <TableCell>Jan 4, 2026</TableCell>
                <TableCell>A102</TableCell>
                <TableCell className="numeric">80</TableCell>
                <TableCell className="excluded-status">Refunded</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2026/02/01</TableCell>
                <TableCell>A103</TableCell>
                <TableCell className="numeric">150</TableCell>
                <TableCell>Paid</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="clarification">
          <p className="stage-label">
            <span className="stage-number">02</span> A choice that changes the
            answer
          </p>
          <p>Should refunded orders count toward sales?</p>
          <div className="decision">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="m4 10 4 4 8-8" />
            </svg>
            <p>
              <span>Your decision: </span>Exclude refunded orders.
            </p>
          </div>
        </div>
        <div className="output-wrap">
          <p className="stage-label" id="output-label">
            <span className="stage-number">03</span> Prepared output
          </p>
          <Table
            className="tap-table output-table"
            aria-labelledby="output-label"
          >
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Month</TableHead>
                <TableHead scope="col" className="numeric">
                  Sales
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2026-01</TableCell>
                <TableCell className="numeric">120</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2026-02</TableCell>
                <TableCell className="numeric">150</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="example-trace">
            Dates standardized · Refunded orders excluded · Sales grouped by
            month
          </p>
        </div>
      </figure>
      <p className="example-trace" id="example-note">
        A static illustration of the behavior we are working toward.
      </p>
    </section>
  );
}
