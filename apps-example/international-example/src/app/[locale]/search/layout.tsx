import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import CollectionNav from '../../../components/search/CollectionNav';

const Layout = async ({ children, params }: { children: React.ReactNode; params: { locale: string } }) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', localTheme.border.base.main)}>
      <section
        className={classNames(
          'flex-none md:max-w-[200px] relative',
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.small,
        )}
      >
        <div className="sticky top-24">
          <CollectionNav locale={{ country, language }} />
        </div>
      </section>

      <div
        className={classNames(
          'order-last w-full  ',
          'border-t md:border-l md:border-t-0 ',
          localTheme.border.base.main,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
