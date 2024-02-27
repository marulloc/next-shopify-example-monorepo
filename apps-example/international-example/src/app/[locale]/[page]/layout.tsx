import { getPages } from '@/@marulloc-shopify-nextapi/v24.01/services/page/service';
import Box from '@/components/@common/semantic/Box';
import Card from '@/components/@common/semantic/Card';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

type TProps = {
  children: React.ReactNode;
  params: { locale: string; page: string };
};

const StaticPageLayout = async ({ children }: TProps) => {
  return (
    <div className={classNames('flex-1 flex flex-col md:flex-row  ', ' border-b', localTheme.border.base.main)}>
      <Box
        as="main"
        level={0}
        className={classNames('flex-1', localTheme.spacing.padding.xy.medium, 'max-w-4xl mx-auto')}
      >
        {children}
      </Box>
    </div>
  );
};

export default StaticPageLayout;
