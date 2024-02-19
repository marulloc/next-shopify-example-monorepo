'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import LocaleSelectorModal from '../LocaleSelectorModal';
import IconButton from '@/components/IconButton';
import { classNames } from '@marulloc/components-library/utils';
import { localTheme } from '@/theme/local-theme';
import { HiBars3 } from 'react-icons/hi2';

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
          className={classNames(localTheme.text.color.base.main, localTheme.text.color.base.hover, 'p-2')}
        >
          <HiBars3 className={classNames('h-5 w-5 flex-shrink-0')} aria-hidden="true" />
        </IconButton>
      }
    />
  );
};

export default LocaleIconTrigger;
