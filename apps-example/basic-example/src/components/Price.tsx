import { classNames } from '@/styles/utils';

type Props = {
  currencyCode: string;
  amount: string;
} & Omit<React.ComponentPropsWithoutRef<'p'>, 'children'>;

/**
 * @TODO Discount : Compare Price
 * @param param0
 * @returns
 */
const Price = ({ currencyCode, amount, ...rest }: Props) => {
  if (!currencyCode || !amount) return null;

  return (
    <p suppressHydrationWarning={true} {...rest}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      }).format(parseFloat(amount as string))}`}
      <span className={classNames('ml-2 inline')}>{`${currencyCode}`}</span>
    </p>
  );
};

export default Price;
