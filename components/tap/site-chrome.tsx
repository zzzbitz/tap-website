import Link from 'next/link';

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="TAP home">
      <span className="table-mark" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} />
        ))}
      </span>
      TAP
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header id="top" className="site-header shell">
      <Wordmark />
      <div className="header-right">
        <span className="header-note">Human intent. Prepared data.</span>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/#vision">Vision</Link>
          <Link href="/#research">Research</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="footer-brand">
        <Wordmark />
        <p>Trust AI to Prepare Your Data</p>
      </div>
      <a href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
