export type DemoProject = 'prepbench' | 'cleanagent';
export type DemoChoice =
  | 'exclude'
  | 'include'
  | 'iso'
  | 'day-first'
  | 'month-name';

type DemoBranch = {
  id: DemoChoice;
  label: string;
  description: string;
  answer: string;
  reply: string;
};
type DemoTree = {
  request: string;
  context: string;
  question: string;
  branches: readonly DemoBranch[];
};

export const demoDates = ['2026-01-03', 'Jan 4, 2026', '2026/02/01'];
export const demoDateFormats = {
  iso: {
    label: 'YYYY-MM-DD',
    values: ['2026-01-03', '2026-01-04', '2026-02-01'],
  },
  'day-first': {
    label: 'DD/MM/YYYY',
    values: ['03/01/2026', '04/01/2026', '01/02/2026'],
  },
  'month-name': {
    label: 'MMM D, YYYY',
    values: ['Jan 3, 2026', 'Jan 4, 2026', 'Feb 1, 2026'],
  },
} as const;

// One fixed request leads to a question, then one of its scripted result leaves.
// Branch IDs are the only accepted actions; no text interpretation or model calls.
export const demoTrees: Record<DemoProject, DemoTree> = {
  prepbench: {
    request: 'Prepare a monthly sales table from these orders.',
    context:
      'January includes a refunded order for 80. I need one rule before preparing the table.',
    question: 'Should refunded orders count toward sales?',
    branches: [
      {
        id: 'exclude',
        label: 'Exclude refunded orders',
        description: 'Count paid orders only. January will total 120.',
        answer: 'Exclude refunded orders from the totals.',
        reply:
          'Refunded orders are excluded. January totals 120; February totals 150. The prepared table follows your rule.',
      },
      {
        id: 'include',
        label: 'Include refunded orders',
        description: 'Count all orders in the sample. January will total 200.',
        answer: 'Include refunded orders in the totals.',
        reply:
          'Refunded orders are included. January totals 200; February totals 150. The prepared table follows your rule.',
      },
    ],
  },
  cleanagent: {
    request: 'Standardize the dates in this column.',
    context:
      'These three dates use different formats. I’ll keep their calendar meanings and use the format you choose.',
    question: 'Which date format should I use?',
    branches: [
      {
        id: 'iso',
        label: 'YYYY-MM-DD',
        description: 'Year first, with hyphens. For example, 2026-01-04.',
        answer: 'Use YYYY-MM-DD for every date.',
        reply:
          'All three dates now use YYYY-MM-DD. January 4 remains January 4, and February 1 remains February 1.',
      },
      {
        id: 'day-first',
        label: 'DD/MM/YYYY',
        description: 'Day first, with slashes. For example, 04/01/2026.',
        answer: 'Use DD/MM/YYYY for every date.',
        reply:
          'All three dates now use DD/MM/YYYY. January 4 becomes 04/01/2026, and February 1 becomes 01/02/2026.',
      },
      {
        id: 'month-name',
        label: 'MMM D, YYYY',
        description:
          'Spell out the month abbreviation. For example, Jan 4, 2026.',
        answer: 'Use month names for every date.',
        reply:
          'All three dates now use month names. The representation changes; each date keeps its calendar meaning.',
      },
    ],
  },
};

export function getDemoBranch(project: DemoProject, choice: string) {
  return demoTrees[project].branches.find((branch) => branch.id === choice);
}
