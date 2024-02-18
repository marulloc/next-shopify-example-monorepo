'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductPrice from '@/components/product/ProductPrice';
import Price from '@/components/Price';
import { useCartMutation } from '@/context/cart/hooks';
import LoadingDots from '@/components/loading/LoadingDots';

type TProps = {
  product: ToolkitProduct;
};

const ProductOptions = ({ product }: TProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addItem } = useCartMutation();
  const [isAdding, setIsAdding] = useState(false);

  // Product Option
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const result: { [key: string]: string | null } = {};
    product.options.forEach((option) => (result[option.name] = searchParams.get(option.name) || null));
    return result;
  });
  // Variant
  const selectedVariant = useMemo(() => {
    return product.variants.find(({ selectedOptions: variantOptions }) =>
      variantOptions.every((option) => option.value === selectedOptions[option.name]),
    );
  }, [product.variants, selectedOptions]);

  const buttonStatus: 'Sold Out' | 'Add to Cart' | 'Select Options' | 'Adding' = useMemo(() => {
    if (!selectedVariant) return 'Select Options';
    if (!selectedVariant.availableForSale) return 'Sold Out';
    return 'Add to Cart';
  }, [selectedVariant]);

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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedVariant) return;

    setIsAdding(true);

    await addItem({ variantId: selectedVariant.id, quantity: 1 });

    setIsAdding(false);
  };

  return (
    <section className={classNames(localTheme.spacing.padding.xy.medium, 'lg:max-w-lg')}>
      <div className={classNames(localTheme.spacing.padding.b.small, 'border-b', localTheme.border.base.muted)}>
        <h1 className={classNames(localTheme.text.size.large, 'font-semibold mb-2')}>{product.title}</h1>
        <ProductPrice
          priceRange={product.priceRange}
          className={classNames(localTheme.text.size.small, localTheme.text.color.base.muted)}
        />
      </div>
      <h2 className="sr-only">상품 옵션 선택</h2>

      <form onSubmit={handleSubmit} onChange={handleSelect}>
        {product.options.map((option) => (
          <fieldset
            key={`${product.title}-option-${option.name}`}
            className={classNames(localTheme.spacing.margin.y.small)}
          >
            <legend
              className={classNames(
                localTheme.spacing.padding.b.extraSmall,
                localTheme.text.size.small,
                localTheme.text.color.base.muted,
              )}
            >
              {option.name}
            </legend>
            <ul className={classNames(' flex md:grid flex-wrap md:grid-cols-4 gap-3')}>
              {option.values.map((value) => (
                <li key={`${option.name}_${value}`} className="relative h-full">
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
                      'flex min-w-[48px] h-full items-center justify-center rounded-lg border bg-neutral-100 px-3 py-2 text-sm ',
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-indigo-600',
                      'peer-checked:ring-2 peer-checked:ring-indigo-600  ',
                      'cursor-pointer',
                      localTheme.text.size.small,
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

        <div>
          <div className={classNames('my-4 border-b', localTheme.border.base.muted)}></div>
          <div>
            {selectedVariant ? (
              <div className={classNames('mb-4')}>
                <p className={classNames('text-xs', localTheme.text.color.base.main)}>
                  <span className={classNames('pb-1')}> {`Selected price : `} </span>
                  <span>&quot;{selectedVariant.title}&quot;</span>{' '}
                </p>

                <div className="text-lg  md:text-xl text-indigo-600">
                  <Price currencyCode={selectedVariant.price.currencyCode} amount={selectedVariant.price.amount} />
                </div>
              </div>
            ) : (
              <ProductPrice priceRange={product.priceRange} className="mb-4" />
            )}

            <div className="relative">
              <button
                type="submit"
                className={classNames(
                  'block w-full rounded-lg text-center py-3 pointer-events-none shadow-lg',
                  localTheme.text.color.base.contrast,

                  !isAdding &&
                    buttonStatus === 'Select Options' &&
                    classNames(localTheme.fill.secondary.main, localTheme.fill.secondary.hover, 'cursor-not-allowed '),
                  !isAdding &&
                    buttonStatus === 'Add to Cart' &&
                    classNames(localTheme.fill.primary.main, localTheme.fill.primary.hover, 'pointer-events-auto'),
                  !isAdding &&
                    buttonStatus === 'Sold Out' &&
                    classNames(localTheme.fill.base.disabled, localTheme.fill.base.muted, 'cursor-not-allowed'),

                  isAdding &&
                    classNames(localTheme.fill.primary.main, localTheme.fill.primary.hover, 'cursor-not-allowed'),
                )}
              >
                {isAdding ? <LoadingDots className="my-2 m-4" /> : <span className={classNames()}>{buttonStatus}</span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProductOptions;
