import { useState, useEffect } from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';
import { CARD_GAP, CARD_WIDTH } from '../../utils/constants';
import { Product } from '../../types/Product';
import { getProducts, getSuggestedProducts } from '../../api/api';
import { sortByNewest, sortByDiscount } from '../../utils/productHelpers';

type Props = {
  title: string;
  type: 'new' | 'hot' | 'suggested';
  productId?: string;
};

export const ProductsSlider: React.FC<Props> = ({ title, type, productId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [startIndex, setStartIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let visibleProducts = products;

  useEffect(() => {
    if (type === 'suggested' && productId) {
      getSuggestedProducts(productId).then(setProducts);
    } else {
      getProducts().then(setProducts);
    }
  }, [type, productId]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getCardWidth = () => {
    if (screenWidth < 640) {
      return CARD_WIDTH.mobile;
    }

    if (screenWidth < 1200) {
      return CARD_WIDTH.tablet;
    }

    return CARD_WIDTH.desktop;
  };

  const getVisibleCards = () => {
    if (screenWidth < 640) {
      return 1;
    }

    if (screenWidth < 1200) {
      return 2;
    }

    return 4;
  };

  const maxIndex = Math.max(0, visibleProducts.length - getVisibleCards());

  const handlePrevClick = () => {
    setStartIndex(prevIndex => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex(prevIndex => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const step = getCardWidth() + CARD_GAP;

  if (type === 'new') {
    visibleProducts = sortByNewest(products);
  }

  if (type === 'hot') {
    visibleProducts = sortByDiscount(products);
  }

  return (
    <section className={styles.products}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handlePrevClick}>
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button className={styles.button} onClick={handleNextClick}>
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.sliderWindow}>
        <div
          className={styles.cards}
          style={{
            transform: `translateX(-${startIndex * step}px)`,
          }}
        >
          {visibleProducts.map(product => (
            <div className={styles.cardWrapper} key={product.id}>
              <ProductCard {...product} showFullPrice={type === 'hot'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
