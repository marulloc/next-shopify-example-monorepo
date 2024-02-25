import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { GrGithub } from 'react-icons/gr';

type TProps = { href: string; children: React.ReactNode };
const GithubLink = ({ href, children }: TProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="block ">
      <div
        className={classNames(
          'text-gray-700 hover:text-indigo-600  ',
          'group flex gap-x-3 rounded-md  text-sm leading-6',
        )}
      >
        <div
          className={classNames(
            'h-6 w-6 overflow-hidden border border-gray-200 group-hover:border-indigo-600 rounded-lg ',
            'flex justify-center items-center',
          )}
        >
          <GrGithub className={classNames('  shrink-0 h-7 w-7      ')} />
        </div>
        <>{children}</>
      </div>
    </Link>
  );
};

export default GithubLink;
