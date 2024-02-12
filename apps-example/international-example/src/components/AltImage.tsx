import { classNames } from '@marulloc/components-library/utils';

type Props = {
  initial: string;
};
const AltImage = ({ initial }: Props) => {
  return (
    <span
      className={classNames(
        'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
        'flex h-6 w-6 pt-0.5 shrink-0 items-center justify-center rounded-lg border text-[0.7rem] font-medium bg-white',
      )}
    >
      {initial.toUpperCase()}
    </span>
  );
};

export default AltImage;
