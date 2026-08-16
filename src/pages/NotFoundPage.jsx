import { Link } from 'react-router-dom';
import { DEFAULT_PLACE } from '../config/site';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <>
      <title>404 — nie znaleziono strony</title>
      <meta name="robots" content="noindex" />

      <main className="notfound grain">
        <div className="container notfound__inner">
          <p className="notfound__code">404</p>
          <h1 className="notfound__title">Ta strona zniknęła z karty</h1>
          <p className="notfound__text">
            Adres, który otworzyłeś, nie istnieje albo został zmieniony. Wróć na stronę główną —
            tam wszystko jest na swoim miejscu.
          </p>
          <div className="notfound__actions">
            <Link to={`/place/${DEFAULT_PLACE}`} className="btn btn--accent">
              Strona główna
            </Link>
            <Link to={`/place/${DEFAULT_PLACE}/menu`} className="btn btn--on-dark">
              Zobacz menu
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
