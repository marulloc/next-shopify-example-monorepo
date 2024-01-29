'use client';

import { useEffect } from 'react';
 
export function withPortalRoot<T extends React.ComponentType<any>>(
  Component: T,
  portalId: string,
): React.FC<React.ComponentProps<T>> {
  const ComponentWithPortalRoot: React.FC<React.ComponentProps<T>> = (props) => {
    useEffect(() => {
      if (document.getElementById(portalId)) return;

      const rootDiv = document.createElement('div');
      rootDiv.id = portalId;
      document.body.appendChild(rootDiv);

      return () => {
        if (rootDiv.parentNode === document.body) {
          document.body.removeChild(rootDiv);
        }
      };
    }, []);

    return <Component {...props} />;
  };

  return ComponentWithPortalRoot;
}
