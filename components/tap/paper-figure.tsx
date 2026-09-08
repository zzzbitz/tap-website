'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
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

function EnlargedFigure({
  src,
  width,
  height,
  alt,
}: Pick<PaperFigureProps, 'src' | 'width' | 'height' | 'alt'>) {
  const mediaRef = useRef<HTMLElement>(null);
  const hintId = useId();
  const [overflow, setOverflow] = useState({
    horizontal: false,
    vertical: false,
  });
  useEffect(() => {
    const region = mediaRef.current;
    const image = region?.querySelector('img');
    if (!region || !image) return;
    const measure = () =>
      setOverflow({
        horizontal: region.scrollWidth > region.clientWidth + 1,
        vertical: region.scrollHeight > region.clientHeight + 1,
      });
    const observer = new ResizeObserver(measure);
    observer.observe(region);
    observer.observe(image);
    image.addEventListener('load', measure);
    measure();
    return () => {
      observer.disconnect();
      image.removeEventListener('load', measure);
    };
  }, []);
  const scrollable = overflow.horizontal || overflow.vertical;
  return (
    <>
      <section
        ref={mediaRef}
        className="figure-modal-media"
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Keyboard users need to focus and scroll an overflowing figure.
        tabIndex={scrollable ? 0 : undefined}
        aria-label="Enlarged paper figure"
        aria-describedby={scrollable ? hintId : undefined}
      >
        <Image unoptimized src={src} width={width} height={height} alt={alt} />
      </section>
      {scrollable && (
        <p id={hintId} className="figure-scroll-hint">
          {overflow.horizontal && overflow.vertical
            ? 'Scroll within the image to see the full figure.'
            : overflow.horizontal
              ? 'Scroll horizontally within the image to see the full figure.'
              : 'Scroll down within the image to see the full figure.'}
        </p>
      )}
    </>
  );
}

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
          <EnlargedFigure src={src} width={width} height={height} alt={alt} />
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
