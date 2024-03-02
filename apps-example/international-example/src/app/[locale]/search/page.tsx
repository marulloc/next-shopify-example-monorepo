import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';

import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import SearchFakeInputTrigger from '@/components/search/SearchModal/triggers/SearchInputTrigger';
import { Suspense } from 'react';
import SearchResult, { SearchResultSkeleton } from '@/components/search/SearchResult';
import { ServerRuntime } from 'next';
import Typography from '@/components/Typography';
import SemanticBox from '@/components/SemanticBox';

type TParams = { locale: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

export const runtime: ServerRuntime = 'edge';

const SearchPage = async ({ params, searchParams }: { params: TParams; searchParams?: TSearchParams }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  return (
    <div className=" ">
      <SemanticBox
        as="header"
        p={{ dir: 'xy', size: 'md' }}
        fill="glassy-default-base"
        className={classNames(' sticky top-16 z-20 border-b border-default-base ')}
      >
        <div className="w-full rounded-xl bg-default-accent/50 ">
          <SearchFakeInputTrigger />
        </div>
        <Typography as="h1" className="sr-only">
          Search result
        </Typography>
      </SemanticBox>

      <SemanticBox as="main" p={{ dir: 'xy', size: 'md' }}>
        <Suspense
          fallback={<SearchResultSkeleton />}
          key={`${query}-${sort}-${filter}`} // for remount (making suspense)
        >
          <SearchResult query={query} sort={sort as ToolkitSortKey} locale={{ country, language }} />
        </Suspense>
      </SemanticBox>
    </div>
  );
};

export default SearchPage;
