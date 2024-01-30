import { getMenu } from '@/services/common/service';
import { classNames } from '@marulloc/components-library/utils';
import ClientCompo from '../ClientCompo';
import Link from 'next/link';

type Props = {
  menu: Menu;
};
const DesktopMenu = ({ menu }: Props) => {
  return (
    <nav>
      <ClientCompo data={menu} />
      <ul className="flex space-x-2">
        {menu.map(({ title, url }) => (
          <li
            key={`nav-${title}`}
            className={classNames('hover:text-zinc-100 text-zinc-300', 'cursor-pointer', 'text-sm', '  group')}
          >
            <Link href={url} className="w-full  p-2">
              <span className=" ">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
