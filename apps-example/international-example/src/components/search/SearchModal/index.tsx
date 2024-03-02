'use client';

import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef } from 'react';
import Modal from '@marulloc/components-library/Modal';
import { HiXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { throttle } from '@/utils/asyncUtils';
import { usePredictiveSearch } from '@/hooks/usePredictiveSearch';
import IconButton from '@/components/IconButton';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import { usePortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry, useGetLocale } from '@/hooks/locale-hooks';
import { RiEmotionSadLine } from 'react-icons/ri';
import ProductList from '@/components/_draft/ProductList';
import CollectionList from '@/components/_draft/CollectionList';
import Typography from '@/components/_draft/Typography';
import SemanticBox from '@/components/_draft/SemanticBox';

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
          <SemanticBox
            fill="glassy-backdrop"
            onClick={() => closeModal()}
            className={classNames('isolate w-full h-full')}
          />
        )}
      </Modal.Backdrop>

      <Modal.Contents>
        {({ isOpen, closeModal }) => (
          <div
            className={classNames('absolute inset-x-0 top-0 md:top-20  flex justify-center')}
            onClick={() => closeModal()}
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              className={classNames(
                'h-screen md:h-fit  md:max-h-[calc(100vh-164px)] overflow-hidden',
                'w-full max-w-3xl m-0 md:m-2 md:rounded-lg',
                'flex flex-col divide-y divide-default-base border-0',
              )}
            >
              <h2 className="sr-only">Search Items</h2>
              <SemanticBox
                as="header"
                p={[{ dir: 'xy', size: 'md' }]}
                fill="glassy-default-accent"
                className={classNames('flex items-center justify-between ')}
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
                        'border-default-base  ',
                      )}
                    />
                    <span className="sr-only"> {dictionary.input.sr} </span>
                  </div>
                </form>

                <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-default-base')}>
                  <IconButton
                    className={classNames('text-default-muted hover:text-default-accent ')}
                    onClick={() => closeModal()}
                  >
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{dictionary.closeBtn.sr}</span>
                  </IconButton>
                </div>
              </SemanticBox>

              <SemanticBox
                as="section"
                p={[{ dir: 'xy', size: 'sm' }]}
                fill="glassy-default-base"
                className={classNames('flex-1 overflow-y-auto md:p-4')}
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
                        'border-default-base',
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
                        'border-default-base',
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
              </SemanticBox>

              <SemanticBox
                as="footer"
                fill="glassy-default-accent"
                p={{ dir: 'xy', size: 'sm' }}
                className="md:p-4"
              ></SemanticBox>
            </aside>
          </div>
        )}
      </Modal.Contents>
    </Modal>
  );
};

export default SearchModal;
