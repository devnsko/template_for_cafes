import { Component } from 'react';

/**
 * Keeps a rendering error inside one subtree instead of blanking the page.
 * Class component because React still has no hook equivalent.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('Unhandled UI error:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="container section" role="alert">
            <p className="eyebrow">Coś poszło nie tak</p>
            <h2 className="section-title">Nie udało się wyświetlić tej sekcji</h2>
            <p className="lede">Odśwież stronę — jeśli problem wróci, daj nam znać telefonicznie.</p>
            <button type="button" className="btn" onClick={() => window.location.reload()}>
              Odśwież stronę
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
