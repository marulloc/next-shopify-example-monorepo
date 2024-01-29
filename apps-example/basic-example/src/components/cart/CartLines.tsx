import { classNames } from '@/styles/utils';
import { CartContextType } from './context';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import Price from '../Price'; 

type Props = {
  lines: CartLine[];

  updateItem: CartContextType['updateItem'];
  deleteItem: CartContextType['deleteItem'];

  handleProductLink: () => void;
};

const CartLines = ({ lines, updateItem, deleteItem, handleProductLink }: Props) => {
  return (
    <ul className="flex-grow overflow-auto py-4">
      {lines.map((line) => (
        <li key={line.id} className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
          <div className="relative flex w-full flex-row justify-between px-1 py-4">
            {/* Delete Cart */}
            <div id="delete cart line" className="absolute z-40 -mt-2 ml-[55px]">
              <button
                onClick={() => deleteItem({ lineId: line.id })}
                className={classNames(
                  'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
                  'text-zinc-900 hover:text-zinc-700 dark:text-zinc-400 hover:dark:text-zinc-200',
                )}
              >
                <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4  " />{' '}
              </button>
            </div>

            {/* Merchandise Image */}
            <Link
              id="variant-image"
              href={line.merchandise.product.handleRoute}
              onClick={handleProductLink}
              className="z-30 flex flex-row space-x-4"
            >
              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                <div className="  w-full h-full object-cover bg-gray-400 flex justify-center items-center">
                  <Image
                    src={line.merchandise.product.featuredImage.url || ''}
                    alt={line.merchandise.product.featuredImage.altText}
                    height={line.merchandise.product.featuredImage.height}
                    width={line.merchandise.product.featuredImage.width}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col text-base">
                <span id="Product Title" className="leading-tight">
                  {line.merchandise.product.title}
                </span>
                <p className="text-sm text-neutral-500 dark:text-neutral-400" id="Merchandise Title">
                  {line.merchandise.title}
                </p>
              </div>
            </Link>

            {/* Quantity */}
            <div className="flex h-16 flex-col justify-between">
              <Price
                className="flex justify-end text-sm"
                currencyCode={line.cost.totalAmount.currencyCode}
                amount={line.cost.totalAmount.amount}
              />

              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                <button
                  id="minus qunatity button" // Update line quantity minus
                  className={classNames(
                    'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
                    'ml-auto',
                  )}
                  onClick={() => updateItem({ lineId: line.id, quantity: line.quantity <= 1 ? 0 : line.quantity - 1 })}
                >
                  <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
                </button>
                <p className="w-6 text-center">
                  <span
                    className="w-full text-sm"
                    id="Line Quantity" // quantity of each Line
                  >
                    {line.quantity}
                  </span>
                </p>

                <button
                  className={classNames(
                    'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
                  )}
                  id="pluse qunatity button" // Update line quantity pluse
                  onClick={() => updateItem({ lineId: line.id, quantity: line.quantity + 1 })}
                >
                  <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartLines;
