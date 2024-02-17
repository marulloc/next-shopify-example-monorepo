'use client';

import IconButton from '@/components/IconButton';
import { classNames } from '@marulloc/components-library/utils';
import React, { useState, useEffect } from 'react';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';

const Carousel = ({ children }: { children: React.ReactElement[] }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [curIdx, setCurIdx] = useState(0);

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

  return (
    <div className="w-full h-full relative group  ">
      <div id="carousel-container" className={classNames('w-full h-full  relative overflow-hidden  ')}>
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
        <IconButton
          id="left-arrow"
          onClick={goPrev}
          className={classNames('p-1 rounded-full bg-opacity-40 bg-gray-400')}
        >
          <HiMiniChevronLeft className="h-5 md:h-8 w-5 md:w-8 text-white" />
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
        <IconButton
          id="left-arrow"
          onClick={goNext}
          className={classNames('p-1 rounded-full bg-opacity-40 bg-gray-400')}
        >
          <HiMiniChevronRight className=" h-5 md:h-8 w-5 md:w-8 text-white" />
        </IconButton>
      </div>

      <div id="carousel-goto-buttons" className="absolute w-full flex bottom-4 justify-center py-2  ">
        <div className="flex justify-center w-fit px-2 py-2  hover:scale-125 transition-all duration-30 ">
          {React.Children.map(children as React.ReactNode, (slide, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goto(slideIndex)}
              className={classNames(
                'block text-lg w-2 h-2  rounded-lg  mx-1  cursor-pointer transition-all duration-500',

                'shadow-2xl',
                curIdx === slideIndex
                  ? 'bg-indigo-400 scale-125'
                  : 'bg-opacity-50 bg-gray-400  hover:scale-125 hover:bg-white hover:ring-1 hover:ring-indigo-400 duration-100',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
