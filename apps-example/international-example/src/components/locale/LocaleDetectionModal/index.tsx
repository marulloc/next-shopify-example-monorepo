'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { useDetectLocale, useSelectLocale } from '@/hooks/useLocale';
import { localTheme } from '@/theme/local-theme';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import { ReactNode, useEffect, useState } from 'react';
import { HiExclamationTriangle, HiCheck } from 'react-icons/hi2';
import LocaleSelectModalChildrenTrigger from '../LocaleSelectModal/triggers/LocaleSelectModalChildrenTrigger';
import { useDictioanry } from '@/context/locale/hook';
import React from 'react';
import { dictionaryReplacer } from '@/dictionaries/utils';

type TProps = {
  localeData: ToolkitLocale;
};

const LocaleDetectionModal = ({ localeData }: TProps) => {
  const localeDetection = useDetectLocale({ localeData });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!localeDetection) return;
    setTimeout(() => setIsActive(true), 400);
  }, [localeDetection]);

  return (
    <Drawer anchor="bottom" open={isActive} onClose={() => setIsActive(false)}>
      <div>
        <Drawer.Backdrop>{() => <div className="h-screen w-screen bg-white/40 bg-opacity-20  "></div>}</Drawer.Backdrop>
        <Drawer.Contents>
          {({ closeDrawer }) => (
            <div className="w-full h-fit  flex justify-end group">
              <div
                className={classNames(
                  '  z-50  bg-white bg-opacity-70 shadow-xl rounded-lg backdrop-blur-sm border border-gray-200',
                  localTheme.spacing.padding.xy.small,
                  localTheme.spacing.margin.xy.small,
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {localeDetection?.status === 'matched' && (
                  <MatchedContents handleClose={closeDrawer} {...localeDetection} />
                )}
                {localeDetection?.status === 'not-matched' && (
                  <NotMatchedContents handleClose={closeDrawer} {...localeDetection} />
                )}
                {localeDetection?.status === 'not-detected' && (
                  <NotMatchedContents handleClose={closeDrawer} {...localeDetection} />
                  // <NotDetectedContents handleClose={closeDrawer} {...localeDetection} />
                )}
              </div>
            </div>
          )}
        </Drawer.Contents>
      </div>
    </Drawer>
  );
};

export default LocaleDetectionModal;

const CountryName = ({ name }: { name: string }) => <span className="font-bold  ">&quot;{name}&quot;</span>;
type TContentsProps = { handleClose: () => void } & ReturnType<typeof useDetectLocale>;

const MatchedContents = ({ handleClose, detectedCountry, currentCountry, currentLanguage }: TContentsProps) => {
  const dictionary = useDictioanry();

  return (
    <div className="max-w-xl py-4 ">
      <div className="flex">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiCheck className="h-6 w-6 text-green-600  animate-pulse" aria-hidden="true" />
        </div>
        <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {dictionaryReplacer(dictionary.locale.LocaleDetectionModal.MatchedContents.h, [
              { target: 'detectedCountry', replace: <CountryName name={detectedCountry?.name || ''} /> },
            ])}
          </h3>
          <div className="mt-1">
            <p className="text-sm text-gray-500">
              {dictionaryReplacer(dictionary.locale.LocaleDetectionModal.MatchedContents.p, [
                { target: 'detectedCountry', replace: <CountryName name={detectedCountry?.name || ''} /> },
                { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
              ])}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
        <button
          type="button"
          className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50   sm:w-auto"
          onClick={handleClose}
        >
          {dictionaryReplacer(dictionary.locale.LocaleDetectionModal.MatchedContents.keepShopingBtn.title, [
            { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
          ])}
        </button>
        <LocaleSelectModalChildrenTrigger
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={handleClose}
        >
          {dictionary.locale.LocaleDetectionModal.MatchedContents.changeMarketBtn.title}
        </LocaleSelectModalChildrenTrigger>
      </div>
    </div>
  );
};

const NotMatchedContents = ({ handleClose, detectedCountry, currentCountry, currentLanguage }: TContentsProps) => {
  const { setLocale } = useSelectLocale();

  return (
    <div className="max-w-xl  ">
      <div className="flex">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiExclamationTriangle className="h-6 w-6 text-red-600  animate-pulse" aria-hidden="true" />
        </div>
        <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Are you sure in {currentCountry.name} ?</h3>
          <div className="mt-1">
            <p className="text-sm text-gray-500">
              We think you are in
              <span className="mx-2 font-bold  ">{detectedCountry?.name}</span>
              but you are in
              <span className="mx-2 font-bold  ">{currentCountry.name}</span>
              market
            </p>
            <p className="text-sm text-gray-500">
              you can browse market with your preference language and you can use any feature in our online store. But
              you cannot choose your adderess when checkout Or your stuff may cannot be delivered after checkout.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
        <button
          type="button"
          className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50   sm:w-auto"
          onClick={handleClose}
        >
          {`Yes, I'm in ${currentCountry.name}`}
        </button>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={() => {
            setLocale({ country: detectedCountry?.isoCode, language: currentLanguage.isoCode });
            handleClose();
          }}
        >
          {`No, I'm in ${detectedCountry?.name}`}
        </button>
        <LocaleSelectModalChildrenTrigger
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 ring-1 ring-inset ring-red-300  sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={handleClose}
        >
          {`Choose another `}
        </LocaleSelectModalChildrenTrigger>
      </div>
    </div>
  );
};
const NotDetectedContents = ({ handleClose, detectedCountry, currentCountry, currentLanguage }: TContentsProps) => {
  return (
    <div className="max-w-xl  ">
      <div className="flex">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiExclamationTriangle className="h-6 w-6 text-red-600  animate-pulse" aria-hidden="true" />
        </div>
        <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Where are you</h3>
          <div className="mt-1">
            <p className="text-sm text-gray-500">
              We cannot detect where you are but you are in
              <span className="mx-2 font-bold  ">{currentCountry.name}</span>
            </p>
            <p className="text-sm text-gray-500">
              you can browse market with your preference language and you can use any feature in our online store. But
              you cannot choose your adderess when checkout Or your stuff may cannot be delivered after checkout.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
        <button
          type="button"
          className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50   sm:w-auto"
          onClick={handleClose}
        >
          {`Yes, I'm in ${currentCountry.name}`}
        </button>
        <LocaleSelectModalChildrenTrigger
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={handleClose}
        >
          {`No, I'll choose another `}
        </LocaleSelectModalChildrenTrigger>
      </div>
    </div>
  );
};
