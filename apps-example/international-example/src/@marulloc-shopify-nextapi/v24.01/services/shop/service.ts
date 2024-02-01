import { getLocaleQuery, getMenuQuery, getShopInfoQuery } from '../../@shopify-graphql/queries/shop';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitLocale, ToolkitMenu, ToolkitShopInfo } from '../@toolkit-types/toolkit-shop';
import { parseLocale, parseMenu } from './parser';
import { GetLocaleService, GetMenuService, GetShopInfoService } from './types';

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

export const getShopInfo = async (): Promise<ToolkitShopInfo> => {
  const res = await storeFetch<GetShopInfoService>({
    query: getShopInfoQuery,
  });

  return res.body.data.shop;
};
