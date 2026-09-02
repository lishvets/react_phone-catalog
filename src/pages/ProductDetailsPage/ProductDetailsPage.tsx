import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { useEffect, useState } from 'react';
import { getProductDetails, getProducts } from '../../api/api';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';
import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import heart from '../../assets/icons/heart.svg';
import redHeart from '../../assets/icons/redHeart.svg';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { colorsMap } from '../../utils/colorsMap';
import { useFavourite } from '../../hooks/useFavourite';
import { useCart } from '../../hooks/useCart';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { handleAddToCart, isInCart } = useCart();

  const [product, setProduct] = useState<ProductDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isFavourites, handleAddToFavourites } = useFavourite(product?.id);
  const addedToCart = isInCart(product?.id || '');

  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    getProducts()
      .then(allProducts => {
        const catalogProduct = allProducts.find(
          item => item.itemId === productId,
        );

        if (!catalogProduct) {
          throw new Error('Product not found');
        }

        return getProductDetails(catalogProduct.category);
      })
      .then(productFromServer => {
        setProducts(productFromServer);

        const currentProduct = productFromServer.find(
          item => item.id === productId,
        );

        if (!currentProduct) {
          throw new Error('Product details not found');
        }

        setProduct(currentProduct);
      })
      .catch(() => {
        setProduct(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <h1>Product was not found</h1>;
  }

  return (
    <section className={styles.productDetails}>
      <div className={styles.breadcrumbs}>
        <NavLink to="/" className={styles.home}>
          <img src={home} alt="Home" />
        </NavLink>
        <img src={arrowRight} alt="" className={styles.arrow} />
        <NavLink to={`/${product.category}`} className={styles.category}>
          {product.category}
        </NavLink>
        <img src={arrowRight} alt="" className={styles.arrow} />
        <span className={styles.current}>{product.name}</span>
      </div>

      <button
        type="button"
        className={styles.buttonTop}
        onClick={() => navigate(-1)}
      >
        <span className={styles.icon}>
          <img src={arrowLeft} alt="arrow" />
        </span>
        <span className={styles.text}>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>
      <div className={styles.topSection}>
        <div className={styles.imageContainer}>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.slider}>
          <ul className={styles.thumbnailList}>
            {product.images.map((image, index) => (
              <li key={image} className={styles.thumbnail}>
                <button
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={styles.thumbnailButton}
                >
                  <img src={image} alt={product.name} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.info}>
          <div className={styles.colors}>
            <div className={styles.description}>
              <p className={styles.par}>Available colors</p>
              <p className={styles.parId}>ID: 802390</p>
            </div>
            <ul className={styles.colorList}>
              {product.colorsAvailable.map(color => {
                const colorProduct = products.find(
                  item =>
                    item.color === color &&
                    item.capacity === product.capacity &&
                    item.namespaceId === product.namespaceId,
                );

                if (!colorProduct) {
                  return null;
                }

                return (
                  <li key={color} className={styles.colorItem}>
                    <label className={styles.colorLabel}>
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={product.color === color}
                        onChange={() => navigate(`/product/${colorProduct.id}`)}
                        className={styles.radioInput}
                        aria-label={`Select ${color} color`}
                      />

                      <span className={styles.colorLink}>
                        <span
                          className={styles.colorCircle}
                          style={{
                            backgroundColor: colorsMap[color],
                          }}
                        />
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.capacity}>
            <p className={styles.par}>Select capacity</p>
            <ul className={styles.capacityList}>
              {product.capacityAvailable.map(capacity => {
                const capacityProduct = products.find(
                  item =>
                    item.capacity === capacity &&
                    item.color === product.color &&
                    item.namespaceId === product.namespaceId,
                );

                if (!capacityProduct) {
                  return null;
                }

                return (
                  <li key={capacity}>
                    <label className={styles.capacityLabel}>
                      <input
                        type="radio"
                        name="capacity"
                        value={capacity}
                        checked={product.capacity === capacity}
                        onChange={() =>
                          navigate(`/product/${capacityProduct.id}`)
                        }
                        className={styles.radioInput}
                      />

                      <span className={styles.capacityLink}>{capacity}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceContainer}>
            <p className={styles.price}>${product.priceDiscount}</p>
            <p className={styles.fullPrice}>${product.priceRegular}</p>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                handleAddToCart({
                  itemId: product.id,
                  name: product.name,
                  price: product.priceDiscount,
                  quantity: 1,
                  image: product.images[0],
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

          <div className={styles.features}>
            <p className={styles.label}>Screen</p>
            <p className={styles.value}>{product.screen}</p>

            <p className={styles.label}>Resolution</p>
            <p className={styles.value}>{product.resolution}</p>

            <p className={styles.label}>Processor</p>
            <p className={styles.value}>{product.processor}</p>

            <p className={styles.label}>RAM</p>
            <p className={styles.value}>{product.ram}</p>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <h3 className={styles.about}>About</h3>
        <div className={styles.divider} />
        {product.description.map(section => (
          <div className={styles.about} key={section.title}>
            <h2 className={styles.aboutTitle}>{section.title}</h2>
            {section.text.map(item => (
              <p key={item} className={styles.sectionText}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.wrapper}>
        <h3 className={styles.subtitle}>Tech specs</h3>
        <div className={styles.divider} />

        <div className={styles.tech}>
          <p className={styles.label}>Screen</p>
          <p className={styles.value}>{product.screen}</p>

          <p className={styles.label}>Resolution</p>
          <p className={styles.value}>{product.resolution}</p>
          <p className={styles.label}>Processor</p>
          <p className={styles.value}>{product.processor}</p>

          <p className={styles.label}>RAM</p>
          <p className={styles.value}>{product.ram}</p>

          <p className={styles.label}>Built in memory</p>
          <p className={styles.value}>{product.capacity}</p>

          <p className={styles.label}>Camera</p>
          <p className={styles.value}>{product.camera}</p>

          <p className={styles.label}>Zoom</p>
          <p className={styles.value}>{product.zoom}</p>

          <p className={styles.label}>Cell</p>
          <p className={styles.value}>{product.cell.join(', ')}</p>
        </div>
      </div>
      <div className={styles.newModels}>
        <ProductsSlider
          title="You may also like"
          type="suggested"
          productId={product.id}
        />
      </div>
    </section>
  );
};
