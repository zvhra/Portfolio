'use client';

import React, { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
  onInViewChange?: (inView: boolean) => void;
}

export default function Section({
  id,
  children,
  className = '',
  ariaLabelledBy,
  onInViewChange,
}: SectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Expose inView to parent if callback provided
  React.useEffect(() => {
    if (onInViewChange) {
      onInViewChange(inView);
    }
  }, [inView, onInViewChange]);

  return (
    <section
      ref={onInViewChange ? ref : undefined}
      id={id}
      className={`section ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}

