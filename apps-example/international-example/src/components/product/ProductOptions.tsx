import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import VariantSelector from './VariantSelector';
import { classNames } from '@marulloc/components-library/utils';
import { localTheme } from '@/theme/local-theme';
import Skeleton from '@/components/loading/Skeleton';
import { delay } from '@/utils/throttle';

type TProps = {
  handle: string;
  locale: { country: string; language: string };
};

const ProductOptionsServerWrapper = async ({ handle, locale }: TProps) => {
  // await delay(5000);
  const product = await getProduct(handle, locale);

  return <VariantSelector product={product} />;
};

export const ProductOptionsSkeleton = () => {
  return (
    // Same with VariantSelector's style
    <div className={classNames(localTheme.spacing.padding.xy.medium, 'lg:max-w-lg', ' min-w-full lg:min-w-[500px]')}>
      <div className={classNames(localTheme.spacing.padding.b.small, 'border-b', localTheme.border.base.muted)}>
        <h1 className={classNames(localTheme.text.size.large, 'font-semibold mb-2')}>
          <Skeleton />
        </h1>
        <Skeleton />
      </div>

      <div></div>
    </div>
  );
};

export default ProductOptionsServerWrapper;
