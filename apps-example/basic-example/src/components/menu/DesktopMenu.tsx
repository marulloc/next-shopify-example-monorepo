import { classNames } from '@marulloc/components-library/utils';

const DesktopMenu = async () => {
  // const menu = await getMenu('custom-storefront-menu');

  return (
    <nav>
      <ul className="flex space-x-2">
        <li className={classNames('hover:text-zinc-100 text-zinc-300', 'cursor-pointer', 'text-sm', 'p-2 group')}>
          <span className=" ">All</span>
        </li>
        <li className={classNames('hover:text-zinc-100 text-zinc-300', 'cursor-pointer', 'text-sm', 'p-2 group')}>
          <span className=" ">Abstract</span>
        </li>

        <li className={classNames('hover:text-zinc-100 text-zinc-300', 'cursor-pointer', 'text-sm', 'p-2 group')}>
          <span className=" ">Landscape</span>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopMenu;
