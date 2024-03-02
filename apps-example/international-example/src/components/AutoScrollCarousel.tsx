'use client';

import { classNames } from '@marulloc/components-library/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
};
const AutoScrollCarousel = ({ children }: Props) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const animateScroll = useCallback(
    (time: number) => {
      if (!scrollRef.current) return;

      const speed = 2; // 스크롤 속도 조절
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      switch (direction) {
        case 'left':
          scrollRef.current.scrollLeft -= speed;
          if (scrollRef.current.scrollLeft <= 0) setDirection('right');

          break;
        case 'right':
          scrollRef.current.scrollLeft += speed;

          if (scrollLeft + clientWidth >= scrollWidth) setDirection('left');

          break;
      }

      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateScroll);
    },
    [direction],
  );

  const startAnimation = useCallback(() => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animateScroll);
    }
  }, [animateScroll]);

  const stopAnimation = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAnimation();
    return () => {
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  return (
    <div
      className={classNames('relative overflow-hidden rounded-lg', 'h-fit w-full')}
      onMouseEnter={stopAnimation}
      onMouseLeave={startAnimation}
    >
      <div
        ref={scrollRef}
        className={classNames(
          'overflow-auto  h-full w-full ',
          'relative flex flex-nowrap  gap-x-4 sm:gap-x-6 md:gap-x-8  ',
          'hide-scrollbar',
        )}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="  flex-shrink-0 flex justify-center items-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
