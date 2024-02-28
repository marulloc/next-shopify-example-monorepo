import { ToolkitPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import { useCallback, useEffect, useState } from 'react';
import { useGetLocale } from './locale-hooks';

/**
 *
 * @returns
 */
export const usePredictiveSearch = () => {
  const locale = useGetLocale();
  const [predictiveResult, setPredictiveResult] = useState<ToolkitPredictiveSearch>({ products: [], collections: [] });
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending');

  useEffect(() => {
    (async () => {
      setStatus('pending');
      const { products, collections } = await getPredictiveSearch('', locale);
      setPredictiveResult({ products, collections });
      setStatus('loaded');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const predictiveSearch = useCallback(
    async (value: string) => {
      setStatus('pending');
      const { products, collections } = await getPredictiveSearch(value, locale);
      setPredictiveResult({ products, collections });
      setStatus('loaded');
    },
    [locale],
  );

  return [{ predictiveResult, status }, predictiveSearch] as const;
};
