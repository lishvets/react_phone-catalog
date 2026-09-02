import arrowDown from '../../assets/icons/arrowDown.svg';
import styles from './ProductFilters.module.scss';

type Props = {
  sort: string;
  perPage: string;
  onParamsChange: (name: string, value: string) => void;
};

export const ProductFilters: React.FC<Props> = ({
  sort,
  perPage,
  onParamsChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <p className={styles.filterName}>Sort by</p>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={sort}
            onChange={e => onParamsChange('sort', e.target.value)}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
          <img src={arrowDown} alt="" className={styles.arrow} />
        </div>
      </div>
      <div className={styles.filter}>
        <p className={styles.filterName}>Items on page</p>
        <div className={styles.selectWrapper}>
          <select
            className={styles.selectPage}
            value={perPage}
            onChange={e => onParamsChange('perPage', e.target.value)}
          >
            <option>4</option>
            <option>8</option>
            <option>16</option>
            <option>all</option>
          </select>
          <img src={arrowDown} alt="" className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};
