'use client';

import { HiExclamationTriangle, HiCheck } from 'react-icons/hi2';
import LocaleSelectModalChildrenTrigger from '../LocaleSelectModal/triggers/LocaleSelectModalChildrenTrigger';
import { useDetectLocaleMatch, useGetDictioanry } from '@/hooks/locale-hooks';
import React from 'react';
import { dictionaryReplacer } from '@/dictionaries/utils';

const CountryName = ({ name }: { name: string }) => <span className="font-bold  ">&quot;{name}&quot;</span>;

type TContentsProps = {
  handleClose: () => void;
} & ReturnType<typeof useDetectLocaleMatch>;

export const MatchedContents = ({ handleClose, detectedCountry, currentCountry }: TContentsProps) => {
  const dictionary = useGetDictioanry().locale.LocaleDetectionModal.MatchedContents;

  return (
    <section className="max-w-xl  pb-4 sm:pb-0 ">
      <div className="flex">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiCheck className="h-6 w-6 text-green-600  animate-pulse" aria-hidden="true" />
        </div>
        <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-default-accent">
            {dictionaryReplacer(dictionary.h, [
              { target: 'detectedCountry', replace: <CountryName name={detectedCountry?.name || ''} /> },
            ])}
          </h3>
          <div className="mt-1">
            <p className="text-sm text-default-muted">
              {dictionaryReplacer(dictionary.p, [
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
          className=" inline-flex w-full justify-center rounded-md bg-default-accent px-3 py-2 text-sm font-semibold text-default-accent shadow-sm ring-1 ring-inset ring-default-base hover:bg-default-accent   sm:w-auto"
          onClick={handleClose}
        >
          {dictionaryReplacer(dictionary.keepShopingBtn.title, [
            { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
          ])}
        </button>
        <LocaleSelectModalChildrenTrigger
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-default-contrast shadow-sm hover:bg-green-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={handleClose}
        >
          {dictionary.changeMarketBtn.title}
        </LocaleSelectModalChildrenTrigger>
      </div>
    </section>
  );
};

export const NotMatchedContents = ({ handleClose, detectedCountry, currentCountry }: TContentsProps) => {
  const dictionary = useGetDictioanry().locale.LocaleDetectionModal.NotMatchedContents;

  return (
    <section className="max-w-xl  pb-4 sm:pb-0 ">
      <div className="flex">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiExclamationTriangle className="h-6 w-6 text-red-600  animate-pulse" aria-hidden="true" />
        </div>
        <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-default-accent">
            {dictionaryReplacer(dictionary.h, [
              { target: 'detectedCountry', replace: <CountryName name={detectedCountry?.name || ''} /> },
              { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
            ])}
          </h3>
          <div className="mt-1">
            <p className="text-sm text-default-muted">
              {dictionaryReplacer(dictionary.p, [
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
          className=" inline-flex w-full justify-center rounded-md bg-default-accent px-3 py-2 text-sm font-semibold text-default-accent shadow-sm ring-1 ring-inset ring-default-base hover:bg-default-accent   sm:w-auto"
          onClick={handleClose}
        >
          <p className="text-sm text-default-muted">
            {dictionaryReplacer(dictionary.keepShopingBtn.title, [
              { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
            ])}
          </p>
        </button>
        <LocaleSelectModalChildrenTrigger
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-default-contrast shadow-sm hover:bg-red-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={handleClose}
        >
          {dictionaryReplacer(dictionary.changeMarketBtn.title, [
            { target: 'detectedCountry', replace: <CountryName name={detectedCountry?.name || ''} /> },
          ])}
        </LocaleSelectModalChildrenTrigger>
      </div>
    </section>
  );
};
export const NotDetectedContents = ({ handleClose, currentCountry }: TContentsProps) => {
  const dictionary = useGetDictioanry().locale.LocaleDetectionModal.NotDetectedContents;

  return (
    <section className="max-w-xl  pb-4 sm:pb-0 ">
      <div className="flex">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiExclamationTriangle className="h-6 w-6 text-red-600  animate-pulse" aria-hidden="true" />
        </div>
        <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-default-accent">{dictionary.h}</h3>
          <div className="mt-1">
            <p className="text-sm text-default-muted">
              {dictionaryReplacer(dictionary.p, [
                { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
              ])}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
        <button
          type="button"
          className=" inline-flex w-full justify-center rounded-md bg-default-accent px-3 py-2 text-sm font-semibold text-default-accent shadow-sm ring-1 ring-inset ring-default-base hover:bg-default-accent   sm:w-auto"
          onClick={handleClose}
        >
          {dictionaryReplacer(dictionary.keepShopingBtn.title, [
            { target: 'currentCountry', replace: <CountryName name={currentCountry.name || ''} /> },
          ])}
        </button>
        <LocaleSelectModalChildrenTrigger
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-default-contrast shadow-sm hover:bg-red-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
          onClick={handleClose}
        >
          {dictionary.changeMarketBtn.title}
        </LocaleSelectModalChildrenTrigger>
      </div>
    </section>
  );
};
