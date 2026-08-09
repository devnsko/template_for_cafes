import { lazy, Suspense, useEffect, useState } from 'react';
import BackToTop from '../components/BackToTop';
import DishCard from '../components/DishCard';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import { useRestaurant } from '../context/restaurant';
import { groupedMenu } from '../data/menu';
import './MenuPage.css';

const Footer = lazy(() => import('../components/Footer'));

const SECTIONS = groupedMenu();

/** Highlights the category currently in the middle of the viewport. */
function useActiveCategory() {
  const [active, setActive] = useState(SECTIONS[0]?.id);

  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!targets.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function MenuPage() {
  const venue = useRestaurant();
  const active = useActiveCategory();

  return (
    <>
      <Seo
        title={`Menu — ${venue.name}`}
        description={`Pełna karta ${venue.name}: śniadania, lunch, kolacje, desery i napoje. Ceny aktualne, karta zmienia się z sezonem.`}
        type="article"
      />

      <Header />

      <main id="main" className="menu-page">
        <header className="menu-hero grain">
          <div className="container">
            <p className="eyebrow menu-hero__eyebrow">Karta {new Date().getFullYear()}</p>
            <h1 className="menu-hero__title">
              Menu <span className="script">{venue.name}</span>
            </h1>
            <p className="menu-hero__lede">
              Gotujemy z tego, co akurat jest najlepsze. Karta zmienia się kilka razy w roku, a
              danie dnia — codziennie. Wszystkie ceny w złotych, zawierają VAT.
            </p>
          </div>
        </header>

        <nav className="menu-nav" aria-label="Kategorie menu">
          <div className="container menu-nav__inner">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`menu-nav__link${active === section.id ? ' is-active' : ''}`}
                aria-current={active === section.id ? 'true' : undefined}
              >
                {section.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="container menu-page__body">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="menu-section">
              <Reveal className="menu-section__head">
                <div>
                  <h2 className="menu-section__title">{section.name}</h2>
                  <p className="menu-section__blurb">{section.blurb}</p>
                </div>
                <span className="menu-section__kicker">{section.kicker}</span>
              </Reveal>

              <ul role="list" className="menu-section__grid">
                {section.items.map((item, index) => (
                  <Reveal as="li" key={item.id} delay={Math.min(index, 4) * 60}>
                    <DishCard item={item} />
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}

          <p className="menu-page__note">
            Masz alergię lub dietę eliminacyjną? Powiedz obsłudze — większość dań potrafimy
            dostosować.
          </p>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <BackToTop />
    </>
  );
}
