
import { useEffect, useRef, useState } from "react";

export function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Animate once
        }
      },
      { threshold: 0.22, ...options }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return [ref, inView] as const;
}
