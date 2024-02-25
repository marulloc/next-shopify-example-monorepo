'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { useDetectLocale } from '@/hooks/useLocale';
import { localTheme } from '@/theme/local-theme';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';
import React from 'react';
import { MatchedContents, NotDetectedContents, NotMatchedContents } from './AlertContents';

type TProps = {
  localeData: ToolkitLocale;
};

const LocaleDetectionModal = ({ localeData }: TProps) => {
  const localeDetection = useDetectLocale({ localeData });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!localeDetection) return;
    setTimeout(() => setIsActive(true), 500);
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
                  <NotDetectedContents handleClose={closeDrawer} {...localeDetection} />
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
