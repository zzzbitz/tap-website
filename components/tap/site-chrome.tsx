import { sitePath } from '@/lib/site-path';
import { ThemeMenu } from '@/components/tap/theme-menu';
/* oxlint-disable nextjs/no-html-link-for-pages -- Static export uses native navigation to avoid vinext client-router errors. */

export function Wordmark() {
  return (
    <a href={sitePath('/')} className="wordmark" aria-label="TAP home">
      <span className="table-mark" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} />
        ))}
      </span>
      TAP
    </a>
  );
}

export function SiteHeader() {
  return (
    <header id="top" className="site-header shell">
      <Wordmark />
      <div className="header-right">
        <nav className="site-nav" aria-label="Main navigation">
          <a href={sitePath('/#thesis')}>Thesis</a>
          <a href={sitePath('/#evidence')}>Evidence</a>
        </nav>
        <ThemeMenu />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="footer-brand">
        <Wordmark />
        <p>Trust AI to prepare your data.</p>
      </div>
      <a href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
