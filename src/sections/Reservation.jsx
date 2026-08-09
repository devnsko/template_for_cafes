import { useState } from 'react';
import Reveal from '../components/Reveal';
import { IconClock, IconPhone, IconPin } from '../components/Icons';
import { useRestaurant } from '../context/restaurant';
import './Reservation.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '19:00',
  guests: '2',
  notes: '',
};

/** Local YYYY-MM-DD — `toISOString()` would shift the day in +01/+02 zones. */
function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = 'Podaj imię i nazwisko.';
  if (!EMAIL_RE.test(values.email)) errors.email = 'Podaj poprawny adres email.';
  if (values.phone && values.phone.replace(/\D/g, '').length < 9) {
    errors.phone = 'Numer telefonu wygląda na niepełny.';
  }
  if (!values.date) errors.date = 'Wybierz datę.';
  else if (values.date < todayISO()) errors.date = 'Data nie może być z przeszłości.';
  if (!values.time) errors.time = 'Wybierz godzinę.';
  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.guests = 'Od 1 do 20 osób. Większe grupy prosimy o kontakt telefoniczny.';
  }
  return errors;
}

export default function Reservation() {
  const venue = useRestaurant();
  const { name: venueName, phone, address, hours, reservationEndpoint } = venue;

  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const minDate = todayISO();
  const ajaxEndpoint = reservationEndpoint.replace(
    'https://formsubmit.co/',
    'https://formsubmit.co/ajax/',
  );

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`res-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Rezerwacja — ${venueName}`,
          _template: 'table',
          lokal: venueName,
          ...values,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('sent');
      setValues(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const fieldProps = (field) => ({
    id: `res-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `res-${field}-error` : undefined,
  });

  const renderError = (field) =>
    errors[field] ? (
      <p className="field__error" id={`res-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <section className="reservation section" id="rezerwacja" aria-labelledby="reservation-title">
      <div className="container reservation__grid">
        <Reveal className="reservation__aside">
          <p className="eyebrow">Rezerwacje</p>
          <h2 id="reservation-title" className="section-title">
            Zarezerwuj stolik
          </h2>
          <p className="reservation__lede">
            Potwierdzenie wysyłamy mailem w ciągu godziny. Dla grup powyżej 20 osób i wydarzeń
            prywatnych zadzwoń — ułożymy menu pod Was.
          </p>

          <ul role="list" className="reservation__facts">
            <li>
              <IconClock />
              <span>
                {hours.map((entry) => (
                  <span key={entry.days} className="reservation__hours-row">
                    {entry.days}: {entry.open} – {entry.close}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <IconPhone />
              <a className="link-underline" href={`tel:${phone.replace(/\s/g, '')}`}>
                {phone}
              </a>
            </li>
            <li>
              <IconPin />
              <address>
                {address.street}, {address.postalCode} {address.city}
              </address>
            </li>
          </ul>
        </Reveal>

        <Reveal className="reservation__card panel" delay={80}>
          {status === 'sent' ? (
            <div className="reservation__done" role="status">
              <p className="script reservation__done-title">Dziękujemy!</p>
              <p>
                Prośba o rezerwację dotarła do {venueName}. Potwierdzenie znajdziesz w skrzynce
                mailowej — jeśli sprawa jest pilna, zadzwoń pod {phone}.
              </p>
              <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                Zarezerwuj kolejny stolik
              </button>
            </div>
          ) : (
            <form className="reservation__form" onSubmit={handleSubmit} noValidate>
              <div className="field-grid">
                <p className="field">
                  <label htmlFor="res-name">Imię i nazwisko</label>
                  <input type="text" autoComplete="name" required {...fieldProps('name')} />
                  {renderError('name')}
                </p>

                <p className="field">
                  <label htmlFor="res-email">Email</label>
                  <input type="email" autoComplete="email" required {...fieldProps('email')} />
                  {renderError('email')}
                </p>

                <p className="field">
                  <label htmlFor="res-phone">
                    Telefon <span className="field__optional">opcjonalnie</span>
                  </label>
                  <input type="tel" autoComplete="tel" {...fieldProps('phone')} />
                  {renderError('phone')}
                </p>

                <p className="field">
                  <label htmlFor="res-guests">Liczba gości</label>
                  <input type="number" min="1" max="20" step="1" required {...fieldProps('guests')} />
                  {renderError('guests')}
                </p>

                <p className="field">
                  <label htmlFor="res-date">Data</label>
                  <input type="date" min={minDate} required {...fieldProps('date')} />
                  {renderError('date')}
                </p>

                <p className="field">
                  <label htmlFor="res-time">Godzina</label>
                  <input type="time" required {...fieldProps('time')} />
                  {renderError('time')}
                </p>
              </div>

              <p className="field">
                <label htmlFor="res-notes">
                  Uwagi <span className="field__optional">alergie, okazja, wózek</span>
                </label>
                <textarea rows={3} {...fieldProps('notes')} />
              </p>

              {/* Honeypot: bots fill it in, humans never see it. */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="field__honey"
                aria-hidden="true"
              />

              <div className="reservation__submit">
                <button type="submit" className="btn btn--accent" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Wysyłanie…' : 'Zarezerwuj'}
                </button>
                <p className="reservation__small">
                  Rezerwacja jest bezpłatna i niezobowiązująca.
                </p>
              </div>

              {status === 'error' ? (
                <p className="reservation__alert" role="alert">
                  Nie udało się wysłać formularza. Spróbuj ponownie lub zadzwoń pod{' '}
                  <a className="link-underline" href={`tel:${phone.replace(/\s/g, '')}`}>
                    {phone}
                  </a>
                  .
                </p>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
