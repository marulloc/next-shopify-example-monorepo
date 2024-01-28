'use client';

import ClientCompo from '@/components/ClientCompo';
import { classNames } from '@/styles/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props = {
  images: Product['images'];
};

const getIndex = (arr: Array<any>, searchParams: ReadonlyURLSearchParams) => {
  if (arr.length <= 0) return null;

  const queryIdxStr = searchParams.get('image');
  const queryIdx = Number(queryIdxStr);

  if (queryIdxStr === null || !arr[queryIdx]) return 0;
  else return queryIdx;
};

const ProductGallery = ({ images }: Props) => {
  const searchParams = useSearchParams();
  const [index, setIndex] = useState<number | null>(getIndex(images, searchParams));

  return (
    <>
      {/* Gallery */}
      <div className="aspect-square text-zinc-300 bg-zinc-950 flex flex-col  gap-4 relative">
        {/* Selected Image */}
        <div className="flex-1 flex">
          <div className="flex-1   bg-zinc-800 rounded-lg">
            {index !== null ? (
              <Image
                width={images[index].width}
                height={images[index].height}
                alt={images[index].altText || ''}
                src={images[index].url}
                className=" object-cover"
              />
            ) : (
              <div>No Images</div>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="overflow-scroll absolute bottom-0 p-1 w-full bg-black bg-opacity-25 backdrop-blur-md shadow-2xl   ">
          <ul className="flex justify-center space-x-2">
            {images.map((image, idx) => (
              <li
                key={`product-image-${image.url}`}
                className="h-12 md:h-14 lg:h-20 aspect-square    overflow-hidden"
                onMouseOver={() => setIndex(idx)}
                onMouseOut={() => setIndex(Number(searchParams?.get('image')))}
              >
                <Link
                  href={{
                    query: {
                      ...Array.from(searchParams.entries()).reduce(
                        (result, queryString) => ({ ...result, [queryString[0]]: queryString[1] }),
                        {} as { [key: string]: string },
                      ),

                      image: idx,
                    },
                  }}
                  replace
                  scroll={false}
                >
                  <Image
                    width={image.width}
                    height={image.height}
                    alt={image.altText || ''}
                    src={image.url}
                    className={classNames(
                      'rounded-lg  object-cover shadow-lg h-12 md:h-14 lg:h-20',
                      idx === index ? ' border-2 border-teal-600' : '',
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
