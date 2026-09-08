import { access, mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist/client');
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(
  /^\/|\/$/g,
  '',
);
if (prefix && !/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(prefix)) {
  throw new Error('Invalid static-site base path');
}

// vinext 1.0 beta emits assets under assetPrefix. GitHub Pages already mounts
// the artifact at that prefix, so assets belong at the artifact root.
if (prefix) {
  await rename(path.join(output, prefix, '_next'), path.join(output, '_next'));
}

// Explicit directories support direct visits and refreshes on any static host.
// Avoid vinext beta's trailingSlash prerender issue by normalizing after export.
for (const route of ['prepbench', 'cleanagent']) {
  await mkdir(path.join(output, route), { recursive: true });
  await rename(
    path.join(output, `${route}.html`),
    path.join(output, route, 'index.html'),
  );
}
for (const file of [
  'index.html',
  '404.html',
  'prepbench/index.html',
  'cleanagent/index.html',
]) {
  await access(path.join(output, file));
}
await writeFile(path.join(output, '.nojekyll'), '');
