import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { Suspense } from 'react';
import CollectionProducts, { CollectionProductsSkeleton } from '@/components/collection/CollectionProducts';
import { localTheme } from '@/theme/local-theme';
import { TDictionaries, getDictionary } from '@/dictionaries';
import Typography from '@/components/_draft/Typography';
import SemanticBox from '@/components/_draft/SemanticBox';

type TParams = { locale: string; collection: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

export const runtime: ServerRuntime = 'edge';

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { collection: handle } = params;

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

  const [collection, dict] = await Promise.all([
    getCollection(handle, { country, language }),
    getDictionary(language as TDictionaries),
  ]);
  const dictionary = dict?.collection.CollectionProducts;

  return (
    <div>
      <SemanticBox
        as="header"
        p={{ dir: 'xy', size: 'md' }}
        fill="glassy-default-base"
        className={classNames(' sticky top-16 z-20 border-b border-default-base ')}
      >
        <Typography as="h1">
          {dictionary.title}
          <span className="font-semibold text-default-accent">&quot;{collection?.title}&quot;</span>
        </Typography>
      </SemanticBox>

      <SemanticBox as="main" p={{ dir: 'xy', size: 'md' }}>
        <Suspense fallback={<CollectionProductsSkeleton />} key={`${handle}-${sort}`}>
          <CollectionProducts collection={handle} sort={sort as ToolkitSortKey} locale={{ country, language }} />
        </Suspense>
      </SemanticBox>
    </div>
  );
};

export default CollectionPage;
