'use client';

import { useSetPortalRecoil } from '@/context/ui/hooks';

type TProps<T extends React.ElementType = 'button'> = {
  children: React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const LocaleSelectModalChildrenTrigger = <T extends React.ElementType = 'button'>({
  children,
  as,
  ...restProps
}: TProps<T>) => {
  const { activate } = useSetPortalRecoil('locale-select-modal');

  const Component = as ?? 'button';
  return (
    <Component
      {...restProps}
      onClick={(e) => {
        restProps.onClick(e);
        activate({ onlyOne: true });
      }}
    >
      {children}
    </Component>
  );
};

export default LocaleSelectModalChildrenTrigger;
