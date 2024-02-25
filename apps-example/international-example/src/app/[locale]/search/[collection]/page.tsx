import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata } from 'next';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { Suspense } from 'react';
import CollectionProducts, { CollectionProductsSkeleton } from '@/components/collection/CollectionProducts';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

type TParams = { locale: string; collection: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { collection: handle } = params;

  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });
  const collection = await getCollection(handle, { country: countryCode, language: languageCode });

  return {
    metadataBase: new URL('http://localhost:3000'),
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: [
        {
          url: collection.image?.url || shopInfo.brand.coverImage.image.url,
          width: collection.image?.width || shopInfo.brand.coverImage.image.width,
          height: collection.image?.height || shopInfo.brand.coverImage.image.height,
        },
      ],
    },
  };
};

const CollectionPage = async ({ params, searchParams }: { params: TParams; searchParams?: TSearchParams }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { collection: handle } = params;

  return (
    <main className={classNames()}>
      <Suspense fallback={<CollectionProductsSkeleton />} key={`${handle}-${sort}`}>
        <CollectionProducts
          collection={handle}
          sort={sort as ToolkitSortKey}
          locale={{ country: countryCode, language: languageCode }}
        />
      </Suspense>
    </main>
  );
};

export default CollectionPage;
