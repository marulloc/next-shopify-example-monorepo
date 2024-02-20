'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';

export const useSyncDataUrl = (
  qkey: string,
): [{ value: string | null; allValues: { [key: string]: string | null } }, (query: string) => void] => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dataFromUrl = useMemo(() => {
    return Array.from(searchParams.entries()).reduce(
      (prevResult, [curKey, curValue]) => ({ ...prevResult, [curKey]: curValue }),
      {} as { [key: string]: string },
    );
  }, [searchParams]);

  const pushDataUrl = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) newParams.set(qkey, query);
    else newParams.delete(qkey);

    const paramsString = newParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
    router.push('/search' + queryString);
  };

  return [{ value: searchParams.get(qkey), allValues: dataFromUrl }, pushDataUrl];
};

type QueryParams<T extends string[]> = {
  [K in T[number]]: string | null;
};

export const useSyncDataUrl2 = <T extends string[]>(
  keys: Array<string>,
  targetPathname?: string,
): [QueryParams<T>, (arg: { [key: string]: string | null }) => void] => {
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((prevResult, [curKey, curValue]) => {
      if (keys.includes(curKey)) return { ...prevResult, [curKey]: curValue ?? null };
      return prevResult;
    }, {} as QueryParams<T>);
  }, [keys, searchParams]);

  const navigateWithQueryParams = useCallback(
    (userQueryParams: { [key: string]: string | null }) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(userQueryParams).forEach(([paramKey, paramValue]) => {
        if (paramValue) newSearchParams.set(paramKey, paramValue);
        else newSearchParams.delete(paramKey);
      });

      const newParams = newSearchParams.toString();
      const queryString = `${newParams.length ? '?' : ''}${newParams}`;

      if (targetPathname && targetPathname !== currentPathname) {
        router.push(targetPathname + queryString, { scroll: false });
      } else {
        router.replace((targetPathname ?? currentPathname) + queryString, { scroll: false });
      }
    },
    [currentPathname, router, searchParams, targetPathname],
  );

  return [queryParams, navigateWithQueryParams];
};
