'use client';

import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useRef } from 'react';
import Modal from '@marulloc/components-library/Modal';
import { HiArrowRight, HiXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { throttle } from '@/utils/throttle';
import { usePredictiveSearch } from '@/hooks/usePredictiveSearch';
import IconButton from '../IconButton';
import { localTheme } from '@/theme/local-theme';
import CollectionCard from '../collection/CollectionCard';
import ProductCard from '../product/ProductCard';
import { splitLocale } from '@/utils/locale';
import { usePortalRecoil } from '@/context/ui/portal';

type Props = {
  Trigger?: React.ReactNode;
};

const SearchModal = ({ Trigger }: Props) => {
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const { countryCode: country, languageCode: language } = splitLocale(locale as string);

  const [{ status, searchResult }, handlePredictive] = usePredictiveSearch({ locale: { country, language } });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = throttle(
    async (e: React.ChangeEvent<HTMLInputElement>) => handlePredictive(e.target.value),
    500,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, closeModal: () => void) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;

    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) newParams.set('query', search.value);
    else newParams.delete('query');

    const paramsString = newParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
    router.push('/search' + queryString);

    closeModal();
  };

  const { isActive, deactivate } = usePortalRecoil('search-modal');

  return (
    <Modal
      open={isActive}
      onOpen={() => setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500)}
      onClose={() => deactivate()}
    >
      {/* <Modal.Trigger>
        {({ openModal }) => (
          <div onClick={() => openModal()}>
            <>{Trigger}</>
          </div>
        )}
      </Modal.Trigger> */}

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
                    <form onSubmit={(e) => handleSubmit(e, closeModal)} className="w-full  ">
                      <div className={classNames('relative group w-full')}>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <HiOutlineMagnifyingGlass
                            className={classNames('h-5 w-5', 'group-hover:scale-110', localTheme.text.color.base.muted)}
                            aria-hidden="true"
                          />
                        </div>

                        <input
                          ref={inputRef}
                          onChange={handleSearch}
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
                    {searchResult.collections.map((collection, index) => (
                      <li key={`predictive-search-collection-${collection.handle}`} className="py-1">
                        <Link href={collection.handleRoute} className="block p-1 -mx-1" onClick={() => closeModal()}>
                          <CollectionCard variant="small" collection={collection} index={index} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <div className="text-xs font-semibold leading-6 text-gray-500">Products</div>
                    {searchResult.products.map((product) => (
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
                <div className={classNames('px-3 py-3  md:px-6 md:py-6', 'bg-white')}>
                  <div className=" text-right  text-indigo-600 flex space-x-2 items-center justify-end  text-xs">
                    <span>Search all</span>
                    <HiArrowRight className="w-3 h-3 " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default SearchModal;
