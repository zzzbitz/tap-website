export { siteOrigin } from './site-path';
import { sitePath } from './site-path';

export const projects = {
  prepbench: {
    name: 'PrepBench',
    href: sitePath('/prepbench/'),
    type: 'Benchmark · Evaluation',
    title:
      'PrepBench: How Far Are We from Natural-Language-Driven Data Preparation?',
    authors: ['Jingzhe Xu', 'Rui Wang', 'Jiannan Wang', 'Guoliang Li'],
    affiliation:
      'Department of Computer Science and Technology, BNRist, Tsinghua University',
    authorLinks: {
      'Jingzhe Xu':
        'https://scholar.google.com/citations?user=RFNP0boAAAAJ&hl=zh-CN',
      'Rui Wang':
        'https://scholar.google.com/citations?user=VNxw8OUAAAAJ&hl=zh-CN',
      'Jiannan Wang': 'https://dbgroup.cs.tsinghua.edu.cn/jnwang/',
      'Guoliang Li': 'https://dbgroup.cs.tsinghua.edu.cn/ligl/',
    } as Record<string, string>,
    venue: 'VLDB 2026',
    question: 'How far are we from natural-language-driven data preparation?',
    summary:
      'PrepBench evaluates how well LLM-based agents resolve ambiguous requests, generate data preparation code, and convert that code into graphical workflows.',
    paper: 'https://doi.org/10.14778/3828612.3828638',
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
    href: sitePath('/cleanagent/'),
    type: 'Agent framework · Standardization',
    title: 'CleanAgent: Automating Data Standardization with LLM-based Agents',
    authors: ['Danrui Qi', 'Zhengjie Miao', 'Jiannan Wang'],
    affiliation: 'Simon Fraser University',
    authorLinks: {
      'Danrui Qi': 'https://qidanrui.github.io/',
      'Zhengjie Miao': 'https://www.miaozhengjie.com/',
      'Jiannan Wang': 'https://dbgroup.cs.tsinghua.edu.cn/jnwang/',
    } as Record<string, string>,
    venue: 'DataAI Workshop @ VLDB 2025',
    question: 'Automating data standardization with LLM-based agents.',
    summary:
      'CleanAgent brings together Dataprep.Clean and LLM-based agents to standardize tables from a user’s requirements.',
    paper:
      'https://www.vldb.org/2025/Workshops/VLDB-Workshops-2025/DATAI/DATAI25_8.pdf',
    code: 'https://github.com/sfu-db/CleanAgent',
    demonstration: 'https://github.com/sfu-db/CleanAgent#demonstration',
    video: 'https://www.youtube.com/watch?v=fSYXVM6qeqM',
    videoEmbed:
      'https://www.youtube-nocookie.com/embed/fSYXVM6qeqM?playsinline=1&rel=0',
  },
} as const;

export type Project = (typeof projects)[keyof typeof projects];
