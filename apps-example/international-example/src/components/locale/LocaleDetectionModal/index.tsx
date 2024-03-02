'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';

import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';
import React from 'react';
import { MatchedContents, NotDetectedContents, NotMatchedContents } from './AlertContents';
import { useDetectLocaleMatch } from '@/hooks/locale-hooks';
import SemanticBox from '@/components/SemanticBox';

type TProps = {
  localeData: ToolkitLocale;
};

const LocaleDetectionModal = ({ localeData }: TProps) => {
  const localeDetection = useDetectLocaleMatch(localeData);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!localeDetection) return;
    setTimeout(() => setIsActive(true), 500);
  }, [localeDetection]);

  return (
    <Drawer anchor="bottom" open={isActive} onClose={() => setIsActive(false)}>
      <div>
        <Drawer.Backdrop>
          {({ closeDrawer }) => <SemanticBox fill="glassy-backdrop" className={classNames('isolate w-full h-full')} />}
        </Drawer.Backdrop>
        <Drawer.Contents>
          {({ closeDrawer }) => (
            <div className="w-full h-fit  flex justify-end group">
              <SemanticBox
                as="aside"
                fill="glassy-default-base"
                p={{ dir: 'xy', size: 'sm' }}
                m={{ dir: 'xy', size: 'sm' }}
                className={classNames('shadow-xl z-50 rounded-lg ')}
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
              </SemanticBox>
            </div>
          )}
        </Drawer.Contents>
      </div>
    </Drawer>
  );
};

export default LocaleDetectionModal;
