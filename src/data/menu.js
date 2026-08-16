/**
 * Menu content. `image` paths are relative to the ImageKit `cafemenu` folder,
 * `price` is in PLN. Items flagged `signature` surface on the landing page.
 */

export const CATEGORIES = [
  {
    id: 'sniadanie',
    name: 'Śniadania',
    kicker: 'do 12:00',
    cover: 'slider/breakfast.jpg',
    blurb: 'Powolne poranki, chleb na zakwasie i jajka od zaprzyjaźnionej zagrody.',
  },
  {
    id: 'lunch',
    name: 'Lunch',
    kicker: '12:00 – 16:00',
    cover: 'slider/lunch.jpg',
    blurb: 'Lekkie dania w środku dnia — gotowe w dziesięć minut, pamiętane dłużej.',
  },
  {
    id: 'obiad',
    name: 'Kolacja',
    kicker: 'od 16:00',
    cover: 'slider/dinner.jpg',
    blurb: 'Sedno karty: ryby z porannej dostawy, mięso sezonowane, ogień i cierpliwość.',
  },
  {
    id: 'deser',
    name: 'Desery',
    kicker: 'cały dzień',
    cover: 'slider/dessert.jpg',
    blurb: 'Cukiernia domowa, mniej cukru, więcej owoców.',
  },
  {
    id: 'napoje',
    name: 'Napoje',
    kicker: 'bar',
    cover: 'slider/drinks.jpg',
    blurb: 'Kawa specialty, autorskie lemoniady i krótka, przemyślana karta win.',
  },
];

export const MENU_ITEMS = [
  // — Śniadania —
  {
    id: 'avocado-toast',
    category: 'sniadanie',
    name: 'Tost z awokado',
    description: 'Zakwas, awokado, jajko w koszulce, chili i limonka.',
    price: 16,
    image: 'avokado.jpg',
    tags: ['wege'],
    signature: true,
  },
  {
    id: 'sniadanie-serwowane',
    category: 'sniadanie',
    name: 'Śniadanie serwowane',
    description: 'Jajka z zagrody, pieczywo rzemieślnicze, masło ziołowe, sezonowe dodatki.',
    price: 18,
    image: 'breakfast.jpg',
  },
  {
    id: 'sniadanie-dla-dwojga',
    category: 'sniadanie',
    name: 'Śniadanie dla dwojga',
    description: 'Deska serów i wędlin, konfitura z figi, jogurt z granolą, dzbanek kawy.',
    price: 22,
    image: 'breakfast2.jpg',
  },
  {
    id: 'omlet',
    category: 'sniadanie',
    name: 'Omlet z ziołami',
    description: 'Trzy jajka, szpinak, kozi ser, świeży estragon.',
    price: 15,
    image: 'omlet.jpg',
    tags: ['wege', 'bez glutenu'],
  },
  {
    id: 'miska-owocow',
    category: 'sniadanie',
    name: 'Miska sezonowych owoców',
    description: 'Owoce z targu, miód gryczany, mięta, jogurt typu greckiego.',
    price: 14,
    image: 'fruits2.jpg',
    tags: ['wege', 'bez glutenu'],
  },

  // — Lunch —
  {
    id: 'lunch-dnia',
    category: 'lunch',
    name: 'Lunch dnia',
    description: 'Zupa sezonowa i danie główne — karta zmienia się co tydzień.',
    price: 24,
    image: 'lunch.jpg',
    signature: true,
  },
  {
    id: 'salatka',
    category: 'lunch',
    name: 'Sałatka z pieczonym burakiem',
    description: 'Burak, kozi ser, orzech włoski, dressing z miodu i musztardy.',
    price: 18,
    image: 'salad.jpg',
    tags: ['wege', 'bez glutenu'],
  },
  {
    id: 'taco',
    category: 'lunch',
    name: 'Taco z wolno pieczoną wieprzowiną',
    description: 'Kukurydziane tortille, marynowana czerwona cebula, kolendra, limonka.',
    price: 20,
    image: 'taco.jpg',
    tags: ['ostre'],
  },
  {
    id: 'warzywa-z-pieca',
    category: 'lunch',
    name: 'Warzywa z pieca',
    description: 'Korzeniowe warzywa, tahini, dukkah, świeże zioła.',
    price: 16,
    image: 'vegetables.jpg',
    tags: ['wegańskie'],
  },

  // — Kolacja —
  {
    id: 'dorsz',
    category: 'obiad',
    name: 'Dorsz z masłem klarowanym',
    description: 'Filet z chrupiącą skórą, puree z selera, blanszowany szpinak.',
    price: 36,
    image: 'fish.jpg',
    signature: true,
  },
  {
    id: 'losos',
    category: 'obiad',
    name: 'Łosoś konfitowany',
    description: 'Wolno konfitowany w oliwie, groszek, koperkowy beurre blanc.',
    price: 38,
    image: 'fish2.jpg',
  },
  {
    id: 'ryba-dnia',
    category: 'obiad',
    name: 'Ryba dnia',
    description: 'Z porannej dostawy — pytaj kelnera o dzisiejszy połów.',
    price: 36,
    image: 'fish3.jpg',
  },
  {
    id: 'ryba-w-soli',
    category: 'obiad',
    name: 'Ryba pieczona w soli',
    description: 'Cała ryba dla dwóch osób, cytryna, tymianek, oliwa z pierwszego tłoczenia.',
    price: 42,
    image: 'fish4.jpg',
  },
  {
    id: 'stek',
    category: 'obiad',
    name: 'Stek sezonowany 45 dni',
    description: 'Wołowina z polskich hodowli, masło szalotkowe, ziemniaki z rozmarynem.',
    price: 34,
    image: 'meat2.jpg',
    signature: true,
  },
  {
    id: 'owoce-morza',
    category: 'obiad',
    name: 'Talerz owoców morza',
    description: 'Krewetki, małże, kalmary, sos szafranowy, grzanka czosnkowa.',
    price: 48,
    image: 'seafood.jpg',
  },
  {
    id: 'burger',
    category: 'obiad',
    name: 'Burger bistro',
    description: 'Wołowina 200 g, ser comté, karmelizowana cebula, frytki z rozmarynem.',
    price: 28,
    image: 'burger.jpg',
  },
  {
    id: 'sushi-set',
    category: 'obiad',
    name: 'Zestaw nigiri',
    description: 'Osiem kawałków, ryż na occie ryżowym, świeży wasabi.',
    price: 40,
    image: 'sushi.jpg',
  },
  {
    id: 'sushi-omakase',
    category: 'obiad',
    name: 'Omakase szefa',
    description: 'Dwanaście kawałków w wyborze szefa kuchni. Wymaga rezerwacji.',
    price: 40,
    image: 'sushi2.jpg',
  },
  {
    id: 'sushi-maki',
    category: 'obiad',
    name: 'Maki z łososiem',
    description: 'Osiem kawałków, ogórek, szczypior, sezam.',
    price: 40,
    image: 'sushi3.jpg',
  },

  // — Desery —
  {
    id: 'makaroniki',
    category: 'deser',
    name: 'Makaroniki',
    description: 'Pięć sztuk, smaki zmieniają się codziennie.',
    price: 8,
    image: 'macaruns.jpg',
    tags: ['bez glutenu'],
    signature: true,
  },
  {
    id: 'deser-dnia',
    category: 'deser',
    name: 'Deser dnia',
    description: 'Z naszej cukierni — sezonowe owoce, mniej cukru.',
    price: 16,
    image: 'slider/dessert.jpg',
  },

  // — Napoje —
  {
    id: 'kawa',
    category: 'napoje',
    name: 'Kawa specialty',
    description: 'Espresso, flat white lub przelew — ziarna od lokalnej palarni.',
    price: 10,
    image: 'drink.jpg',
    signature: true,
  },
  {
    id: 'lemoniada',
    category: 'napoje',
    name: 'Lemoniada autorska',
    description: 'Cytrusy, zioła z parapetu, woda gazowana, lód kruszony.',
    price: 12,
    image: 'slider/drinks.jpg',
    tags: ['wegańskie'],
  },
];

const collator = new Intl.Collator('pl');

export function itemsByCategory(categoryId) {
  return MENU_ITEMS.filter((item) => item.category === categoryId).sort((a, b) =>
    collator.compare(a.name, b.name),
  );
}

export function groupedMenu() {
  return CATEGORIES.map((category) => ({
    ...category,
    items: itemsByCategory(category.id),
  })).filter((category) => category.items.length > 0);
}

export function signatureItems(limit = 6) {
  const picked = MENU_ITEMS.filter((item) => item.signature);
  return (picked.length ? picked : MENU_ITEMS).slice(0, limit);
}

export const priceFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 0,
});

export function formatPrice(value) {
  return priceFormatter.format(value);
}
