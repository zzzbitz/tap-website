export const siteOrigin =
  'https://tap-data-preparation.beige-guppy-1416.chatgpt.site';

export const projects = {
  prepbench: {
    name: 'PrepBench',
    href: '/prepbench',
    type: 'Benchmark · Evaluation',
    title:
      'PrepBench: How Far Are We from Natural-Language-Driven Data Preparation?',
    authors: ['Jingzhe Xu', 'Rui Wang', 'Jiannan Wang', 'Guoliang Li'],
    venue: 'VLDB 2026',
    question: 'How well can AI prepare the data you need?',
    summary:
      'Real-world tasks that test whether AI agents can understand a request and produce the right tables.',
    paper: 'https://arxiv.org/abs/2605.08687',
    code: 'https://github.com/TsinghuaDatabaseGroup/prepbench',
    dataset:
      'https://github.com/TsinghuaDatabaseGroup/prepbench/blob/main/docs/DATASET.md',
    evaluation:
      'https://github.com/TsinghuaDatabaseGroup/prepbench/blob/main/docs/EVALUATION.md',
    contribute:
      'https://github.com/TsinghuaDatabaseGroup/prepbench/blob/main/CONTRIBUTING.md',
  },
  cleanagent: {
    name: 'CleanAgent',
    href: '/cleanagent',
    type: 'Agent framework · Standardization',
    title: 'CleanAgent: Automating Data Standardization with LLM-based Agents',
    authors: ['Danrui Qi', 'Zhengjie Miao', 'Jiannan Wang'],
    venue: 'DataAI Workshop @ VLDB 2025',
    question: 'Standardize messy data with less manual work.',
    summary:
      'AI agents use data-cleaning tools to turn inconsistent dates, addresses, and other values into a common format.',
    paper: 'https://arxiv.org/abs/2403.08291',
    code: 'https://github.com/sfu-db/CleanAgent',
    demonstration: 'https://github.com/sfu-db/CleanAgent#demonstration',
    video: 'https://www.youtube.com/watch?v=fSYXVM6qeqM',
    videoEmbed:
      'https://www.youtube-nocookie.com/embed/fSYXVM6qeqM?playsinline=1&rel=0',
  },
} as const;

export type Project = (typeof projects)[keyof typeof projects];
