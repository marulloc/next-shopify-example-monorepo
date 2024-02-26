import { getPages } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

type TProps = {
  children: React.ReactNode;
  params: { locale: string; page: string };
};

const StaticPageLayout = async ({ children, params }: TProps) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { page: handle } = params;
  const others = await (
    await getPages({ country: countryCode, language: languageCode })
  ).filter((page) => page.handle !== handle);

  return (
    <main
      className={classNames(
        localTheme.fill.base.main,
        localTheme.spacing.container,
        'shadow-xl relative   ',
        'flex flex-col md:flex-row pt-16',
        'min-h-screen h-fit md:h-screen',
      )}
    >
      <div className={classNames(localTheme.spacing.padding.xy.medium, ' flex-1 flex-shrink-0 overflow-auto')}>
        {children}
      </div>

      <section
        className={classNames(
          localTheme.spacing.padding.xy.medium,
          'h-full w-full md:max-w-xs',
          'border-l-0 md:border-l border-t md:border-t-0',
          localTheme.border.base.main,
        )}
      >
        <p className={classNames('font-bold text-right  text-sm mt-8 md:-mt-6 mb-2', localTheme.text.color.base.muted)}>
          Other Pages
        </p>
        <ul className={classNames(' grid grid-cols-2 md:grid-cols-1  mb-16', localTheme.spacing.gap.xy.small)}>
          {others.map((page) => (
            <li key={`article-${page.title}`} className=" ">
              <Link href={`/${page.handle}`} className="group  block  h-full w-full ">
                <article
                  className={classNames(
                    'flex flex-col h-full p-2 border rounded-lg group-hover:ring-1 ring-gray-300 ring-inset',
                    localTheme.border.base.muted,
                  )}
                >
                  <h4
                    className={classNames(
                      'font-semibold group-hover:underline underline-offset-6 group-hover:text-indigo-600',
                      localTheme.text.size.small,
                    )}
                  >
                    {page.title}
                  </h4>
                  <p className={classNames('mb-2 text-xs flex-1 ', localTheme.text.color.base.muted)}>
                    {page.bodySummary}
                  </p>
                  <p className=" text-right mt-1 text-xs  ">
                    {new Intl.DateTimeFormat(languageCode, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(page.updatedAt))}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default StaticPageLayout;
