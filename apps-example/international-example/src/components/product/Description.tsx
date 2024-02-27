import { TDictionary } from '@/dictionaries';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Skeleton from '../loading/Skeleton';
import Box from '../@common/semantic/Box';
import Card from '../@common/semantic/Card';
import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';

type TProps = {
  product: ToolkitProduct;
  dict: TDictionary['product'];
};

const Description = async ({ product, dict }: TProps) => {
  const dictionary = dict?.Description;

  return (
    <Box as="div" level={0} className={classNames(localTheme.spacing.padding.xy.medium)}>
      <h3 className={classNames(localTheme.text.size.medium, localTheme.spacing.padding.b.small, 'font-bold')}>
        {dictionary.title}
      </h3>

      {/* Real Shopify Description */}
      {/* {product.descriptionHtml && <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>} */}

      <div className={classNames(localTheme.text.size.medium)}>
        <div className={classNames('mb-6  space-y-2', localTheme.text.size.small)}>
          {dictionary.mock.warning.map((contents, index) => (
            <Card
              as="article"
              level={2}
              key={`${product.title}-info-${index}`}
              className="p-4 bg-indigo-100 rounded-lg text-indigo-800"
            >
              {contents}
            </Card>
          ))}
        </div>

        <Card as="section" level={0} className=" border-0 p-6 space-y-10 ">
          <div>
            <h2 className={classNames(localTheme.text.size.extraLarge, 'font-bold mb-2')}>{product.title}</h2>
            <p className="text-gray-700 mb-4">{dictionary.mock.summary.intro}</p>
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
        </Card>
      </div>
    </Box>
  );
};

export default Description;

export const DescriptionSkeleton = () => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, ' min-h-[300px] lg:min-h-[600px] space-y-10')}>
      <div className="space-y-2">
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-1/2 h-8 ">
          <Skeleton />
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-1/2 h-8 ">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};
