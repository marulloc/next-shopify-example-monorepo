'use client';

import { useEffect, useState } from 'react';
import { DropdownContextType, useDropdownContext } from './context';
import ReactDOM from 'react-dom';
import { classNames } from '../../utils';
import { DROPDOWN_PORTAL_ID } from './constant';

type DropdownContentsProps = {
  children: (props: DropdownContextType) => React.ReactNode;
  matchTriggerWidth?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'id'>;

const DropdownContents = ({ children, className, matchTriggerWidth = true, ...rest }: DropdownContentsProps) => {
  const { isOpen, dropdownId, triggerId, ...restContext } = useDropdownContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const dropdown = document.getElementById(dropdownId);
      const trigger = document.getElementById(triggerId);

      if (!dropdown || !trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const dropdownHeight = dropdown.offsetHeight;
      const spaceBelow = window.innerHeight - triggerRect.bottom;

      if (spaceBelow < dropdownHeight && triggerRect.top > dropdownHeight) {
        // 현재 뷰포트보다 드롭다운의 높이가 클 경우에
        dropdown.style.top = `${triggerRect.top - dropdownHeight + window.scrollY}px`;
      } else {
        dropdown.style.top = `${triggerRect.bottom + window.scrollY}px`;
      }

      dropdown.style.left = `${triggerRect.left + window.scrollX}px`;
      if (matchTriggerWidth) dropdown.style.width = `${triggerRect.width}px`;
    };
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
    }

    return () => window.removeEventListener('resize', updatePosition);
  }, [dropdownId, isOpen, matchTriggerWidth, triggerId]);

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <>
      <div
        {...rest}
        id={dropdownId}
        className={classNames(
          'absolute   transition-all duration-300 ease-out z-30 ',
          isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-4',
          className,
        )}
      >
        <>{children({ dropdownId, triggerId, isOpen, ...restContext })}</>
      </div>
      <div className={classNames(isOpen ? 'visible' : 'invisible', '  fixed inset-0 z-0')}></div>
    </>,
    document.getElementById(DROPDOWN_PORTAL_ID)!,
  );
};

export default DropdownContents;
