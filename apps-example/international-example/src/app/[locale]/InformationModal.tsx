'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { TDetectionStatus } from '@/middleware';
import { localTheme } from '@/theme/local-theme';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';

type TProps = {
  detectedCountry: string;
  detectionStatus: TDetectionStatus;
  routingCountry: string;
  routingLanguage: string;
  availableCountries: ToolkitLocale['availableCountries'];
  availableLanguages: ToolkitLocale['availableLanguages'];
};
const InformationModal = ({ routingCountry, routingLanguage, detectedCountry, detectionStatus, ...props }: TProps) => {
  // hasLocale, referrer는 유저가 이미 로케일에 대한 alert를 받은 상태이거나 로케일을 직접 입력해서 접근한 경우를 의미한다
  // const status = detectionStatus !== 'newly-assinged' ? 'alert' : 'affordable';
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(routingCountry !== detectedCountry);
    }, 1000);
  }, [detectedCountry, routingCountry]);

  const isDetected = detectedCountry !== 'not-detected';
  const isMatched = routingCountry === detectedCountry;
  const status = isMatched ? 'matched' : isDetected ? 'not-matched' : 'not-detected';

  const Information = () => {
    const forDict = routingLanguage;
    switch (status) {
      case 'matched':
        return null;

      // case 'not-detected':
      case 'not-matched':
        return (
          <div className="max-w-xl">
            <h3 className="text-sm text-indigo-600 font-semibold ">
              We think you are in {detectedCountry} but you are in {routingCountry} market
            </h3>
            <p className="text-xs mt-1">
              <span>
                you can browse market with your preference language and you can use any feature in our online store.
              </span>
              <span>
                But you cannot choose your adderess when checkout Or your stuff may cannot be delivered after checkout.
              </span>
            </p>

            <div className=" mt-4">
              <span className="text-sm font-semibold ">Are you sure in {routingCountry}?</span>
              <div className="mt-2 flex items-end">
                <button className=" text-indigo-600 italic font-semibold hover:scale-110  ">Yes</button>
                <span className="mx-4">or</span>

                <button className="text-xs text-green-500">change market to {detectedCountry}?</button>

                <span className="mx-4">or</span>
                <button className=" hover:scale-110   ">
                  <span className="text-rose-600 italic font-semibold">No</span>
                  <span className="text-xs text-rose-500"> choose another country</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'not-detected':
      default:
        return (
          <div className="max-w-xl">
            <h3 className="text-sm text-indigo-600 font-semibold ">
              We cannot detect where you are but you are in
              <span className="mx-2 font-bold text-base">{routingCountry}</span>
              market.
            </h3>
            <p className="text-xs mt-1">
              <span>
                you can browse market with your preference language and you can use any feature in our online store.
              </span>
              <span>
                But you cannot choose your adderess when checkout Or your stuff may cannot be delivered after checkout.
              </span>
            </p>

            <div className=" mt-4">
              <span className="text-sm font-semibold ">Are you sure in {routingCountry}?</span>
              <div className="mt-2 flex items-end">
                <button className=" text-indigo-600 italic font-semibold hover:scale-110  ">Yes</button>
                <span className="mx-4">or</span>
                <button className=" hover:scale-110   ">
                  <span className="text-rose-600 italic font-semibold">No</span>
                  <span className="text-xs text-rose-500"> choose another country</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Drawer anchor="bottom" open={isActive} onClose={() => setIsActive(false)}>
      <Drawer.Backdrop>{() => <div className="h-screen w-screen  "></div>}</Drawer.Backdrop>
      <Drawer.Contents>
        {({ closeDrawer }) => (
          <div className="w-full flex justify-end" onClick={() => closeDrawer()}>
            <div
              className={classNames(
                '  z-50  bg-white bg-opacity-70 shadow-xl rounded-lg backdrop-blur-sm',
                localTheme.spacing.padding.xy.small,
                localTheme.spacing.margin.xy.small,
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Information />
            </div>
          </div>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default InformationModal;
