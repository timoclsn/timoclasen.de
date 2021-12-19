import { RefObject, useEffect, useState } from 'react';

export function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin = 0
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: `${rootMargin}px`,
      }
    );

    currentElement && observer.observe(currentElement);

    return () => {
      currentElement && observer.unobserve(currentElement);
    };
  }, [ref, rootMargin]);

  return isVisible;
}
