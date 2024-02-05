import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import Image from 'next/image';

const Home = async ({ params }: { params: { locale: string } }) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });

  return (
    <main className="  ">
      {/* Hero */}
      <section className="relative max-h-screen    ">
        <div className="absolute inset-0   ">
          <Image
            src={shopInfo.brand.coverImage.image.url}
            alt={shopInfo.brand.coverImage.image.altText}
            width={shopInfo.brand.coverImage.image.width}
            height={shopInfo.brand.coverImage.image.height}
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-white bg-opacity-10" />
          <div className="absolute w-full h-1/3 bottom-0 bg-gradient-to-t from-white via-white" />
          <div className="absolute inset-0 block md:hidden  bg-white bg-opacity-40 "></div>
        </div>

        <div className=" relative mx-auto max-w-7xl px-20 py-64 sm:py-80 w-full h-full  ">
          <div className=" w-full md:w-1/2 h-full text-center">
            <h2 id="comfort-heading" className="  text-3xl md:text-4xl font-bold tracking-tight text-gray-800  ">
              {shopInfo.name}
            </h2>
            <p className="mt-8 text-sm md:text-xl text-gray-800">{shopInfo.description}</p>

            <div className=" text-center">
              <a
                href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo/tree/master"
                className=" text-center mt-12 inline-block  rounded-md border border-transparent bg-gray-900 px-8 py-3  text-xs lg:text-sm font-medium text-white hover:bg-gray-700  "
              >
                View Code - Github
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section aria-labelledby="category-heading" className="-mt-0 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imageSrc} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section>

      <section
        aria-labelledby="collection-heading"
        className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
      >
        <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
          Shop by Collection
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Each season, we collaborate with world-class designers to create a collection inspired by the natural world.
        </p>

        <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {collections.map((collection) => (
            <a key={collection.name} href={collection.href} className="group block">
              <div
                aria-hidden="true"
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
              >
                <img
                  src={collection.imageSrc}
                  alt={collection.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{collection.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="comfort-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <Image
              // src={shopInfo.brand.coverImage.image.url}
              src={'https://miro.medium.com/v2/resize:fit:643/1*06ujBAXVeGHGifgqzuMn6Q.jpeg'}
              alt={shopInfo.brand.coverImage.image.altText}
              width={shopInfo.brand.coverImage.image.width}
              height={shopInfo.brand.coverImage.image.height}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative bg-gray-800 bg-opacity-20 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 id="comfort-heading" className="text-xl lg:text-3xl font-bold tracking-tight text-white  ">
                {shopInfo.brand.slogan}
              </h2>
              <p className="mt-3  text-lg text-white">{shopInfo.brand.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

const categories = [
  {
    name: 'New Arrivals',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg',
  },
  {
    name: 'Productivity',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
  },
  {
    name: 'Workspace',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
  },
  {
    name: 'Accessories',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
  },
  { name: 'Sale', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg' },
];
const collections = [
  {
    name: 'Handcrafted Collection',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
    description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
  },
  {
    name: 'Organized Desk Collection',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
    imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
    description: 'The rest of the house will still be a mess, but your desk will look great.',
  },
  {
    name: 'Focus Collection',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
    imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
    description: 'Be more productive than enterprise project managers with a single piece of paper.',
  },
];
