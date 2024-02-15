'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type TProps = {
  product: ToolkitProduct;
};

const ProductOptions = ({ product }: TProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const result: { [key: string]: string | null } = {};
    product.options.forEach((option) => (result[option.name] = searchParams.get(option.name) || null));
    return result;
  });

  const syncWithUrl = (name: string, value: string | null) => {
    const newUrl = new URLSearchParams(searchParams.toString());

    if (value) newUrl.set(name, value);
    else newUrl.delete(name);

    const newSearchParams = newUrl.toString();
    const query = newSearchParams ? `?${newSearchParams}` : '';

    if (newSearchParams !== searchParams.toString()) router.replace(`${pathname}/${query}`, { scroll: false });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLFormElement>) => {
    syncWithUrl(e.target.name, e.target.value);
  };

  // 위로 모두 hook으로 뺄 수 있음

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={classNames(localTheme.spacing.padding.xy.medium)}>
      <h1 className={classNames(localTheme.text.size.medium)}>{product.title}</h1>
      <h2 className="sr-only">상품 옵션 선택</h2>

      <form onSubmit={handleSubmit} onChange={handleSelect}>
        {product.options.map((option) => (
          <fieldset key={`${product.title}-option-${option.name}`} className="my-4">
            <legend>{option.name}</legend>
            <ul className="grid gap-3 grid-cols-4">
              {option.values.map((value) => (
                <li key={`${option.name}_${value}`} className="relative">
                  <input
                    className="sr-only peer"
                    type="radio"
                    value={value}
                    name={option.name}
                    id={`${option.name}_${value}`}
                    checked={selectedOptions[option.name] === value}
                    onChange={() => {}}
                  />
                  <label
                    htmlFor={`${option.name}_${value}`}
                    className={classNames(
                      'flex min-w-[48px] items-center justify-center rounded-lg border bg-neutral-100 px-3 py-2 text-sm ',
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-indigo-600',
                      'peer-checked:ring-2 peer-checked:ring-indigo-600  ',
                      'cursor-pointer',
                    )}
                    onClick={() => setSelectedOptions((options) => ({ ...options, [option.name]: value }))}
                  >
                    {value}
                  </label>
                  <div className="absolute hidden inset-0  peer-checked:block  " />
                </li>
              ))}
            </ul>
          </fieldset>
        ))}

        <button
          type="submit"
          className={classNames('block w-full rounded-lg text-center py-3 bg-indigo-600 text-white')}
        >
          Add to cart
        </button>
      </form>
    </section>
  );
};

export default ProductOptions;
