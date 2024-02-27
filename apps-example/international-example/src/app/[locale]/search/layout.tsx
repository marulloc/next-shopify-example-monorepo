import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import CollectionList from '@/components/_draft/CollectionList';
import CollectionCard from '@/components/collection/CollectionCard';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

const Layout = async ({ children, params }: { children: React.ReactNode; params: { locale: string } }) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  // const collections = await getCollections({ country: countryCode, language: languageCode });
  const [collections] = await Promise.all([getCollections({ country, language })]);

  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', localTheme.border.base.main)}>
      <section
        className={classNames(
          'flex-none md:max-w-[200px] relative h',
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.small,
        )}
      >
        <div className="sticky top-24">
          <h3 className="text-xs font-semibold leading-6 text-gray-500">All Collections</h3>

          <div className="mt-2">
            <CollectionList collections={collections} variant="small" />
          </div>
        </div>
      </section>

      <div
        className={classNames(
          'order-last w-full  ',
          'border-t md:border-l md:border-t-0 ',
          localTheme.border.base.main,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
