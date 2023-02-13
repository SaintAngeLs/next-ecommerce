/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'react-multi-carousel/lib/styles.css';

import ImageComponent from '@components/ImageComponent';
import CategoriesSvg from '@store/assets/icons/categories';
import ChevronLeft from '@store/assets/icons/chevron-left';
import ChevronRight from '@store/assets/icons/chevron-right';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { Category } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useContext } from 'react';
import React from 'react';
import Carousel from 'react-multi-carousel';

import ActiveLink from './active-link';

interface props {
  categories: Category[];
  label: string;
}

type NavButtonProps = {
  onClick: Function;
  children: React.ReactNode | undefined;
};

const PrevButton: React.FC<NavButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label="prev-button"
      className="w-40px h-40px rounded-full	flex items-center justify-center bg-white shadow-cart text-gray-900 absolute left-0 -ml-20px focus:outline-none"
    >
      {children}
    </button>
  );
};
const NextButton: React.FC<NavButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label="next-button"
      className="w-40px h-40px rounded-full	flex items-center justify-center bg-white shadow-cart text-gray-900 absolute right-0 -mr-20px focus:outline-none"
    >
      {children}
    </button>
  );
};

type ButtonGroupProps = {
  next?: Function;
  previous?: Function;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous }) => {
  return (
    <div className="absolute top-half w-full -mt-20px">
      <PrevButton onClick={() => previous()}>
        <ChevronLeft />
      </PrevButton>
      <NextButton onClick={() => next()}>
        <ChevronRight />
      </NextButton>
    </div>
  );
};

const CategorySlider = ({ categories, label }: props) => {
  console.log({ categories });
  const { dispatch } = useContext(DrawerContext);

  const showMenu = () => {
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: true
      }
    });
  };

  const responsive = {
    desktopExtraLarge: {
      breakpoint: { max: 3000, min: 1601 },
      items: 10
    },
    desktopLarge: {
      breakpoint: { max: 1600, min: 1281 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 1280, min: 1101 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1100, min: 861 },
      items: 5
    },
    tabletSmall: {
      breakpoint: { max: 860, min: 465 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <div className="w-full">
      <div className="my-5">
        {!isEmpty(categories) && (
          <>
            <div className="flex items-center justify-between">
              <div className="my-8 font-bold text-2xl">{label}</div>
              <div
                onClick={showMenu}
                role="button"
                className=" text-green text-lg flex justify-center items-center mx-1 p-1 px-2 h-full cursor-pointer hover:bg-gray-100"
              >
                <CategoriesSvg />
                <div className="font-semibold px-2">All Categories</div>
              </div>
            </div>
            <div className="relative">
              <Carousel
                responsive={responsive}
                ssr={true}
                slidesToSlide={1}
                infinite={true}
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
                className="flex items-center mt-30px p-1 pt-0 -mx-4 px-10"
              >
                {categories?.map((cate, index) => {
                  return (
                    <ActiveLink key={index} href={`/category/${cate?.name}`}>
                      <a className="relative inline-flex font-bold items-center border border-gray-300 rounded shadow mr-3">
                        <div
                          style={{ background: 'rgba(0,0,0,0.2)' }}
                          className="absolute rounded top-0 left-0 right-0 bottom-0 z-40"
                        ></div>
                        <ImageComponent
                          objectFit="cover"
                          className="rounded"
                          height={200}
                          width={200}
                          src={
                            cate?.image
                              ? `${process.env.S3_ENDPOINT}/${cate?.image}`
                              : '/category-placeholder.jpg'
                          }
                        />
                        <div className="absolute z-50 top-0 px-2 py-1 w-full">
                          <p className="text-2xl text-white">{cate?.name}</p>
                          <p className="italic underline text-white">
                            Shop now
                          </p>
                        </div>
                      </a>
                    </ActiveLink>
                  );
                })}
              </Carousel>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;