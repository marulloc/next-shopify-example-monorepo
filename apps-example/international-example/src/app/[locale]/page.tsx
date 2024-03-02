import { getCollectionProducts, getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import CollectionList from '@/components/_draft/CollectionList';
import ProductList from '@/components/_draft/ProductList';
import SemanticBox from '@/components/_draft/SemanticBox';
import Typography from '@/components/_draft/Typography';

import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Link from 'next/link';

const Home = async ({ params }: { params: { locale: string } }) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  const [shopInfo, collections, products] = await Promise.all([
    getShopInfo({ country, language }),
    getCollections({ country, language }),
    getCollectionProducts({ collection: 'automated-collection', locale: { country, language } }),
  ]);

  return (
    <SemanticBox as="main" className="-mt-16">
      <section className="relative max-h-screen ">
        <div className="absolute inset-0">
          <Image
            src="/default-alt-images/information.png"
            alt={'home-page-hero'}
            width={1400}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
          <div className={classNames('absolute w-full h-1/4 bottom-0 bg-gradient-to-t from-gray-100 via-gray-100')} />
          <div className={classNames('absolute inset-0', 'bg-default-base', ' bg-opacity-60 md:bg-opacity-40 ')} />
        </div>

        <div className="relative px-20 py-64 sm:py-80 w-full h-full  ">
          <div className=" w-full max-w-md h-full text-left">
            <Typography as="h1" size="3xl" color="default-accent" className="tracking-tighter font-bold">
              {shopInfo.name}
            </Typography>

            <div className="mt-4 md:w-2/3">
              <Typography as="p" size="lg" className="tracking-tighter">
                {shopInfo.description}
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <SemanticBox as="section" p={{ dir: 'x', size: 'md' }}>
        <Typography as="h3" size="xl" color="default-base" className="tracking-wide font-semibold">
          Collections
        </Typography>
        <div className="mt-4 ">
          <CollectionList collections={collections} variant="big" />
        </div>
      </SemanticBox>

      <SemanticBox as="section" p={{ dir: 'x', size: 'md' }} className="mt-32 mb-16">
        <div className="flex justify-between items-center">
          <Typography as="h3" size="xl" color="default-base" className="tracking-wide font-semibold">
            Products
          </Typography>
          <Link href="/search">
            <Typography
              as="span"
              size="sm"
              noWarn
              color="primary-base"
              className="font-semibold hover:text-primary-accent "
            >
              Browse all products
              <span aria-hidden="true"> &rarr;</span>
            </Typography>
          </Link>
        </div>
        <div className="mt-4 ">
          <ProductList products={products} variant="big" />
        </div>
      </SemanticBox>
    </SemanticBox>
  );
};

export default Home;
