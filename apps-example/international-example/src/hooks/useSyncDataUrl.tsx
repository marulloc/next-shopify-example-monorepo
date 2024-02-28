'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type QueryParams<T extends string[]> = {
  [K in T[number]]: string | null;
};

type TParams<T extends string[]> = {
  keys: Array<T[number]>;
  targetPathname?: string;
};

export const useSyncDataUrl = <T extends string[]>({ keys, targetPathname }: TParams<T>) => {
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
    (userQueryParams: Record<string, string | null>, keepKeys: string[]) => {
      const newSearchParams = new URLSearchParams();

      if (keepKeys) {
        keepKeys.forEach((key) => {
          const prevValue = searchParams.get(key);
          if (prevValue) newSearchParams.set(key, prevValue);
        });
      }

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

  return [queryParams, navigateWithQueryParams] as const;
};
