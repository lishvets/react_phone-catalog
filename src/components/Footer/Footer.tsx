import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo-dark.svg';
import arrowTop from '../../assets/icons/arrow-top.svg';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Nice Gadgets" />
        </NavLink>
        <nav>
          <ul className={styles.list}>
            <li>
              <a
                href="https://github.com/lishvets/react_phone-catalog"
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <NavLink to="/contacts" className={styles.link}>
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/rights" className={styles.link}>
                Rights
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className={styles.button}
          onClick={handleScrollToTop}
        >
          <span>Back to top</span>
          <span className={styles.icon}>
            <img src={arrowTop} alt="Back to top" />
          </span>
        </button>
      </div>
    </footer>
  );
};
