import { getPageQuery, getPagesQuery } from '../../@shopify-graphql/queries/page';
import { flatConnection } from '../../utils/flat';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitPage } from '../@toolkit-types/toolkit-page';
import { GetPageService, GetPagesService } from './types';

export const getPage = async (handle: string): Promise<ToolkitPage> => {
  const res = await storeFetch<GetPageService>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
};

export const getPages = async (): Promise<ToolkitPage[]> => {
  const res = await storeFetch<GetPagesService>({
    query: getPagesQuery,
  });

  return flatConnection(res.body.data.pages);
};
