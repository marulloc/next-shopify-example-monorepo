import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';

type Props = {
  variant: 'small' | 'big';
  index: number;
} & { collection: ToolkitCollection };

const CollectionCard = ({ variant, collection, index }: Props) => {
  switch (variant) {
    case 'small':
      return <SmallCollectionCard collection={collection} index={index} />;

    default:
    case 'big':
      return <BigCollectionCard collection={collection} index={index} />;
  }
};

export default CollectionCard;

const SmallCollectionCard = ({ collection }: Omit<Props, 'variant'>) => {
  return (
    <>
      {}
      {/*  */}
    </>
  );
};

const BigCollectionCard = ({ collection, index }: Omit<Props, 'variant'>) => {
  return (
    <>
      <div
        aria-hidden="true"
        className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5  opacity-90 border"
      >
        <Image
          src={collection.image?.url || `/default/collection-${index + 1}.png`}
          alt={collection.image?.altText || `default-collection-${index + 1}`}
          width={collection.image?.width || 1200}
          height={collection.image?.height || 1200}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3
        className={classNames(
          'mt-4 text-base font-semibold text-gray-900',
          localTheme.text.size.small,
          localTheme.text.color.base.main,
        )}
      >
        {collection.title}
      </h3>
      <p
        className={classNames(
          'mt-1 text-sm text-gray-500',
          localTheme.text.size.small,
          localTheme.text.color.base.muted,
        )}
      >
        {collection.description || `default collection`}
      </p>
    </>
  );
};
