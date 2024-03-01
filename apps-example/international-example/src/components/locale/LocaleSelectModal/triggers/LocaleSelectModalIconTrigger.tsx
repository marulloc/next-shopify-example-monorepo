'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';
import { useSetPortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry } from '@/hooks/locale-hooks';
const LocaleSelectModalIconTrigger = () => {
  const { activate } = useSetPortalRecoil('locale-select-modal');
  const dictionary = useGetDictioanry();

  return (
    <button
      className={classNames('p-0 hover:scale-100 block group w-full')}
      onClick={() => activate({ onlyOne: true })}
    >
      <div
        className={classNames(
          'text-default-base hover:text-primary-base  ',
          'group flex gap-x-3 rounded-md  text-sm leading-6',
        )}
      >
        <div
          className={classNames(
            'h-6 w-6 overflow-hidden border border-gray-200 group-hover:border-indigo-600 rounded-lg ',
            'flex justify-center items-center',
          )}
        >
          <HiOutlineGlobeAsiaAustralia className={classNames('h-6 w-6 flex-shrink-0')} aria-hidden="true" />
        </div>
        <span className=" ">{dictionary.locale.LocaleSelectorTrigger.title}</span>
      </div>
    </button>
  );
};

export default LocaleSelectModalIconTrigger;
