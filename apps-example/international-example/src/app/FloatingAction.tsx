import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { GrGithub } from 'react-icons/gr';

const FloatingActionButton = () => {
  return (
    <div className={classNames('fixed bottom-0 left-0 z-20', 'pl-4 sm:pl-6 lg:pl-8')}>
      <div className={classNames('group')}>
        <Link
          href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo"
          target="_blank"
          rel="noopener noreferrer"
          className="-m-2 p-2   opacity-60 group-hover:opacity-100 group-hover:animate-pulse  "
        >
          <span className="sr-only">Search</span>
          <GrGithub className=" h-8 w-8 lg:h-12 lg:w-12" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default FloatingActionButton;
