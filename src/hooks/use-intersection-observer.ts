import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  hasIntersected: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Hook to track element visibility in viewport
 * Returns state instead of using callbacks - more intuitive for React patterns
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { isIntersecting, hasIntersected } = useIntersectionObserver(ref, { threshold: 0.5 });
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { threshold = 0, root = null, rootMargin = "0px", triggerOnce = false } = options;

  const [state, setState] = useState<UseIntersectionObserverReturn>({
    isIntersecting: false,
    hasIntersected: false,
    entry: null,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setState((prev) => {
            const newState: UseIntersectionObserverReturn = {
              isIntersecting: entry.isIntersecting,
              hasIntersected: prev.hasIntersected || entry.isIntersecting,
              entry,
            };
            return newState;
          });

          // Unobserve after first intersection if triggerOnce is true
          if (triggerOnce && entry.isIntersecting && observerRef.current) {
            observerRef.current.unobserve(element);
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, threshold, root, rootMargin, triggerOnce]);

  return state;
}
