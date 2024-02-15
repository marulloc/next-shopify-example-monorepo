import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';

const Layout = (props: { children: React.ReactNode; params: { locale: string } }) => {
  return (
    <div
      className={classNames(
        localTheme.spacing.container,
        localTheme.fill.base.main,
        'shadow-xl',
        'relative',
        'pt-16  ',
        'min-h-screen ',
      )}
    >
      {props.children}
    </div>
  );
};
export default Layout;
