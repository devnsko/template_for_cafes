import './Spinner.css';

export default function Spinner({ label = 'Ładowanie…' }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__dot" />
      <span className="spinner__dot" />
      <span className="spinner__dot" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
