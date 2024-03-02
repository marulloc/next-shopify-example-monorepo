import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { GrGithub } from 'react-icons/gr';

type TProps = { href: string; children: React.ReactNode };
const GithubLink = ({ href, children }: TProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="block ">
      <div
        className={classNames(
          'text-default-accent hover:text-primary-base  ',
          'group flex gap-x-3 rounded-md  text-sm leading-6',
        )}
      >
        <div
          className={classNames(
            'h-6 w-6 overflow-hidden border border-default-muted group-hover:border-primary-base rounded-lg ',
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
