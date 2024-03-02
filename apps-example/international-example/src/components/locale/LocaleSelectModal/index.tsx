'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import Modal from '@marulloc/components-library/Modal';
import { classNames } from '@marulloc/components-library/utils';
import IconButton from '../../IconButton';
import { HiXMark } from 'react-icons/hi2';
import ReactCountryFlag from 'react-country-flag';
import { usePortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry, useGetLocale, useSelectLocale } from '@/hooks/locale-hooks';
import InitialIcon from '@/components/InitialIcon';
import { isSameISOCode } from '@/utils/locale';
import SemanticBox from '@/components/SemanticBox';

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
          <SemanticBox
            fill="glassy-backdrop"
            onClick={() => closeModal()}
            className={classNames('isolate w-full h-full')}
          />
        )}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div
            className={classNames('absolute inset-x-0 top-0 md:top-20  flex justify-center')}
            onClick={() => closeModal()}
          >
            <SemanticBox
              as="aside"
              onClick={(e) => e.stopPropagation()}
              className={classNames(
                'h-screen md:h-fit md:max-h-[calc(100vh-164px)] overflow-hidden',
                'w-full max-w-3xl m-0 md:m-2 md:rounded-lg',
                'flex flex-col divide-y divide-default-base  ',
              )}
            >
              <SemanticBox
                as="header"
                p={[{ dir: 'xy', size: 'md' }]}
                fill="glassy-default-accent"
                className={classNames('flex items-center justify-between md:px-6 md:py-6')}
              >
                <h2 className="text-lg font-medium text-default-accent">{dictionary.locale.LocaleSelectModal.title}</h2>

                <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-default-muted')}>
                  <IconButton
                    className={classNames('text-default-muted hover:text-default-accent ')}
                    onClick={() => closeModal()}
                  >
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{dictionary.locale.LocaleSelectModal.closeBtn.sr}</span>
                  </IconButton>
                </div>
              </SemanticBox>

              <SemanticBox
                as="section"
                p={[{ dir: 'x', size: 'md' }]}
                fill="glassy-default-base"
                className={classNames('flex-1 overflow-y-auto md:p-4')}
              >
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="mt-2 flex flex-1 flex-col gap-y-14">
                    <li>
                      <div className="text-xs font-semibold leading-6 text-default-muted">
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
                                'text-default-muted cursor-pointer',
                                isSameISOCode(country, isoCode)
                                  ? 'text-primary-base bg-default-accent ring-1 ring-primary-base pointer-events-none'
                                  : 'hover:text-primary-base hover:ring-1 hover:ring-primary-base hover:bg-default-accent  transition-all',
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
                                  'absolute bg-default-accent ring-1 text-xs ring-primary-base rounded-lg px-1 py-0',
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
                      <div className="text-xs font-semibold leading-6 text-default-muted">
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
                                'text-default-muted cursor-pointer',
                                isSameISOCode(language, isoCode)
                                  ? 'text-primary-base bg-default-accent ring-1 ring-primary-base pointer-events-none'
                                  : 'hover:text-primary-base hover:ring-1 hover:ring-primary-base hover:bg-default-accent  transition-all',
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
                                  'absolute bg-default-accent ring-1 text-xs ring-primary-base rounded-lg px-1 py-0',
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
              </SemanticBox>

              <SemanticBox as="footer" fill="glassy-default-accent" p={{ dir: 'xy', size: 'sm' }} className="md:p-4">
                <div className=" text-primary-base flex space-x-2 items-center justify-end  text-xs">{/*  */}</div>
              </SemanticBox>
            </SemanticBox>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default LocaleSelectModal;
