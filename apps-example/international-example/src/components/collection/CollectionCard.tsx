import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import InitialIcon from '../InitialIcon';
import Card from '../@common/semantic/Card';
import Typography from '../_draft/Typography';

export type TCollectionCardProps = {
  variant: 'small' | 'big';
  index: number;
} & { collection: ToolkitCollection };

const CollectionCard = ({ variant, collection, index }: TCollectionCardProps) => {
  switch (variant) {
    case 'small':
      return <SmallCollectionCard collection={collection} index={index} />;

    default:
    case 'big':
      return <BigCollectionCard collection={collection} index={index} />;
  }
};

export default CollectionCard;

const SmallCollectionCard = ({ collection, index }: Omit<TCollectionCardProps, 'variant'>) => {
  return (
    <Card
      level={0}
      className={classNames(
        'border-0',
        'text-gray-700 hover:text-indigo-600  ',
        'group flex gap-x-3 text-sm leading-6',
      )}
    >
      {collection.image || index < 3 ? (
        <Image
          src={collection.image?.url || `/default-alt-images/collection-${index + 1}.png`}
          alt={collection.image?.altText || `default-collection-${index + 1}`}
          width={collection.image?.width || 30}
          height={collection.image?.height || 30}
          className={classNames(
            'border-gray-200 group-hover:border-indigo-600 ',
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border',
          )}
        />
      ) : (
        <InitialIcon initial={collection.title[0] || 'c'} />
      )}
      <span className="truncate">{collection.title.toUpperCase()}</span>
    </Card>
  );
};

const BigCollectionCard = ({ collection, index }: Omit<TCollectionCardProps, 'variant'>) => {
  return (
    <Card level={0} className="border-0 group">
      <div
        aria-hidden="true"
        className="  aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5  opacity-90 border"
      >
        <Image
          src={collection.image?.url || `/default-alt-images/collection-${index + 1}.png`}
          alt={collection.image?.altText || `default-collection-${index + 1}`}
          width={collection.image?.width || 1200}
          height={collection.image?.height || 1200}
          className="h-full w-full object-cover object-center group-hover:scale-110  transition-all duration-300  "
        />
      </div>
      <Typography
        as="h4"
        size="md"
        color="default-base"
        className={classNames('mt-4 font-semibold group-hover:text-primary-base ')}
      >
        {collection.title.toUpperCase()}
      </Typography>
      <Typography as="p" size="sm" color="default-muted" className={classNames('mt-0 text-sm  ')}>
        {collection.description || `default collection`}
      </Typography>
    </Card>
  );
};
