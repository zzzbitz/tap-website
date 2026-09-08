import type { ReactNode } from 'react';

export function Arrow({
  external = false,
  className = '',
}: {
  external?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {external ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a href={href} className={`link-arrow ${className}`}>
      {children}
      <Arrow external={external} />
    </a>
  );
}

export function ResourceLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <a className="resource-link" href={href}>
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      <Arrow external />
    </a>
  );
}
