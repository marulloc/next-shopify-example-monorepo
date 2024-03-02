import { TDictionary } from '@/dictionaries';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Skeleton from '../loading/Skeleton';
import Card from '../@common/semantic/Card';
import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import Typography from '../_draft/Typography';

type TProps = {
  product: ToolkitProduct;
  dict: TDictionary['product'];
};

const Description = async ({ product, dict }: TProps) => {
  const dictionary = dict?.Description;

  return (
    <div>
      <Typography as="h3" size="lg" className={classNames(localTheme.spacing.padding.b.small, 'font-bold')}>
        {dictionary.title}
      </Typography>

      {/* Real Shopify Description */}
      {/* {product.descriptionHtml && <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>} */}

      <div>
        <div className={classNames('mb-6  space-y-2')}>
          {dictionary.mock.warning.map((contents, index) => (
            <Card
              as="article"
              level={2}
              key={`${product.title}-info-${index}`}
              className="p-4 bg-indigo-100 rounded-lg"
            >
              <Typography className=" " size="sm" noWarn color="primary-accent">
                {contents}
              </Typography>
            </Card>
          ))}
        </div>

        <Card as="section" level={0} className=" border-0 p-6 space-y-10 ">
          <div>
            <Typography as="h2" size="2xl" color="default-accent" className={classNames('font-bold mb-2')}>
              {product.title}
            </Typography>
            <Typography className="mb-4">{dictionary.mock.summary.intro}</Typography>
          </div>

          <div>
            <Typography as="h4" size="lg" color="default-accent" className={classNames('font-semibold mb-2')}>
              {dictionary.mock.features.title}
            </Typography>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              {dictionary.mock.features.li.map((contents, index) => (
                <li key={`${product.title}-feature-${index}`}>
                  <Typography className="">{contents}</Typography>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography as="h4" size="lg" color="default-accent" className={classNames('font-semibold mb-2')}>
              {dictionary.mock.specifications.title}
            </Typography>
            <ul className="list-disc pl-5 text-gray-700">
              {dictionary.mock.specifications.li.map((contents, index) => (
                <li key={`${product.title}-spec-${index}`}>
                  <Typography className="">{contents}</Typography>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography className="mb-4">{dictionary.mock.summary.outro}</Typography>
          </div>
        </Card>
      </div>
    </div>
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
