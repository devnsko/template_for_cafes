import Reveal from '../components/Reveal';
import Video from '../components/Video';
import './Kitchen.css';

export default function Kitchen() {
  return (
    <section className="kitchen grain" aria-labelledby="kitchen-title">
      <Video
        className="kitchen__video"
        src="/cafemenu/mainpage/kitchen.mp4"
        aria-hidden="true"
      />
      <div className="kitchen__veil" />

      <Reveal className="container kitchen__content">
        <p className="eyebrow kitchen__eyebrow">Za kulisami</p>
        <h2 id="kitchen-title" className="kitchen__title">
          Kuchnia w centrum uwagi
        </h2>
        <p className="kitchen__text">
          Zobacz, jak powstają nasze dania — od porannej dostawy po talerz. Otwarty przepust do
          kuchni to nie dekoracja: chcemy, żebyście widzieli, co robimy z waszym jedzeniem.
        </p>
      </Reveal>
    </section>
  );
}
