import Link from 'next/link';
import Image from 'next/image';
import { classNames } from '@marulloc/components-library/utils';

const Logo = async () => {
  // Get Logo

  return (
    <div className="relative inline-block">
      <Link href="/">
        <div
          className={classNames(
            'px-2 py-1',
            'text-xs md:text-sm leading-3 md:leading-3  ',
            'text-teal-500 hover:text-zinc-400',
            'text-center',
          )}
        >
          <div>Marulloc</div>
          <div>Storefront</div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
