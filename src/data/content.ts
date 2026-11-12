import type { AssetId } from "./assets";

/**
 * Editorial content.
 * Quoted copy marked VERIFIED is reproduced from kahanilondon.com.
 * Headlines are the agreed creative lines from the redesign brief.
 */

export const navigation: { label: string; href: string; image: AssetId }[] = [
  { label: "Home", href: "/", image: "saucePour" },
  { label: "Our story", href: "/about/", image: "spiceTable" },
  { label: "The chef", href: "/chef/", image: "chefPortrait" },
  { label: "Menus", href: "/menus/", image: "broccoli" },
  { label: "The experience", href: "/experiences/", image: "diningRoom" },
  { label: "Private dining", href: "/private-dining/", image: "peacockRoom" },
  { label: "Gallery", href: "/gallery/", image: "flames" },
  { label: "Journal", href: "/journal/", image: "wineWall" },
  { label: "Contact", href: "/contact/", image: "velvetChairs" },
];

export const secondaryNav = [
  { label: "Gift cards", href: "/gift-cards/" },
  { label: "Events", href: "/events/" },
];

export const chapters = [
  { id: "opening", label: "The opening" },
  { id: "meaning", label: "The meaning" },
  { id: "origin", label: "The origin" },
  { id: "craft", label: "The craft" },
  { id: "menu", label: "The menu" },
  { id: "experience", label: "The experience" },
  { id: "chef", label: "The chef" },
  { id: "private-dining", label: "Private dining" },
  { id: "invitation", label: "The invitation" },
] as const;

/** VERIFIED copy (homepage / about / chef pages). */
export const copy = {
  meaning:
    "Kahani, which means ‘story’ in Hindi, is where Michelin-starred chef Peter Joseph is adding the latest chapter to a tale that spans more than 200 years, with a fresh approach to Indian cuisine.",
  approach:
    "Gone are the weighty, oppressive sauces, replaced with light dishes populated with grilled meats, fish and vegetables from the robata grill and tandoor. The finest seasonal and traditional British ingredients are brought to life with heady spices and culinary techniques associated with Indian cooking.",
  sharing:
    "The result is the very best in Indian food, with meals so delicious diners will want to share, creating a sense of communal eating which for centuries has been the hallmark of superior cuisine.",
  restaurant:
    "Located in the heart of Chelsea, opposite the iconic Cadogan Hall, Kahani combines luxe, seductively lit interiors with a high-class, yet inclusive dining experience.",
  bar: "With its impressive cocktail list and wall dedicated to wine, Kahani's bar is the talk of the town. Which drink will you go for?",
  occasion:
    "The main restaurant seats up to 90 people and is available for exclusive hire, where Peter will devise a specially curated menu to suit the exacting requirements of each guest.",
  privateDining:
    "Overlooking the elegantly appointed ground floor, this stunning space can be curtained off to ensure complete privacy. Finished in luxurious royal blue velvet, it is the perfect setting for private dinners, business meetings and special celebrations.",
  chefIntro:
    "Having grown up in Chennai, India, Peter Joseph was heavily influenced by his surroundings.",
  chefFull: [
    "Having grown up in Chennai, India, Peter Joseph was heavily influenced by his surroundings. He would often join his mother in the kitchen, watching her cook, and absorbing all of her traditional cooking tips and tricks.",
    "He also had the opportunity to experience the sights and sounds of local markets, with their heady mix of spices, vibrant colours and fresh ingredients. As such, many of his recipes have roots in the food he saw being prepared when he was growing up.",
    "Coupled with his experience in British kitchens, it was only natural that he would combine the two for a traditional take on Indian cooking, but with his signature modern twist.",
    "The food he prepares at Kahani is made using the very best ingredients, packed with flavour and so tasty, you can’t help but want to share. Using traditional Indian cooking methods for his dishes, people visit from far and wide to sample his signature blend of spices and flavour pairings.",
    "With Kahani, he is seeking to make Indian fine dining more communal, more informal, offering diners the very best quality and a wide range of palate-pleasing flavours whilst remaining true to his heritage.",
  ],
  history:
    "The British love affair with Indian cuisine is a tale that spans more than 200 years, from the opening of the very first curry house in 1809, to its rise in the 21st Century as Britain’s national dish.",
};

/** The four origin chapters (all statements drawn from the official chef story). */
export const originChapters: { kicker: string; title: string; body: string; image: AssetId; place: string }[] = [
  {
    kicker: "Chapter I",
    title: "Chennai",
    place: "Tamil Nadu, India",
    body: "Peter Joseph grew up in Chennai, and was heavily influenced by his surroundings.",
    image: "chennai",
  },
  {
    kicker: "Chapter II",
    title: "His mother's kitchen",
    place: "Where it began",
    body: "He would often join his mother in the kitchen, watching her cook and absorbing all of her traditional cooking tips and tricks.",
    image: "rollingBread",
  },
  {
    kicker: "Chapter III",
    title: "The markets",
    place: "Spice, colour, freshness",
    body: "The sights and sounds of local markets, with their heady mix of spices, vibrant colours and fresh ingredients. Many of his recipes have roots in the food he saw prepared as he grew up.",
    image: "spiceTable",
  },
  {
    kicker: "Chapter IV",
    title: "London",
    place: "Chelsea, today",
    body: "Coupled with his experience in British kitchens, he combines the two: a traditional take on Indian cooking, with his signature modern twist.",
    image: "chefInRestaurant",
  },
];

/** Featured dishes for the horizontal journey: photographed dishes that appear on the current menus. */
export const featuredDishes: { image: AssetId; name: string; description: string; category: string; menu: string }[] = [
  {
    image: "broccoli",
    name: "Tandoori broccoli",
    description: "Nigella seeds & honey, crushed wheat crisps with tempered turmeric yoghurt",
    category: "Kahani Klaasik · Veg",
    menu: "a-la-carte",
  },
  {
    image: "prawns",
    name: "Smoked Malabar prawns",
    description: "Fresh turmeric, coconut, curry leaves; tapioca mash",
    category: "Kahani Klaasik · Seafood",
    menu: "a-la-carte",
  },
  {
    image: "crab",
    name: "Amritsari soft-shell crab",
    description: "Delicately spiced with ajwain; avocado, mint chutney",
    category: "Small plates",
    menu: "a-la-carte",
  },
  {
    image: "kulfi",
    name: "Medley of kulfi",
    description: "Rose, pistachio, paan",
    category: "Desserts",
    menu: "desserts",
  },
];

/** Press coverage listed on the official News page. */
export const press = [
  { outlet: "SquareMeal", date: "2026-11-03", title: "Where to celebrate Diwali in London", url: "https://www.squaremeal.co.uk/restaurants/best-for/where-to-celebrate-diwali-in-london_10288" },
  { outlet: "All Set", date: "2026-10-06", title: "Kahani's lunch & early evening menu", url: "https://allsetlondon.com/blog/kahani-lunch-early-evening-menu" },
  { outlet: "SquareMeal", date: "2026-09-23", title: "London's best fine dining restaurants for Christmas parties", url: "https://www.squaremeal.co.uk/christmas-parties/best/london-best-fine-dining-restaurants-christmas-parties_642" },
  { outlet: "Foodepedia", date: "2026-07-17", title: "Kahani: Chelsea in bloom", url: "https://www.foodepedia.co.uk/restaurant-news/kahani-chelsea-in-bloom/" },
  { outlet: "Mostly Food", date: "2026-07-15", title: "Kahani for comfort and innovation", url: "https://www.mostlyfood.co.uk/index.php/kahani-for-comfort-and-innovation/" },
  { outlet: "Luxury Lifestyle Magazine", date: "2026-07-13", title: "Peter Joseph's Kahani: how Sloane Square's best-kept secret is on a Michelin-starred mission", url: "https://www.luxurylifestylemag.co.uk/food-and-drink/peter-josephs-kahani-how-sloane-squares-best-kept-secret-is-on-a-michelin-starred-mission/" },
  { outlet: "Country & Town House", date: "2026-07-11", title: "The best pre-theatre menus in London", url: "https://www.countryandtownhouse.com/food-and-drink/best-pre-theatre-menus-london/" },
  { outlet: "Taste Asia", date: "2026-07-06", title: "Taste Asia magazine launches worldwide", url: "https://tasteasia.co.uk/taste-asia-magazine-launches-worldwide-in-print-across-190-countries/" },
  { outlet: "SquareMeal", date: "2026-02-02", title: "Valentine's Day restaurants in London", url: "https://www.squaremeal.co.uk/restaurants/best-for/valentines-day-restaurants-london-menus_9592" },
  { outlet: "Luxury Lifestyle Magazine", date: "2026-01-09", title: "Meet the chef: Peter Joseph, head chef of Kahani", url: "https://www.luxurylifestylemag.co.uk/food-and-drink/meet-the-chef-peter-joseph-head-chef-of-kahani-sloane-square-chelsea-in-london/" },
  { outlet: "Cadogan Hall", date: "2025-12-08", title: "Our neighbours: festive highlights at Kahani", url: "https://cadoganhall.com/about-us/news-press-office/our-neighbours-festive-highlights-at-kahani/" },
  { outlet: "That's Up", date: "2025-12-04", title: "Restaurants open on Christmas Day in London", url: "https://thatsup.co.uk/london/guide/restaurants-that-are-open-on-christmas-day-in-london/" },
  { outlet: "Kings Road", date: "2025-11-20", title: "Chelsea Christmas lights switch-on 2025", url: "https://www.kingsroad.co.uk/experience/chelsea-christmas-lights-switch-on-2025/" },
  { outlet: "Mostly Food", date: "2025-11-18", title: "Festive celebrations at Kahani, Chelsea", url: "https://www.mostlyfood.co.uk/index.php/festive-celebrations-at-kahani-chelsea/" },
  { outlet: "Quintessentially", date: "2025-11-17", title: "London's best Christmas meals", url: "https://quintessentially.com/noted/londons-best-christmas-meals" },
  { outlet: "Red", date: "2025-11-04", title: "London restaurant vouchers", url: "https://www.redonline.co.uk/travel/g34789185/london-restaurant-vouchers/" },
  { outlet: "Relentless Magazine", date: "2025-11-04", title: "Festive celebrations at Kahani: Chelsea's contemporary Indian dining destination opens on Christmas Day", url: "https://www.relentless-magazine.com/festive-celebrations-at-kahani-chelseas-contemporary-indian-dining-destination-opens-its-doors-on-christmas-day/" },
  { outlet: "Darling Magazine", date: "2025-10-21", title: "Eat: Kahani", url: "https://darlingmagazine.co.uk/eat/kahani/" },
  { outlet: "Food Newz", date: "2025-10-20", title: "Celebrate Diwali in style", url: "https://foodnewz.wordpress.com/2025/10/20/celebrate-diwali-in-style/" },
];

/** Gift cards and experiences sold on the official WooCommerce store. */
export const giftCards = [
  { name: "Gift card", price: "£30 – £500", url: "https://www.kahanilondon.com/product/gift-card/", note: "Choose any amount" },
  { name: "Tasting menu", price: "£80", url: "https://www.kahanilondon.com/product/tasting-menu/" },
  { name: "Tasting menu for two", price: "£160", url: "https://www.kahanilondon.com/product/tasting-menu-for-two/" },
  { name: "Tasting menu with wine pairing", price: "£150", url: "https://www.kahanilondon.com/product/tasting-menu-with-wine-pairing/" },
  { name: "Tasting menu with wine pairing for two", price: "£300", url: "https://www.kahanilondon.com/product/tasting-menu-with-wine-pairing-for-two/" },
  { name: "Vegetarian tasting menu", price: "£75", url: "https://www.kahanilondon.com/product/vegetarian-tasting-menu/" },
  { name: "Vegetarian tasting menu for two", price: "£150", url: "https://www.kahanilondon.com/product/vegetarian-tasting-menu-for-two/" },
  { name: "Vegetarian tasting menu with wine pairing", price: "£145", url: "https://www.kahanilondon.com/product/vegetarian-tasting-menu-with-wine-pairing/" },
  { name: "Vegetarian tasting menu with wine pairing for two", price: "£290", url: "https://www.kahanilondon.com/product/vegetarian-tasting-menu-with-wine-pairing-for-two/" },
  { name: "Dawat menu", price: "£65", url: "https://www.kahanilondon.com/product/dawat-menu/" },
  { name: "Dawat menu for two", price: "£130", url: "https://www.kahanilondon.com/product/dawat-menu-for-two/" },
  { name: "Dawat menu with wine pairing", price: "£125", url: "https://www.kahanilondon.com/product/dawat-menu-with-wine-pairing/" },
  { name: "Dawat menu with wine pairing for two", price: "£250", url: "https://www.kahanilondon.com/product/dawat-menu-with-wine-pairing-for-two/" },
];
