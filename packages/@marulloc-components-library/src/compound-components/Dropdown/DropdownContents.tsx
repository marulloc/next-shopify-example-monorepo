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

/**
 * @bugToDo not-mounted sylte 없이 애니메이션 동작하게해야함, 현재는 hidden 처리 안하면 최초에 overflow 된 위치에 박스생성되어있음
 * @param param0
 * @returns
 */
const DropdownContents = ({ children, className, matchTriggerWidth = true, ...rest }: DropdownContentsProps) => {
  const { isOpen, dropdownId, triggerId, ...restContext } = useDropdownContext();
  const [isMounted, setIsMounted] = useState(false);

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
  useEffect(() => {
    updatePosition();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
  }, [dropdownId, isOpen, matchTriggerWidth, triggerId]);

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <>
      <div
        {...rest}
        id={dropdownId}
        className={classNames(
          'dropdown-contents',
          isOpen ? 'dropdown-contents-visible' : 'dropdown-contents-invisible',
          className,
        )}
      >
        <>{children({ dropdownId, triggerId, isOpen, ...restContext })}</>
      </div>
      <div className={`backdrop ${isOpen ? 'visible' : 'invisible'}`}></div>
    </>,
    document.getElementById(DROPDOWN_PORTAL_ID)!,
  );
};

export default DropdownContents;
