import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { Suspense } from 'react';
import CollectionProducts, { CollectionProductsSkeleton } from '@/components/collection/CollectionProducts';
import { localTheme } from '@/theme/local-theme';
import { TDictionaries, getDictionary } from '@/dictionaries';

type TParams = { locale: string; collection: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

export const runtime: ServerRuntime = 'edge';

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { collection: handle } = params;

  // const collection = await getCollection(handle, { country: countryCode, language: languageCode });
  const [collection] = await Promise.all([getCollection(handle, { country, language })]);

  return {
    title: collection.seo?.title || collection.title,
    description: collection.seo?.description || collection.description,
  };
};

const CollectionPage = async ({ params, searchParams }: { params: TParams; searchParams?: TSearchParams }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { collection: handle } = params;

  // const collection = await getCollection(handle, { country, language });
  // const dictionary = (await getDictionary(language as TDictionaries)).collection.CollectionProducts;
  const [collection, dict] = await Promise.all([
    getCollection(handle, { country, language }),
    getDictionary(language as TDictionaries),
  ]);
  const dictionary = dict?.collection.CollectionProducts;

  return (
    <section className={classNames()}>
      <h3
        className={classNames(
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.small,
          localTheme.fill.base.main,
          localTheme.border.base.main,
          'border-b',
          'sticky top-16 z-20',
          'bg-opacity-40 backdrop-blur-sm',
        )}
      >
        {dictionary.title}
        <span className="font-semibold">&quot;{collection?.title}&quot;</span>
      </h3>
      <Suspense fallback={<CollectionProductsSkeleton />} key={`${handle}-${sort}`}>
        <CollectionProducts collection={handle} sort={sort as ToolkitSortKey} locale={{ country, language }} />
      </Suspense>
    </section>
  );
};

export default CollectionPage;
