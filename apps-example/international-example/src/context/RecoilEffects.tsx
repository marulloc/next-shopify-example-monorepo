'use client';

import { useLocaleUpdateEffect } from './locale/hook';

const RecoilEffects = ({ children }: { children: React.ReactNode }) => {
  useLocaleUpdateEffect();

  return <>{children}</>;
};

export default RecoilEffects;
