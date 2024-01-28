'use client';

import { classNames } from '@/styles/utils';
import { useCartContext } from './context';
import { PlusIcon } from '@heroicons/react/24/outline';

type Props = {
  variantId: Product['variants'][number]['id'];
  quantity?: number;
};
const AddToCart = ({ variantId, quantity = 0 }: Props) => {
  const { addItem } = useCartContext();

  return (
    <div className="">
      <button
        className={classNames(
          'bg-teal-700 hover:bg-teal-600 hover:scale-105 transition-all rounded-lg',

          'py-3 px-8',
          'relative w-full  text-center',
        )}
        onClick={() => addItem({ variantId, quantity })}
      >
        <PlusIcon className="w-5 h-5 text-zinc-200 absolute left-4 " />
        <span className=" text-zinc-200 text-base">Add to cart</span>
      </button>
    </div>
  );
};

export default AddToCart;
