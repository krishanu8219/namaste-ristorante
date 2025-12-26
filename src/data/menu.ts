import { MenuCategory, MenuItem } from '@/types/menu';

// NAMASTE Ristorante Menu Items
// CORSO MONTE CUCCO 26 B, TORINO 10139, Italy
// Tel: +39 011 796579

const menuItems: MenuItem[] = [
  // ================================
  // ANTIPASTI - SNACKS
  // ================================
  {
    id: 'pappadum',
    name: 'Pappadum (2 pezzi)',
    description: 'Sfoglia croccante di farina di legumi.',
    price: 1.50,
    categoryId: 'antipasti',
  },
  {
    id: 'samosa',
    name: 'Samosa',
    description: 'Gustoso involtino ripieni di verdura.',
    price: 2.50,
    categoryId: 'antipasti',
  },
  {
    id: 'chicken-samosa',
    name: 'Chicken Samosa',
    description: 'Gustoso involtino ripieni di pollo.',
    price: 2.50,
    categoryId: 'antipasti',
  },
  {
    id: 'panir-pakora',
    name: 'Panir Pakora',
    description: 'Formaggio fresco speziato fritto in pastella di farina di ceci.',
    price: 3.00,
    categoryId: 'antipasti',
    isTopSeller: true,
  },

  // ================================
  // GRIGLIA - GRILL (Tandoori)
  // ================================
  {
    id: 'tandoori-chicken',
    name: 'Tandoori Chicken',
    description: 'Pollo marinato in yogurt e spezie di colore rosso. È il piatto più famoso della cucina indiana.',
    price: 5.50,
    categoryId: 'griglia',
    isTopSeller: true,
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    description: 'Bocconcini di pollo marinato in yogurt e spezie disossato allo spiedo.',
    price: 6.00,
    categoryId: 'griglia',
  },
  {
    id: 'mint-kebab',
    name: 'Mint Kebab',
    description: 'Bocconcini di pollo marinato in yogurt e menta fresca.',
    price: 6.00,
    categoryId: 'griglia',
  },
  {
    id: 'curry-tikka',
    name: 'Curry Tikka',
    description: 'Bocconcini di pollo disossato marinato in yogurt e gusto di curry.',
    price: 6.00,
    categoryId: 'griglia',
  },

  // ================================
  // POLLO - Chicken Curries
  // ================================
  {
    id: 'chicken-curry',
    name: 'Chicken Curry',
    description: 'Pollo in salsa curry.',
    price: 7.00,
    categoryId: 'pollo',
    isTopSeller: true,
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    description: 'Pollo in salsa di pomodori e panna.',
    price: 7.00,
    categoryId: 'pollo',
    isTopSeller: true,
  },
  {
    id: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala',
    description: 'Bocconcini di pollo in salsa di pomodoro, cipolle, zenzero e coriandolo.',
    price: 7.00,
    categoryId: 'pollo',
    isTopSeller: true,
  },
  {
    id: 'chicken-shahi-korma',
    name: 'Chicken Shahi Korma',
    description: 'Bocconcini di pollo in salsa di panna e anacardi.',
    price: 7.00,
    categoryId: 'pollo',
  },
  {
    id: 'palak-chicken',
    name: 'Palak Chicken',
    description: 'Bocconcini di pollo passati in padella con aglio, zenzero e spinaci con spezie.',
    price: 7.00,
    categoryId: 'pollo',
  },
  {
    id: 'mango-chicken-curry',
    name: 'Mango Chicken Curry',
    description: 'Pollo in latte di cocco e polpa di mango.',
    price: 7.00,
    categoryId: 'pollo',
  },
  {
    id: 'chicken-vindaloo',
    name: 'Chicken Vindaloo',
    description: 'Pollo con patate in salsa saporita.',
    price: 7.00,
    categoryId: 'pollo',
  },

  // ================================
  // AGNELLO - Lamb
  // ================================
  {
    id: 'lamb-curry',
    name: 'Lamb Curry',
    description: 'Agnello in salsa curry.',
    price: 8.00,
    categoryId: 'agnello',
  },
  {
    id: 'mutton-kofta',
    name: 'Mutton Kofta',
    description: 'Polpettine di agnello in salsa curry e yogurt.',
    price: 8.00,
    categoryId: 'agnello',
  },
  {
    id: 'lamb-palak',
    name: 'Lamb Palak',
    description: 'Bocconcini di agnello passati in padella con curry e spinaci.',
    price: 8.00,
    categoryId: 'agnello',
  },
  {
    id: 'lamb-vindaloo',
    name: 'Lamb Vindaloo',
    description: 'Agnello con patate in salsa saporita e piccante.',
    price: 8.00,
    categoryId: 'agnello',
  },

  // ================================
  // GAMBERI - Prawns
  // ================================
  {
    id: 'jhinga-jalfrezi',
    name: 'Jhinga Jalfrezi',
    description: 'Gamberi marinati con aglio e zenzero poi saltato in salsa di cipolle, pomodoro e peperoni.',
    price: 9.00,
    categoryId: 'gamberi',
    isTopSeller: true,
  },
  {
    id: 'coconut-jhinga-curry',
    name: 'Coconut Jhinga Curry',
    description: 'Gamberi in salsa di curry e latte di cocco.',
    price: 9.00,
    categoryId: 'gamberi',
  },

  // ================================
  // VERDURE E LEGUMI - Vegetarian
  // ================================
  {
    id: 'dal',
    name: 'Dal',
    description: 'Lenticchie in salsa cremosa.',
    price: 5.00,
    categoryId: 'verdure',
  },
  {
    id: 'channa',
    name: 'Channa',
    description: 'Ceci in salsa speziata.',
    price: 5.00,
    categoryId: 'verdure',
  },
  {
    id: 'jeera-aloo',
    name: 'Jeera Aloo',
    description: 'Patate saltate con cumino e spezie.',
    price: 5.00,
    categoryId: 'verdure',
  },
  {
    id: 'baigen-bharta',
    name: 'Baigen Bharta',
    description: 'Melanzane cotte con spezie varie.',
    price: 5.00,
    categoryId: 'verdure',
  },
  {
    id: 'mix-vegetable',
    name: 'Mix Vegetable',
    description: 'Misto verdure saltati con cumino, pomodoro, zenzero e spezie.',
    price: 5.00,
    categoryId: 'verdure',
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Formaggio indiano in salsa di pomodoro, burro e cipolla.',
    price: 6.50,
    categoryId: 'verdure',
    isTopSeller: true,
  },
  {
    id: 'vegetable-kofta',
    name: 'Vegetable Kofta',
    description: 'Polpettine di verdura miste in salsa di panna, curry e anacardi.',
    price: 6.00,
    categoryId: 'verdure',
  },
  {
    id: 'palak',
    name: 'Palak',
    description: 'Spinaci cotti con aglio, zenzero e le spezie con scelta di patate o formaggio indiano.',
    price: 6.00,
    categoryId: 'verdure',
  },

  // ================================
  // FOCACCE E PANE INDIANO - Bread
  // ================================
  {
    id: 'chapati',
    name: 'Chapati',
    description: 'Il classico pane indiano di farina integrale.',
    price: 1.50,
    categoryId: 'pane',
  },
  {
    id: 'focaccia-nan',
    name: 'Focaccia Nan',
    description: 'Focaccia tradizionale di farina bianca cotta al forno.',
    price: 1.50,
    categoryId: 'pane',
  },
  {
    id: 'focaccia-cheese-nan',
    name: 'Focaccia Cheese Nan',
    description: 'Focaccia di farina bianca ripiena di formaggio.',
    price: 2.50,
    categoryId: 'pane',
    isTopSeller: true,
  },
  {
    id: 'focaccia-aloo-nan',
    name: 'Focaccia Aloo Nan',
    description: 'Focaccia ripiena di patate e spezie.',
    price: 2.50,
    categoryId: 'pane',
  },
  {
    id: 'focaccia-keema-nan',
    name: 'Focaccia Keema Nan',
    description: 'Focaccia di farina bianca ripiena di pollo.',
    price: 2.50,
    categoryId: 'pane',
  },
  {
    id: 'focaccia-garlic-nan',
    name: 'Focaccia Garlic Nan',
    description: 'Focaccia di farina bianca con aglio fresco.',
    price: 2.50,
    categoryId: 'pane',
  },

  // ================================
  // RISO BASMATI - BIRYANI
  // ================================
  {
    id: 'basmati-chawal',
    name: 'Basmati Chawal',
    description: 'Riso bianco cotto al vapore e profumato con cumino e cardamomo.',
    price: 3.50,
    categoryId: 'riso',
  },
  {
    id: 'vegetable-biryani',
    name: 'Vegetable Biryani',
    description: 'Riso basmati e verdure cotti alle spezie.',
    price: 5.00,
    categoryId: 'riso',
  },
  {
    id: 'chicken-tikka-biryani',
    name: 'Chicken Tikka Biryani',
    description: 'Riso basmati e pollo cotti alle spezie.',
    price: 6.00,
    categoryId: 'riso',
    isTopSeller: true,
  },

  // ================================
  // DOLCI - SWEETS
  // ================================
  {
    id: 'coconut-barfi',
    name: 'Coconut Barfi',
    description: 'Dolce a base di cocco grattugiato, cardamomo e latte.',
    price: 3.00,
    categoryId: 'dolci',
  },
  {
    id: 'ras-malai',
    name: 'Ras Malai',
    description: 'Dolce con latte a base di formaggio indiano con zafferano, cardamomo e pistacchio.',
    price: 4.00,
    categoryId: 'dolci',
    isTopSeller: true,
  },
  {
    id: 'mango-cream',
    name: 'Mango Cream',
    description: 'Budino di mango.',
    price: 4.00,
    categoryId: 'dolci',
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Dolce con sciroppo a base di formaggio fresco e semolino.',
    price: 3.00,
    categoryId: 'dolci',
  },

  // ================================
  // BEVANDE - Drinks
  // ================================
  {
    id: 'acqua',
    name: 'Acqua',
    description: '50cl.',
    price: 1.00,
    categoryId: 'bevande',
  },
  {
    id: 'bibita-lattina',
    name: 'Bibita Lattina',
    description: '33cl.',
    price: 2.00,
    categoryId: 'bevande',
  },
  {
    id: 'lassi',
    name: 'Lassi',
    description: 'Bevanda a base di yogurt con gusto di mango o cardamomo.',
    price: 3.00,
    categoryId: 'bevande',
    isTopSeller: true,
  },
  {
    id: 'succo-mango',
    name: 'Succo di Mango',
    description: '1L.',
    price: 3.50,
    categoryId: 'bevande',
  },

  // ================================
  // BIRRE - Beers
  // ================================
  {
    id: 'kingfisher-33',
    name: 'Kingfisher 33cl',
    description: 'Birra indiana premium.',
    price: 3.00,
    categoryId: 'birre',
  },
  {
    id: 'cobra-33',
    name: 'Cobra 33cl',
    description: 'Birra indiana.',
    price: 3.00,
    categoryId: 'birre',
  },
  {
    id: 'kingfisher-66',
    name: 'Kingfisher 66cl',
    description: 'Birra indiana premium.',
    price: 5.00,
    categoryId: 'birre',
  },
  {
    id: 'cobra-66',
    name: 'Cobra 66cl',
    description: 'Birra indiana.',
    price: 5.00,
    categoryId: 'birre',
  },
  {
    id: 'moretti-66',
    name: 'Moretti 66cl',
    description: 'Birra italiana.',
    price: 3.50,
    categoryId: 'birre',
  },

  // ================================
  // VINI - Wines (Bottiglia 70cl)
  // ================================
  {
    id: 'vino-bianco-kamasutra',
    name: 'Vino Bianco Indiano Kamasutra',
    description: 'Bottiglia 70cl.',
    price: 18.00,
    categoryId: 'vini',
  },
  {
    id: 'vino-rose-kamasutra',
    name: "Vino Rosé Indiano Kamasutra",
    description: 'Bottiglia 70cl.',
    price: 18.00,
    categoryId: 'vini',
  },
  {
    id: 'vino-rosso-kamasutra',
    name: 'Vino Rosso Indiano Kamasutra',
    description: 'Bottiglia 70cl.',
    price: 18.00,
    categoryId: 'vini',
  },
  {
    id: 'roero-arneis',
    name: 'Roero Arneis',
    description: 'Bianco.',
    price: 14.00,
    categoryId: 'vini',
  },
  {
    id: 'nebbiolo',
    name: 'Nebbiolo',
    description: 'Rosso.',
    price: 14.00,
    categoryId: 'vini',
  },
  {
    id: 'dolcetto-alba',
    name: "Dolcetto d'Alba",
    description: 'Rosso.',
    price: 14.00,
    categoryId: 'vini',
  },
];

// Menu categories
export const MENU: MenuCategory[] = [
  {
    id: 'antipasti',
    name: 'Antipasti - Snacks',
    items: menuItems.filter(item => item.categoryId === 'antipasti'),
  },
  {
    id: 'griglia',
    name: 'Griglia - Grill',
    items: menuItems.filter(item => item.categoryId === 'griglia'),
  },
  {
    id: 'pollo',
    name: 'Pollo',
    items: menuItems.filter(item => item.categoryId === 'pollo'),
  },
  {
    id: 'agnello',
    name: 'Agnello',
    items: menuItems.filter(item => item.categoryId === 'agnello'),
  },
  {
    id: 'gamberi',
    name: 'Gamberi',
    items: menuItems.filter(item => item.categoryId === 'gamberi'),
  },
  {
    id: 'verdure',
    name: 'Verdure e Legumi',
    items: menuItems.filter(item => item.categoryId === 'verdure'),
  },
  {
    id: 'pane',
    name: 'Focacce e Pane Indiano',
    items: menuItems.filter(item => item.categoryId === 'pane'),
  },
  {
    id: 'riso',
    name: 'Riso Basmati - Biryani',
    items: menuItems.filter(item => item.categoryId === 'riso'),
  },
  {
    id: 'dolci',
    name: 'Dolci - Sweets',
    items: menuItems.filter(item => item.categoryId === 'dolci'),
  },
  {
    id: 'bevande',
    name: 'Bevande',
    items: menuItems.filter(item => item.categoryId === 'bevande'),
  },
  {
    id: 'birre',
    name: 'Birre',
    items: menuItems.filter(item => item.categoryId === 'birre'),
  },
  {
    id: 'vini',
    name: 'Vini',
    items: menuItems.filter(item => item.categoryId === 'vini'),
  },
];

// Get all items
export function getAllItems(): MenuItem[] {
  return menuItems;
}

// Get top sellers
export function getTopSellers(): MenuItem[] {
  return menuItems.filter(item => item.isTopSeller);
}

// Get item by ID
export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}

// Get items by category
export function getItemsByCategory(categoryId: string): MenuItem[] {
  return menuItems.filter(item => item.categoryId === categoryId);
}