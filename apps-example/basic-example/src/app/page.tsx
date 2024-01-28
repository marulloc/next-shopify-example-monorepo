
import { Card } from "@repo/ui/card";
import { classNames } from '@/styles/utils';
import { theme } from '@/styles/theme';
import { getCollectionProducts } from '@/services/collection/service';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

/**
 * @ToDo Carousel -> Collection Data or My Custom
 * @ToDo About Hero -> My Custom
 * @returns
 */
export default async function Home() {
  const products = await getCollectionProducts({ collection: 'automated-collection' });

  return (
    <div className={classNames(' mt-20')}>
      {/* Hero Carousel Section */}
      <section className={classNames('   h-96', theme.mainBackground, theme.maxSize)}>
        <div className=" h-full flex justify-center items-center   space-x-4">
          <div className="text-zinc-300">Carousel</div>
        </div>
      </section>

      {/* Product */}
      <section className={classNames(theme.maxSize, theme.layoutPadding, 'mt-24')}>
        <div className="grid gap-4  grid-cols-2 md:grid-cols-4 ">
          {products.map((product) => (
            <Link href={product.handleRoute} key={`home-product-card-${product.handle}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>

      {/* Hero */}
      <section className={classNames(theme.maxSize, 'my-24')}>
        <div className="relative bg-zinc-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-zinc-900 bg-opacity-80" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-300 sm:text-4xl">Long-term thinking</h2>
            <p className="mt-3 text-xl text-zinc-300">
              {` We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us
              to focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of the
              universe.`}
            </p>
            <a
              href="#"
              className="mt-8 block w-full rounded-md border border-transparent bg-teal-800 px-8 py-3 text-base font-medium text-zinc-300 hover:bg-gray-100 sm:w-auto"
            >
              Read our story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
