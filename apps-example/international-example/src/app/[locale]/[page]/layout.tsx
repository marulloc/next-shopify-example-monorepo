import { getPages } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';
import Box from '@/components/@common/semantic/Box';
import Card from '@/components/@common/semantic/Card';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

type TProps = {
  children: React.ReactNode;
  params: { locale: string; page: string };
};

const StaticPageLayout = async ({ children, params }: TProps) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { page: handle } = params;

  const [pages] = await Promise.all([getPages({ country, language })]);
  const otherPages = pages.filter((page) => page.handle !== handle);

  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', localTheme.border.base.main)}>
      <Box
        as="main"
        level={0}
        className={classNames('flex-1', localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.medium)}
      >
        {children}
      </Box>

      <Box
        as="aside"
        level={0}
        className={classNames(
          'flex-none md:w-[300px] relative ',
          'border-t md:border-l md:border-t-0 ',
          localTheme.border.base.main,
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.medium,
        )}
      >
        <h3 className={classNames('font-semibold text-right  text-xs mb-2', localTheme.text.color.base.muted)}>
          Other Pages
        </h3>
        <ul className={classNames(' grid grid-cols-2 md:grid-cols-1  mb-16', localTheme.spacing.gap.xy.small)}>
          {otherPages.map((page) => (
            <li key={`article-${page.title}`} className=" ">
              <Link href={`/${page.handle}`} className="group  block  h-full w-full ">
                <Card
                  as="article"
                  level={2}
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
                    {new Intl.DateTimeFormat(language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(page.updatedAt))}
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default StaticPageLayout;
