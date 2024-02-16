import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';

type TProps = {
  product: ToolkitProduct;
};

const Description = ({ product }: TProps) => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium)}>
      <p className={classNames(localTheme.text.size.medium, localTheme.spacing.padding.b.small, 'font-bold')}>
        Description
      </p>

      {product.descriptionHtml ? <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div> : <MockUp />}
    </div>
  );
};

export default Description;

const MockUp = () => {
  return (
    <div className={classNames(localTheme.spacing.gap.y)}>
      <h2 className="mb-4 text-2xl font-bold">Details</h2>
      <div className={classNames('rounded-lg p-6 space-y-4 text-base leading-10')}>
        <p>Thanks Images are made by midjourney Description is made by ChatGPT</p>
        <p className=" leading-10">
          {`Discover the epitome of style and vivacity with our exclusive "Colorful Shirts." Dive into a spectrum of
            shades that redefine fashion on our product detail page. These shirts are more than just clothing; they're a
            statement. Immerse yourself in the finest quality fabric, expert craftsmanship, and a burst of colors that
            elevate your fashion game.`}
        </p>
        <p>{`
          
          🌈 Features:

          Premium Quality: Each shirt is crafted from high-grade materials, ensuring durability and comfort.
          Bold Colors: Explore a stunning array of colors that cater to every mood and occasion.
          Tailored Fit: Our shirts are designed to provide a sleek and modern silhouette, flattering all body types.
          Versatility: Perfect for both casual and formal settings, these shirts effortlessly transition from day to night.
          `}</p>
      </div>
    </div>
  );
};
