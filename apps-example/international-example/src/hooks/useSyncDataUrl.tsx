'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useSyncDataUrl = (
  qkey: string,
): [{ value: string | null; allValues: { [key: string]: string | null } }, (query: string) => void] => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pushDataUrl = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) newParams.set(qkey, query);
    else newParams.delete(qkey);

    const paramsString = newParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
    router.push('/search' + queryString);
  };

  const dataFromUrl = useMemo(() => {
    return Array.from(searchParams.entries()).reduce(
      (prevResult, [curKey, curValue]) => ({ ...prevResult, [curKey]: curValue }),
      {} as { [key: string]: string },
    );
  }, [searchParams]);

  return [{ value: searchParams.get(qkey), allValues: dataFromUrl }, pushDataUrl];
};
