import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';

type TProps = {
  product: ToolkitProduct;
};

const Description = ({ product }: TProps) => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium)}>
      {/* Product Description */}
      Description
    </div>
  );
};

export default Description;
