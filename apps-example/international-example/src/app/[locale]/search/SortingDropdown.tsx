'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiChevronDown } from 'react-icons/hi2';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Dropdown from '@marulloc/components-library/Dropdown';
import { localTheme } from '@/theme/local-theme';

const sortKeys = [
  { name: 'sort', title: 'Relavance', value: 'relevance' },
  { name: 'sort', title: 'Price: Low to High', value: 'plth' },
  { name: 'sort', title: 'Price: High to Low', value: 'phtl' },
];

const SortingDropdown = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortKey = searchParams.get('sort');
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
              'flex space-x-2 px-3 py-1 -mt-1 -mr-3 justify-end items-center  cursor-pointer rounded-lg ',
            )}
          >
            <span className="">
              {`Sort by `}
              <span className={classNames(localTheme.text.color.base.main, 'font-base')}>
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
        {({ closeDropdown }) => (
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
                  <DropdownItem title={item.title} value={item.value} onClick={() => closeDropdown()} />
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

const DropdownItem = ({ title, value, onClick }: { title: string; value: string; onClick?: () => void }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newUrl = new URLSearchParams(searchParams.toString());
  newUrl.set('sort', value);
  const href = `${pathname}?${newUrl}`;

  return (
    <Link
      href={href}
      className="w-full block "
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <span>{title}</span>
    </Link>
  );
};
