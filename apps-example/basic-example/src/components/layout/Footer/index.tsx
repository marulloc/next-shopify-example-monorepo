import { theme } from '@/styles/theme';
import { classNames } from '@marulloc/components-library/utils';

const Footer = () => {
  return (
    <footer className={classNames('h-40', theme.maxSize)}>
      <div className="border-t border-gray-600">
        <p>조병건 footer area</p>
      </div>
    </footer>
  );
};

export default Footer;
