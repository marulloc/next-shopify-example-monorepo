'use client';

import { RecoilRoot } from 'recoil';
import RecoilEffects from './RecoilEffects';

const RecoilProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <RecoilEffects>{children}</RecoilEffects>
    </RecoilRoot>
  );
};

export default RecoilProvider;
