import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import SearchFakeInputTrigger from '@/components/search/SearchModal/triggers/SearchInputTrigger';
import { Suspense } from 'react';
import SearchResult, { SearchResultSkeleton } from '@/components/search/SearchResult';
import { ServerRuntime } from 'next';
import Box from '@/components/@common/semantic/Box';
import { delay } from '@/utils/throttle';

type TParams = { locale: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

export const runtime: ServerRuntime = 'edge';

const SearchPage = async ({ params, searchParams }: { params: TParams; searchParams?: TSearchParams }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  return (
    <Box as="main" level={0}>
      <div
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
        <h1 className="sr-only">Search Result</h1>
        <div className="w-full rounded-xl bg-gray-50 bg-opacity-80">
          <SearchFakeInputTrigger />
        </div>
      </div>

      <Suspense
        fallback={<SearchResultSkeleton />}
        key={`${query}-${sort}-${filter}`} // for remount (making suspense)
      >
        <SearchResult query={query} sort={sort as ToolkitSortKey} locale={{ country, language }} />
      </Suspense>
    </Box>
  );
};

export default SearchPage;
