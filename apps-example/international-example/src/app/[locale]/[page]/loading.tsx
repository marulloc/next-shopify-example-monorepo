import SemanticBox from '@/components/SemanticBox';
import Skeleton from '@/components/loading/Skeleton';

import { classNames } from '@marulloc/components-library/utils';

const StaticPageLoading = () => {
  return (
    <main className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', 'border-default-base')}>
      <div className={classNames('flex-1', 'p-4 sm:p-6 md:p-8', 'max-w-4xl mx-auto')}>
        <section className=" p-0 ">
          <SemanticBox
            fill="primary-muted"
            p={{ dir: 'xy', size: 'md' }}
            className={classNames('rounded-lg w-full shadow-lg bg-opacity-30 text-primary-base')}
          >
            <div className={classNames('h-6 w-1/3 pb-3 mb-3')}>
              <Skeleton />
            </div>
            <div className="space-y-1">
              <div className={classNames('h-2 w-2/3')}>
                <Skeleton />
              </div>
              <div className={classNames('h-2 w-2/3')}>
                <Skeleton />
              </div>
              <div className={classNames('h-2 w-1/3')}>
                <Skeleton />
              </div>
            </div>
          </SemanticBox>

          <div className="prose mt-6 p-6">
            <div className="space-y-1">
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-1/2')}>
                <Skeleton />
              </div>
            </div>

            <div className="space-y-1 mt-4">
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-1/2')}>
                <Skeleton />
              </div>
            </div>

            <div className="space-y-1 mt-4">
              <div className={classNames('h-4 w-2/3')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-full')}>
                <Skeleton />
              </div>
              <div className={classNames('h-4 w-1/4')}>
                <Skeleton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default StaticPageLoading;
