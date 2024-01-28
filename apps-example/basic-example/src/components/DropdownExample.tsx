'use client';

import { Dropdown } from '@/components/@marulloc-compound-components/Dropdown';
import { classNames } from '@/styles/utils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const DropdownRefactorTest = ({ id }: { id: string }) => {
  return (
    <div className="border m-4 p-4  ">
      <Dropdown id={id}>
        <Dropdown.Trigger>
          {({ isOpen }) => (
            <div>
              <form>
                <div className={classNames('relative group ')}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                    <MagnifyingGlassIcon
                      className={classNames('h-6 w-6', 'text-zinc-300 group-hover:text-zinc-100 ')}
                      aria-hidden="true"
                    />
                  </div>

                  <input
                    id="search"
                    name="query"
                    autoComplete="off"
                    placeholder="Search ..."
                    type="search"
                    className={classNames(
                      'h-14 block w-full',
                      'bg-transparent',
                      'border-b border-zinc-700',
                      'text-sm text-zinc-50',
                      'outline-none',
                      'pl-14 pr-3 py-2',
                    )}
                  />
                </div>
              </form>
            </div>
          )}
        </Dropdown.Trigger>
        <Dropdown.Contents>
          {() => (
            <div className="bg-white mt-4 p-8 space-y-8 h-96 overflow-auto">
              <div>Dropdown Item 1</div>
              <div>Dropdown Item 2</div>
              <div>Dropdown Item 3</div>
              <div>Dropdown Item 3</div>
              <div>Dropdown Item 3</div>
              <div>Dropdown Item 3</div>
              <div>Dropdown Item 3</div>
            </div>
          )}
        </Dropdown.Contents>
      </Dropdown>
    </div>
  );
};

export default DropdownRefactorTest;
