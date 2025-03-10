
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const FadeIn = ({
  children,
  delay = 0,
  duration = 600,
  className = '',
  direction = 'up',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [once, threshold]);

  let initialTransform = 'translateY(20px)';
  if (direction === 'down') initialTransform = 'translateY(-20px)';
  if (direction === 'left') initialTransform = 'translateX(20px)';
  if (direction === 'right') initialTransform = 'translateX(-20px)';
  if (direction === 'none') initialTransform = 'none';

  const transitionStyles = {
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0)' : initialTransform,
  };

  return (
    <div
      ref={domRef}
      className={cn(className)}
      style={transitionStyles}
    >
      {children}
    </div>
  );
};

export default FadeIn;
