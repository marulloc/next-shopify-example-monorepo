'use client';

import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';
import { HiCheckCircle, HiXMark } from 'react-icons/hi2';

const CartMutationToast = ({ variant = 'error' }: { variant?: 'error' | 'success' }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) setTimeout(() => setActive(true), 1000);
    else setTimeout(() => setActive(false), 3000);
  }, [active]);

  switch (variant) {
    case 'error':
      return (
        <div
          className={classNames(
            localTheme.spacing.padding.x.small,
            'pointer-events-auto  max-w-sm overflow-hidden',
            'fixed left-0 right-0 mx-auto  my-auto   bottom-4 h-fit z-50',

            'transition-all duration-500',
            active ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-full',
          )}
        >
          <div className={classNames(GlassCardBgClassName)}>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <HiCheckCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Something went wrong!</p>
                  {/* <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p> */}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md   text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setActive(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <HiXMark className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'success':
      return (
        <div
          className={classNames(
            localTheme.spacing.padding.x.small,
            'pointer-events-auto  max-w-sm overflow-hidden',
            'fixed left-0 right-0 mx-auto  my-auto   bottom-4 h-fit z-50',

            'transition-all duration-500',
            active ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-full',
          )}
        >
          <div className={classNames(GlassCardBgClassName)}>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <HiCheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                  {/* <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p> */}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md   text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setActive(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <HiXMark className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default CartMutationToast;

const GlassCardBgClassName = classNames(
  'bg-white bg-opacity-70 shadow-xl rounded-lg backdrop-blur-sm border border-gray-200',
);
