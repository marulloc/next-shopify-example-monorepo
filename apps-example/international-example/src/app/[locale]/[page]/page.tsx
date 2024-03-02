import { getPage } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';

import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { notFound } from 'next/navigation';
import Typography from '@/components/Typography';
import SemanticBox from '@/components/SemanticBox';

export const runtime: ServerRuntime = 'edge';

type TPageParams = {
  params: { page: string; locale: string };
};

export const generateMetadata = async ({ params }: TPageParams): Promise<Metadata> => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { page: pageHandle } = params;

  const [page] = await Promise.all([getPage(pageHandle, { country, language })]);

  if (!page) return notFound();
  return {
    title: page.seo.title || page.title,
    description: page.seo.description || page.bodySummary,
    openGraph: {
      type: 'article',
      modifiedTime: page.updatedAt,
      publishedTime: page.createdAt,
    },
  };
};

const StaticPage = async ({ params }: TPageParams) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { page: pageHandle } = params;

  const [page] = await Promise.all([getPage(pageHandle, { country, language })]);

  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', 'border-default-base')}>
      <SemanticBox as="main" p={{ dir: 'xy', size: 'md' }} className={classNames('flex-1 max-w-4xl mx-auto')}>
        <Typography as="p" size="xs" noWarn className="text-right mb-2">
          {`Last update : ${new Intl.DateTimeFormat(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(page.updatedAt))}`}
        </Typography>

        <div>
          <SemanticBox
            as="header"
            fill="primary-muted"
            p={{ dir: 'xy', size: 'md' }}
            className={classNames('rounded-lg w-full shadow-lg bg-opacity-30 text-primary-base')}
          >
            <Typography as="h1" size="3xl" className="font-semibold mb-4">
              {page.title}
            </Typography>
            <Typography as="p" size="sm" noWarn>
              {page.bodySummary}
            </Typography>
          </SemanticBox>

          <section className="prose mt-6 p-6" dangerouslySetInnerHTML={{ __html: page.body }} />
        </div>
      </SemanticBox>
    </div>
  );
};

export default StaticPage;
