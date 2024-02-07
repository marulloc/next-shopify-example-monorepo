'use client';
import { ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import Image from 'next/image';
import Link from 'next/link';
import Price from '../Price';
import { useCartContext } from '@/context/cart/context';

type Props = {
  cartLine: ToolkitCartLine;
};

const CartLine = ({ cartLine }: Props) => {
  const { updateItem, deleteItem } = useCartContext();

  return (
    <div className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        {/* <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" /> */}

        <Image
          src={cartLine.merchandise.product.featuredImage.url || ''}
          alt={cartLine.merchandise.product.featuredImage.altText}
          height={cartLine.merchandise.product.featuredImage.height}
          width={cartLine.merchandise.product.featuredImage.width}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={cartLine.merchandise.product.handleRoute}>{cartLine.merchandise.product.title}</Link>
            </h3>
            <div className="ml-4">
              <Price
                className="flex justify-end text-sm"
                currencyCode={cartLine.cost.totalAmount.currencyCode}
                amount={cartLine.cost.totalAmount.amount}
              />
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{cartLine.merchandise.title}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center sm:block sm:flex-none sm:text-center text-gray-500 flex-1">
            <label htmlFor={`quantity-${cartLine.id}`} className="sr-only">
              Quantity, {cartLine.merchandise.title}
            </label>
            <select
              id={`quantity-${cartLine.merchandise.title}`}
              name={`quantity-${cartLine.merchandise.title}`}
              className="block max-w-full w-10 rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              value={cartLine.quantity}
              onChange={(e) => updateItem({ lineId: cartLine.id, quantity: Number(e.target.value) })}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>8</option>
            </select>
          </div>
          {/* Qty {cartLine.quantity} */}

          <div className="flex">
            <button
              type="button"
              className="font-medium text-sky-600 hover:text-sky-500"
              onClick={() => deleteItem({ lineId: cartLine.id })}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLine;
