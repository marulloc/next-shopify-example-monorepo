'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import Modal from '@marulloc/components-library/Modal';
import { classNames } from '@marulloc/components-library/utils';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import IconButton from '../IconButton';
import { HiXMark } from 'react-icons/hi2';
import Link from 'next/link';
import { useState } from 'react';

type TProps = {
  Trigger: React.ReactNode;
} & Pick<ToolkitLocale, 'availableCountries' | 'availableLanguages' | 'locales'>;

const LocaleSelectorModal = ({ Trigger, availableCountries, availableLanguages, locales }: TProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale: currentLocale } = useParams();
  const { countryCode: currentConuntry, languageCode: currentLanguage } = splitLocale(currentLocale as string);

  // const [selectedLocale, setSelectedLocale] = useState({ country: currentConuntry, language: currentLanguage });
  // console.log('path', pathname, locales);

  const handleLocaleChange = (country: string, language: string) => {
    //
    const newLocale = `${country.toLowerCase()}-${language.toLowerCase()}`;
    const newPathname = pathname.replace(currentLocale as string, newLocale);

    //
    const paramsString = searchParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    router.push(newPathname + queryString);
  };

  return (
    <Modal>
      <Modal.Trigger>
        {({ openModal }) => (
          <div onClick={() => openModal()}>
            <>{Trigger}</>
          </div>
        )}
      </Modal.Trigger>

      <Modal.Backdrop>
        {({}) => <div className={classNames('w-full h-full', 'bg-opacity-40 ', localTheme.fill.base.muted)} />}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div className={classNames('relative mt-8', 'max-w-3xl mx-auto  max-h-[calc(100vh-64px)]')}>
            <div
              className={classNames(
                'rounded-lg',
                'mx-2 md:mx-4 h-full box-border',
                'overflow-hidden',
                'bg-opacity-80 backdrop-blur-md shadow-lg',
                localTheme.fill.base.main,
              )}
            >
              <div className="flex flex-col h-full w-full ">
                {/* Header */}
                <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
                  <p className="text-lg font-medium text-gray-900">Select Locale</p>
                  <div className={classNames('ml-4 flex items-center border rounded-lg', localTheme.border.base.main)}>
                    <IconButton
                      srName="close panel"
                      className={classNames(localTheme.text.color.base.muted, localTheme.text.color.base.hover)}
                      onClick={() => closeModal()}
                    >
                      <HiXMark className="h-6 w-6" aria-hidden="true" />
                    </IconButton>
                  </div>
                </div>

                {/* Main */}
                <div className={classNames('flex-1 overflow-y-auto    ', 'px-4 py-4 sm:px-6')}>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="mt-2 flex flex-1 flex-col gap-y-14">
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-500">Countries</div>
                        <ul role="list" className="-mx-2 mt-2 grid grid-cols-3 gap-4">
                          {availableCountries.map(({ name, isoCode }) => (
                            <li key={`country-${isoCode}`}>
                              <div
                                onClick={() => handleLocaleChange(isoCode, currentLanguage)}
                                className={classNames(
                                  'text-gray-700 cursor-pointer',
                                  currentConuntry.toUpperCase() === isoCode.toUpperCase()
                                    ? 'text-indigo-600 bg-white ring-1 ring-indigo-600 pointer-events-none'
                                    : 'hover:text-indigo-600 hover:ring-2 hover:ring-indigo-500 hover:bg-white hover:scale-105 transition-all',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 relative',
                                )}
                              >
                                <span className="truncate">{name.toUpperCase()}</span>
                                <div
                                  className={classNames(
                                    'absolute bg-white ring-1 text-xs ring-indigo-600 rounded-lg px-1 py-0',
                                    currentConuntry.toUpperCase() === isoCode.toUpperCase()
                                      ? 'block -top-2 right-2'
                                      : 'hidden',
                                  )}
                                >
                                  now
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-500">Languages</div>
                        <ul role="list" className="-mx-2 mt-2  grid grid-cols-3 gap-4">
                          {availableLanguages.map(({ name, isoCode }, index) => (
                            <li key={`language-${isoCode}`}>
                              <div
                                onClick={() => handleLocaleChange(currentConuntry, isoCode)}
                                className={classNames(
                                  'text-gray-700 cursor-pointer',
                                  currentLanguage.toUpperCase() === isoCode.toUpperCase()
                                    ? 'text-indigo-600 bg-white ring-1 ring-indigo-600 pointer-events-none'
                                    : 'hover:text-indigo-600 hover:ring-2 hover:ring-indigo-500 hover:bg-white hover:scale-105 transition-all',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 relative ',
                                )}
                              >
                                <span className="truncate">{name.toUpperCase() + isoCode + currentLanguage}</span>
                                <div
                                  className={classNames(
                                    'absolute bg-white ring-1 text-xs ring-indigo-600 rounded-lg px-1 py-0',
                                    currentLanguage.toUpperCase() === isoCode.toUpperCase()
                                      ? 'block -top-2 right-2'
                                      : 'hidden',
                                  )}
                                >
                                  now
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* Footer */}
                <div className={classNames('px-3 py-3  md:px-6 md:py-6', 'bg-white')}>
                  <div className=" text-indigo-600 flex space-x-2 items-center justify-end  text-xs">{/*  */}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default LocaleSelectorModal;
