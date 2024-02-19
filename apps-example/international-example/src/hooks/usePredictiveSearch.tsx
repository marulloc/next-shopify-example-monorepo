import { ToolkitPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import { useEffect, useState } from 'react';

/**
 *
 * @returns
 */
export const usePredictiveSearch = ({ locale }: { locale?: { country: string; language: string } }) => {
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending');
  const [searchResult, setSearchResult] = useState<ToolkitPredictiveSearch>({ products: [], collections: [] });

  useEffect(() => {
    (async () => {
      setStatus('pending');
      const { products, collections } = await getPredictiveSearch('', {
        country: locale?.country,
        language: locale?.language,
      });
      setSearchResult({ products, collections });
      setStatus('loaded');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePredictive = async (value: string) => {
    setStatus('pending');
    const { products, collections } = await getPredictiveSearch(value, {
      country: locale?.country,
      language: locale?.language,
    });
    setSearchResult({ products, collections });
    setStatus('loaded');
  };

  return [{ searchResult, status }, handlePredictive] as const;
};
