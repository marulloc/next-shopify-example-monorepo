import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { localTheme } from '@/theme/local-theme';
import { delay } from '@/utils/throttle';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';

type TProps = {
  handle: string;
  locale: { country: string; language: string };
};

const Description = async ({ handle, locale }: TProps) => {
  // await delay(5000);
  const product = await getProduct(handle, locale);
  const dictionary = await (await getDictionary(locale.language.toLowerCase() as TDictionaries)).product.Description;

  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium)}>
      <p className={classNames(localTheme.text.size.medium, localTheme.spacing.padding.b.small, 'font-bold')}>
        {dictionary.title}
      </p>

      {/* Real Shopify Description */}
      {/* {product.descriptionHtml && <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>} */}

      <div className={classNames(localTheme.text.size.medium)}>
        <div className={classNames('mb-6  space-y-2', localTheme.text.size.small)}>
          {dictionary.mock.warning.map((contents, index) => (
            <p key={`${product.title}-info-${index}`} className="p-4 bg-indigo-100 rounded-lg text-indigo-800">
              {contents}
            </p>
          ))}
        </div>

        <div className="bg-white  rounded-lg">
          <div className="p-6 space-y-10">
            <div>
              <h2 className={classNames(localTheme.text.size.extraLarge, 'font-bold mb-2')}>{product.title}</h2>
              <p className="text-gray-700 mb-4">{dictionary.mock.summary.intro}</p>
            </div>

            <div className=" rounded-lg overflow-hidden m-16">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || ''}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                className="object-cover object-center    "
              />
            </div>

            <div>
              <h3 className={classNames(localTheme.text.size.large, 'font-semibold mb-2')}>
                {dictionary.mock.features.title}
              </h3>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                {dictionary.mock.features.li.map((contents, index) => (
                  <li key={`${product.title}-feature-${index}`}>{contents}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={classNames(localTheme.text.size.large, 'font-semibold mb-2')}>
                {dictionary.mock.specifications.title}
              </h3>
              <ul className="list-disc pl-5 text-gray-700">
                {dictionary.mock.specifications.li.map((contents, index) => (
                  <li key={`${product.title}-spec-${index}`}>{contents}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-gray-700 mb-4">{dictionary.mock.summary.outro}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;

export const DescriptionSkeleton = () => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, ' min-h-[300px] lg:min-h-[600px]')}>
      <div className="space-y-2">
        <div className="w-full h-8 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-8 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-8 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};
