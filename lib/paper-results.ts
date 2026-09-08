// Transcribed from the versioned paper tables; costs are USD × 10^-3 per task.
export const prepResultsSource = 'https://arxiv.org/html/2605.08687v1#S5.T6';
export const cleanResultsSource = 'https://arxiv.org/html/2403.08291v4#S4.T1';
export type PrepMode = 'code' | 'workflow';
export const prepResults = [
  {
    name: 'GPT-5.1-Codex',
    family: 'proprietary',
    code: [54.9, 115.4],
    workflow: [34.6, 264.1],
  },
  {
    name: 'Claude-Sonnet-4.5',
    family: 'proprietary',
    code: [52.0, 114.0],
    workflow: [24.5, 223.2],
  },
  {
    name: 'Gemini 3 Flash',
    family: 'proprietary',
    code: [53.3, 21.4],
    workflow: [22.2, 41.66],
  },
  {
    name: 'Grok Code Fast 1',
    family: 'proprietary',
    code: [30.1, 18.61],
    workflow: [13.1, 35.56],
  },
  {
    name: 'GPT-4o',
    family: 'proprietary',
    code: [16.7, 105.4],
    workflow: [5.2, 141.7],
  },
  {
    name: 'Kimi K2 Thinking',
    family: 'open',
    code: [49.7, 36.04],
    workflow: [30.1, 75.04],
  },
  {
    name: 'GLM-4.7',
    family: 'open',
    code: [41.5, 24.74],
    workflow: [19.9, 53.88],
  },
  {
    name: 'Qwen3-235B-A22B',
    family: 'open',
    code: [38.2, 36.99],
    workflow: [19.3, 47.51],
  },
  {
    name: 'DeepSeek-V3.2',
    family: 'open',
    code: [44.8, 6.62],
    workflow: [15.7, 11.59],
  },
  {
    name: 'DevStral 2',
    family: 'open',
    code: [33.3, 1.89],
    workflow: [8.5, 3.16],
  },
] as const;

export const cleanResults = [
  { name: 'GPT-4o + Prompting', matching: 22.0, latency: 19.76 },
  { name: 'Cocoon', matching: 21.5, latency: 636.62 },
  { name: 'CleanAgent', matching: 42.5, latency: 29.57 },
] as const;
