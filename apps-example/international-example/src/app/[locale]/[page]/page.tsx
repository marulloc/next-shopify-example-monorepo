import { getPage } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';

const StaticPage = async ({ params }: { params: { page: string; locale: string } }) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { page: pageHandle } = params;

  const page = await getPage(pageHandle, { country: countryCode.toUpperCase(), language: languageCode.toUpperCase() });

  return (
    <main
      className={classNames(
        localTheme.spacing.container,
        localTheme.fill.base.main,
        'shadow-xl',
        'relative',
        'flex flex-col md:flex-row  pt-16 pb-6',
        'min-h-screen ',
        localTheme.spacing.padding.x.medium,
      )}
    >
      <section className={(localTheme.spacing.padding.y.medium, 'max-w-3xl mx-auto p-5 md:p-10')}>
        <h1 className={classNames('text-2xl sm:text-3xl md:text-4xl font-bold pb-3 mb-3 border-b')}>{page.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.body }} />;
      </section>
    </main>
  );
};

export default StaticPage;
