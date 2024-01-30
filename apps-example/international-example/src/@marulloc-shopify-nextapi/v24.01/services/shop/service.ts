import { getLocaleQuery, getMenuQuery } from '../../@shopify-graphql/queries/shop';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitLocale, ToolkitMenu } from '../@toolkit-types/toolkit-shop';
import { parseLocale, parseMenu } from './parser';
import { GetLocaleService, GetMenuService } from './types';

export const getMenu = async (handle: string): Promise<ToolkitMenu> => {
  const res = await storeFetch<GetMenuService>({
    query: getMenuQuery,
    // tags: [TAGS.collections]
    variables: {
      handle,
    },
  });

  return parseMenu(res.body.data.menu?.items);
};

export const getLocale = async (): Promise<ToolkitLocale> => {
  const res = await storeFetch<GetLocaleService>({
    query: getLocaleQuery,
  });

  return parseLocale(res.body.data.localization);
};
