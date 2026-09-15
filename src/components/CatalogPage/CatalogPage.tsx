import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import home from '../../assets/icons/home.svg';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { Category } from '../../types/CategoryNames';
import { ProductFilters } from '../ProductFilters/ProductFilters';
import { Loader } from '../Loader';
import { emptyMessages } from '../../utils/emptyMessages';
import { searchMessages } from '../../utils/searchMessages';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../../translations/translations';

type Props = {
  title: keyof typeof translations.en;
  category: Category;
};

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  const { t } = useLanguage();

  const loadProducts = () => {
    setIsLoading(true);
    setIsError(false);
    getProducts()
      .then(setProducts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categoryProducts = products.filter(
    product => product.category === category,
  );

  const getSortedProducts = () => {
    const visibleProducts = [...categoryProducts];

    visibleProducts.sort((a, b) => {
      switch (sort) {
        case 'age':
          return b.year - a.year;
        case 'title':
          return a.name.localeCompare(b.name);

        case 'price':
          return a.price - b.price;

        default:
          return 0;
      }
    });

    return visibleProducts;
  };

  const sortedProducts = getSortedProducts();
  const filteredProducts = sortedProducts.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });

  const itemsPerPage =
    perPage === 'all' ? filteredProducts.length : Number(perPage);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(page * itemsPerPage, filteredProducts.length);

  const visibleProducts =
    perPage === 'all'
      ? filteredProducts
      : filteredProducts.slice(startIndex, endIndex);

  const handleParamsChange = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'all' && name === 'perPage') {
      newParams.delete('perPage');
    } else if (value === 'age' && name === 'sort') {
      newParams.delete('sort');
    } else if (name === 'query' && value === '') {
      newParams.delete('query');
    } else if (value === '1' && name === 'page') {
      newParams.delete('page');
    } else {
      newParams.set(name, value);
    }

    if (name !== 'page') {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  function handlePrevPage() {
    if (page > 1) {
      const newPage = page - 1;

      handleParamsChange('page', newPage.toString());
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;

      handleParamsChange('page', newPage.toString());
    }
  };

  const maxVisiblePages = 4;
  let startPage = Math.max(page - Math.floor(maxVisiblePages / 2), 1);

  if (startPage + maxVisiblePages - 1 > totalPages) {
    startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
  }

  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div>
        <p>Something went wrong</p>
        <button type="button" onClick={loadProducts}>
          Reload
        </button>
      </div>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <div>
        <p>{emptyMessages[category]}</p>
      </div>
    );
  }

  if (query && filteredProducts.length === 0) {
    return (
      <div>
        <p>{searchMessages[category]}</p>
      </div>
    );
  }

  return (
    <section className={styles.products}>
      <div className={styles.breadcrumbs}>
        <NavLink to="/" className={styles.home}>
          <img src={home} alt="Home" />
        </NavLink>
        <img src={arrowRight} alt="" className={styles.arrow} />
        <span className={styles.current}>{t(category)}</span>
      </div>
      <div className={styles.pageInfo}>
        <h1 className={styles.title}>{t(title)}</h1>
        <p className={styles.count}>
          {categoryProducts.length} {t('models')}
        </p>
      </div>

      <ProductFilters
        sort={sort}
        perPage={perPage}
        onParamsChange={handleParamsChange}
      />

      <div className={styles.productsGrid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} {...product} showFullPrice={false} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            disabled={page === 1}
            onClick={handlePrevPage}
            className={styles.button}
          >
            <img src={arrowLeft} alt="" />
          </button>
          <ul className={styles.pageButtons}>
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => i + startPage,
            ).map(pageNumber => (
              <li key={pageNumber}>
                <button
                  type="button"
                  className={
                    page === pageNumber ? styles.active : styles.pageButton
                  }
                  onClick={() =>
                    handleParamsChange('page', pageNumber.toString())
                  }
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.button}
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      )}
    </section>
  );
};
