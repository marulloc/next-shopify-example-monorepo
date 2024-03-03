'use client';

import { RecoilRoot } from 'recoil';
import { atomDictionary, atomLocale } from './locale-atoms';
import { TDictionary } from '@/dictionaries';
import { setShopifyNextConfig } from '@marulloc/shopify-next-api/v24.01';

type TProps = {
  children: React.ReactNode;
  locale: { country: string; language: string };
  dictionary: TDictionary;
};

const RecoilProvider = ({ children, locale, dictionary }: TProps) => {
  setShopifyNextConfig({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION || '',
    accessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  });

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(atomLocale, locale);
        set(atomDictionary, dictionary);
      }}
    >
      <>{children}</>
    </RecoilRoot>
  );
};

export default RecoilProvider;
