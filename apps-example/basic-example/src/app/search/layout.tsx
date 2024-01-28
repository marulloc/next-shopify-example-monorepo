import { classNames } from '@/styles/utils';
import { theme } from '@/styles/theme';
import CollectionNavigation from '../../components/CollectionNavigation';

const Layout = async (props: { children: React.ReactNode }) => {
  return (
    <div className="mt-10">
      <div
        className={classNames(
          theme.maxSize,
          theme.layoutPadding,
          'flex flex-col  pb-4 md:flex-row',
          ' text-black dark:text-white',
        )}
      >
        <div className="order-first w-full flex-none md:max-w-[160px]  ">
          <CollectionNavigation />
        </div>

        <div className="order-last min-h-screen w-full md:order-none">
          <>{props.children}</>
        </div>
      </div>
    </div>
  );
};

export default Layout;
