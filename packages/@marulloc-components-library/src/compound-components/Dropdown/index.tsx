'use client';

import { useCallback, useEffect, useState } from 'react';
import { DropdownContext, DropdownContextType } from './context';
import DropdownTrigger from './DropdownTrigger';
import DropdownContents from './DropdownContents';
import { withPortalRoot } from '../../portal-hoc';
import { DROPDOWN_PORTAL_ID } from './constant';

type DropdownRootProps = {
  id: string;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
};
const DropdownRoot = ({ children, onClose, onOpen, id }: DropdownRootProps) => {
  const [context, setContext] = useState<DropdownContextType>({
    isOpen: false,
    openDropdown: () => {},
    closeDropdown: () => {},
    dropdownId: `dropdown-id-${id}`,
    triggerId: `trigger-id-${id}`,
  });

  const openDropdown = useCallback(() => {
    setContext((context) => ({ ...context, isOpen: true }));
    if (onOpen) onOpen();
  }, [onOpen]);
  const closeDropdown = useCallback(() => {
    setContext((context) => ({ ...context, isOpen: false }));
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    const dropdown = document.getElementById(context.dropdownId);
    const trigger = document.getElementById(context.triggerId);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown && trigger && !dropdown.contains(event.target as Node) && !trigger.contains(event.target as Node)) {
        setContext((context) => ({ ...context, isOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [context]);

  return (
    <DropdownContext.Provider
      value={{
        ...context,
        openDropdown,
        closeDropdown,
      }}
    >
      <div>{children}</div>
    </DropdownContext.Provider>
  );
};

const Dropdown = Object.assign(withPortalRoot(DropdownRoot, DROPDOWN_PORTAL_ID), {
  Trigger: DropdownTrigger,
  Contents: DropdownContents,
});

export default Dropdown;
