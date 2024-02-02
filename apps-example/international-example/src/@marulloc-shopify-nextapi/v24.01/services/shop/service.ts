import { getLocaleQuery, getMenuQuery, getShopInfoQuery } from '../../@shopify-graphql/queries/shop';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitLocale, ToolkitMenu, ToolkitShopInfo } from '../@toolkit-types/toolkit-shop';
import { parseLocale, parseMenu } from './parser';
import { GetLocaleService, GetMenuService, GetShopInfoService } from './types';

export const getLocale = async (): Promise<ToolkitLocale> => {
  const res = await storeFetch<GetLocaleService>({
    query: getLocaleQuery,
  });

  return parseLocale(res.body.data.localization);
};

export const getMenu = async (handle: string, locale?: ShopifyLocaleContext): Promise<ToolkitMenu> => {
  const res = await storeFetch<GetMenuService>({
    query: getMenuQuery,
    // tags: [TAGS.collections]
    variables: {
      handle,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseMenu(res.body.data.menu?.items);
};

export const getShopInfo = async (locale?: ShopifyLocaleContext): Promise<ToolkitShopInfo> => {
  const res = await storeFetch<GetShopInfoService>({
    query: getShopInfoQuery,
    variables: {
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return res.body.data.shop;
};
