'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import LocaleSelectorModal from '../LocaleSelectorModal';
import IconButton from '@/components/IconButton';
import { classNames } from '@marulloc/components-library/utils';
import { localTheme } from '@/theme/local-theme';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';

type TProps = Pick<ToolkitLocale, 'availableCountries' | 'availableLanguages' | 'locales'>;

const LocaleIconTrigger = ({ availableCountries, availableLanguages, locales }: TProps) => {
  return (
    <LocaleSelectorModal
      locales={locales}
      availableCountries={availableCountries}
      availableLanguages={availableLanguages}
      Trigger={
        <IconButton
          srName="select locale"
          className={classNames(
            localTheme.text.color.base.main,
            localTheme.text.color.base.hover,
            'p-0 hover:scale-100',
          )}
        >
          <div
            className={classNames(
              'text-gray-700 hover:text-indigo-600  ',
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
            <span className=" ">Change Country/Language</span>
          </div>
        </IconButton>
      }
    />
  );
};

export default LocaleIconTrigger;
