'use client';

import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Modal from '@marulloc/components-library/Modal';
import { HiOutlineSearch, HiArrowRight, HiOutlineX } from 'react-icons/hi';
import { throttle } from '@/utils/throttle';
import ProductPrice from '../ProductPrice';
import { usePredictiveSearch } from '@/context/search/hooks';

type Props = {
  Trigger: React.ReactNode;
};

const SearchModal = ({ Trigger }: Props) => {
  const [{ status, searchResult }, handlePredictive] = usePredictiveSearch();
  const searchParams = useSearchParams();
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

  return (
    <Modal onOpen={() => setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500)}>
      <Modal.Trigger>
        {({ openModal }) => (
          <div onClick={() => openModal()}>
            <>{Trigger}</>
          </div>
        )}
      </Modal.Trigger>

      <Modal.Backdrop>
        {({}) => <div className={classNames('w-full h-full', '  bg-gray-400  bg-opacity-60 backdrop-blur-sm')}></div>}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div className={classNames('relative mt-8', 'max-w-3xl mx-auto  max-h-[calc(100vh-64px)]')}>
            <div
              className={classNames(
                'rounded-lg bg-gray-100 bg-opacity-90 backdrop-blur-sm',
                'border-r border-gray-200',
                'mx-2 md:mx-4  h-full box-border',
                'overflow-hidden',
              )}
            >
              <div className="flex flex-col h-full w-full ">
                {/* Header */}
                <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
                  <div className="relative w-full ">
                    <form onSubmit={(e) => handleSubmit(e, closeModal)} className="w-full  ">
                      <div className={classNames('relative group w-full')}>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <HiOutlineSearch
                            className={classNames('h-5 w-5', 'text-zinc-300 group-hover:text-zinc-100 ')}
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
                            'rounded-lg',
                            'bg-transparent',
                            'border border-zinc-700',
                            'text-xs text-zinc-500',
                            'outline-none',
                            'pl-10 pr-3 py-2',
                            'focus-within:ring-1 ring-zinc-400 ring-inset',
                          )}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="ml-4 flex items-center">
                    <button
                      type="button"
                      className="relative   p-1 text-gray-400 bg-gray-100 hover:text-gray-500 border rounded-lg border-gray-500"
                      onClick={() => closeModal()}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Main */}
                <div className={classNames('flex-1 overflow-y-auto max-h-[calc(60svh-30px)]', 'px-4 py-4 sm:px-6')}>
                  <ul className="pt-2 pb-4">
                    <div className="text-xs font-semibold leading-6 text-gray-500">Collections</div>
                    {searchResult.collections.map((collection, index) => (
                      <li key={`predictive-search-collection-${collection.handle}`} className="py-1">
                        <Link
                          href={collection.handleRoute}
                          className={classNames(
                            'text-gray-700 hover:text-indigo-600  ',
                            'group flex gap-x-3 rounded-md py-1 text-sm leading-6 font-semibold',
                          )}
                        >
                          {collection.image || index < 3 ? (
                            <Image
                              src={collection.image?.url || `/default/collection-${index + 1}.png`}
                              alt={collection.image?.altText || `default-collection-${index + 1}`}
                              width={collection.image?.width || 1200}
                              height={collection.image?.height || 1200}
                              className={classNames(
                                'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                              )}
                            />
                          ) : (
                            <span
                              className={classNames(
                                'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                              )}
                            >
                              {(collection.title[0] || 'c').toUpperCase()}
                            </span>
                          )}
                          <span className="truncate">{collection.title}</span>
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
                          className={classNames(
                            'group block',
                            'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                          )}
                        >
                          <div className="flex items-center py-2 space-x-6">
                            <div
                              className={classNames(
                                'aspect-square h-14 w-14 bg-gray-400 ',
                                'rounded-lg flex justify-center items-center overflow-hidden',
                                'border group-hover:border-indigo-600 group-hover:text-indigo-600',
                              )}
                            >
                              {product.featuredImage && (
                                <Image
                                  src={product.featuredImage.url || ''}
                                  alt={product.featuredImage.altText || product.title}
                                  width={product.featuredImage.width || 0}
                                  height={product.featuredImage.height || 0}
                                  className="h-14 w-14 object-cover object-center"
                                />
                              )}
                            </div>

                            <div
                              className={classNames(
                                'text-base',
                                'text-gray-600 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              )}
                            >
                              <div>{product.title}</div>
                              <div className={classNames('text-sm')}>
                                <ProductPrice priceRange={product.priceRange} />
                              </div>
                            </div>
                          </div>
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
