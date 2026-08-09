import { createContext, useContext } from 'react';

/** @type {import('react').Context<ReturnType<typeof import('../config/site').getVenue> | null>} */
export const RestaurantContext = createContext(null);

export function useRestaurant() {
  const venue = useContext(RestaurantContext);
  if (!venue) {
    throw new Error('useRestaurant must be used inside <RestaurantProvider>');
  }
  return venue;
}
