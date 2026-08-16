import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/restaurant';
import {
  IconArrowRight,
  IconClock,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconTripadvisor,
} from './Icons';
import './Footer.css';

const SOCIAL_ICONS = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  tripadvisor: IconTripadvisor,
};

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    // No mailing-list backend in this template: acknowledge locally instead of
    // pretending to send, so the demo never lies to the visitor.
    setStatus('done');
    setEmail('');
  };

  return (
    <form className="newsletter" onSubmit={handleSubmit}>
      <label className="newsletter__label" htmlFor="newsletter-email">
        Nowa karta i wydarzenia raz w miesiącu.
      </label>
      <div className="newsletter__row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="twoj@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
        />
        <button type="submit" className="btn btn--accent">
          Zapisz się
        </button>
      </div>
      <p className="newsletter__status" role="status">
        {status === 'done' ? 'Dziękujemy! Potwierdzenie poleci na Twój adres.' : ' '}
      </p>
    </form>
  );
}

export default function Footer() {
  const venue = useRestaurant();
  const { slug, name, address, phone, email, hours, socials, map } = venue;

  return (
    <footer id="kontakt" className="site-footer grain">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <p className="script site-footer__name">{name}</p>
          <p className="site-footer__blurb">
            {venue.tagline} w sercu {address.cityGenitive}. Gotujemy od {venue.since} roku.
          </p>
          <ul role="list" className="social">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.id] ?? IconArrowRight;
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className="social__link"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Kontakt</h2>
          <ul role="list" className="contact-list">
            <li>
              <IconPin />
              <address>
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </address>
            </li>
            <li>
              <IconPhone />
              <a className="link-underline" href={`tel:${phone.replace(/\s/g, '')}`}>
                {phone}
              </a>
            </li>
            <li>
              <IconMail />
              <a className="link-underline" href={`mailto:${email}`}>
                {email}
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Godziny otwarcia</h2>
          <ul role="list" className="contact-list">
            {hours.map((entry) => (
              <li key={entry.days}>
                <IconClock />
                <span>
                  {entry.days}
                  <br />
                  <strong>
                    {entry.open} – {entry.close}
                  </strong>
                </span>
              </li>
            ))}
          </ul>
          <p className="site-footer__note">Kuchnia przyjmuje zamówienia do 45 min przed zamknięciem.</p>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Na skróty</h2>
          <ul role="list" className="quick-links">
            <li>
              <Link className="link-underline" to={`/place/${slug}/menu`}>
                Pełne menu
              </Link>
            </li>
            <li>
              <Link className="link-underline" to={`/place/${slug}#rezerwacja`}>
                Rezerwacja stolika
              </Link>
            </li>
            <li>
              <a
                className="link-underline"
                href={map.directions}
                target="_blank"
                rel="noreferrer noopener"
              >
                Dojazd
              </a>
            </li>
          </ul>
          <Newsletter />
        </div>
      </div>

      <div className="container">
        <div className="site-footer__map">
          <iframe
            src={map.embed}
            title={`Mapa dojazdu — ${name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {name}. Wszelkie prawa zastrzeżone.
        </p>
        <p>
          Realizacja:{' '}
          <a
            className="link-underline"
            href="https://github.com/devnsko"
            target="_blank"
            rel="noreferrer noopener"
          >
            devnsko
          </a>
        </p>
      </div>
    </footer>
  );
}
