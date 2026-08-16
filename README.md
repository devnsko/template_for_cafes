# Template for cafés

Produkcyjny szablon strony dla restauracji, bistro i kawiarni. Jedna aplikacja obsługuje wiele
lokali — każdy pod własnym adresem `/place/:slug` — z kartą dań, rezerwacją stolika online i
danymi strukturalnymi dla wyszukiwarek.

**Live:** https://template-for-cafes.onrender.com/place/Savieno

> Projekt powstał wspólnie z [Aleksandrem](https://github.com/UkrainianDoomer).
> Repozytorium źródłowe: https://github.com/UkrainianDoomer/template_for_cafes

---

## Co jest w środku

| Obszar | Rozwiązanie |
| --- | --- |
| UI | React 19 (natywne metadane dokumentu, `lazy` + `Suspense`) |
| Routing | React Router 7, multi-tenant przez `/place/:id` |
| Build | Vite 8 (Rolldown), osobny chunk `react` dla długiego cache'u |
| Obrazy | ImageKit — transformacje po stronie CDN, `srcset` z automatu |
| Formularz | Walidacja po stronie klienta + FormSubmit (AJAX), honeypot na boty |
| SEO | Canonical, Open Graph, Twitter Card, JSON-LD `schema.org/Restaurant`, `sitemap.xml`, `robots.txt` |
| Jakość | ESLint 10 (flat config, `react-hooks` 7), GitHub Actions: lint + build |

### Dostępność i wydajność

- pełna obsługa klawiatury (skip link, `aria-expanded`, zamykanie nawigacji Escape'em),
- każda animacja respektuje `prefers-reduced-motion`,
- karuzela hero zatrzymuje się przy hoverze, fokusie i gdy karta przeglądarki jest w tle,
- sekcje poniżej pierwszego ekranu ładują się leniwie; hero jedzie w głównym chunku,
- ikony to inline SVG — zero web fontów ikonowych i zero dodatkowych requestów.

---

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:5173
```

| Skrypt | Opis |
| --- | --- |
| `npm run dev` | serwer deweloperski z HMR |
| `npm run build` | build produkcyjny do `dist/` |
| `npm run preview` | podgląd builda lokalnie |
| `npm start` | podgląd na `0.0.0.0:$PORT` (Render, Railway itp.) |
| `npm run lint` | ESLint |

Wymagany Node ≥ 20.19.

### Zmienne środowiskowe

Skopiuj `.env.example` do `.env` i ustaw `VITE_SITE_URL` na docelową domenę — trafia ona do
linków kanonicznych, Open Graph i danych strukturalnych. Bez niej używany jest
`window.location.origin`.

---

## Struktura

```
src/
├─ config/      site.js (dane lokali), schema.js (JSON-LD)
├─ data/        menu.js — kategorie, dania, ceny, tagi dietetyczne
├─ context/     RestaurantProvider — mapuje :id na profil lokalu
├─ components/  Header, Footer, DishCard, Image, Video, Reveal, Seo, ikony
├─ sections/    Hero, Story, Kitchen, Signatures, Reservation
├─ pages/       HomePage, MenuPage, NotFoundPage
└─ styles/      tokens.css (design tokens), base.css (reset + warstwa wspólna)
```

### Dodanie nowego lokalu

1. Dopisz klucz do `venues` w `src/config/site.js` (nadpisuje wartości domyślne).
2. Wejdź na `/place/<slug>` — nazwa lokalu powstaje ze sluga (`nowa-kawiarnia` → `Nowa Kawiarnia`).

Karta dań, godziny otwarcia, kontakt, mapa i adres formularza rezerwacji siedzą w
`src/config/site.js` oraz `src/data/menu.js` — nic nie jest zaszyte w komponentach.

---

## Design

Kierunek wizualny to „warm editorial”: paleta espresso / kremu / terakoty zamiast czerni i
bieli, szeryfowy Fraunces w nagłówkach, Karla w treści i Allura w logotypie. Wszystkie kolory,
skoki typograficzne, odstępy i cienie są tokenami CSS w `src/styles/tokens.css` — zmiana
palety to edycja jednego pliku.

---

## Wdrożenie

Aplikacja jest statycznym SPA — wymaga przepisania wszystkich ścieżek na `index.html`:

- **Vercel** — `vercel.json` (rewrite + nagłówki cache i bezpieczeństwa),
- **Render / Netlify** — `public/_redirects`,
- dowolny inny host: `npm run build`, serwuj `dist/` z fallbackiem na `index.html`.

## Licencja

MIT
