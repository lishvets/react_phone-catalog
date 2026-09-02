import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo-dark.svg';
import close from '../../assets/icons/close.svg';
import heart from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart.svg';

import styles from './MobileMenu.module.scss';

import { useContext } from 'react';
import { FavouritesContext } from '../../components/context/FavouritesContext';
import { CartContext } from '../context/CartContext';

export const MobileMenu = () => {
  const context = useContext(FavouritesContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('MobileMenu must be used inside FavouritesProvider');
  }

  if (!cartContext) {
    throw new Error('MobileMenu must be used inside CartProvider');
  }

  const { favourites } = context;
  const { cartItems } = cartContext;
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <aside className={styles.menu}>
      <header className={styles.top}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Nice Gadgets" />
        </NavLink>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => navigate(-1)}
        >
          <img src={close} alt="Close menu" />
        </button>
      </header>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Accessories
        </NavLink>
      </nav>
      <div className={styles.actions}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            `${styles.icon} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.sectionIcon}>
            <img src={heart} alt="Favourites" />
            {favourites.length > 0 && (
              <span className={styles.counter}>{favourites.length}</span>
            )}
          </span>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.icon} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.sectionIcon}>
            <img src={cart} alt="Cart" />
            {totalCartItems > 0 && (
              <span className={styles.counter}>{totalCartItems}</span>
            )}
          </span>
        </NavLink>
      </div>
    </aside>
  );
};
