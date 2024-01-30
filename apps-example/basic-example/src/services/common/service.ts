import { storeFetch } from '@/shopify-gql';
import { getMenuQuery, getPageQuery, getPagesQuery } from '@/shopify-gql/queries/common';
import { flatConnection } from '@/shopify-gql/utils';
import { parseMenuRoute } from './parser';

export const getMenu = async (handle: string): Promise<Menu> => {
  const res = await storeFetch<GetMenuService>({
    query: getMenuQuery,
    // tags: [TAGS.collections]
    variables: {
      handle,
    },
  });

  return parseMenuRoute(res.body.data.menu?.items);
};

export const getPage = async (handle: string): Promise<Page> => {
  const res = await storeFetch<GetPageService>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
};

export const getPages = async (): Promise<Page[]> => {
  const res = await storeFetch<GetPagesService>({
    query: getPagesQuery,
  });

  return flatConnection(res.body.data.pages);
};
