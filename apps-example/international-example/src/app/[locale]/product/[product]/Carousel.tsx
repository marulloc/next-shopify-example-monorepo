'use client';
import { classNames } from '@marulloc/components-library/utils';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [currentIdx, setCurrentIndex] = useState(0);

  const NewChildren = useMemo(
    () =>
      React.Children.map(children, (child, idx) => (
        <div
          className={classNames(
            'absolute top-0  mx-auto h-full   transition-all duration-1000 ease-out',
            currentIdx === idx && 'opacity-100 translate-x-0',
            // currentIdx !== idx && 'opacity-0 -translate-x-full',
            currentIdx === idx - 1 && 'opacity-0 translate-x-full',
            currentIdx === idx + 1 && 'opacity-0 -translate-x-full',
            'opacity-0 translate-x-full',
            // currentIdx > idx && 'opacity-0 -translate-x-full',
            // currentIdx < idx && 'opacity-0 translate-x-full',
          )}
        >
          {child}
        </div>
      )),
    [children, currentIdx],
  );

  const prevSlide = () => {
    const isFirstSlide = currentIdx === 0;
    const newIndex = isFirstSlide ? React.Children.count(children) - 1 : currentIdx - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIdx === React.Children.count(children) - 1;
    const newIndex = isLastSlide ? 0 : currentIdx + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className=" flex  flex-col relative group  ">
      <div className="flex-1 aspect-square relative flex justify-center overflow-hidden">{NewChildren}</div>

      <div
        id="left-arrow"
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:text-red-200"
      >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div
        id="right-arrow"
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {React.Children.map(children as React.ReactNode, (slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={classNames(
              'text-lg w-5 h-2  rounded-lg  mx-1.5  cursor-pointer transition-all duration-1000',
              currentIdx === slideIndex
                ? 'bg-indigo-600 scale-125'
                : 'bg-gray-400     hover:ring-indigo-600  hover:scale-125  duration-200 scale-100',
            )}
          >
            {/* <RxDotFilled /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
