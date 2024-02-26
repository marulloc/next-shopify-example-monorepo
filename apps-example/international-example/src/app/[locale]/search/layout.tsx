import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import CollectionCard from '@/components/collection/CollectionCard';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

const Layout = async (props: { children: React.ReactNode; params: { locale: string } }) => {
  const { countryCode, languageCode } = splitLocale(props.params.locale);

  const collections = await getCollections({ country: countryCode, language: languageCode });

  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', localTheme.border.base.main)}>
      <section
        className={classNames(
          'flex-none md:max-w-[200px] relative h',
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.small,
        )}
      >
        <ul className="sticky top-24 ">
          <div className="text-xs font-semibold leading-6 text-gray-500">All Collections</div>
          {collections.map((collection, index) => (
            <li key={`predictive-search-collection-${collection.handle}`} className="py-1">
              <Link href={collection.handleRoute} className="block p-1 -mx-1">
                <CollectionCard variant="small" collection={collection} index={index} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div
        className={classNames(
          'order-last w-full  ',
          'border-t md:border-l md:border-t-0 ',
          localTheme.border.base.main,
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
