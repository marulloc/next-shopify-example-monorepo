'use client';

 import { classNames } from '@/styles/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Dropdown from "@marulloc/components-library/Dropdown"

const sortKeys = [
  { name: 'sort', title: 'Relavance', value: 'relevance' },
  { name: 'sort', title: 'Price: Low to High', value: 'plth' },
  { name: 'sort', title: 'Price: High to Low', value: 'phtl' },
];

const Sort = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortKey = searchParams.get('sort');
  const activeItem = sortKeys.find(({ value }) => value === sortKey) || sortKeys[0];

  return (
    <Dropdown id="product-sorting">
      <Dropdown.Trigger>
        {() => (
          <p className=" text-xs flex space-x-2 px-3 py-1 -mt-1 -mr-3 justify-end items-center hover:bg-gray-600 cursor-pointer rounded-full">
            <span className="font-bold"> Sort by: {activeItem.title} </span>
            <span>
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </p>
        )}
      </Dropdown.Trigger>

      <Dropdown.Contents>
        {({ closeDropdown }) => (
          <div
            className={classNames(
              'bg-black bg-opacity-90 backdrop-blur-md text-zinc-400 border border-zinc-600 rounded-lg ',
              ' mt-2 -ml-8 p-2 text-sm  absolute  -inset-x-10 right-0 ',
            )}
          >
            <ul className="space-y-2  ">
              {sortKeys.map((item) => (
                <li key={`sort-key-${item.value}`} className="hover:text-zinc-50  ">
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

export default Sort;

const DropdownItem = ({ title, value, onClick }: { title: string; value: string; onClick?: () => void }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newUrl = new URLSearchParams(searchParams.toString());
  newUrl.set('sort', value);
  const href = `${pathname}?${newUrl}`;

  return (
    <Link
      href={href}
      className="w-full "
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <span>{title}</span>
    </Link>
  );
};
