import Card from '@/components/@common/semantic/Card';
import Skeleton from '@/components/loading/Skeleton';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';

const StaticPageLoading = () => {
  return (
    <main className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', 'border-gray-300')}>
      <div className={classNames('flex-1', localTheme.spacing.padding.xy.medium, 'max-w-4xl mx-auto')}>
        <section className=" p-0 ">
          <Card
            as="div"
            level={2}
            className={classNames('border-0  shadow-md bg-indigo-200 text-indigo-800 rounded-lg p-6  ')}
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
          </Card>

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
