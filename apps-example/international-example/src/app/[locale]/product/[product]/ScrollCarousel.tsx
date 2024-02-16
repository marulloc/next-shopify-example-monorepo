'use client';

import { classNames } from '@marulloc/components-library/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const ScrollCarousel = ({ children }: Props) => {
  return (
    <div className={classNames('relative overflow-hidden rounded-lg', 'h-fit w-full')}>
      <div
        className={classNames(
          'snap-x snap-mandatory   scroll-smooth',
          '  overflow-auto  h-full w-full ',
          'relative flex flex-nowrap bg-gray-300 bg-opacity-25 space-x-4 ',
        )}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className=" snap-center flex-shrink-0 flex justify-center items-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollCarousel;
