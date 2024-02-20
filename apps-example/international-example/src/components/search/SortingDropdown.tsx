'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiChevronDown } from 'react-icons/hi2';
import Dropdown from '@marulloc/components-library/Dropdown';
import { localTheme } from '@/theme/local-theme';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';

const sortKeys = [
  { name: 'sort', title: 'Relavance', value: 'relevance' },
  { name: 'sort', title: 'Price: Low to High', value: 'plth' },
  { name: 'sort', title: 'Price: High to Low', value: 'phtl' },
];

const SortingDropdown = () => {
  const [{ sort: sortKey }, navigateWithQueryParams] = useSyncDataUrl({ keys: ['sort'] });
  const activeItem = sortKeys.find(({ value }) => value === sortKey) || sortKeys[0];

  return (
    <Dropdown id="product-sorting">
      <Dropdown.Trigger>
        {() => (
          <p
            className={classNames(
              localTheme.text.size.small,
              localTheme.text.color.base.muted,
              localTheme.text.color.base.hover,
              localTheme.fill.base.hover,
              'flex space-x-2 justify-end items-center  cursor-pointer rounded-lg px-2 -mx-2',
            )}
          >
            <span className="">
              {`Sort by `}
              <span className={classNames(localTheme.text.color.base.main, 'font-bold')}>
                &quot;{activeItem.title}&quot;
              </span>
            </span>
            <span>
              <HiChevronDown className="h-4 w-4" />
            </span>
          </p>
        )}
      </Dropdown.Trigger>

      <Dropdown.Contents>
        {({ isOpen, closeDropdown }) => (
          <div
            className={classNames(
              localTheme.fill.base.main,
              localTheme.border.base.main,
              'bg-opacity-80  border rounded-lg shadow-xl ',
              ' mt-2 -ml-8 p-3 text-sm  absolute  -inset-x-10 right-0 ',
            )}
          >
            <ul className="space-y-2   ">
              {sortKeys.map((item) => (
                <li
                  key={`sort-key-${item.value}`}
                  className={classNames(
                    localTheme.text.size.small,
                    localTheme.text.color.base.hover,
                    localTheme.text.color.base.muted,
                    'hover:scale-105  rounded-lg',
                  )}
                >
                  <div
                    className="w-full block cursor-pointer "
                    onClick={() => {
                      navigateWithQueryParams({ sort: item.value }, ['query', 'sort']);
                      closeDropdown();
                    }}
                  >
                    <span>{item.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Dropdown.Contents>
    </Dropdown>
  );
};

export default SortingDropdown;
