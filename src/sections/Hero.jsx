import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import { IconArrowDown } from '../components/Icons';
import { useRestaurant } from '../context/restaurant';
import { CATEGORIES } from '../data/menu';
import './Hero.css';

const SLIDE_MS = 6000;

export default function Hero() {
  const { slug, claim, intro, since, address } = useRestaurant();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback((next) => {
    setIndex(((next % CATEGORIES.length) + CATEGORIES.length) % CATEGORIES.length);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced) return undefined;

    timer.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % CATEGORIES.length);
    }, SLIDE_MS);

    return () => window.clearInterval(timer.current);
  }, [paused]);

  // Pause the carousel while the tab is hidden — no work in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(index + 1);
    if (event.key === 'ArrowLeft') go(index - 1);
  };

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__stage" aria-hidden="true">
        {CATEGORIES.map((category, i) => (
          <Image
            key={category.id}
            src={category.cover}
            alt=""
            className={`hero__bg${i === index ? ' is-active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            width={1920}
            transformation={[{ width: 1920, quality: 70 }]}
          />
        ))}
        <div className="hero__veil" />
        <div className="hero__grain grain" />
      </div>

      <div className="hero__inner container">
        <p className="hero__eyebrow">
          <span>Est. {since}</span>
          <span className="hero__dot" />
          <span>{address.city}</span>
        </p>

        <h1 id="hero-title" className="hero__title">
          {claim}
        </h1>

        <p className="hero__intro">{intro}</p>

        <div className="hero__actions">
          <Link to={`/place/${slug}#rezerwacja`} className="btn btn--accent">
            Zarezerwuj stolik
          </Link>
          <Link to={`/place/${slug}/menu`} className="btn btn--on-dark">
            Zobacz menu
          </Link>
        </div>
      </div>

      {/* Category rail doubles as the carousel control. */}
      <div
        className="hero__rail"
        role="tablist"
        aria-label="Karta dnia"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {CATEGORIES.map((category, i) => (
          <Link
            key={category.id}
            to={`/place/${slug}/menu#${category.id}`}
            role="tab"
            aria-selected={i === index}
            className={`hero__rail-item${i === index ? ' is-active' : ''}`}
            onMouseEnter={() => go(i)}
            onFocus={() => go(i)}
          >
            <span className="hero__rail-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="hero__rail-label">{category.name}</span>
            <span className="hero__rail-kicker">{category.kicker}</span>
          </Link>
        ))}
      </div>

      <a className="hero__scroll" href="#historia" aria-label="Przewiń do sekcji o nas">
        <IconArrowDown width={18} height={18} />
      </a>
    </section>
  );
}
