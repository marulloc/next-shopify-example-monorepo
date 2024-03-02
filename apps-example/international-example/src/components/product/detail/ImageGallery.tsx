import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import SwipeableCarousel from '../../SwipeableCarousel';
import Skeleton from '../../loading/Skeleton';
import SemanticBox from '../../SemanticBox';

type TProps = {
  product: ToolkitProduct;
};

const ImageGallery = async ({ product }: TProps) => {
  return (
    <div className={classNames('w-full h-full rounded-lg overflow-hidden ')}>
      <SwipeableCarousel>
        {product.images.map((image, idx) => (
          <SemanticBox
            as="figure"
            key={`${product.title}-image-${idx}`}
            className="border-0 overflow-hidden w-full h-full"
          >
            <Image
              src={image.url}
              alt={image.altText || `${product.title}-image-${idx}`}
              height={image.height}
              width={image.width}
              className="w-full h-full object-cover object-center  "
            />
            <figcaption className="sr-onyl">{image.altText || `${product.title}-image-${idx}`}</figcaption>
          </SemanticBox>
        ))}
      </SwipeableCarousel>
    </div>
  );
};

export default ImageGallery;

export const ImageGallerySkeleton = () => {
  return (
    <div className={classNames('p-4 sm:p-6 md:p-8', 'w-full  aspect-square rounded-lg overflow-hidden ')}>
      <div className="w-full h-full ">
        <Skeleton />
      </div>
    </div>
  );
};
