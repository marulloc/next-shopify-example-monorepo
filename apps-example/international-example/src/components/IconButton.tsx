import { classNames } from '@marulloc/components-library/utils';

type Props<T extends React.ElementType = 'button'> = {
  srName?: string;
  children: React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const IconButton = <T extends React.ElementType = 'button'>({ srName, as, className, ...restProps }: Props<T>) => {
  const Component = as ?? 'button';

  return (
    <Component
      {...restProps}
      className={classNames('relative p-1', 'hover:scale-105 transition-all duration-150', className)}
    >
      <span className="sr-only">{srName}</span>
      {restProps.children}
    </Component>
  );
};

export default IconButton;
