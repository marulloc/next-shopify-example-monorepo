import {
  BOX_SPACING,
  FILL_COLOR,
  ThemeFillVariants,
  ThemeSpacingGapSizes,
  ThemeSpacingGapVariants,
  ThemeSpacingMarginSizes,
  ThemeSpacingMarginVariants,
  ThemeSpacingPaddingSizes,
  ThemeSpacingPaddingVariants,
  ThemeSpacingSpaceSizes,
  ThemeSpacingSpaceVariants,
} from '@/theme-constant';
import { classNames } from '@marulloc/components-library/utils';

type TSemanticBoxSpacingProps = {
  m?:
    | { dir: ThemeSpacingMarginVariants; size: ThemeSpacingMarginSizes }
    | { dir: ThemeSpacingMarginVariants; size: ThemeSpacingMarginSizes }[];
  p?:
    | { dir: ThemeSpacingPaddingVariants; size: ThemeSpacingPaddingSizes }
    | { dir: ThemeSpacingPaddingVariants; size: ThemeSpacingPaddingSizes }[];
  s?:
    | { dir: ThemeSpacingSpaceVariants; size: ThemeSpacingSpaceSizes }
    | { dir: ThemeSpacingSpaceVariants; size: ThemeSpacingSpaceSizes }[];
  g?:
    | { dir: ThemeSpacingGapVariants; size: ThemeSpacingGapSizes }
    | { dir: ThemeSpacingGapVariants; size: ThemeSpacingGapSizes }[];
};

type TSemanticBoxFillProps = { fill?: ThemeFillVariants };

type TSemanticBoxProps<T extends React.ElementType = 'div'> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T> &
  TSemanticBoxSpacingProps &
  TSemanticBoxFillProps;

const SemanticBox = <T extends React.ElementType = 'div'>({ as, m, p, s, g, fill, ...rest }: TSemanticBoxProps<T>) => {
  const spacingStyle = classNames(
    p &&
      (Array.isArray(p)
        ? p.map(({ dir, size }) => BOX_SPACING['padding'][dir][size]).join(' ')
        : BOX_SPACING['padding'][p.dir][p.size]),
    m &&
      (Array.isArray(m)
        ? m.map(({ dir, size }) => BOX_SPACING['padding'][dir][size]).join(' ')
        : BOX_SPACING['padding'][m.dir][m.size]),
    s &&
      (Array.isArray(s)
        ? s.map(({ dir, size }) => BOX_SPACING['padding'][dir][size]).join(' ')
        : BOX_SPACING['padding'][s.dir][s.size]),
    g &&
      (Array.isArray(g)
        ? g.map(({ dir, size }) => BOX_SPACING['padding'][dir][size]).join(' ')
        : BOX_SPACING['padding'][g.dir][g.size]),
  );

  const fillStyle = classNames(fill && FILL_COLOR[fill]);

  const Component = as ?? 'div';
  return (
    <Component {...rest} className={classNames(spacingStyle, fillStyle, rest.className, ' ring-pro')}>
      {rest.children}
    </Component>
  );
};

export default SemanticBox;
