import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FavouritesContext } from '../../components/context/FavouritesContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo-dark.svg';
import menu from '../../assets/icons/menu.svg';
import heart from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart.svg';

export const Header = () => {
  const context = useContext(FavouritesContext);
  const cartContext = useContext(CartContext);

  if (!context) {
    throw new Error('Header must be used inside FavouritesProvider');
  }

  if (!cartContext) {
    throw new Error('Header must be used inside CartProvider');
  }

  const { favourites } = context;
  const { cartItems } = cartContext;

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const isCatalogPage =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(location.search);

      if (searchValue === '') {
        newParams.delete('query');
      } else {
        newParams.set('query', searchValue);
      }

      newParams.delete('page');

      navigate({ pathname: location.pathname, search: newParams.toString() });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, location.pathname, location.search, navigate]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Header must be used inside ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="Nice Gadgets" />
      </NavLink>

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
      {isCatalogPage && (
        <input
          className={styles.search}
          type="search"
          value={searchValue}
          placeholder="Search..."
          onChange={event => {
            setSearchValue(event.target.value);
          }}
        />
      )}
      <div className={styles.allButtons}>
        <button
          type="button"
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className={styles.actions}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.sectionIcon}>
              <img src={heart} alt="Favourites" className={styles.iconImage} />
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
              <img src={cart} alt="Cart" className={styles.iconImage} />
              {totalCartItems > 0 && (
                <span className={styles.counter}>{totalCartItems}</span>
              )}
            </span>
          </NavLink>
        </div>
      </div>

      <NavLink to="/menu" className={styles.menuButton}>
        <img src={menu} alt="Open menu" className={styles.menuIcon} />
      </NavLink>
    </header>
  );
};
