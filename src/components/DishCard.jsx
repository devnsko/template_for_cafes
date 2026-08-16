import Image from './Image';
import { formatPrice } from '../data/menu';
import './DishCard.css';

/**
 * Shared dish tile used by the landing page picks and the full menu grid.
 */
export default function DishCard({ item, priority = false }) {
  return (
    <article className="dish">
      <div className="dish__media">
        <Image
          src={item.image}
          alt={item.name}
          width={520}
          transformation={[{ width: 640, height: 640, cropMode: 'pad_resize', quality: 75 }]}
          loading={priority ? 'eager' : 'lazy'}
        />
        {item.tags?.length ? (
          <ul role="list" className="dish__tags">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="dish__body">
        <h3 className="dish__name">
          <span>{item.name}</span>
          <span className="dish__leader" aria-hidden="true" />
          <span className="dish__price">{formatPrice(item.price)}</span>
        </h3>
        {item.description ? <p className="dish__desc">{item.description}</p> : null}
      </div>
    </article>
  );
}
