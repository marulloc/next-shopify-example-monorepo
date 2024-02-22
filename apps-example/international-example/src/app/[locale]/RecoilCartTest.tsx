'use client';

import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { createCart, getCart } from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { atomOptimisticCart } from '@/context/cart/atom';
import { atomLocale } from '@/context/locale/atom';
import { splitLocale } from '@/utils/locale';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { atom, selector, useRecoilValue, useRecoilValueLoadable } from 'recoil';

const RecoilLocaleCartTest = () => {
  // const result = useRecoilValue(atomCart);
  const result = useRecoilValueLoadable(atomOptimisticCart);

  console.log('result : ', result);

  return null;
};

const Wrapper = () => {
  // return <RecoilLocaleCartTest />;
  return (
    <Suspense fallback={<></>}>
      <RecoilLocaleCartTest />
    </Suspense>
  );
};

export default Wrapper;
