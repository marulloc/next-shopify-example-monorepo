import { DescriptionSkeleton } from '@/components/product/Description';
import { ImageGallerySkeleton } from '@/components/product/ImageGallery';
import { ProductOptionsSkeleton } from '@/components/product/ProductOptions';
import { RecommendationsSkeleton } from '@/components/product/Recommendations';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';

const Loading = () => {
  return (
    <main className={classNames(' relative min-h-screen  ')}>
      <div className="flex flex-col lg:flex-row">
        <div className={classNames('h-full flex-1 lg:border-r', localTheme.border.base.main)}>
          <section
            className={classNames(
              'block',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <ImageGallerySkeleton />
          </section>

          <section
            className={classNames(
              'block lg:hidden ',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <ProductOptionsSkeleton />
          </section>

          <section className={classNames()}>
            <DescriptionSkeleton />
          </section>
        </div>

        <div>
          <section className={classNames(' hidden lg:block sticky top-16 flex-shrink-0')}>
            <ProductOptionsSkeleton />
          </section>
        </div>
      </div>

      <section className={classNames('border-t ', localTheme.border.base.main)}>
        <RecommendationsSkeleton />
      </section>
    </main>
  );
};

export default Loading;
