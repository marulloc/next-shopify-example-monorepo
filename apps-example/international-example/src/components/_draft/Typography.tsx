import { TYPOGRAPHY_COLOR, TYPOGRAPHY_SIZE, ThemeColorVariants, ThemeSizeVariants } from '@/theme-constant';
import { classNames } from '@marulloc/components-library/utils';

type TAsTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

type TProps<T extends TAsTags = 'span'> = {
  as?: T;
  size?: ThemeSizeVariants;
  responsive?: boolean;
  noWarn?: boolean;
  color?: ThemeColorVariants;
} & React.ComponentPropsWithoutRef<T>;

const Typography = <T extends TAsTags = 'span'>({
  as,
  size,
  responsive = true,
  color,
  noWarn,
  ...jsxProps
}: TProps<T>) => {
  /** Handling Color Style */
  const colorStyle = TYPOGRAPHY_COLOR[color ?? 'default-base'];

  /** Handling Size Style */
  const sizeStyle = TYPOGRAPHY_SIZE[size ?? 'md'][responsive ? 'responsive' : 'fixed'];
  if (size === 'xs' || size === 'sm') {
    if (responsive && !noWarn)
      console.warn(
        '<Typograhpy /> Caution: \n\t' +
          'Using "responsive" mode with "xs" or "sm" sizes may reduce readability.\n\t' +
          'Consider setting "responsive" to false for better text clarity.',
      );
  }

  /** Handling Semantic  */
  const Component = as ?? 'span';
  return (
    <Component {...jsxProps} className={classNames(sizeStyle, colorStyle, jsxProps.className)}>
      {jsxProps.children}
    </Component>
  );
};

export default Typography;
