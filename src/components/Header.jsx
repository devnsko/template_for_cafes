import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useRestaurant } from '../context/restaurant';
import { IconClose, IconMenu, IconPhone } from './Icons';
import './Header.css';

export default function Header() {
  const { slug, name, tagline, phone } = useRestaurant();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const panelId = useId();
  const toggleRef = useRef(null);

  // Close the mobile panel whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a visible second paint.
  const [lastRoute, setLastRoute] = useState(location.key);
  if (lastRoute !== location.key) {
    setLastRoute(location.key);
    if (open) setOpen(false);
  }

  // Solid background once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  // `route` links drive the active state; `anchor` links only scroll, so they
  // must never light up just because their pathname matches.
  const links = [
    { to: `/place/${slug}`, label: 'Strona główna', kind: 'route', end: true },
    { to: `/place/${slug}/menu`, label: 'Menu', kind: 'route' },
    { to: `/place/${slug}#historia`, label: 'O nas', kind: 'anchor' },
    { to: `/place/${slug}#kontakt`, label: 'Kontakt', kind: 'anchor' },
  ];

  return (
    <header id="header" className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <NavLink to={`/place/${slug}`} className="brand" aria-label={`${name} — strona główna`}>
          <span className="brand__name script">{name}</span>
          <span className="brand__tagline">{tagline}</span>
        </NavLink>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Zamknij nawigację' : 'Otwórz nawigację'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose width={26} height={26} /> : <IconMenu width={26} height={26} />}
        </button>

        <nav
          id={panelId}
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label="Nawigacja główna"
        >
          <ul role="list" className="site-nav__list">
            {links.map((link) => (
              <li key={link.to}>
                {link.kind === 'route' ? (
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <Link to={link.to} className="site-nav__link">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="site-nav__actions">
            <a className="site-nav__phone" href={`tel:${phone.replace(/\s/g, '')}`}>
              <IconPhone width={17} height={17} />
              <span>{phone}</span>
            </a>
            <Link to={`/place/${slug}#rezerwacja`} className="btn btn--accent">
              Rezerwacja
            </Link>
          </div>
        </nav>
      </div>

      <button
        type="button"
        className={`nav-scrim${open ? ' is-visible' : ''}`}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
