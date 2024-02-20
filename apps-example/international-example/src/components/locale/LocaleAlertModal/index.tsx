'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { TDetectionStatus } from '@/middleware';
import { localTheme } from '@/theme/local-theme';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';
import { HiExclamationTriangle, HiCheck } from 'react-icons/hi2';

type TProps = {
  detectedCountry: string;
  detectionStatus: TDetectionStatus;
  routingCountry: string;
  routingLanguage: string;
  availableCountries: ToolkitLocale['availableCountries'];
  availableLanguages: ToolkitLocale['availableLanguages'];
};
const LocaleAlertModal = ({ routingCountry, routingLanguage, detectedCountry, detectionStatus, ...props }: TProps) => {
  // hasLocale, referrer는 유저가 이미 로케일에 대한 alert를 받은 상태이거나 로케일을 직접 입력해서 접근한 경우를 의미한다
  // const status = detectionStatus !== 'newly-assinged' ? 'alert' : 'affordable';
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // setIsActive(routingCountry !== detectedCountry);
      setIsActive(true);
    }, 400);
  }, [detectedCountry, routingCountry]);

  const isDetected = detectedCountry !== 'not-detected';
  const isMatched = routingCountry === detectedCountry;
  const status = isMatched ? 'matched' : isDetected ? 'not-matched' : 'not-detected';

  const detectedCountryName = props.availableCountries.find(
    ({ isoCode }) => isoCode.toUpperCase() === detectedCountry.toUpperCase(),
  );
  const routingCountryName = props.availableCountries.find(
    ({ isoCode }) => isoCode.toUpperCase() === routingCountry.toUpperCase(),
  );
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
                <Information
                  handleResolve={() => closeDrawer()}
                  routingCountry={routingCountryName?.name || ''}
                  detectedCountry={detectedCountryName?.name || ''}
                  status={status}
                />
              </div>
            </div>
          )}
        </Drawer.Contents>
      </div>
    </Drawer>
  );
};

export default LocaleAlertModal;

const Information = ({
  status,
  handleResolve,
  detectedCountry,
  routingCountry,
}: {
  status: 'matched' | 'not-matched' | 'not-detected';
  handleResolve: () => void;
  detectedCountry: string;
  routingCountry: string;
}) => {
  // const forDict = routingLanguage;
  switch (status) {
    case 'matched':
      return (
        <div className="max-w-xl  ">
          <div className="flex">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <HiCheck className="h-6 w-6 text-green-600  animate-pulse" aria-hidden="true" />
            </div>
            <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Hi! You ar in {routingCountry}</h3>
              <div className="mt-1">
                <p className="text-sm text-gray-500">
                  We notice that you ar in
                  <span className="mx-2 font-bold  ">{detectedCountry}</span>
                </p>

                <p className="text-sm text-gray-500">
                  and you also are shopping in
                  <span className="mx-2 font-bold  ">{routingCountry}</span>
                  We allocate your market and language by your IP and your browser language setting. But you can change
                  your market.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
            <button
              type="button"
              className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50   sm:w-auto"
              onClick={handleResolve}
            >
              {`I'm just shopping in ${routingCountry}`}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
              onClick={handleResolve}
            >
              {`I'll try another change my market `}
            </button>
          </div>
        </div>
      );

    case 'not-matched':
      return (
        <div className="max-w-xl  ">
          <div className="flex">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full   bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <HiExclamationTriangle className="h-6 w-6 text-red-600  animate-pulse" aria-hidden="true" />
            </div>
            <div className="mt-3  ml-2  sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Are you sure in {routingCountry} ?</h3>
              <div className="mt-1">
                <p className="text-sm text-gray-500">
                  We think you are in
                  <span className="mx-2 font-bold  ">{detectedCountry}</span>
                  but you are in
                  <span className="mx-2 font-bold  ">{routingCountry}</span>
                  market
                </p>
                <p className="text-sm text-gray-500">
                  you can browse market with your preference language and you can use any feature in our online store.
                  But you cannot choose your adderess when checkout Or your stuff may cannot be delivered after
                  checkout.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
            <button
              type="button"
              className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50   sm:w-auto"
              onClick={handleResolve}
            >
              {`Yes, I'm in ${routingCountry}`}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
              onClick={handleResolve}
            >
              {`No, I'm in ${detectedCountry}`}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 ring-1 ring-inset ring-red-300  sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
              onClick={handleResolve}
            >
              {`Choose another `}
            </button>
          </div>
        </div>
      );

    case 'not-detected':
    default:
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
                  <span className="mx-2 font-bold  ">{routingCountry}</span>
                </p>
                <p className="text-sm text-gray-500">
                  you can browse market with your preference language and you can use any feature in our online store.
                  But you cannot choose your adderess when checkout Or your stuff may cannot be delivered after
                  checkout.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
            <button
              type="button"
              className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50   sm:w-auto"
              onClick={handleResolve}
            >
              {`Yes, I'm in ${routingCountry}`}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto mt-3 sm:ml-3 sm:mt-0 "
              onClick={handleResolve}
            >
              {`No, I'll choose another `}
            </button>
          </div>
        </div>
      );
  }
};
