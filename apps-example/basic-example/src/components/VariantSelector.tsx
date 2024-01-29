'use client';

import { classNames } from '@marulloc/components-library/utils';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  product: Product;
};
const VariantSelector = ({ product: { variants, options } }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (
    name: Product['options'][number]['name'],
    value: Product['options'][number]['values'][number],
  ) => {
    const searchParamsWithOption = new URLSearchParams(searchParams.toString());
    const isAlreadyExist = searchParamsWithOption.get(name) === value;

    if (isAlreadyExist) searchParamsWithOption.delete(name);
    else searchParamsWithOption.set(name, value);

    const search = searchParamsWithOption.toString();
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}/${query}`, { scroll: false });
  };

  return (
    <>
      {options.map((option) => (
        <dl key={`product-option-${option.name}`} className="mb-8">
          <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>

          <dd className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              const isActive = searchParams.get(option.name) === value;

              return (
                <button
                  key={`product-option-${option.name}-${value}`}
                  onClick={() => handleSelect(option.name, value)}
                  className={classNames(
                    'flex min-w-[48px] items-center justify-center rounded-lg border bg-neutral-100 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900',

                    isActive
                      ? '  ring-2 ring-teal-600' // active option
                      : '  ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-teal-600 ',

                    // not available style
                    // 'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700',
                  )}
                >
                  {value}
                </button>
              );
            })}
          </dd>
        </dl>
      ))}
    </>
  );
};

export default VariantSelector;
