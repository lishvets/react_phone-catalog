import styles from './Cart.module.scss';
import arrowLeft from '../../assets/icons/arrow-left.svg';

import { useNavigate } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { saveCartItems } from '../../api/cart';

export const Cart = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Cart must be used inside CartProvider');
  }

  const { cartItems, setCartItems } = context;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClearCart = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      setCartItems([]);
      saveCartItems([]);
    }
  };

  return (
    <div>
      <div className={styles.carts}>
        <button
          type="button"
          className={styles.buttonTop}
          onClick={() => navigate(-1)}
        >
          <span className={styles.icon}>
            <img src={arrowLeft} alt="" className={styles.arrow} />
          </span>
          <span className={styles.text}>Back</span>
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cartItems.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.content}>
              {cartItems.map(item => (
                <CartItem item={item} key={item.itemId} />
              ))}
            </div>
            <div className={styles.summary}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.par}>
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              <div className={styles.divider} />
              <button
                type="button"
                className={styles.checkout}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
