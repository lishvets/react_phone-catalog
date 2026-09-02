import phones from '../../assets/images/Phones.png';
import tablets from '../../assets/images/Tablets.png';
import accessories from '../../assets/images/Accessories.png';
import styles from './ShopByCategory.module.scss';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';

export const ShopByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const getModelsCount = (category: 'phones' | 'tablets' | 'accessories') => {
    return products.filter(product => product.category === category).length;
  };

  const categories = [
    {
      title: 'Mobile phones',
      image: phones,
      models: getModelsCount('phones'),
      link: '/phones',
    },
    {
      title: 'Tablets',
      image: tablets,
      models: getModelsCount('tablets'),
      link: '/tablets',
    },
    {
      title: 'Accessories',
      image: accessories,
      models: getModelsCount('accessories'),
      link: '/accessories',
    },
  ];

  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.cards}>
        {categories.map(category => (
          <CategoryCard
            key={category.title}
            image={category.image}
            title={category.title}
            models={category.models}
            link={category.link}
          />
        ))}
      </div>
    </section>
  );
};
