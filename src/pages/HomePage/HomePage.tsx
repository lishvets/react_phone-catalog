import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main>
      <h1 className="visually-hidden">Product Catalog</h1>
      <PicturesSlider />
      <section className={styles.models}>
        <ProductsSlider title="Brand new models" type="new" />
      </section>
      <ShopByCategory />
      <section className={styles.models}>
        <ProductsSlider title="Hot prices" type="hot" />
      </section>
    </main>
  );
};
