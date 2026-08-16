import { lazy, Suspense } from 'react';
import Header from '../components/Header';
import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import BackToTop from '../components/BackToTop';
import ErrorBoundary from '../components/ErrorBoundary';
import Hero from '../sections/Hero';
import { useRestaurant } from '../context/restaurant';
import { SITE_URL } from '../config/site';
import { restaurantSchema } from '../config/schema';

// Below-the-fold sections load on demand; the hero ships in the main chunk.
const Story = lazy(() => import('../sections/Story'));
const Kitchen = lazy(() => import('../sections/Kitchen'));
const Signatures = lazy(() => import('../sections/Signatures'));
const Reservation = lazy(() => import('../sections/Reservation'));
const Footer = lazy(() => import('../components/Footer'));

export default function HomePage() {
  const venue = useRestaurant();

  return (
    <>
      <Seo
        title={`${venue.name} — ${venue.tagline} w ${venue.address.cityLocative}`}
        description={`${venue.intro} Rezerwuj stolik online w ${venue.name}.`}
        schema={restaurantSchema(venue, `${SITE_URL}/place/${venue.slug}`)}
      />

      <Header />

      <main id="main">
        <Hero />

        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Story />
            <Kitchen />
            <Signatures />
            <Reservation />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <BackToTop />
    </>
  );
}
