import { NavLink } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

type CategoryCardProps = {
  image: string;
  title: string;
  models: number;
  link: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  models,
  link,
}) => {
  return (
    <NavLink to={link} className={styles.link}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.models}>{models} models</p>
    </NavLink>
  );
};
