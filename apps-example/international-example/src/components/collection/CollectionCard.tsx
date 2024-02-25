import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import AltImage from '../AltImage';

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

const SmallCollectionCard = ({ collection, index }: Omit<Props, 'variant'>) => {
  return (
    <article
      className={classNames(
        'text-gray-700 hover:text-indigo-600  ',
        'group flex gap-x-3 rounded-md  text-sm leading-6',
      )}
    >
      {collection.image || index < 3 ? (
        <Image
          src={collection.image?.url || `/default-alt-images/collection-${index + 1}.png`}
          alt={collection.image?.altText || `default-collection-${index + 1}`}
          width={collection.image?.width || 1200}
          height={collection.image?.height || 1200}
          className={classNames(
            'border-gray-200 group-hover:border-indigo-600 ',
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border',
          )}
        />
      ) : (
        <AltImage initial={collection.title[0] || 'c'} />
      )}
      <span className="truncate">{collection.title.toUpperCase()}</span>
    </article>
  );
};

const BigCollectionCard = ({ collection, index }: Omit<Props, 'variant'>) => {
  return (
    <article>
      <div
        aria-hidden="true"
        className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5  opacity-90 border"
      >
        <Image
          src={collection.image?.url || `/default-alt-images/collection-${index + 1}.png`}
          alt={collection.image?.altText || `default-collection-${index + 1}`}
          width={collection.image?.width || 1200}
          height={collection.image?.height || 1200}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className={classNames('mt-4 font-semibold ', localTheme.text.size.small, localTheme.text.color.base.main)}>
        {collection.title.toUpperCase()}
      </h3>
      <p className={classNames('mt-1 text-sm  ', localTheme.text.size.small, localTheme.text.color.base.muted)}>
        {collection.description || `default collection`}
      </p>
    </article>
  );
};
