import { IMAGEKIT_ENDPOINT } from '../config/site';

/**
 * Background video. Muted + inline so mobile browsers allow autoplay, and
 * `preload="metadata"` so it never blocks the first paint.
 */
export default function Video({ src, poster, ...rest }) {
  const toUrl = (value) =>
    !value || value.startsWith('http') ? value : `${IMAGEKIT_ENDPOINT}${value}`;

  return (
    <video
      src={toUrl(src)}
      poster={toUrl(poster)}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      {...rest}
    />
  );
}
