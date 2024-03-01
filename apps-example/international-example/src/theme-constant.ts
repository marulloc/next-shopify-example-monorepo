import { classNames } from '@marulloc/components-library/utils';

export type ThemeSizeVariants = keyof typeof TYPOGRAPHY_SIZE;
export type ThemeColorVariants = keyof typeof TYPOGRAPHY_COLOR;

export const TYPOGRAPHY_SIZE = {
  xs: {
    fixed: classNames('text-xs'),
    responsive: classNames('text-xs sm:text-xs md:text-xs text-opacity-70 sm:text-opacity-85 md:text-opacity-100'),
  },

  sm: {
    fixed: classNames('text-sm'),
    responsive: classNames('text-xs sm:text-xs md:text-sm  text-opacity-85 sm:text-opacity-100'),
  },

  md: {
    fixed: classNames('text-base'),
    responsive: classNames('text-xs sm:text-sm md:text-base'),
  },

  lg: {
    fixed: classNames('text-lg'),
    responsive: classNames('text-sm sm:text-md md:text-lg'),
  },

  xl: {
    fixed: classNames('text-xl'),
    responsive: classNames('text-base sm:text-lg md:text-xl'),
  },

  '2xl': {
    fixed: classNames('text-2xl '),
    responsive: classNames('text-lg sm:text-xl md:text-2xl'),
  },

  '3xl': {
    fixed: classNames('text-3xl'),
    responsive: classNames('text-xl sm:text-2xl md:text-3xl'),
  },

  '4xl': {
    fixed: classNames('text-4xl'),
    responsive: classNames('text-2xl sm:text-3xl md:text-4xl'),
  },
};

export const TYPOGRAPHY_COLOR = {
  'primary-muted': classNames('text-indigo-400'),
  'primary-base': classNames('text-indigo-600'),
  'primary-accent': classNames('text-indigo-800'),
  'primary-contrast': classNames('text-gray-50'),
  'secondary-muted': classNames('text-rose-400'),
  'secondary-base': classNames('text-rose-600'),
  'secondary-accent': classNames('text-rose-800'),
  'secondary-contrast': classNames('text-gray-50'),
  'default-muted': classNames('text-gray-500'),
  'default-base': classNames('text-gray-700'),
  'default-accent': classNames('text-gray-900'),
  'default-contrast': classNames('text-gray-50'),
};

export const SPACING = {};
