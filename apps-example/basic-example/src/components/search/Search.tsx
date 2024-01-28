'use client';

import { classNames } from '@/styles/utils';
import { Modal } from '../@marulloc-compound-components/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ProductPrice from '@/components/ProductPrice';
import { throttle } from '@/components/utils';
import { getPredictiveSearch } from '@/services/search/service';
import { PredictiveSearch } from '@/services/search/type';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ClientCompo from '../ClientCompo';

type Props = {
  Trigger: React.ReactNode;
};
const Search = ({ Trigger }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, closeModal: () => void) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;

    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) {
      newParams.set('query', search.value);
    } else {
      newParams.delete('query');
    }

    const paramsString = newParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
    router.push('/search' + queryString);

    closeModal();
  };

  // Search
  const [predictive, setPredictive] = useState<PredictiveSearch>({ products: [], collections: [] });

  useEffect(() => {
    (async () => {
      const { products, collections } = await getPredictiveSearch('');
      setPredictive({ products, collections });
    })();
  }, []);

  const handlePredictive = throttle(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { products, collections } = await getPredictiveSearch(e.target.value);
    setPredictive({ products, collections });
  }, 500);

  return (
    <Modal
      onOpen={() => {
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 500);
      }}
    >
      <Modal.Trigger>
        {({ openModal }) => (
          <div onClick={() => openModal()}>
            <>{Trigger}</>
          </div>
        )}
      </Modal.Trigger>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div
            className={classNames(
              ' relative p-4 max-w-4xl mx-auto  md:mt-24 h-screen md:h-fit overflow-auto',
              'bg-zinc-900 shadow-lg border rounded-lg border-zinc-500',
            )}
          >
            <form onSubmit={(e) => handleSubmit(e, closeModal)}>
              <div className={classNames('relative group ')}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                  <MagnifyingGlassIcon
                    className={classNames('h-6 w-6', 'text-zinc-300 group-hover:text-zinc-100 ')}
                    aria-hidden="true"
                  />
                </div>

                <input
                  ref={inputRef}
                  onChange={handlePredictive}
                  id="search"
                  name="search-input"
                  placeholder="Search ..."
                  type="search"
                  className={classNames(
                    'h-14 block w-full',
                    'bg-transparent',
                    'border-b border-zinc-700',
                    'text-sm text-zinc-50',
                    'outline-none',
                    'pl-14 pr-3 py-2',
                  )}
                />
              </div>
            </form>
            {/* Result - Collections */}
            <div className="text-zinc-100 p-6">
              <p className="text-xs text-zinc-400">Collections</p>

              <ul className="pt-2 pb-4">
                {predictive.collections.map((collection) => (
                  <li key={`predictive-search-collection-${collection.handle}`} className="py-1">
                    <Link href={collection.handleRoute} onClick={() => closeModal()}>
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result - Products */}
            <div className="text-zinc-300 p-6">
              <p className="text-xs text-zinc-400">Products</p>

              <ul>
                {predictive.products.map((product) => (
                  <li key={`predictive-search-product-${product.handle}`}>
                    <Link href={product.handleRoute} onClick={() => closeModal()}>
                      <div className="flex items-center py-4 space-x-6">
                        <div
                          className={classNames(
                            'py-4 aspect-square h-16 bg-black',
                            'rounded-lg flex justify-center items-center overflow-hidden',
                          )}
                        >
                          <Image
                            src={product.featuredImage?.url || ''}
                            alt={product.featuredImage?.altText || product.title}
                            width={product.featuredImage?.width || 0}
                            height={product.featuredImage?.height || 0}
                            className="h-16 aspect-square object-cover"
                          />
                        </div>

                        <div className="space-y-2">
                          <div>{product.title}</div>
                          <div className="text-sm text-zinc-400">
                            <ProductPrice priceRange={product.priceRange} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-zinc-700 h-14 text-right  text-teal-600 flex space-x-2 items-center justify-end px-6 text-xs">
              <span>Search with filters</span>
              <ArrowRightIcon className="w-3 h-3 " />
              <button onClick={() => closeModal()}>Close</button>
            </div>
          </div>
        )}
      </Modal.Contents>

      <Modal.Backdrop>
        {() => (
          <div className={classNames('w-full h-full', 'dark:bg-black dark:bg-opacity-70 bg-white bg-opacity-50')} />
        )}
      </Modal.Backdrop>
    </Modal>
  );
};

export default Search;
