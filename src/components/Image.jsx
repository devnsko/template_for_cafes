import { Image as ImageKitImage } from '@imagekit/react';

/**
 * ImageKit-backed <img>. Paths are normalised to the `cafemenu` folder so call
 * sites can pass either `dish.jpg` or `/cafemenu/dish.jpg`.
 * The URL endpoint comes from <ImageKitProvider> mounted in App.
 */
export default function Image({ src, alt = '', folder = 'cafemenu', ...rest }) {
  const clean = String(src).replace(/^\/+/, '');
  const path = clean.startsWith(`${folder}/`) ? clean : `${folder}/${clean}`;

  return <ImageKitImage src={`/${path}`} alt={alt} loading="lazy" decoding="async" {...rest} />;
}
