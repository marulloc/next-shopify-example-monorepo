import { ToolkitPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import { useEffect, useState } from 'react';

/**
 *
 * @returns
 */
export const usePredictiveSearch = () => {
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending');
  const [searchResult, setSearchResult] = useState<ToolkitPredictiveSearch>({ products: [], collections: [] });

  useEffect(() => {
    (async () => {
      setStatus('pending');
      const { products, collections } = await getPredictiveSearch('');
      setSearchResult({ products, collections });
      setStatus('loaded');
    })();
  }, []);

  const handlePredictive = async (value: string) => {
    setStatus('pending');
    const { products, collections } = await getPredictiveSearch(value);
    setSearchResult({ products, collections });
    setStatus('loaded');
  };

  return [{ searchResult, status }, handlePredictive] as const;
};
