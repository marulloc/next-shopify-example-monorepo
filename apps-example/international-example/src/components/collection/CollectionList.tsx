import CollectionCard, { TCollectionCardProps } from './CollectionCard';
import { classNames } from '@marulloc/components-library/utils';
import { ToolkitCollection } from '@marulloc/shopify-next-api/v24.01/@toolkit-types';

import Link, { LinkProps } from 'next/link';

export type TCollectionListProps = {
  collections: ToolkitCollection[];
  variant: TCollectionCardProps['variant'];
  subProps?: {
    ul?: Omit<React.ComponentPropsWithoutRef<'ul'>, 'children'>;
    li?: Omit<React.ComponentPropsWithoutRef<'li'>, 'children'>;
    Link?: Omit<LinkProps, 'href' | 'children'>;
  };
};

const CollectionList = ({ collections, variant, subProps }: TCollectionListProps) => {
  const uniqueId = `id-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;

  const ulProps = subProps?.ul;
  const liProps = subProps?.li;
  const linkProps = subProps?.Link;

  const ulClassName =
    variant === 'big'
      ? classNames('grid grid-cols-3 gap-4 sm:gap-6 md:gap-8', ulProps?.className)
      : classNames('space-y-4', ulProps?.className);
  const liClassName =
    variant === 'big' ? classNames('aspect-square', liProps?.className) : classNames('py-1', liProps?.className);

  return (
    <ul {...ulProps} className={ulClassName}>
      {collections.map((collection, index) => (
        <li key={`${uniqueId}-collection-card-${collection.handle}`} {...liProps} className={liClassName}>
          <Link href={collection.handleRoute} {...linkProps}>
            <CollectionCard variant={variant} collection={collection} index={index} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;
