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
  m?: { dir: ThemeSpacingMarginVariants; size: ThemeSpacingMarginSizes };
  p?: { dir: ThemeSpacingPaddingVariants; size: ThemeSpacingPaddingSizes };
  s?: { dir: ThemeSpacingSpaceVariants; size: ThemeSpacingSpaceSizes };
  g?: { dir: ThemeSpacingGapVariants; size: ThemeSpacingGapSizes };
};

type TSemanticBoxFillProps = { fill?: ThemeFillVariants };

type TSemanticBoxProps<T extends React.ElementType = 'div'> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T> &
  TSemanticBoxSpacingProps &
  TSemanticBoxFillProps;

const SemanticBox = ({ as, m, p, s, g, fill, ...rest }: TSemanticBoxProps) => {
  const spacingStyle = classNames(
    p && BOX_SPACING['padding'][p.dir][p.size],
    m && BOX_SPACING['margin'][m.dir][m.size],
    s && BOX_SPACING['space'][s.dir][s.size],
    g && BOX_SPACING['gap'][g.dir][g.size],
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
