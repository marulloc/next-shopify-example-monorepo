import { getPage } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { notFound } from 'next/navigation';

export const runtime: ServerRuntime = 'edge';

type TPageParams = {
  params: { page: string; locale: string };
};

export const generateMetadata = async ({ params }: TPageParams): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { page: pageHandle } = params;

  const page = await getPage(pageHandle, { country: countryCode.toUpperCase(), language: languageCode.toUpperCase() });

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
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { page: pageHandle } = params;

  const page = await getPage(pageHandle, { country: countryCode.toUpperCase(), language: languageCode.toUpperCase() });

  return (
    <section>
      <div className="bg-indigo-100 text-indigo-600 rounded-lg p-6 mb-1">
        <h1 className={classNames('text-2xl sm:text-3xl md:text-4xl font-bold pb-3 mb-3 border-b')}>{page.title}</h1>
        <p className={classNames(localTheme.text.size.small, 'text-left')}> {page.bodySummary}</p>
      </div>

      <div className={classNames(localTheme.text.size.small, 'text-right mb-3 text-xs text-indigo-600')}>
        <p className=" text-right mt-1 text-xs  ">
          {`Last update : ${new Intl.DateTimeFormat(languageCode, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(page.updatedAt))}`}
        </p>
      </div>

      <div dangerouslySetInnerHTML={{ __html: page.body }} className="prose bg-white text-gray-600 rounded-lg p-6 " />
    </section>
  );
};

export default StaticPage;
