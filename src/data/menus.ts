import type { AssetId } from "./assets";

/**
 * MENUS
 * Dish names, descriptions and prices are transcribed from the official
 * PDF menus published on kahanilondon.com (October 2026 editions).
 * Never add dishes that are not in an official document.
 * The PDF remains the source of truth and is always linked.
 */

const PDF = "https://www.kahanilondon.com/wp-content/uploads";

export interface Dish {
  name: string;
  description?: string;
  price?: string;
  pairing?: string;
}

export interface MenuSection {
  title: string;
  note?: string;
  dishes: Dish[];
}

export interface Menu {
  slug: string;
  title: string;
  kind: "food" | "drinks" | "seasonal";
  summary: string;
  pdf: string;
  image: AssetId;
  meta?: string;
  sections?: MenuSection[];
  /** Seasonal menus are shown only inside this window (ISO dates, inclusive). */
  available?: { from: string; until: string };
  footnote?: string;
}

const SERVICE = "A 13% discretionary service charge will be added to your bill. For any dietary requirements please speak to your waiter.";

export const menus: Menu[] = [
  {
    slug: "a-la-carte",
    title: "À la carte",
    kind: "food",
    summary: "Small plates, the Kahani Klaasik grill and tandoor, curries, biryani and accompaniments.",
    pdf: `${PDF}/2026/10/A-La-Carte-menu-.pdf`,
    image: "broccoli",
    footnote: SERVICE,
    sections: [
      {
        title: "Small plates",
        dishes: [
          { name: "Smoked octopus & grilled scallop salad", description: "Turmeric, ginger, cucumber, radish & grapefruit", price: "16" },
          { name: "Amritsari soft-shell crab", description: "Delicately spiced with ajwain; avocado, mint chutney", price: "14" },
          { name: "Kolkata beetroot cake", description: "Ginger, fennel & royal cumin; kasundi mustard kadi sauce", price: "12" },
          { name: "Ruby papdi chaat", description: "Spiced chickpeas, sweetened yoghurt, wild berry & tamarind chutney", price: "14" },
          { name: "Pani puri", description: "Spiced black chickpeas & shallots, pomegranate & cranberry juice in crispy hollow puri", price: "12" },
          { name: "Bhindi kurkure", description: "Delicately spiced crispy okra", price: "10" },
          { name: "Venison keema chukka", description: "Slow cooked & tossed with tomato, garlic and curry leaves; cumin pav", price: "16" },
        ],
      },
      {
        title: "Kahani Klaasik · Veg & seafood",
        dishes: [
          { name: "Tandoori broccoli", description: "Nigella seeds & honey, crushed wheat crisps with tempered turmeric yoghurt", price: "18" },
          { name: "Grilled artichoke hearts & seasonal vegetable kofta", description: "Mughlai pine nut & mace korma", price: "18" },
          { name: "Angara paneer tikka", description: "Peppers, Kashmiri chilli, ginger & royal cumin; mint chutney", price: "13 / 26" },
          { name: "Smoked Malabar prawns", description: "Fresh turmeric, coconut, curry leaves; tapioca mash", price: "22 / 42" },
          { name: "Hariyali machhi (monkfish)", description: "Fresh greens, roasted cumin & browned garlic; lemon quinoa", price: "18 / 36" },
        ],
      },
      {
        title: "Kahani Klaasik · Meat & game",
        dishes: [
          { name: "Duo of chicken tikka", description: "Tandoori chicken, cardamom malai & Rajasthani achari; fresh salad", price: "11 / 22" },
          { name: "Tandoori chicken (half)", description: "Classic marinade, Punjabi red & Bengali yellow chilli", price: "18" },
          { name: "Lamb seekh kebab", description: "Water chestnut, ginger & coriander; bhurani raita", price: "14 / 28" },
          { name: "Tandoori Nawabi lamb chops", description: "Chargrilled with saffron yoghurt, nutmeg & black cardamom; mint yoghurt", price: "22 / 42" },
          { name: "Lucknowi guinea fowl supreme", description: "Celery, cashew nuts, cumin & baby ginger; amla murabba", price: "14 / 26" },
        ],
      },
      {
        title: "Curry & biryani",
        dishes: [
          { name: "Chicken makhani", description: "Chargrilled chicken in a creamed tomato sauce with fenugreek leaves", price: "28" },
          { name: "Hyderabadi biryani", description: "Braised basmati rice with exotic spices, mint, coriander (lamb, prawn or veg)", price: "32 / 28 / 26" },
          { name: "Kottayam fish curry", description: "Stone bass, turmeric, coconut & Kerala tamarind", price: "28" },
          { name: "Kori gassi", description: "Mangalorean chicken curry, byadagi chilli & freshly ground spices", price: "28" },
          { name: "Calicut lobster masala", description: "Galangal, red chilli, lime leaves & jaggery", price: "34" },
          { name: "Lahori nihari", description: "Lamb shank slow cooked with yoghurt, chilli & nihari masala", price: "32" },
          { name: "Prawn vepudu", description: "Tossed with shallots, green chilli, ginger & Andhra spices", price: "28" },
          { name: "Lasooni saag paneer", description: "Cottage cheese, onion, tomato, garlic & spinach", price: "20" },
          { name: "Afghani bhunao lamb", description: "Tender lamb with browned shallots & black cardamom", price: "30" },
          { name: "Methi malai gucchi & green peas", description: "Pine nut korma sauce", price: "22" },
        ],
      },
      {
        title: "Accompaniments",
        dishes: [
          { name: "Kalonji baingan", price: "11" },
          { name: "Achari aloo gobi", price: "11" },
          { name: "Kahani duo dal", description: "Yellow and black lentils", price: "10" },
          { name: "Naan / Tandoori roti", price: "4" },
          { name: "Garlic naan / Cheese chilli naan", price: "5" },
          { name: "Bread basket", description: "Choice of any three breads", price: "12" },
          { name: "Pulao rice", price: "5" },
          { name: "Assorted poppadums & chutneys", price: "8" },
          { name: "Kahani pickles", price: "5" },
          { name: "Cucumber & mint raita", price: "4" },
        ],
      },
    ],
  },
  {
    slug: "tasting",
    title: "Tasting menu",
    kind: "food",
    summary: "Six courses with an optional wine pairing. Vegetarian version available.",
    meta: "6 courses · £80 pp · wine pairing £75 pp",
    pdf: `${PDF}/2026/10/Tasting-menu.pdf`,
    image: "prawns",
    footnote: SERVICE,
    sections: [
      {
        title: "Tasting menu",
        note: "6 courses £80 pp · Wine pairing £75 pp",
        dishes: [
          { name: "Kolkata beetroot cake", description: "Ginger, fennel & royal cumin; kasundi mustard kadi sauce", pairing: "2022 Jean Becker, Pinot Gris, Alsace" },
          { name: "Smoked octopus & grilled scallop salad", description: "Turmeric, ginger, cucumber, radish & grapefruit", pairing: "2024 Kilikanoon “Mort's Block” Riesling, Clare Valley" },
          { name: "Smoked Malabar prawns", description: "Fresh turmeric, coconut, curry leaves; tapioca mash", pairing: "2020 Tapanappa “Tiers” Chardonnay, Piccadilly Valley" },
          { name: "Lucknowi guinea fowl supreme", description: "Celery, cashew nuts, cumin & baby ginger; amla murabba", pairing: "2018 Domaine Chanson, Pernand-Vergelesses 1er Cru Pinot Noir" },
          { name: "Sorbet" },
          { name: "Tandoori Nawabi lamb chops", description: "Chargrilled with saffron yoghurt, nutmeg & black cardamom; mint yoghurt. Served with saag aloo and naan", pairing: "2018 Klein Constantia Anwilka, Stellenbosch" },
          { name: "Mango mousse", description: "Masala tea ice cream & vanilla tuile", pairing: "2018 Little Beauty, Gewurztraminer, Marlborough" },
        ],
      },
      {
        title: "Tasting menu (V)",
        note: "6 courses £75 pp · Wine pairing £75 pp",
        dishes: [
          { name: "Kolkata beetroot cake", description: "Ginger, fennel & royal cumin; kasundi mustard kadi sauce" },
          { name: "Green apple & bitter gourd salad", description: "Dill leaf dressing, mixed leaves, toasted sunflower and pumpkin seeds" },
          { name: "Tandoori broccoli", description: "Nigella seeds & honey, crushed wheat crisps with tempered garlic yoghurt" },
          { name: "Angara paneer tikka", description: "Peppers, Kashmiri chilli, ginger & royal cumin; mint chutney" },
          { name: "Sorbet" },
          { name: "Grilled artichoke hearts, vegetable kofta", description: "Mughlai melon seed korma. Served with saag aloo and roti" },
          { name: "Pandan rice kheer", description: "Wild berry compote" },
        ],
      },
    ],
  },
  {
    slug: "dawat",
    title: "Dawat menu",
    kind: "food",
    summary: "A four-course feast designed to be shared by the whole table.",
    meta: "4 courses · £65 pp (V £60) · wine pairing £50 pp",
    pdf: `${PDF}/2026/10/Dawat-menu.pdf`,
    image: "tikkaPlatter",
    footnote: "Dawat menu is designed to be enjoyed by the whole table only. " + SERVICE,
    sections: [
      {
        title: "Dawat",
        note: "4 courses £65 pp · Wine pairing £50 pp",
        dishes: [
          { name: "Ruby papdi chaat", description: "Spiced chickpeas, sweetened yoghurt, wild berry & tamarind chutney" },
          { name: "Lemongrass malai tikka", description: "Cream cheese, ginger & coriander stem" },
          { name: "Lamb seekh kebab", description: "Water chestnut, ginger & coriander; bhurani raita" },
          { name: "Hariyali machhi (monkfish)", description: "Fresh greens, roasted cumin & browned garlic; tapioca mash" },
          { name: "Chicken makhani & Afghani bhunao lamb", description: "Served with dal makhani, rice & garlic naan" },
          { name: "Chocolate delight", description: "Almond brittle & raspberry sorbet" },
        ],
      },
      {
        title: "Dawat (V)",
        note: "4 courses £60 pp · Wine pairing £50 pp",
        dishes: [
          { name: "Ruby papdi chaat & tandoori broccoli" },
          { name: "Kolkata beetroot cake & angara paneer tikka" },
          { name: "Saag aloo & methi malai gucchi with green peas", description: "Served with dal makhani, rice & roti" },
          { name: "Traditional kulfis", description: "Pistachio & paan" },
        ],
      },
    ],
  },
  {
    slug: "lunch-early-evening",
    title: "Lunch & early evening",
    kind: "food",
    summary: "A shorter set menu for lunch and pre-theatre dining opposite Cadogan Hall.",
    pdf: `${PDF}/2026/10/LunchEarly-evening-menu.pdf`,
    image: "crab",
  },
  {
    slug: "vegan",
    title: "Vegan menu",
    kind: "food",
    summary: "A dedicated plant-based menu.",
    pdf: `${PDF}/2026/10/Vegan-menu.pdf`,
    image: "avocadoGrill",
  },
  {
    slug: "bottomless-brunch",
    title: "Bottomless brunch",
    kind: "food",
    summary: "Thursday to Sunday, 12:30 – 16:00. A vegetarian brunch is also available.",
    meta: "Thursday – Sunday · 12:30 – 16:00",
    pdf: `${PDF}/2026/10/Bottomless-brunch-.pdf`,
    image: "cocktails",
  },
  {
    slug: "bottomless-brunch-veg",
    title: "Bottomless brunch (veg)",
    kind: "food",
    summary: "The vegetarian bottomless brunch. Thursday to Sunday, 12:30 – 16:00.",
    meta: "Thursday – Sunday · 12:30 – 16:00",
    pdf: `${PDF}/2026/01/Kahani-Veg-Brunch-Menu-January-2026-.pdf`,
    image: "cocktailsBar",
  },
  {
    slug: "desserts",
    title: "Desserts",
    kind: "food",
    summary: "Desserts with suggested pairings, sweet and fortified wines, tea and coffee.",
    pdf: `${PDF}/2026/10/Dessert-menu-.pdf`,
    image: "kulfi",
    sections: [
      {
        title: "Desserts",
        note: "Prices and pairings in the full menu",
        dishes: [
          { name: "Coconut panna cotta", description: "Black grape pearls, passion fruit gel" },
          { name: "Chocolate delight", description: "Almond brittle & raspberry sorbet" },
          { name: "Medley of kulfi", description: "Rose, pistachio, paan" },
          { name: "Pear fondant", description: "Cinnamon white chocolate, jamun sorbet" },
          { name: "Pumpkin and orange pudding", description: "Sweet ginger glace, fig and honey ice cream" },
          { name: "Pandan rice kheer", description: "Cardamom infused, wild berry compote" },
          { name: "Dessert platter" },
          { name: "Choice of ice cream and sorbet" },
        ],
      },
    ],
  },
  {
    slug: "wine",
    title: "Wine list",
    kind: "drinks",
    summary: "From the wall of wine that defines Kahani's bar.",
    meta: "October 2026",
    pdf: `${PDF}/2026/10/Wine-list-October-2026.pdf`,
    image: "winePairing",
  },
  {
    slug: "drinks",
    title: "Drinks & cocktails",
    kind: "drinks",
    summary: "Kahani's cocktail list, spirits and soft drinks.",
    pdf: `${PDF}/2026/10/Kahani-drinks-menu-updated-2026-Oct.pdf.pdf`,
    image: "cocktailsTable",
  },
  // ---------------------------------------------------------------- SEASONAL (date-gated)
  {
    slug: "festive-lunch",
    title: "Festive lunch & early evening",
    kind: "seasonal",
    summary: "A festive set menu for lunch and early evening through the season.",
    pdf: `${PDF}/2026/10/2026-Kahani-Festive-lunch-and-early-evening-menu-3.pdf`,
    image: "tandooriPlate",
    available: { from: "2026-11-01", until: "2026-12-31" },
  },
  {
    slug: "christmas-day",
    title: "Christmas Day",
    kind: "seasonal",
    summary: "The Christmas Day menu.",
    pdf: `${PDF}/2026/10/2026-Kahani-Christmas-menu.pdf.pdf`,
    image: "chocolateDessert",
    available: { from: "2026-10-15", until: "2026-12-25" },
  },
  {
    slug: "new-years-eve",
    title: "New Year's Eve",
    kind: "seasonal",
    summary: "The New Year's Eve menu.",
    pdf: `${PDF}/2026/10/2026-Kahani-New-Years-Eve-menu.pdf`,
    image: "cocktailOrange",
    available: { from: "2026-10-15", until: "2026-12-31" },
  },
  {
    slug: "diwali",
    title: "Diwali",
    kind: "seasonal",
    summary: "The Diwali menu.",
    pdf: `${PDF}/2026/09/Kahani-Diwali-Menu-2026.pdf`,
    image: "goldPlate",
    available: { from: "2026-09-15", until: "2026-11-09" },
  },
];

export function isMenuAvailable(menu: Menu, now = new Date()) {
  if (!menu.available) return true;
  const day = now.toISOString().slice(0, 10);
  return day >= menu.available.from && day <= menu.available.until;
}

export const activeMenus = (now?: Date) => menus.filter((m) => isMenuAvailable(m, now));
