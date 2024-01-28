'use client';

import { classNames } from '@/styles/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {
  href: Collection['handleRoute'];
  title: Collection['title'];
  handle: Collection['handle'];
};
const CollectionLink = ({ href, title, handle }: Props) => {
  const { collection: currentHandle = '' } = useParams();

  const isActive = currentHandle === handle;
  return (
    <Link href={href} className=" py-1 flex  text-zinc-200 hover:text-zinc-100">
      <div
        className={classNames(
          'w-full text-sm  whitespace-nowrap md:whitespace-normal',
          'underline-offset-4 hover:underline',
          isActive ? 'text-teal-400' : '',
        )}
      >
        {title}
      </div>
    </Link>
  );
};

export default CollectionLink;
