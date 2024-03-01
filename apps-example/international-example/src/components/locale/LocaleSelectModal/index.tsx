'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { localTheme } from '@/theme/local-theme';
import Modal from '@marulloc/components-library/Modal';
import { classNames } from '@marulloc/components-library/utils';
import IconButton from '../../IconButton';
import { HiXMark } from 'react-icons/hi2';
import ReactCountryFlag from 'react-country-flag';
import { usePortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry, useGetLocale, useSelectLocale } from '@/hooks/locale-hooks';
import InitialIcon from '@/components/InitialIcon';
import Card from '@/components/@common/semantic/Card';
import Box from '@/components/@common/semantic/Box';
import { isSameISOCode } from '@/utils/locale';

type TProps = {} & Pick<ToolkitLocale, 'availableCountries' | 'availableLanguages'>;

const LocaleSelectModal = ({ availableCountries, availableLanguages }: TProps) => {
  const [{ isActive }, { deactivate }] = usePortalRecoil('locale-select-modal');
  const { country, language } = useGetLocale();
  const selectLocale = useSelectLocale();

  const dictionary = useGetDictioanry();

  return (
    <Modal open={isActive} onClose={() => deactivate()}>
      <Modal.Backdrop>
        {({ closeModal }) => (
          <div
            onClick={() => closeModal()}
            className={classNames(' isolate w-full h-full', 'bg-gray-500 bg-opacity-40  ')}
          />
        )}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div
            className={classNames('absolute inset-x-0 top-0 md:top-20  flex justify-center')}
            onClick={() => closeModal()}
          >
            <Card
              as="aside"
              level={0}
              onClick={(e) => e.stopPropagation()}
              className={classNames(
                'h-screen md:h-fit  md:max-h-[calc(100vh-164px)] overflow-hidden',
                'w-full max-w-3xl m-0 md:m-2',
                'flex flex-col divide-y divide-gray-300',
              )}
            >
              <Box
                as="header"
                variant="glassy"
                level={2}
                className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ')}
              >
                <h2 className="text-lg font-medium text-gray-900">{dictionary.locale.LocaleSelectModal.title}</h2>

                <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-gray-300')}>
                  <IconButton
                    className={classNames('text-default-muted hover:text-default-accent ')}
                    onClick={() => closeModal()}
                  >
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{dictionary.locale.LocaleSelectModal.closeBtn.sr}</span>
                  </IconButton>
                </div>
              </Box>

              <Box
                as="section"
                variant="glassy"
                level={4}
                className={classNames('flex-1 overflow-y-auto', 'px-4 py-4 sm:px-6')}
              >
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="mt-2 flex flex-1 flex-col gap-y-14">
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-500">
                        {dictionary.locale.LocaleSelectModal.subTitles.country}
                      </div>
                      <ul role="list" className="-mx-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {availableCountries.map(({ name, isoCode }) => (
                          <li key={`country-${isoCode}`}>
                            <div
                              onClick={() => {
                                selectLocale({ country: isoCode, language });
                                closeModal();
                              }}
                              className={classNames(
                                'text-gray-700 cursor-pointer',
                                isSameISOCode(country, isoCode)
                                  ? 'text-primary-base bg-white ring-1 ring-indigo-600 pointer-events-none'
                                  : 'hover:text-primary-base hover:ring-1 hover:ring-indigo-500 hover:bg-white  transition-all',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 relative items-center ',
                              )}
                            >
                              <span className=" ">
                                <ReactCountryFlag
                                  countryCode={isoCode}
                                  style={{ fontSize: '1.5em', lineHeight: '1em' }}
                                  svg={false}
                                />
                              </span>
                              <span className="truncate text-sm transition-all group-hover:scale-105">
                                {name + ` (${isoCode})`}
                              </span>
                              <div
                                className={classNames(
                                  'absolute bg-white ring-1 text-xs ring-indigo-600 rounded-lg px-1 py-0',
                                  isSameISOCode(country, isoCode) ? 'block -top-2 right-2' : 'hidden',
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
                      <div className="text-xs font-semibold leading-6 text-gray-500">
                        {dictionary.locale.LocaleSelectModal.subTitles.language}
                      </div>
                      <ul role="list" className="-mx-2 mt-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {availableLanguages.map(({ name, isoCode }, index) => (
                          <li key={`language-${isoCode}`}>
                            <div
                              onClick={() => {
                                selectLocale({ country, language: isoCode });
                                closeModal();
                              }}
                              className={classNames(
                                'text-gray-700 cursor-pointer',
                                isSameISOCode(language, isoCode)
                                  ? 'text-primary-base bg-white ring-1 ring-indigo-600 pointer-events-none'
                                  : 'hover:text-primary-base hover:ring-1 hover:ring-indigo-500 hover:bg-white  transition-all',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 relative items-center ',
                              )}
                            >
                              <div>
                                <InitialIcon initial={isoCode[0]} />
                              </div>
                              <span className="truncate text-sm transition-all group-hover:scale-105">
                                {name + ` (${isoCode})`}
                              </span>
                              <div
                                className={classNames(
                                  'absolute bg-white ring-1 text-xs ring-indigo-600 rounded-lg px-1 py-0',
                                  isSameISOCode(language, isoCode) ? 'block -top-2 right-2' : 'hidden',
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
              </Box>

              <Box as="footer" variant="glassy" level={2} className={classNames('px-3 py-3  md:px-6 md:py-6')}>
                <div className=" text-primary-base flex space-x-2 items-center justify-end  text-xs">{/*  */}</div>
              </Box>
            </Card>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default LocaleSelectModal;
