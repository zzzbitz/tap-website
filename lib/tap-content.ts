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
    venue: 'VLDB 2026 (PVLDB Volume 19)',
    question: 'How far are we from natural-language-driven data preparation?',
    summary:
      'A benchmark for evaluating whether AI agents can turn natural-language requests and input tables into correct prepared data.',
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
    question: 'How can AI take over repetitive data standardization?',
    summary:
      'An agent framework that combines language models with Dataprep.Clean to standardize heterogeneous column formats with less manual coding.',
    paper: 'https://arxiv.org/abs/2403.08291',
    code: 'https://github.com/sfu-db/CleanAgent',
    demonstration: 'https://github.com/sfu-db/CleanAgent#demonstration',
  },
} as const;

export type Project = (typeof projects)[keyof typeof projects];
