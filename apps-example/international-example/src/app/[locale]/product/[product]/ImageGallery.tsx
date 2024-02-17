import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Carousel from './Carousel';

type TProps = {
  product: ToolkitProduct;
};

const ImageGallery = ({ product }: TProps) => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, 'w-full  aspect-square ')}>
      {/* <div className="w-full h-full rounded-lg overflow-hidden">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={product.featuredImage.width}
          height={product.featuredImage.height}
          className="w-full h-full object-cover object-center"
        />
      </div> */}
      <Carousel>
        {product.images.map((image, idx) => (
          <Image
            key={`${product.title}-image-${idx}`}
            src={image.url}
            alt={image.altText}
            height={image.height}
            width={image.width}
            className="w-full h-full object-cover object-center"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageGallery;
