'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import React, { useEffect, useMemo, useState } from 'react';
import ProductPrice from '@/components/product/ProductPrice';
import Price from '@/components/Price';
import LoadingDots from '@/components/loading/LoadingDots';
import { useSelectVariant } from '@/hooks/useSelectProductVariant';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import AddToCartButton from '../cart/AddToCartButton';
import Card from '../@common/semantic/Card';
import { TDictionary } from '@/dictionaries';
import Skeleton from '../loading/Skeleton';

type TProps = {
  product: ToolkitProduct;
  dict: TDictionary['product'];
};

const ProductOptions = ({ product, dict }: TProps) => {
  const [queryParams, navigateWithParams] = useSyncDataUrl({ keys: product.options.map((option) => option.name) });
  const [{ selectedOptions, selectedVariant }, selectOption] = useSelectVariant({ product, initialValue: queryParams });
  const dictionary = dict.VariantSelector;

  useEffect(() => {
    navigateWithParams(
      selectedOptions,
      product.options.map((option) => option.name),
    );
  }, [navigateWithParams, product.options, selectedOptions]);

  return (
    <Card
      level={2}
      as="div"
      className={classNames(
        'border-0',
        localTheme.spacing.margin.xy.medium,
        localTheme.spacing.padding.xy.medium,
        'lg:max-w-lg ',
      )}
    >
      <div className={classNames(localTheme.spacing.padding.b.small)}>
        <h1 className={classNames(localTheme.text.size.large, 'font-semibold mb-1')}>{product.title}</h1>
        <ProductPrice
          priceRange={product.priceRange}
          className={classNames(localTheme.text.size.medium, localTheme.text.color.base.main)}
        />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <h4
          className={classNames(
            'border-b text-right',
            localTheme.border.base.muted,
            localTheme.text.color.base.muted,
            localTheme.text.size.small,
            'font-semibold mb-3',
          )}
        >
          {dictionary.title}
        </h4>
        {product.options.map((option, index) => (
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
              {`${index + 1}. ${option.name}`}
            </legend>
            <ul className={classNames(' flex md:grid flex-wrap md:grid-cols-3 gap-3')}>
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
                      'flex min-w-[48px] h-full items-center justify-center rounded-lg border px-3 py-2 text-sm ',
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-indigo-600',
                      'peer-checked:ring-2 peer-checked:ring-indigo-600  ',
                      'cursor-pointer',
                      localTheme.text.size.small,
                    )}
                    onClick={() => selectOption(option.name, value)}
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
            <div className="mb-4">
              {selectedVariant && (
                <div>
                  <p className={classNames('text-xs', localTheme.text.color.base.main)}>
                    <span className={classNames('pb-1')}> {`Selected price : `} </span>
                    <span>&quot;{selectedVariant.title}&quot;</span>{' '}
                  </p>

                  <div className="text-lg  md:text-xl text-indigo-600">
                    <Price currencyCode={selectedVariant.price.currencyCode} amount={selectedVariant.price.amount} />
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <AddToCartButton
                variant={selectedVariant}
                className={({ state }) => {
                  return classNames(
                    'block w-full rounded-lg text-center py-3  shadow-lg',
                    localTheme.text.color.base.contrast,

                    state === 'notYet' && classNames(localTheme.fill.secondary.main, localTheme.fill.secondary.hover),
                    state === 'soldOut' && classNames(localTheme.fill.base.disabled, localTheme.fill.base.muted, ' '),
                    state === 'adding' && classNames(localTheme.fill.primary.main, localTheme.fill.primary.hover, ' '),
                    state === 'waiting' && classNames(localTheme.fill.primary.main, localTheme.fill.primary.hover, ' '),
                  );
                }}
              >
                {({ state, fullForm }) => (
                  <>
                    {state === 'adding' ? (
                      <LoadingDots className="my-2 m-4" />
                    ) : (
                      <span className={classNames()}>{fullForm}</span>
                    )}
                  </>
                )}
              </AddToCartButton>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default React.memo(ProductOptions);

export const ProductOptionsSkeleton = () => {
  return (
    // Same with VariantSelector's style
    <div className={classNames(localTheme.spacing.padding.xy.medium, 'lg:max-w-lg', ' min-w-full lg:min-w-[500px]')}>
      <div className={classNames(localTheme.spacing.padding.b.small, 'border-b', localTheme.border.base.muted)}>
        <h1 className={classNames(localTheme.text.size.large, 'font-semibold mb-2')}>
          <Skeleton />
        </h1>
        <Skeleton />
      </div>

      <div></div>
    </div>
  );
};
