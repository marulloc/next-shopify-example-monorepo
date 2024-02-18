import { classNames } from '@marulloc/components-library/utils';
import './loading-dots-style.css';

type Props = {
  defaultClassName?: string;
  className?: string;
};
const LoadingDots = ({ defaultClassName = 'bg-white w-2 h-2  mx-auto', className }: Props) => {
  return <span className={classNames('loader', defaultClassName, className)}></span>;
};

export default LoadingDots;
