import { classNames } from '@marulloc/components-library/utils';

type Props = {
  initial: string;
  className?: string;
};
const InitialIcon = ({ initial, className }: Props) => {
  return (
    <span
      className={classNames(
        'text-default-muted/80 border-default-muted group-hover:border-primary-base group-hover:text-primary-base',
        'flex h-6 w-6 pt-0.5 shrink-0 items-center justify-center rounded-lg border text-[0.7rem] font-medium bg-default-accent',
        className,
      )}
    >
      {initial.toUpperCase()}
    </span>
  );
};

export default InitialIcon;
