import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import CollectionList from '@/components/_draft/CollectionList';
import Skeleton from '@/components/loading/Skeleton';
import { delay } from '@/utils/throttle';
import { Suspense } from 'react';

type TCollectionNavProps = {
  locale: { country: string; language: string };
};

const CollectionNavWrapper = async ({ locale }: TCollectionNavProps) => {
  return (
    <>
      <h3 className="text-xs font-semibold leading-6 text-gray-500">All Collections</h3>
      <div className="mt-2">
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="w-full h-4">
                <Skeleton />
              </div>
              <div className="w-full h-4">
                <Skeleton />
              </div>
              <div className="w-full h-4">
                <Skeleton />
              </div>
            </div>
          }
        >
          <CollectionNav locale={locale} />
        </Suspense>
      </div>
    </>
  );
};

export default CollectionNavWrapper;

const CollectionNav = async ({ locale }: TCollectionNavProps) => {
  await delay(1000);
  const collections = await getCollections(locale);

  return <CollectionList collections={collections} variant="small" />;
};
