import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../config/site';

/**
 * Document metadata. React 19 hoists <title>, <meta> and <link> into <head>
 * on its own, which is why `react-helmet` (unmaintained, and warning-prone
 * under React 18+) was dropped.
 */
export default function Seo({ title, description, image = '/og.png', type = 'website', schema }) {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:locale" content="pl_PL" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {schema ? (
        <script
          type="application/ld+json"
          // Structured data is generated from local config, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
    </>
  );
}
