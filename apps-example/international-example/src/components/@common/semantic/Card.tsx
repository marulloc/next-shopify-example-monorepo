import { classNames } from '@marulloc/components-library/utils';

const STYLE_CONSTANT = {
  normal: ['bg-transparent', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300'],
  glassy: [
    'bg-transparent',
    'bg-white bg-opacity-90 backdrop-blur-md',
    'bg-white bg-opacity-80 backdrop-blur-md',
    'bg-white bg-opacity-70 backdrop-blur-md',
    'bg-gray-50 bg-opacity-70 backdrop-blur-md',
    'bg-gray-100 bg-opacity-70 backdrop-blur-md',
  ],
} as const;

type TStyleVariant = keyof typeof STYLE_CONSTANT;
type TStyleLevel = 0 | 1 | 2 | 3 | 4 | 5;

type TProps<T extends React.ElementType = 'article'> = {
  as?: T;
  level?: TStyleLevel;
  variant?: TStyleVariant;
} & React.ComponentPropsWithoutRef<T>;

/**
 * @base_style border border-gray-200 rounded-lg
 * @variant_glassy bg-color(transparent ~ gray ~ white), bg-opacity(70 ~ 90), backdrop-blur-md
 * @variant_normal bg-color(transparent ~ gray ~ white)
 */
const Card = <T extends React.ElementType = 'article'>({ as, variant, level, ...rest }: TProps<T>) => {
  const Component = as ?? 'article';
  return (
    <Component
      {...rest}
      className={classNames(
        'border border-gray-200 rounded-lg',
        STYLE_CONSTANT[variant ?? 'normal'][level ?? 1],
        rest.className,
      )}
    >
      {rest.children}
    </Component>
  );
};

export default Card;
