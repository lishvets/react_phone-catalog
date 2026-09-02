import React from 'react';
import heart from '../../assets/icons/heart.svg';
import redHeart from '../../assets/icons/redHeart.svg';
import styles from './ProductCard.module.scss';
import { NavLink } from 'react-router-dom';
import { useFavourite } from '../../hooks/useFavourite';
import { useCart } from '../../hooks/useCart';

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
  fullPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
  showFullPrice: boolean;
  itemId: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  screen,
  capacity,
  ram,
  fullPrice,
  showFullPrice,
  itemId,
}) => {
  const { isFavourites, handleAddToFavourites } = useFavourite(itemId);
  const { handleAddToCart, isInCart } = useCart();
  const addedToCart = isInCart(itemId);

  return (
    <div className={styles.card}>
      <NavLink to={`/product/${itemId}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} />
        </div>
      </NavLink>
      <NavLink to={`/product/${itemId}`} className={styles.titleLink}>
        <h3 className={styles.title}>{name}</h3>
      </NavLink>

      <div className={styles.priceContainer}>
        <p className={styles.price}>${price}</p>
        {showFullPrice && fullPrice && (
          <p className={styles.fullPrice}>${fullPrice}</p>
        )}
      </div>
      <div className={styles.divider}></div>

      <div className={styles.features}>
        <p className={styles.label}>Screen</p>
        <p className={styles.value}>{screen}</p>

        <p className={styles.label}>Capacity</p>
        <p className={styles.value}>{capacity}</p>

        <p className={styles.label}>RAM</p>
        <p className={styles.value}>{ram}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            handleAddToCart({
              itemId,
              image,
              name,
              price,
              quantity: 1,
            })
          }
        >
          {addedToCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={styles.favouriteButton}
          onClick={handleAddToFavourites}
        >
          {isFavourites ? (
            <img
              src={redHeart}
              alt="Favourites"
              className={styles.favouriteIcon}
            />
          ) : (
            <img src={heart} alt="Favourites" />
          )}
        </button>
      </div>
    </div>
  );
};
