'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function DataTable({
  label,
  headers,
  rows,
  numericColumns = [],
  className = '',
}: {
  label: string;
  headers: string[];
  rows: ReactNode[][];
  numericColumns?: number[];
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const region = scrollRef.current;
    const table = region?.querySelector('table');
    if (!region || !table) return;
    const measure = () =>
      setOverflows(region.scrollWidth > region.clientWidth + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(region);
    observer.observe(table);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="data-table-scroll"
        role={overflows ? 'region' : undefined}
        aria-label={overflows ? label : undefined}
        aria-describedby={overflows ? hintId : undefined}
        tabIndex={overflows ? 0 : undefined}
      >
        <Table className={`data-table ${className}`} aria-label={label}>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={header}
                  scope="col"
                  className={numericColumns.includes(index) ? 'numeric' : ''}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((value, index) => (
                  <TableCell
                    key={index}
                    className={numericColumns.includes(index) ? 'numeric' : ''}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {overflows && (
        <p id={hintId} className="table-scroll-hint">
          Scroll to see all columns <span aria-hidden="true">↔</span>
        </p>
      )}
    </>
  );
}
