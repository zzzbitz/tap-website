import type { ReactNode } from 'react';
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
  return (
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
  );
}
