'use client';

import IconButton from '@/components/IconButton';
import { classNames } from '@marulloc/components-library/utils';
import React, { useState, useEffect } from 'react';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';

const SwipeableCarousel = ({ children }: { children: React.ReactElement[] }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [curIdx, setCurIdx] = useState(0);
  const [startX, setStartX] = useState(0); // for mobile
  const [moveX, setMoveX] = useState(0); // for mobile

  const goPrev = () => {
    if (isMoving || curIdx === 0) return;
    setIsMoving(true);
    setCurIdx(curIdx - 1);
  };
  const goNext = () => {
    if (isMoving || curIdx === children.length - 1) return;
    setIsMoving(true);
    setCurIdx(curIdx + 1);
  };

  const goto = (slideIdx: number) => {
    if (isMoving) return;
    setIsMoving(true);
    setCurIdx(slideIdx);
  };

  useEffect(() => {
    setTimeout(() => setIsMoving(false), 500);
  }, [curIdx]);

  // Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    setStartX(touchStartX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchMoveX = e.touches[0].clientX;
    setMoveX(touchMoveX - startX);
  };

  const handleTouchEnd = () => {
    if (moveX > 50) {
      goPrev();
    } else if (moveX < -50) {
      goNext();
    }
    setMoveX(0); // Reset moveX for the next touch action
  };

  return (
    <div className="w-full h-full relative group  ">
      <div
        // id="carousel-container"
        className={classNames('w-full h-full  relative overflow-hidden  ')}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            className={classNames(
              'absolute w-full h-full flex-shrink-0',
              'transition-all duration-500    ',
              curIdx === idx && 'opacity-100 translate-x-0 visible ',
              curIdx > idx && 'opacity-50 -translate-x-full invisible ',
              curIdx < idx && 'opacity-50 translate-x-full invisible',
              (curIdx !== idx || curIdx - 1 > idx || curIdx + 1 < idx) && 'invisible  ',
            )}
          >
            {child}
          </div>
        ))}
      </div>

      <div
        className={classNames(
          'absolute top-1/2 translate-y-[-50%] left-2 md:left-5',
          curIdx === 0 ? 'invisible' : 'invisible group-hover:visible opacity-0 group-hover:opacity-100 ',
        )}
      >
        <IconButton onClick={goPrev} className={classNames('p-1 rounded-full bg-opacity-40 bg-default-contrast/30')}>
          <HiMiniChevronLeft className="h-5 md:h-8 w-5 md:w-8 text-default-contrast" />
        </IconButton>
      </div>

      <div
        className={classNames(
          'absolute top-1/2 translate-y-[-50%] right-2 md:right-5',
          curIdx === children.length - 1
            ? 'invisible'
            : 'invisible group-hover:visible opacity-0 group-hover:opacity-100 ',
        )}
      >
        <IconButton onClick={goNext} className={classNames('p-1 rounded-full bg-opacity-40 bg-default-contrast/30')}>
          <HiMiniChevronRight className=" h-5 md:h-8 w-5 md:w-8 text-default-contrast" />
        </IconButton>
      </div>
      {children.length > 1 && (
        <div id="carousel-goto-buttons" className="absolute w-full flex bottom-4 justify-center ">
          <div className="flex justify-center w-fit px-2 py-2  hover:scale-125 transition-all duration-30 bg-default-contrast/20 rounded-full overflow-hidden shadow-lg ">
            {React.Children.map(children as React.ReactNode, (slide, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goto(slideIndex)}
                className={classNames(
                  'block text-lg w-2 h-2  rounded-lg  mx-1  cursor-pointer transition-all duration-500',

                  'shadow-2xl',
                  curIdx === slideIndex
                    ? 'bg-primary-base scale-125  '
                    : 'bg-default-accent hover:scale-125 hover:bg-default-accent  hover:ring-primary-base duration-100    ',
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeableCarousel;
