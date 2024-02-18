import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Carousel from '../Carousel';
import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { delay } from '@/utils/throttle';

type TProps = {
  handle: string;
  locale: { country: string; language: string };
};

const ImageGallery = async ({ handle, locale }: TProps) => {
  await delay(5000);
  const product = await getProduct(handle, locale);

  return (
    <div
      className={classNames(localTheme.spacing.padding.xy.medium, 'w-full  aspect-square rounded-lg overflow-hidden ')}
    >
      <Carousel>
        {product.images.map((image, idx) => (
          <Image
            key={`${product.title}-image-${idx}`}
            src={image.url}
            alt={image.altText || `${product.title}-image-${idx}`}
            height={image.height}
            width={image.width}
            className="w-full h-full object-cover object-center rounded-lg  "
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageGallery;

export const ImageGallerySkeleton = () => {
  return (
    <div
      className={classNames(localTheme.spacing.padding.xy.medium, 'w-full  aspect-square rounded-lg overflow-hidden ')}
    >
      <div className="w-full h-full bg-gray-300 animate-pulse"></div>
    </div>
  );
};
