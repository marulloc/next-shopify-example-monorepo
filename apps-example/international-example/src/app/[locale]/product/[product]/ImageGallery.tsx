'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';

type TProps = {
  product: ToolkitProduct;
};

const ImageGallery = ({ product }: TProps) => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, 'rounded-lg overflow-hidden')}>
      <Image
        src={product.featuredImage.url}
        alt={product.featuredImage.altText}
        height={product.featuredImage.height}
        width={product.featuredImage.width}
        className=" object-cover object-center rounded-lg"
      />
    </div>
  );
};

export default ImageGallery;
