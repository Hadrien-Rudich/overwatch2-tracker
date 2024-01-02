import { useEffect, useRef, ReactNode } from 'react';

interface ScrollIntoViewProps {
  children: ReactNode;
  shouldScroll: boolean;
}

function ScrollIntoView({ children, shouldScroll }: ScrollIntoViewProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldScroll && elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [shouldScroll]);

  return <div ref={elementRef}>{children}</div>;
}

export default ScrollIntoView;
