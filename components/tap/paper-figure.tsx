'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Arrow } from '@/components/tap/primitives';

type PaperFigureProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
  source: string;
  figureNumber: number;
};

export function PaperFigure({
  src,
  width,
  height,
  alt,
  title,
  caption,
  source,
  figureNumber,
}: PaperFigureProps) {
  return (
    <figure className="paper-figure">
      <Dialog>
        <DialogTrigger
          className="paper-figure-trigger"
          aria-label={`Enlarge ${title}`}
        >
          <Image
            unoptimized
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ maxWidth: width }}
          />
          <span className="enlarge-hint">
            <svg
              className="enlarge-icon"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4M3 3l5 5m9-5-5 5M3 17l5-5m9 5-5-5" />
            </svg>
            Enlarge figure
          </span>
        </DialogTrigger>
        <DialogContent className="figure-modal" showCloseButton={false}>
          <div className="figure-modal-head">
            <DialogTitle className="figure-modal-title">{title}</DialogTitle>
            <DialogClose className="figure-close">
              Close <span aria-hidden="true">×</span>
            </DialogClose>
          </div>
          <section
            className="figure-modal-media"
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Keyboard users need to focus and scroll the enlarged figure.
            tabIndex={0}
            aria-label="Enlarged paper figure; scroll to see all details"
          >
            <Image
              unoptimized
              src={src}
              width={width}
              height={height}
              alt={alt}
            />
          </section>
          <DialogDescription className="figure-modal-description">
            {caption}
          </DialogDescription>
          <div className="figure-modal-links">
            <a href={source}>Source paper · Figure {figureNumber}</a>
            <a href={src}>
              Open full-size image <span aria-hidden="true">↗</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
      <figcaption className="visual-caption">
        <span>
          <strong>{title}.</strong> {caption}
        </span>
        <a href={source}>
          Paper · Fig. {figureNumber} <Arrow external />
        </a>
      </figcaption>
    </figure>
  );
}
