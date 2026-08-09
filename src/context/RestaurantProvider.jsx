import { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getVenue } from '../config/site';
import { RestaurantContext } from './restaurant';

/**
 * Resolves the `:id` route param into a venue profile and exposes it to the
 * subtree. Used as a layout route, so it renders an <Outlet /> by default.
 */
export default function RestaurantProvider({ children }) {
  const { id } = useParams();
  const venue = useMemo(() => getVenue(id), [id]);

  return (
    <RestaurantContext.Provider value={venue}>{children ?? <Outlet />}</RestaurantContext.Provider>
  );
}
