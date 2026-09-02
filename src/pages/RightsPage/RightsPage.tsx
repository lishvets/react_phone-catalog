import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  return (
    <div className={styles.rights}>
      <h2 className={styles.title}>Copyright & Legal</h2>
      <p className={styles.paragraph}>Copyright © 2026 Lidiia Shvets.</p>
      <p className={styles.paragraph}>
        This project was created for educational purposes.
      </p>
      <p className={styles.paragraph}>
        All product names, logos and trademarks are the property of their
        respective owners.
      </p>
    </div>
  );
};
