import { getPage } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';
import Box from '@/components/@common/semantic/Box';
import Card from '@/components/@common/semantic/Card';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { delay } from '@/utils/throttle';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { notFound } from 'next/navigation';

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
    <main className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', localTheme.border.base.main)}>
      <div className={classNames('flex-1', localTheme.spacing.padding.xy.medium, 'max-w-4xl mx-auto')}>
        <p className=" text-right mb-2 text-xs  ">
          {`Last update : ${new Intl.DateTimeFormat(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(page.updatedAt))}`}
        </p>
        <section className=" p-0 ">
          <Card
            as="header"
            level={2}
            className={classNames('border-0  shadow-md bg-indigo-200 text-indigo-800 rounded-lg p-6  ')}
          >
            <h1 className={classNames('text-xl sm:text-2xl md:text-3xl font-bold pb-3 mb-3')}>{page.title}</h1>
            <p className={classNames('text-xs  w-full md:w-2/3', 'text-left')}> {page.bodySummary}</p>
          </Card>

          <div className="prose mt-6 p-6" dangerouslySetInnerHTML={{ __html: page.body }} />
        </section>
      </div>
    </main>
  );
};

export default StaticPage;
