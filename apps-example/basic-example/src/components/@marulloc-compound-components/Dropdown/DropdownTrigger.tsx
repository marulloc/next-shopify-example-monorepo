'use client';

import { DropdownContextType, useDropdownContext } from './context';

type DropdownTriggerProps = {
  children: (props: DropdownContextType) => React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'id'>;

const DropdownTrigger = ({ children, ...rest }: DropdownTriggerProps) => {
  const { openDropdown, triggerId, ...context } = useDropdownContext();

  return (
    <div {...rest} id={triggerId} onClick={() => openDropdown()}>
      <>{children({ openDropdown, triggerId, ...context })}</>
    </div>
  );
};

export default DropdownTrigger;
