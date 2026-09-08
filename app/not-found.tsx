import { sitePath } from '@/lib/site-path';
/* oxlint-disable nextjs/no-html-link-for-pages -- Static export uses native navigation to avoid vinext client-router errors. */
import { Arrow } from '@/components/tap/primitives';

export default function NotFound() {
  return (
    <main id="main-content" className="shell" tabIndex={-1}>
      <div className="not-found">
        <p className="eyebrow blue">404 / Page not found</p>
        <h1>Back to the research.</h1>
        <p>
          The page at this address could not be found. Explore TAP and its
          research projects from the homepage.
        </p>
        <a href={sitePath('/')} className="button-link">
          Return to TAP <Arrow />
        </a>
      </div>
    </main>
  );
}
