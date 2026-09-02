import styles from './Favourites.module.scss';
import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavouritesContext } from '../context/FavouritesContext';

export const Favourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('Favourites must be used inside FavouritesProvider');
  }

  const { favourites } = context;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();

      const newProducts = allProducts.filter(product =>
        favourites.includes(product.itemId),
      );

      setProducts(newProducts);
    };

    fetchProducts();
  }, [favourites]);

  return (
    <div className={styles.favourites}>
      <div className={styles.breadcrumbs}>
        <NavLink to="/" className={styles.home}>
          <img src={home} alt="Home" />
        </NavLink>
        <img src={arrowRight} alt="" className={styles.arrow} />
        <span className={styles.current}>Favourites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.subtitle}>
        {products.length} {products.length === 1 ? 'item' : 'items'}
      </p>

      {favourites.length === 0 ? (
        <h2>Your favourites are empty</h2>
      ) : (
        <div className={styles.products}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              fullPrice={product.fullPrice}
              showFullPrice={true}
              itemId={product.itemId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
