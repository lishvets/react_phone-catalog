import styles from './ContactsPage.module.scss';

export const ContactsPage = () => {
  return (
    <div className={styles.contacts}>
      <h1 className={styles.title}>Contacts</h1>
      <div className={styles.item}>
        <span className={styles.label}>Author:</span>
        <span className={styles.value}>Lidiia Shvets</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Email:</span>
        <a href="mailto:lepoki051003@gmail.com" className={styles.link}>
          lepoki051003@gmail.com
        </a>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>GitHub:</span>
        <a
          href="https://github.com/lishvets"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          github.com/lishvets
        </a>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>LinkedIn:</span>
        <a
          href="https://www.linkedin.com/in/lidiia-shvets-79bb90311/"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          linkedin.com/in/lidiia-shvets-79bb90311
        </a>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Phone</span>
        <a href="tel:+380951868467" className={styles.link}>
          +380 95 186 84 67
        </a>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Phone (ES)</span>
        <a href="tel:+34613455850" className={styles.link}>
          +34 613 45 58 50
        </a>
      </div>
    </div>
  );
};
