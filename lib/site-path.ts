// Build-time configuration supports both GitHub project pages and custom domains.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(
  /\/$/,
  '',
);
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4174'
).replace(/\/$/, '');
export function sitePath(path: string): string {
  return path.startsWith('/') && !path.startsWith('//')
    ? `${basePath}${path}`
    : path;
}
