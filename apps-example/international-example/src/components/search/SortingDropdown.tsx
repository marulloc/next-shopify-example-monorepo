'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiChevronDown } from 'react-icons/hi2';
import Dropdown from '@marulloc/components-library/Dropdown';
import { localTheme } from '@/theme/local-theme';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import Typography from '../_draft/Typography';
const SortingDropdown = () => {
  const [{ sort: sortKey }, navigateWithQueryParams] = useSyncDataUrl({ keys: ['sort'] });
  const dictionary = useGetDictioanry();

  const sortKeys = dictionary.SortingDropdown.keys;
  const activeItem = sortKeys.find(({ value }) => value === sortKey) || sortKeys[0];

  return (
    <Dropdown id="product-sorting">
      <Dropdown.Trigger>
        {() => (
          <div className={classNames('flex space-x-2 justify-end items-center  cursor-pointer rounded-lg px-2 -mx-2')}>
            <Typography
              as="p"
              size="sm"
              noWarn
              color="default-base"
              className={classNames(
                'hover:text-default-accent',
                localTheme.fill.base.hover,
                'flex space-x-2 justify-end items-center  cursor-pointer rounded-lg px-2 -mx-2',
              )}
            >
              <span className="">
                {`${dictionary.SortingDropdown.decription}  `}
                <span className={classNames('text-default-accent', 'font-bold')}>&quot;{activeItem.title}&quot;</span>
              </span>
              <span>
                <HiChevronDown className="h-4 w-4" />
              </span>
            </Typography>
          </div>
        )}
      </Dropdown.Trigger>

      <Dropdown.Contents>
        {({ isOpen, closeDropdown }) => (
          <div
            className={classNames(
              'bg-white bg-opacity-70 shadow-xl rounded-lg backdrop-blur-sm border border-gray-200',
              ' mt-2 -ml-8 p-3 text-sm  absolute  -inset-x-10 right-0 ',
            )}
          >
            <ul className="space-y-2   ">
              {sortKeys.map((item) => (
                <li key={`sort-key-${item.value}`} className={classNames('group', 'hover:scale-105  rounded-lg')}>
                  <div
                    className="w-full block cursor-pointer "
                    onClick={() => {
                      navigateWithQueryParams({ sort: item.value }, ['query', 'sort']);
                      closeDropdown();
                    }}
                  >
                    <Typography
                      as="span"
                      size="sm"
                      noWarn
                      color="default-base"
                      className="group-hover:text-default-accent"
                    >
                      {item.title}
                    </Typography>
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
