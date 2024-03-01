import { classNames } from '@marulloc/components-library/utils';

const STYLE_CONSTANT = {
  normal: ['bg-transparent', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300'],
  glassy: [
    'bg-transparent',
    'bg-white bg-opacity-90 backdrop-blur-sm',
    'bg-white bg-opacity-80 backdrop-blur-sm', //
    'bg-white bg-opacity-70 backdrop-blur-sm',
    'bg-gray-50 bg-opacity-70 backdrop-blur-sm', //
    'bg-gray-100 bg-opacity-70 backdrop-blur-sm',
  ],
} as const;

type TStyleVariant = keyof typeof STYLE_CONSTANT;
type TStyleLevel = 0 | 1 | 2 | 3 | 4 | 5;

type TProps<T extends React.ElementType = 'div'> = {
  as?: T;
  level?: TStyleLevel;
  variant?: TStyleVariant;
} & React.ComponentPropsWithoutRef<T>;

/**
 * @base_style nothing
 * @variant_glassy bg-color(transparent ~ gray ~ white), bg-opacity(70 ~ 90), backdrop-blur-md
 * @variant_normal bg-color(transparent ~ gray ~ white)
 */
const Box = <T extends React.ElementType = 'div'>({ as, variant, level, ...rest }: TProps<T>) => {
  const Component = as ?? 'div';
  return (
    <Component {...rest} className={classNames(STYLE_CONSTANT[variant ?? 'normal'][level ?? 1], rest.className)}>
      {rest.children}
    </Component>
  );
};

export default Box;
