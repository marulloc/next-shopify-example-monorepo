import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import CollectionCard from '@/components/collection/CollectionCard';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import Image from 'next/image';
import SearchFakeInputTrigger from '@/components/search/triggers/SearchInputTrigger';
const Layout = async (props: { children: React.ReactNode; params: { locale: string } }) => {
  const { countryCode, languageCode } = splitLocale(props.params.locale);

  const collections = await getCollections({ country: countryCode, language: languageCode });

  return (
    <div className=" ">
      <div
        className={classNames(
          localTheme.spacing.container,
          localTheme.fill.base.main,
          'shadow-xl',
          'relative',
          'flex flex-col md:flex-row  pt-20 pb-6',
          'min-h-screen ',
        )}
      >
        <div
          className={classNames(
            'flex-none md:max-w-[200px]',
            localTheme.spacing.padding.x.medium,
            localTheme.spacing.padding.y.small,
          )}
        >
          <ul className=" ">
            <div className="text-xs font-semibold leading-6 text-gray-500">Collections</div>
            {collections.map((collection, index) => (
              <li key={`predictive-search-collection-${collection.handle}`} className="py-1">
                <Link href={collection.handleRoute} className="block p-1 -mx-1">
                  <CollectionCard variant="small" collection={collection} index={index} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={classNames(
            'order-last w-full  ',
            'border-t md:border-l md:border-t-0',
            localTheme.border.base.main,
          )}
        >
          <div
            className={classNames(
              localTheme.spacing.padding.x.medium,
              localTheme.spacing.padding.y.small,
              'border-b',
              localTheme.border.base.main,
            )}
          >
            <SearchFakeInputTrigger />
          </div>

          <div className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
