'use client';

import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef } from 'react';
import Modal from '@marulloc/components-library/Modal';
import { HiXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { throttle } from '@/utils/asyncUtils';
import { usePredictiveSearch } from '@/hooks/usePredictiveSearch';
import { localTheme } from '@/theme/local-theme';
import IconButton from '@/components/IconButton';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import { usePortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry, useGetLocale } from '@/hooks/locale-hooks';
import { RiEmotionSadLine } from 'react-icons/ri';
import Card from '@/components/@common/semantic/Card';
import Box from '@/components/@common/semantic/Box';
import ProductList from '@/components/_draft/ProductList';
import CollectionList from '@/components/_draft/CollectionList';
import Typography from '@/components/_draft/Typography';

const SearchModal = () => {
  const [{ isActive }, { deactivate }] = usePortalRecoil('search-modal');
  const [{ predictiveResult }, handlePredictive] = usePredictiveSearch();
  const [{}, navigateWithQueryParams] = useSyncDataUrl({ keys: ['query'], targetPathname: '/search' });
  const dictionary = useGetDictioanry().search.SearchModal;

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
            className={classNames(' isolate w-full h-full', 'bg-gray-500 bg-opacity-40  ')}
          />
        )}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div
            className={classNames('absolute inset-x-0 top-0 md:top-20  flex justify-center')}
            onClick={() => closeModal()}
          >
            <Card
              as="aside"
              level={0}
              onClick={(e) => e.stopPropagation()}
              className={classNames(
                'h-screen md:h-fit  md:max-h-[calc(100vh-164px)] overflow-hidden',
                'w-full max-w-3xl m-0 md:m-2',
                'flex flex-col divide-y divide-gray-300',
              )}
            >
              <h2 className="sr-only">Search Items</h2>
              <Box
                as="header"
                variant="glassy"
                level={2}
                className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ')}
              >
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
                        className={classNames('h-5 w-5', 'group-hover:scale-110 text-default-accent')}
                        aria-hidden="true"
                      />
                    </div>

                    <input
                      ref={inputRef}
                      onChange={handleChange}
                      id="search"
                      name="search-input"
                      placeholder={dictionary.input.placeholder}
                      type="search"
                      className={classNames(
                        'block w-full',
                        'rounded-lg bg-transparent',
                        'text-xs ',
                        'pl-10 pr-3 py-2',
                        'border',
                        'border-gray-300',
                        'focus-within:ring-0 ring-zinc-400 ring-inset',
                      )}
                    />
                    <span className="sr-only"> {dictionary.input.sr} </span>
                  </div>
                </form>

                <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-gray-300')}>
                  <IconButton
                    className={classNames('text-default-muted hover:text-default-accent ')}
                    onClick={() => closeModal()}
                  >
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{dictionary.closeBtn.sr}</span>
                  </IconButton>
                </div>
              </Box>

              <Box
                as="section"
                variant="glassy"
                level={4}
                className={classNames('flex-1 overflow-y-auto  ', 'px-4 py-4 sm:px-6')}
              >
                <ul className="pt-2 pb-6">
                  <Typography as="h3" size="xs" noWarn className="font-semibold tracking-wider">
                    Collections
                  </Typography>

                  <div className="mt-2">
                    <CollectionList
                      collections={predictiveResult.collections}
                      variant="small"
                      subProps={{ Link: { onClick: closeModal } }}
                    />
                  </div>

                  {predictiveResult.collections.length <= 0 && (
                    <div
                      className={classNames(
                        ' h-28  border border-dashed flex justify-center items-center rounded-lg',
                        'border-gray-300',
                        'bg-opacity-70',
                      )}
                    >
                      <Typography size="md" as="p" color="default-accent" className="flex items-center ">
                        <RiEmotionSadLine className="h-5 w-5 inline mr-2" />
                        {dictionary.noResult.title}
                      </Typography>
                    </div>
                  )}
                </ul>
                <div>
                  <Typography as="h3" size="xs" noWarn className="font-semibold tracking-wider">
                    Products
                  </Typography>

                  <div className="mt-2">
                    <ProductList
                      products={predictiveResult.products}
                      variant="small"
                      subProps={{ Link: { onClick: closeModal } }}
                    />
                  </div>

                  {predictiveResult.products.length <= 0 && (
                    <div
                      className={classNames(
                        ' h-28  border border-dashed flex justify-center items-center rounded-lg',
                        'border-gray-300',
                        'bg-opacity-70',
                      )}
                    >
                      <Typography size="md" as="p" color="default-accent" className="flex items-center ">
                        <RiEmotionSadLine className="h-5 w-5 inline mr-2" />
                        {dictionary.noResult.title}
                      </Typography>
                    </div>
                  )}
                </div>
              </Box>
              <Box as="footer" variant="glassy" level={2} className={classNames('px-3 py-3  md:px-6 md:py-6')}>
                <div className=" text-indigo-600 flex space-x-2 items-center justify-end  text-xs">{/*  */}</div>
              </Box>
            </Card>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default SearchModal;
