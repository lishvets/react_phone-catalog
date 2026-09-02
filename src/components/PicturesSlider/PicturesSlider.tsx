import { useEffect, useState } from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import styles from './PicturesSlider.module.scss';
import slide from '../../assets/images/slider1.png';
import slide1 from '../../assets/images/slider1-tab.png';
import slide2 from '../../assets/images/slider2.png';
import slide3 from '../../assets/images/slider3.png';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const slides = [
  {
    mobile: slide,
    tablet: slide1,
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    buttonText: 'ORDER NOW',
    link: '/phones',
  },
  {
    mobile: slide2,
    tablet: slide2,
    title: 'Discover new technology',
    subtitle: 'Explore our latest tablets',
    buttonText: 'ORDER NOW',
    link: '/tablets',
  },
  {
    mobile: slide3,
    tablet: slide3,
    title: 'Everything you need!',
    subtitle: 'Find the best accessories',
    buttonText: 'ORDER NOW',
    link: '/accessories',
  },
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => {
      if (prevSlide <= 0) {
        return slides.length - 1;
      }

      return prevSlide - 1;
    });
  };

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => {
      if (prevSlide >= slides.length - 1) {
        return 0;
      }

      return prevSlide + 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className={styles.slider}>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.banner}>
        <button
          type="button"
          className={styles.button}
          onClick={handlePrevSlide}
        >
          <img src={arrowLeft} alt="Previous" />
        </button>
        <div className={styles.imageContainer}>
          <div className={styles.slide}>
            <div className={styles.slideContent}>
              <h2 className={styles.slideTitle}>
                {slides[currentSlide].title}
                <span className={styles.emoji}> 👌</span>
              </h2>
              <p className={styles.slidesSubtitle}>
                {slides[currentSlide].subtitle}
              </p>
              <NavLink
                to={slides[currentSlide].link}
                className={styles.slideButton}
              >
                {slides[currentSlide].buttonText}
              </NavLink>
            </div>
            <div className={styles.slideImageWrapper}>
              <picture>
                <source
                  media="(min-width: 640px)"
                  srcSet={slides[currentSlide].tablet}
                />
                <img
                  src={slides[currentSlide].mobile}
                  alt="Banner"
                  className={styles.image}
                />
              </picture>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={handleNextSlide}
        >
          <img src={arrowRight} alt="Next" />
        </button>
      </div>
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={classNames(styles.dot, {
              [styles.active]: index === currentSlide,
            })}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};
