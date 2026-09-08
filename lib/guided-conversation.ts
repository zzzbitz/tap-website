export type DemoProject = 'prepbench' | 'cleanagent';
export type DemoChoice =
  | 'exclude'
  | 'include'
  | 'iso'
  | 'day-first'
  | 'month-name';
export type DemoStage = 'request' | 'clarify' | 'result';
export type DemoState = { stage: DemoStage; choice: DemoChoice | null };
export const initialDemoState: DemoState = { stage: 'request', choice: null };

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

export const demoPrompts = {
  prepbench: [
    'Show monthly sales.',
    'Exclude refunded orders.',
    'Include refunded orders.',
    'Why ask?',
  ],
  cleanagent: [
    'Standardize these dates.',
    'Use YYYY-MM-DD.',
    'Use DD/MM/YYYY.',
    'Use month names.',
  ],
} as const;

export const demoGreetings = {
  prepbench:
    'Let’s prepare monthly sales from these three orders. Send a request, and we’ll resolve a choice that changes the answer.',
  cleanagent:
    'These three dates use different formats. Tell me how you want the date column standardized.',
};

// This is a finite, explicitly scripted demo. Only supported phrases are handled;
// unknown or conflicting instructions never silently change the output.
function normalize(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[.!。！]+$/u, '')
    .replace(/\s+/g, ' ')
    .replace(/^please /, '')
    .replace(/ please$/, '')
    .replace(/ instead$/, '');
}

export function advanceDemo(
  project: DemoProject,
  state: DemoState,
  input: string,
): { state: DemoState; reply: string } {
  const text = normalize(input);
  if (project === 'prepbench') {
    if (
      [
        'show monthly sales',
        'show monthly revenue',
        'monthly sales',
        '按月汇总销售额',
        '看看每月销售额',
      ].includes(text)
    ) {
      return {
        state: { stage: 'clarify', choice: null },
        reply:
          'Should refunded orders count toward sales? January includes a refunded order for 80. Including it gives 200; excluding it gives 120.',
      };
    }
    if (['why ask', 'why', '为什么', '为什么要问'].includes(text)) {
      return {
        state,
        reply:
          '“Sales” does not say whether refunds should count. Both totals can be computed, but only your intended rule tells us which output is right. PrepBench evaluates the final prepared tables.',
      };
    }
    const exclude = [
      'exclude refunds',
      'exclude refunded orders',
      '排除退款订单',
      '排除退款',
      '不要计入退款',
    ].includes(text);
    const include = [
      'include refunds',
      'include refunded orders',
      '计入退款订单',
      '计入退款',
      '包含退款',
    ].includes(text);
    if (exclude || include) {
      const choice = exclude ? 'exclude' : 'include';
      const changed = state.choice !== null && state.choice !== choice;
      return {
        state: { stage: 'result', choice },
        reply: `${changed ? 'Updated the example. ' : ''}${exclude ? 'Refunded orders are excluded' : 'Refunded orders are included'}. January totals ${exclude ? 120 : 200}; February totals 150. The preview follows this rule. You can change your decision and compare the result.`,
      };
    }
    return {
      state,
      reply:
        'This guided example supports monthly sales and the refund rule. Try “Show monthly sales”, “Exclude refunded orders”, or “Include refunded orders”. Other requests leave the preview unchanged.',
    };
  }
  if (
    [
      'standardize these dates',
      'standardize dates',
      'clean these dates',
      '统一日期格式',
      '标准化日期',
    ].includes(text)
  ) {
    return {
      state: { stage: 'clarify', choice: null },
      reply:
        'The column contains dates written in three ways. Which output format would you like: YYYY-MM-DD, DD/MM/YYYY, or month names such as Jan 3, 2026?',
    };
  }
  const format = text
    .replace(/^(use|switch to|change to) /, '')
    .replace(/^(使用|改成|改为)/, '')
    .trim();
  let choice: DemoChoice | null = null;
  if (
    ['iso', 'yyyy-mm-dd', 'iso format', 'iso格式', '年-月-日'].includes(format)
  )
    choice = 'iso';
  if (['dd/mm/yyyy', 'day first', 'day-first', '日/月/年'].includes(format))
    choice = 'day-first';
  if (
    [
      'month names',
      'month name',
      'mmm d, yyyy',
      '月份名称',
      '英文月份',
    ].includes(format)
  )
    choice = 'month-name';
  if (choice && choice in demoDateFormats) {
    const selected = demoDateFormats[choice as keyof typeof demoDateFormats];
    return {
      state: { stage: 'result', choice },
      reply: `${state.choice !== null && state.choice !== choice ? 'Updated the format. ' : ''}All three example values now use ${selected.label}. Jan 4 is still January 4, and February 1 stays February 1. The representation changes; the dates keep their meaning. Try another format to compare.`,
    };
  }
  return {
    state,
    reply:
      'This guided example supports three date formats. Try “Use YYYY-MM-DD”, “Use DD/MM/YYYY”, or “Use month names”. Other instructions leave the preview unchanged.',
  };
}
