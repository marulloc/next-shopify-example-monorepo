'use client';

import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef } from 'react';
import Modal from '@marulloc/components-library/Modal';
import { HiXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { throttle } from '@/utils/throttle';
import { usePredictiveSearch } from '@/hooks/usePredictiveSearch';
import { localTheme } from '@/theme/local-theme';
import IconButton from '@/components/IconButton';
import CollectionCard from '@/components/collection/CollectionCard';
import ProductCard from '@/components/product/ProductCard';
import { useSelectLocale } from '@/hooks/useLocaleSelect';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import { usePortalRecoil } from '@/context/ui/hooks';

const SearchModal = () => {
  const { isActive, deactivate } = usePortalRecoil('search-modal');
  const { countryCode: country, languageCode: language } = useSelectLocale();
  const [{ predictiveResult }, handlePredictive] = usePredictiveSearch({ locale: { country, language } });
  const [{}, navigateWithQueryParams] = useSyncDataUrl({ keys: ['query'], targetPathname: '/search' });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = throttle(async (e: ChangeEvent<HTMLInputElement>) => handlePredictive(e.target.value), 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;
    navigateWithQueryParams({ query: search.value }, ['query', 'sort']);
  };

  useEffect(() => {
    if (isActive) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500);
  }, [isActive]);

  return (
    <Modal open={isActive} onClose={() => deactivate()}>
      <Modal.Backdrop>
        {({ closeModal }) => (
          <div
            onClick={() => closeModal()}
            className={classNames('w-full h-full', 'bg-opacity-80 ', localTheme.fill.base.disabled)}
          />
        )}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div className={classNames('relative mt-8', 'max-w-3xl mx-auto  max-h-[calc(100vh-64px)]')}>
            <div
              className={classNames(
                'rounded-lg',
                'mx-2 md:mx-4 h-full box-border',
                'overflow-hidden',
                'bg-opacity-80 backdrop-blur-md',
                localTheme.fill.base.main,
              )}
            >
              <div className="flex flex-col h-full w-full ">
                {/* Header */}
                <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
                  <div className="relative w-full ">
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                        closeModal();
                      }}
                      className="w-full  "
                    >
                      <div className={classNames('relative group w-full')}>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <HiOutlineMagnifyingGlass
                            className={classNames('h-5 w-5', 'group-hover:scale-110', localTheme.text.color.base.muted)}
                            aria-hidden="true"
                          />
                        </div>

                        <input
                          ref={inputRef}
                          onChange={handleChange}
                          id="search"
                          name="search-input"
                          placeholder="Search ..."
                          type="search"
                          className={classNames(
                            'block w-full',
                            'rounded-lg bg-transparent',
                            'text-xs ',
                            'pl-10 pr-3 py-2',
                            'border',
                            localTheme.border.base.main,

                            'focus-within:ring-0 ring-zinc-400 ring-inset',
                          )}
                        />
                      </div>
                    </form>
                  </div>
                  <div className={classNames('ml-4 flex items-center border rounded-lg', localTheme.border.base.main)}>
                    <IconButton
                      srName="close panel"
                      className={classNames(localTheme.text.color.base.muted, localTheme.text.color.base.hover)}
                      onClick={() => closeModal()}
                    >
                      <HiXMark className="h-6 w-6" aria-hidden="true" />
                    </IconButton>
                  </div>
                </div>

                {/* Main */}
                <div className={classNames('flex-1 overflow-y-auto max-h-[calc(60svh-30px)]', 'px-4 py-4 sm:px-6')}>
                  <ul className="pt-2 pb-4">
                    <div className="text-xs font-semibold leading-6 text-gray-500">Collections</div>
                    {predictiveResult.collections.map((collection, index) => (
                      <li key={`predictive-search-collection-${collection.handle}`} className="py-1">
                        <Link href={collection.handleRoute} className="block p-1 -mx-1" onClick={() => closeModal()}>
                          <CollectionCard variant="small" collection={collection} index={index} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <div className="text-xs font-semibold leading-6 text-gray-500">Products</div>
                    {predictiveResult.products.map((product) => (
                      <li key={`predictive-search-product-${product.handle}`}>
                        <Link
                          href={product.handleRoute}
                          onClick={() => closeModal()}
                          className={classNames('py-2 block')}
                        >
                          <ProductCard variant="small" product={product} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className={classNames('px-3 py-3  md:px-6 md:py-6', 'bg-white')}></div>
              </div>
            </div>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default SearchModal;
