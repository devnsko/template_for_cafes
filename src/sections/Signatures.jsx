import { Link } from 'react-router-dom';
import DishCard from '../components/DishCard';
import Reveal from '../components/Reveal';
import { IconArrowRight } from '../components/Icons';
import { useRestaurant } from '../context/restaurant';
import { signatureItems } from '../data/menu';
import './Signatures.css';

const PICKS = signatureItems(6);

export default function Signatures() {
  const { slug } = useRestaurant();

  return (
    <section className="signatures section" id="polecane" aria-labelledby="signatures-title">
      <div className="container">
        <Reveal className="signatures__head">
          <div>
            <p className="eyebrow">Wybór szefa kuchni</p>
            <h2 id="signatures-title" className="section-title">
              Dania, po które wracacie
            </h2>
          </div>
          <p className="signatures__note">
            Sześć pozycji z karty, które najczęściej znikają z talerzy. Reszta czeka w pełnym menu.
          </p>
        </Reveal>

        <ul role="list" className="signatures__grid">
          {PICKS.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 60}>
              <DishCard item={item} priority={index < 3} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="signatures__footer">
          <Link to={`/place/${slug}/menu`} className="btn btn--ghost">
            Zobacz całe menu
            <IconArrowRight width={18} height={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
