import { DescriptionSkeleton } from '@/components/product/Description';
import { ImageGallerySkeleton } from '@/components/product/ImageGallery';
import { ProductOptionsSkeleton } from '@/components/product/ProductOptions';
import { RecommendationsSkeleton } from '@/components/product/Recommendations';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';

const Loading = () => {
  return (
    <div className={classNames(' relative min-h-screen  ')}>
      <div className="flex flex-col lg:flex-row">
        <div className={classNames('h-full flex-1 lg:border-r', localTheme.border.base.main)}>
          <div className={classNames(localTheme.border.base.main + ' border-b')}>
            <ImageGallerySkeleton />
          </div>

          {/* lg- block */}
          <div className={classNames('block lg:hidden ', localTheme.border.base.main + ' border-b')}>
            <ProductOptionsSkeleton />
          </div>

          <div className={classNames()}>
            <DescriptionSkeleton />
          </div>
        </div>

        {/* lg+ block */}
        <div className="pb-4 sm:pb-6 lg:pb-8 max-w-[500px]">
          <div className={classNames(' hidden lg:block sticky top-24 flex-shrink-0 w-full max-w-[500px]')}>
            <ProductOptionsSkeleton />
          </div>
        </div>
      </div>

      <div className={classNames('border-t ', localTheme.border.base.main)}>
        <RecommendationsSkeleton />
      </div>
    </div>
  );
};

export default Loading;