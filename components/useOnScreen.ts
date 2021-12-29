import { RefObject, useEffect, useState } from 'react';

export function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin = 0,
  fireOnce = false
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (fireOnce) {
          if (entry.isIntersecting) {
            setIsVisible(entry.isIntersecting);
            currentElement && observer.unobserve(currentElement);
          }
        } else {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        rootMargin: `${rootMargin}px`,
      }
    );

    currentElement && observer.observe(currentElement);

    return () => {
      currentElement && observer.unobserve(currentElement);
    };
  }, [ref, rootMargin, fireOnce]);

  return isVisible;
}
