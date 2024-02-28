'use client';

import { useGetDictioanry } from '@/hooks/locale-hooks';
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
  const dictionary = useGetDictioanry();

  const Component = as ?? 'button';
  return (
    <Component
      {...restProps}
      onClick={(e) => {
        restProps.onClick(e);
        activate({ onlyOne: true });
      }}
    >
      <span className="sr-only">{dictionary.locale.LocaleSelectorTrigger.title}</span>
      {children}
    </Component>
  );
};

export default LocaleSelectModalChildrenTrigger;
