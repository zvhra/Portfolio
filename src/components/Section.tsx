'use client';

import { ReactNode, useEffect, useRef } from 'react';
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
  const callbackRef = useRef(onInViewChange);

  // Store the latest callback in a ref to avoid dependency issues
  useEffect(() => {
    callbackRef.current = onInViewChange;
  }, [onInViewChange]);

  // Expose inView to parent if callback provided
  useEffect(() => {
    callbackRef.current?.(inView);
  }, [inView]);

  return (
    <section
      ref={ref}
      id={id}
      className={`section ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}

