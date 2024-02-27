import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Carousel from '../Carousel';
import Skeleton from '../loading/Skeleton';
import Card from '../@common/semantic/Card';
import Box from '../@common/semantic/Box';

type TProps = {
  product: ToolkitProduct;
};

const ImageGallery = async ({ product }: TProps) => {
  return (
    <Box
      as="div"
      level={0}
      className={classNames(localTheme.spacing.padding.xy.medium, 'w-full  aspect-square rounded-lg overflow-hidden ')}
    >
      <Carousel>
        {product.images.map((image, idx) => (
          <Card
            as="figure"
            level={2}
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
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageGallery;

export const ImageGallerySkeleton = () => {
  return (
    <div
      className={classNames(localTheme.spacing.padding.xy.medium, 'w-full  aspect-square rounded-lg overflow-hidden ')}
    >
      <div className="w-full h-full ">
        <Skeleton />
      </div>
    </div>
  );
};
