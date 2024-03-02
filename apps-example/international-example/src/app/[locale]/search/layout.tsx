import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import CollectionNav from '../../../components/search/CollectionNav';
import SemanticBox from '@/components/SemanticBox';

const Layout = async ({ children, params }: { children: React.ReactNode; params: { locale: string } }) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', 'border-default-base')}>
      <SemanticBox
        fill="glassy-default-base"
        p={{ dir: 'xy', size: 'md' }}
        className={classNames('flex-none md:max-w-[200px] relative')}
      >
        <div className="sticky top-24">
          <CollectionNav locale={{ country, language }} />
        </div>
      </SemanticBox>

      <div className={classNames('order-last w-full  ', 'border-t md:border-l md:border-t-0 ', 'border-default-base')}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
