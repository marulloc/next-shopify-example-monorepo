import { classNames } from '@marulloc/components-library/utils';

const TYPOGRAPHY_SIZE = {
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

type TTypograhpySizeVariants = keyof typeof TYPOGRAPHY_SIZE;
type TTypographySizeProps = {
  size?: TTypograhpySizeVariants;
  responsive?: boolean;
  noWarn?: boolean;
};

const TYPOGRAPHY_COLOR = {
  primary: {
    muted: classNames('text-indigo-500'),
    base: classNames('text-indigo-700'),
    accent: classNames('text-indigo-900'),
  },

  secondary: {
    muted: classNames('text-rose-500'),
    base: classNames('text-rose-700'),
    accent: classNames('text-rose-900'),
  },

  default: {
    muted: classNames('text-gray-500'),
    base: classNames('text-gray-700'),
    accent: classNames('text-gray-900'),
  },
};

type TTypograhpyColorVariants = keyof typeof TYPOGRAPHY_COLOR;
type TTypograhpyColorWeightVariants = keyof (typeof TYPOGRAPHY_COLOR)[TTypograhpyColorVariants];
type TTypograhpyColorProps = {
  color?: TTypograhpyColorVariants;
  colorWeight?: TTypograhpyColorWeightVariants;
};

type TTypograhpyTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

type TTypograhpyProps<T extends TTypograhpyTags = 'span'> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T> &
  TTypograhpyColorProps &
  TTypographySizeProps;

export const Typography = <T extends TTypograhpyTags = 'span'>({
  as,
  size = 'md',
  responsive = true,
  noWarn = false,
  color = 'default',
  colorWeight = 'base',
  ...jsxProps
}: TTypograhpyProps<T>) => {
  /** Handling Size Style */
  const sizeStyle = TYPOGRAPHY_SIZE[size][responsive ? 'responsive' : 'fixed'];
  if (size === 'xs' || size === 'sm') {
    if (responsive && !noWarn)
      console.warn(
        '<Typograhpy /> Caution: \n\t' +
          'Using "responsive" mode with "xs" or "sm" sizes may reduce readability.\n\t' +
          'Consider setting "responsive" to false for better text clarity.',
      );
  }

  /** Handling Color Style */
  const colorStyle = TYPOGRAPHY_COLOR[color][colorWeight];

  /** Handling Semantic  */
  const Component = as ?? 'span';
  return (
    <Component {...jsxProps} className={classNames(sizeStyle, colorStyle, jsxProps.className)}>
      {jsxProps.children}
    </Component>
  );
};

export default Typography;
