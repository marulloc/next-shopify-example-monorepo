'use client';

import { Fragment, useState } from 'react';
// import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@marulloc/components-library/utils';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-30 ">
      <header
        className={classNames(
          'max-w-7xl mx-auto ',

          'bg-opacity-20',
          'backdrop-blur-sm ',
          'shadow-md ',

          'bg-slate-100',
        )}
      >
        <div className="  ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between py-2">
            <div className="">CAD</div>
            <div className="">Github</div>
          </div>
        </div>
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="  ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className=" ">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      Marulloc
                    </a>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button type="button" className="-ml-2 rounded-md bg-white p-2 " onClick={() => setOpen(true)}>
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a href="#" className="ml-2 p-2   ">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Marulloc</span>
                    Marulloc
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a href="#" className="-m-2 p-2 ">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                      <div className="flow-root">
                        <a href="#" className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon className="h-6 w-6 flex-shrink-0 " aria-hidden="true" />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
