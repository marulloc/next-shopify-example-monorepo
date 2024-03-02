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
  'primary-muted': classNames('text-primary-muted'),
  'primary-base': classNames('text-primary-base'),
  'primary-accent': classNames('text-primary-accent'),
  'primary-contrast': classNames('text-primary-contrast'),

  'secondary-muted': classNames('text-secondary-muted'),
  'secondary-base': classNames('text-secondary-base'),
  'secondary-accent': classNames('text-secondary-accent'),
  'secondary-contrast': classNames('text-secondary-contrast'),

  'default-muted': classNames('text-default-muted'),
  'default-base': classNames('text-default-base'),
  'default-accent': classNames('text-default-accent'),
  'default-contrast': classNames('text-default-contrast'),
};

export type ThemeSpacingVariants = keyof typeof BOX_SPACING;

export type ThemeSpacingPaddingVariants = keyof (typeof BOX_SPACING)['padding'];
export type ThemeSpacingPaddingSizes = keyof (typeof BOX_SPACING)['padding'][ThemeSpacingPaddingVariants];

export type ThemeSpacingMarginVariants = keyof (typeof BOX_SPACING)['margin'];
export type ThemeSpacingMarginSizes = keyof (typeof BOX_SPACING)['margin'][ThemeSpacingMarginVariants];

export type ThemeSpacingSpaceVariants = keyof (typeof BOX_SPACING)['space'];
export type ThemeSpacingSpaceSizes = keyof (typeof BOX_SPACING)['space'][ThemeSpacingSpaceVariants];

export type ThemeSpacingGapVariants = keyof (typeof BOX_SPACING)['gap'];
export type ThemeSpacingGapSizes = keyof (typeof BOX_SPACING)['gap'][ThemeSpacingGapVariants];

export const BOX_SPACING = {
  padding: {
    xy: {
      xs: classNames('p-1 sm:p-2 md:p-3'),
      sm: classNames('p-2 sm:p-4 md:p-6'),
      md: classNames('p-4 sm:p-6 md:p-8'),
      lg: classNames('p-6 sm:p-8 md:p-10'),
      xl: classNames('p-8 sm:p-10 md:p-12'),
    },
    x: {
      xs: classNames('px-1 sm:px-2 md:px-3'),
      sm: classNames('px-2 sm:px-4 md:px-6'),
      md: classNames('px-4 sm:px-6 md:px-8'),
      lg: classNames('px-6 sm:px-8 md:px-10'),
      xl: classNames('px-8 sm:px-10 md:px-12'),
    },
    y: {
      xs: classNames('py-1 sm:py-2 md:py-3'),
      sm: classNames('py-2 sm:py-4 md:py-6'),
      md: classNames('py-4 sm:py-6 md:py-8'),
      lg: classNames('py-6 sm:py-8 md:py-10'),
      xl: classNames('py-8 sm:py-10 md:py-12'),
    },
    r: {
      xs: classNames('pr-1 sm:pr-2 md:pr-3'),
      sm: classNames('pr-2 sm:pr-4 md:pr-6'),
      md: classNames('pr-4 sm:pr-6 md:pr-8'),
      lg: classNames('pr-6 sm:pr-8 md:pr-10'),
      xl: classNames('pr-8 sm:pr-10 md:pr-12'),
    },
    l: {
      xs: classNames('pl-1 sm:pl-2 md:pl-3'),
      sm: classNames('pl-2 sm:pl-4 md:pl-6'),
      md: classNames('pl-4 sm:pl-6 md:pl-8'),
      lg: classNames('pl-6 sm:pl-8 md:pl-10'),
      xl: classNames('pl-8 sm:pl-10 md:pl-12'),
    },
    t: {
      xs: classNames('pt-1 sm:pt-2 md:pt-3'),
      sm: classNames('pt-2 sm:pt-4 md:pt-6'),
      md: classNames('pt-4 sm:pt-6 md:pt-8'),
      lg: classNames('pt-6 sm:pt-8 md:pt-10'),
      xl: classNames('pt-8 sm:pt-10 md:pt-12'),
    },
    b: {
      xs: classNames('pb-1 sm:pb-2 md:pb-3'),
      sm: classNames('pb-2 sm:pb-4 md:pb-6'),
      md: classNames('pb-4 sm:pb-6 md:pb-8'),
      lg: classNames('pb-6 sm:pb-8 md:pb-10'),
      xl: classNames('pb-8 sm:pb-10 md:pb-12'),
    },
  },

  margin: {
    xy: {
      xs: classNames('m-1 sm:m-2 md:m-3'),
      sm: classNames('m-2 sm:m-4 md:m-6'),
      md: classNames('m-4 sm:m-6 md:m-8'),
      lg: classNames('m-6 sm:m-8 md:m-10'),
      xl: classNames('m-8 sm:m-10 md:m-12'),
    },
    x: {
      xs: classNames('mx-1 sm:mx-2 md:mx-3'),
      sm: classNames('mx-2 sm:mx-4 md:mx-6'),
      md: classNames('mx-4 sm:mx-6 md:mx-8'),
      lg: classNames('mx-6 sm:mx-8 md:mx-10'),
      xl: classNames('mx-8 sm:mx-10 md:mx-12'),
    },
    y: {
      xs: classNames('my-1 sm:my-2 md:my-3'),
      sm: classNames('my-2 sm:my-4 md:my-6'),
      md: classNames('my-4 sm:my-6 md:my-8'),
      lg: classNames('my-6 sm:my-8 md:my-10'),
      xl: classNames('my-8 sm:my-10 md:my-12'),
    },
    r: {
      xs: classNames('mr-1 sm:mr-2 md:mr-3'),
      sm: classNames('mr-2 sm:mr-4 md:mr-6'),
      md: classNames('mr-4 sm:mr-6 md:mr-8'),
      lg: classNames('mr-6 sm:mr-8 md:mr-10'),
      xl: classNames('mr-8 sm:mr-10 md:mr-12'),
    },
    l: {
      xs: classNames('ml-1 sm:ml-2 md:ml-3'),
      sm: classNames('ml-2 sm:ml-4 md:ml-6'),
      md: classNames('ml-4 sm:ml-6 md:ml-8'),
      lg: classNames('ml-6 sm:ml-8 md:ml-10'),
      xl: classNames('ml-8 sm:ml-10 md:ml-12'),
    },
    t: {
      xs: classNames('mt-1 sm:mt-2 md:mt-3'),
      sm: classNames('mt-2 sm:mt-4 md:mt-6'),
      md: classNames('mt-4 sm:mt-6 md:mt-8'),
      lg: classNames('mt-6 sm:mt-8 md:mt-10'),
      xl: classNames('mt-8 sm:mt-10 md:mt-12'),
    },
    b: {
      xs: classNames('mb-1 sm:mb-2 md:mb-3'),
      sm: classNames('mb-2 sm:mb-4 md:mb-6'),
      md: classNames('mb-4 sm:mb-6 md:mb-8'),
      lg: classNames('mb-6 sm:mb-8 md:mb-10'),
      xl: classNames('mb-8 sm:mb-10 md:mb-12'),
    },
  },

  space: {
    x: {
      xs: classNames('space-x-1 sm:space-x-2 md:space-x-3'),
      sm: classNames('space-x-2 sm:space-x-4 md:space-x-6'),
      md: classNames('space-x-4 sm:space-x-6 md:space-x-8'),
      lg: classNames('space-x-6 sm:space-x-8 md:space-x-10'),
      xl: classNames('space-x-8 sm:space-x-10 md:space-x-12'),
    },
    y: {
      xs: classNames('space-y-1 sm:space-y-2 md:space-y-3'),
      sm: classNames('space-y-2 sm:space-y-4 md:space-y-6'),
      md: classNames('space-y-4 sm:space-y-6 md:space-y-8'),
      lg: classNames('space-y-6 sm:space-y-8 md:space-y-10'),
      xl: classNames('space-y-8 sm:space-y-10 md:space-y-12'),
    },
  },

  gap: {
    xy: {
      xs: classNames('gap-1 sm:gap-2 md:gap-3'),
      sm: classNames('gap-2 sm:gap-4 md:gap-6'),
      md: classNames('gap-4 sm:gap-6 md:gap-8'),
      lg: classNames('gap-6 sm:gap-8 md:gap-10'),
      xl: classNames('gap-8 sm:gap-10 md:gap-12'),
    },
    x: {
      xs: classNames('gap-x-1 sm:gap-x-2 md:gap-x-3'),
      sm: classNames('gap-x-2 sm:gap-x-4 md:gap-x-6'),
      md: classNames('gap-x-4 sm:gap-x-6 md:gap-x-8'),
      lg: classNames('gap-x-6 sm:gap-x-8 md:gap-x-10'),
      xl: classNames('gap-x-8 sm:gap-x-10 md:gap-x-12'),
    },
    y: {
      xs: classNames('gap-y-1 sm:gap-y-2 md:gap-y-3'),
      sm: classNames('gap-y-2 sm:gap-y-4 md:gap-y-6'),
      md: classNames('gap-y-4 sm:gap-y-6 md:gap-y-8'),
      lg: classNames('gap-y-6 sm:gap-y-8 md:gap-y-10'),
      xl: classNames('gap-y-8 sm:gap-y-10 md:gap-y-12'),
    },
  },
};

export type ThemeFillVariants = keyof typeof FILL_COLOR;

export const FILL_COLOR = {
  'primary-muted': classNames('bg-primary-muted'),
  'primary-base': classNames('bg-primary-base'),
  'primary-accent': classNames('bg-primary-accent'),
  'primary-contrast': classNames('bg-primary-contrast'),

  'secondary-muted': classNames('bg-secondary-muted'),
  'secondary-base': classNames('bg-secondary-base'),
  'secondary-accent': classNames('bg-secondary-accent'),
  'secondary-contrast': classNames('bg-secondary-contrast'),

  'default-muted': classNames('bg-default-muted'),
  'default-base': classNames('bg-default-base'),
  'default-accent': classNames('bg-default-accent'),
  'default-contrast': classNames('bg-default-contrast'),

  'glassy-default-muted': classNames('isolate bg-default-muted/60 backdrop-blur-sm'),
  'glassy-default-base': classNames('isolate bg-default-base/80 backdrop-blur-sm'),
  'glassy-default-accent': classNames('isolate bg-default-accent/90 backdrop-blur-sm'),
  'glassy-backdrop': classNames('isolate bg-default-contrast/20  '),
};
