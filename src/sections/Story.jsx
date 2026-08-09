import Image from '../components/Image';
import Reveal from '../components/Reveal';
import { useRestaurant } from '../context/restaurant';
import './Story.css';

const FACTS = [
  { value: '100%', label: 'sezonowych warzyw od lokalnych dostawców' },
  { value: '6', label: 'osób w kuchni, jedna zmiana, żadnych półproduktów' },
  { value: '45', label: 'dni sezonowania wołowiny przed podaniem' },
];

export default function Story() {
  const { since, address } = useRestaurant();

  return (
    <section className="story section" id="historia" aria-labelledby="story-title">
      <div className="container story__grid">
        <Reveal className="story__media story__media--lead">
          <Image
            src="meat2.jpg"
            alt="Danie mięsne przygotowane przez naszą kuchnię"
            width={520}
            transformation={[{ width: 760, quality: 75 }]}
          />
          <span className="story__caption">Kuchnia otwarta, ogień i cierpliwość</span>
        </Reveal>

        <Reveal className="story__body" delay={80}>
          <p className="eyebrow">Od {since} roku</p>
          <h2 id="story-title" className="section-title">
            Nasza pasja mieści się na talerzu
          </h2>
          <p className="story__text">
            Zaczęliśmy od ośmiu stolików przy bocznej ulicy w {address.cityLocative}. Karta zmienia
            się razem z sezonem, bo dobre składniki mają swój kalendarz — i my się do niego
            dostosowujemy, a nie odwrotnie.
          </p>
          <p className="story__text">
            Chleb pieczemy rano, buliony gotujemy przez noc, a listę win układamy tak, by każda
            pozycja pasowała do konkretnego dania. Zostań dla atmosfery — jedzenie to u nas
            opowieść, nie tylko smak.
          </p>

          <dl className="facts">
            {FACTS.map((fact) => (
              <div key={fact.label} className="facts__item">
                <dt className="facts__value">{fact.value}</dt>
                <dd className="facts__label">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="story__media story__media--trail" delay={160}>
          <Image
            src="avokado.jpg"
            alt="Śniadaniowy tost z awokado"
            width={420}
            transformation={[{ width: 620, quality: 75 }]}
          />
          <span className="story__caption">Poranki bez pośpiechu</span>
        </Reveal>
      </div>
    </section>
  );
}
