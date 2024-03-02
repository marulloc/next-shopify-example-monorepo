'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiChevronDown } from 'react-icons/hi2';
import Dropdown from '@marulloc/components-library/Dropdown';

import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import Typography from '../_draft/Typography';
import SemanticBox from '../_draft/SemanticBox';

const SortingDropdown = () => {
  const [{ sort: sortKey }, navigateWithQueryParams] = useSyncDataUrl({ keys: ['sort'] });
  const dictionary = useGetDictioanry();

  const sortKeys = dictionary.SortingDropdown.keys;
  const activeItem = sortKeys.find(({ value }) => value === sortKey) || sortKeys[0];

  return (
    <Dropdown id="product-sorting">
      <Dropdown.Trigger>
        {() => (
          <div className={classNames('group flex space-x-2 justify-end items-center  cursor-pointer  px-2 -mx-2')}>
            <Typography
              as="p"
              size="sm"
              noWarn
              color="default-base"
              className={classNames(
                'hover:text-default-accent',
                'flex space-x-2 justify-end items-center  cursor-pointer rounded-lg px-2 -mx-2',
              )}
            >
              <span className=" group-hover:underline underline-offset-2">
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
          <SemanticBox
            as="div"
            fill="glassy-default-base"
            className={classNames(
              '  shadow-xl rounded-lg   border border-default-muted',
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
          </SemanticBox>
        )}
      </Dropdown.Contents>
    </Dropdown>
  );
};

export default SortingDropdown;
