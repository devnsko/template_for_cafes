import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ImageKitProvider } from '@imagekit/react';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollManager from './components/ScrollManager';
import Spinner from './components/Spinner';
import RestaurantProvider from './context/RestaurantProvider';
import HomePage from './pages/HomePage';
import { DEFAULT_PLACE, IMAGEKIT_ENDPOINT } from './config/site';

const MenuPage = lazy(() => import('./pages/MenuPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <ImageKitProvider urlEndpoint={IMAGEKIT_ENDPOINT}>
      <a className="skip-link" href="#main">
        Przejdź do treści
      </a>

      <ScrollManager />

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Navigate to={`/place/${DEFAULT_PLACE}`} replace />} />
            <Route element={<RestaurantProvider />}>
              <Route path="/place/:id" element={<HomePage />} />
              <Route path="/place/:id/menu" element={<MenuPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ImageKitProvider>
  );
}
