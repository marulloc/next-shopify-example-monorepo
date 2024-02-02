import { getPageQuery, getPagesQuery } from '../../@shopify-graphql/queries/page';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { flatConnection } from '../../utils/flat';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitPage } from '../@toolkit-types/toolkit-page';
import { GetPageService, GetPagesService } from './types';

export const getPage = async (handle: string, locale?: ShopifyLocaleContext): Promise<ToolkitPage> => {
  const res = await storeFetch<GetPageService>({
    query: getPageQuery,
    variables: { handle, country: locale?.country?.toUpperCase(), language: locale?.language?.toUpperCase() },
  });

  return res.body.data.pageByHandle;
};

export const getPages = async (locale?: ShopifyLocaleContext): Promise<ToolkitPage[]> => {
  const res = await storeFetch<GetPagesService>({
    query: getPagesQuery,
    variables: {
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return flatConnection(res.body.data.pages);
};
