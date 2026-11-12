/**
 * ASSET MANIFEST
 * ------------------------------------------------------------------
 * Every photograph below is an official Kahani asset discovered on
 * https://www.kahanilondon.com/ (homepage, gallery, chef, private dining,
 * experiences, news). No stock, AI or third-party imagery is used.
 *
 * Video: the audit found NO official video on the current website
 * (no <video>, YouTube, Vimeo or Elementor background-video sources).
 * The hero therefore uses photography with cinematic motion. Drop a
 * client-supplied clip into `heroVideo` to enable it; nothing is faked.
 *
 * Subjects were identified visually from the live gallery and pages.
 * Resolution is recorded where the site publishes it (og:image metadata);
 * "verify" marks files whose pixel size should be confirmed on download.
 *
 * Delivery: by default images load from the official uploads directory.
 * Run `npm run mirror-assets` to self-host them under /public/media and set
 * NEXT_PUBLIC_ASSET_MODE=local for production.
 */

const ORIGIN = "https://www.kahanilondon.com/wp-content/uploads";
const LOCAL = process.env.NEXT_PUBLIC_ASSET_MODE === "local";

export type AssetCategory =
  | "hero"
  | "food"
  | "ingredients"
  | "chef"
  | "kitchen"
  | "restaurant"
  | "bar"
  | "private-dining"
  | "heritage"
  | "supporting";

export interface Asset {
  id: string;
  file: string; // path under wp-content/uploads
  subject: string; // used as descriptive alt text
  category: AssetCategory;
  type: "photograph" | "video";
  resolution: string;
  aspect: "landscape" | "portrait" | "square" | "panorama";
  placement: string;
  /** CSS object-position that protects the subject when cropped. */
  focus?: string;
  /** Client-supplied high-resolution version, served from /public/images/hq. Takes priority. */
  hq?: string;
  /** Official dish name, only where it matches the current menu. */
  dish?: string;
  sourcePage: string;
}

const a = (x: Asset) => x;

export const assets = {
  // ---------------------------------------------------------------- HERO / ATMOSPHERE
  saucePour: a({
    id: "saucePour", file: "2019/08/Kahani_802_Final_LowRes_Big.jpg",
    subject: "A sauce poured from a white jug over a plated dish on a dark wooden table",
    category: "hero", type: "photograph", resolution: "1536 × 1024 (client-supplied)", aspect: "landscape",
    hq: "sauce-pour.webp", placement: "Homepage opening film", focus: "50% 45%", sourcePage: "/gallery/",
  }),
  chocolatePour: a({
    id: "chocolatePour", file: "2019/08/spotlight-gallery.jpg",
    subject: "Warm chocolate poured over a dessert in low, dramatic light",
    category: "hero", type: "photograph", resolution: "1440 wide (banner)", aspect: "panorama",
    placement: "Gallery hero", focus: "50% 40%", sourcePage: "/gallery/",
  }),

  // ---------------------------------------------------------------- KITCHEN / CRAFT
  flames: a({
    id: "flames", file: "2019/08/11_Zoom.jpg",
    subject: "Flames rising from a pan as a chef cooks over high heat",
    category: "kitchen", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Craft: FIRE", focus: "40% 50%", sourcePage: "/gallery/",
  }),
  wokToss: a({
    id: "wokToss", file: "2019/08/05_Zoom.jpg",
    subject: "A chef in whites tossing spiced ingredients in a pan",
    category: "kitchen", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Origin: technique", focus: "50% 40%", sourcePage: "/gallery/",
  }),
  plating: a({
    id: "plating", file: "2019/08/01_Zoom.jpg",
    subject: "A chef finishing a plate with tweezers at the pass",
    category: "kitchen", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Craft: FINESSE", focus: "45% 45%", sourcePage: "/gallery/",
  }),
  platingChops: a({
    id: "platingChops", file: "2019/08/10_Zoom.jpg",
    subject: "Grilled meat being plated in the Kahani kitchen",
    category: "kitchen", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Craft: FLAVOUR", focus: "50% 55%", sourcePage: "/gallery/",
  }),
  rollingBread: a({
    id: "rollingBread", file: "2019/08/07_Zoom.jpg",
    subject: "Hands rolling out bread dough with a wooden rolling pin",
    category: "kitchen", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Origin: a mother's kitchen", focus: "55% 55%", sourcePage: "/gallery/",
  }),
  avocadoGrill: a({
    id: "avocadoGrill", file: "2019/08/06_Zoom.jpg",
    subject: "Avocado halves charring on a hot grill",
    category: "kitchen", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),

  // ---------------------------------------------------------------- INGREDIENTS
  spices: a({
    id: "spices", file: "2019/08/Kahani_792_LowRes_Big.jpg",
    subject: "Whole spices and dried chillies arranged on a dark plate on wood",
    category: "ingredients", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Meaning: ingredient image", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  spiceTable: a({
    id: "spiceTable", file: "2019/08/Octopus_Calimari_4_Big.jpg",
    subject: "Overhead view of plated seafood surrounded by spices on a wooden table",
    category: "ingredients", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Origin: markets and spice", focus: "50% 50%", sourcePage: "/gallery/",
  }),

  // ---------------------------------------------------------------- FOOD (named only when on the current menu)
  broccoli: a({
    id: "broccoli", file: "2019/08/Tandoori_Broccoli_Big.jpg",
    subject: "Tandoori broccoli plated on a pale ceramic dish",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Menu journey", focus: "50% 50%", dish: "Tandoori broccoli", sourcePage: "/gallery/",
  }),
  prawns: a({
    id: "prawns", file: "2019/08/Malabar_Prawns_1_Big.jpg",
    subject: "Malabar prawns served on a dark stone plate",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Menu journey", focus: "50% 50%", dish: "Smoked Malabar prawns", sourcePage: "/gallery/",
  }),
  crab: a({
    id: "crab", file: "2019/08/Softshell_Crab_Big.jpg",
    subject: "Soft-shell crab plated on a dark rimmed dish over marble",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Menu journey", focus: "50% 50%", dish: "Amritsari soft-shell crab", sourcePage: "/gallery/",
  }),
  kulfi: a({
    id: "kulfi", file: "2019/08/Medley_of_Kulfi_Big.jpg",
    subject: "A medley of kulfi served in a bowl",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Menu journey", focus: "50% 50%", dish: "Medley of kulfi", sourcePage: "/gallery/",
  }),
  tandooriPlate: a({
    id: "tandooriPlate", file: "2019/12/kahani-about1.jpg",
    subject: "Tandoori-spiced dish with red chutney dots on a white plate",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Menus / About", focus: "45% 50%", sourcePage: "/",
  }),
  chocolateDessert: a({
    id: "chocolateDessert", file: "2019/12/kahani-about3.jpg",
    subject: "Layered chocolate dessert with edible flowers and ice cream",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Menus: desserts", focus: "50% 50%", sourcePage: "/",
  }),
  aubergine: a({
    id: "aubergine", file: "2019/08/Aubergine_Steak_Big-2.jpg",
    subject: "A plated aubergine dish on a dark ceramic plate",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  chocolateBomb1: a({
    id: "chocolateBomb1", file: "2019/08/Chocolate_Chilli_Bomb_1_Big-1.jpg",
    subject: "Sauce poured over a chocolate dessert in a dark setting",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  chocolateBomb2: a({
    id: "chocolateBomb2", file: "2019/08/Chocolate_Chilli_Bomb_2_Big-1.jpg",
    subject: "A chocolate dessert plated on marble",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  avocado: a({
    id: "avocado", file: "2019/08/Grilled_Avocado_with_Olives_Big.jpg",
    subject: "Grilled avocado with olives in a black bowl",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  tikkaPlatter: a({
    id: "tikkaPlatter", file: "2019/08/Kahani_168_LowRes_Big.jpg",
    subject: "Tikka pieces arranged on a long rectangular platter",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  bowl181: a({
    id: "bowl181", file: "2019/08/Kahani_181_LowRes_Big.jpg",
    subject: "A richly sauced dish served in a pale blue bowl",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  goldPlate: a({
    id: "goldPlate", file: "2019/08/Kahani_208_LowRes_Big.jpg",
    subject: "A delicately garnished dish in a golden bowl",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  octopus: a({
    id: "octopus", file: "2019/08/Octopus_and_Tandoori_Calamari_1_Big.jpg",
    subject: "Octopus and tandoori calamari on a golden plate",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  cheesecake: a({
    id: "cheesecake", file: "2019/08/Melt_in_the_Middle_Cheesecake_Big.jpg",
    subject: "A plated cheesecake dessert with fruit on a white dish",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  crispyGreens: a({
    id: "crispyGreens", file: "2019/08/02_Zoom.jpg",
    subject: "A crisp, deep green dish served on a white plate against red",
    category: "food", type: "photograph", resolution: "1536 × 1024 (client-supplied)", aspect: "landscape",
    hq: "crispy-greens.webp", placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  dessertDark: a({
    id: "dessertDark", file: "2019/08/04_Zoom.jpg",
    subject: "A sculpted dessert with berries on a white plate against black",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  winePairing: a({
    id: "winePairing", file: "2019/12/winelist-1024x683.jpg",
    subject: "A glass of white wine beside a small plated dish on a marble table",
    category: "bar", type: "photograph", resolution: "1024 × 683", aspect: "landscape",
    placement: "Menus: wine list", focus: "50% 50%", sourcePage: "/",
  }),
  cocktailsTable: a({
    id: "cocktailsTable", file: "2019/12/drink-menu-1024x683.jpg",
    subject: "Four cocktails with star anise and citrus on a wooden table",
    category: "bar", type: "photograph", resolution: "1024 × 683", aspect: "landscape",
    placement: "Menus: drinks", focus: "50% 50%", sourcePage: "/",
  }),
  aboutFood: a({
    id: "aboutFood", file: "2019/08/about-food.png",
    subject: "A panoramic spread of Kahani dishes",
    category: "food", type: "photograph", resolution: "1440 × 477", aspect: "panorama",
    placement: "About", focus: "50% 50%", sourcePage: "/about/",
  }),
  privateFood: a({
    id: "privateFood", file: "2019/08/private-dinner-food.jpg",
    subject: "Dishes prepared for a private dining menu",
    category: "food", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Private dining", focus: "50% 50%", sourcePage: "/private-dining/",
  }),

  // ---------------------------------------------------------------- CHEF
  chefPortrait: a({
    id: "chefPortrait", file: "2026/04/Chef-Peter-Joseph-1-scaled.jpeg",
    subject: "Chef Peter Joseph in the Kahani dining room, holding a plated lamb dish",
    category: "chef", type: "photograph", resolution: "1672 × 941 (client-supplied)", aspect: "landscape",
    hq: "chef-peter-joseph.webp", placement: "Chef chapter / chef page", focus: "57% 30%", sourcePage: "/culinary-cultural-soul-of-india/",
  }),
  chefSeated: a({
    id: "chefSeated", file: "2019/08/spotlight-story.jpg",
    subject: "Chef Peter Joseph seated in the restaurant in his whites",
    category: "chef", type: "photograph", resolution: "1440 wide (banner)", aspect: "panorama",
    placement: "Chef page hero", focus: "78% 35%", sourcePage: "/peter-joseph/",
  }),
  chefInRestaurant: a({
    id: "chefInRestaurant", file: "2019/12/kahani-about2.jpg",
    subject: "Chef Peter Joseph standing in the Kahani dining room",
    category: "chef", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Origin: London", focus: "50% 30%", sourcePage: "/",
  }),
  chefJourney: a({
    id: "chefJourney", file: "2026/04/A-Refined-Exploration-of-India.jpeg",
    subject: "Chef Peter Joseph on his culinary journey through India",
    category: "chef", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experiences", focus: "50% 40%", sourcePage: "/culinary-cultural-soul-of-india/",
  }),

  // ---------------------------------------------------------------- HERITAGE (official experiences page)
  chennai: a({
    id: "chennai", file: "2026/11/Chennai.jpg",
    subject: "A Chola bronze of Nataraja, from the heritage of Chennai, Tamil Nadu",
    category: "heritage", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Origin: Chennai", focus: "50% 50%", sourcePage: "/culinary-cultural-soul-of-india/",
  }),
  sadhya: a({
    id: "sadhya", file: "2026/04/traditional-Sadhya-feasts.jpeg",
    subject: "A traditional South Indian sadhya feast served on banana leaf",
    category: "heritage", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experiences", focus: "50% 50%", sourcePage: "/culinary-cultural-soul-of-india/",
  }),
  jaipur: a({
    id: "jaipur", file: "2026/03/Jaipur.jpg",
    subject: "Jaipur, the Pink City of Rajasthan",
    category: "heritage", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experiences", focus: "50% 50%", sourcePage: "/culinary-cultural-soul-of-india/",
  }),
  agra: a({
    id: "agra", file: "2026/03/agra.jpg",
    subject: "The Taj Mahal, Agra",
    category: "heritage", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experiences", focus: "50% 50%", sourcePage: "/culinary-cultural-soul-of-india/",
  }),

  // ---------------------------------------------------------------- RESTAURANT
  diningRoom: a({
    id: "diningRoom", file: "2019/08/Kahani_261_Final_LowRes_Big.jpg",
    subject: "The Kahani dining room with globe chandeliers and laid tables",
    category: "restaurant", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experience chapter", focus: "50% 45%", sourcePage: "/gallery/",
  }),
  booths: a({
    id: "booths", file: "2019/08/Kahani_274_LowRes_Big.jpg",
    subject: "Blue velvet banquettes beneath a sculpted ceiling",
    category: "restaurant", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experience chapter", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  roomRestaurant: a({
    id: "roomRestaurant", file: "2019/12/home-rooms1.jpg",
    subject: "The restaurant at Kahani, Chelsea",
    category: "restaurant", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experiences page", focus: "50% 50%", sourcePage: "/",
  }),
  velvetChairs: a({
    id: "velvetChairs", file: "2019/12/home-carousel1.jpg",
    subject: "Coral velvet chairs at a laid table with flowers in the foreground",
    category: "restaurant", type: "photograph", resolution: "verify", aspect: "panorama",
    placement: "Experience chapter", focus: "60% 50%", sourcePage: "/",
  }),
  carousel2: a({
    id: "carousel2", file: "2019/12/home-carousel2.jpg",
    subject: "The Kahani dining room",
    category: "restaurant", type: "photograph", resolution: "verify", aspect: "panorama",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/",
  }),
  wallpaper: a({
    id: "wallpaper", file: "2019/08/03_Zoom.jpg",
    subject: "Detail of Kahani's patterned wallpaper in rose and green",
    category: "supporting", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Texture", focus: "50% 50%", sourcePage: "/gallery/",
  }),

  // ---------------------------------------------------------------- BAR
  wineWall: a({
    id: "wineWall", file: "2019/08/Copy_of_restaurant_edit045_Big.jpg",
    subject: "A floor-to-ceiling wall of wine bottles",
    category: "bar", type: "photograph", resolution: "1536 × 1024 (client-supplied)", aspect: "landscape",
    hq: "wine-wall.webp", placement: "Bar chapter", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  bar: a({
    id: "bar", file: "2019/08/Kahani_295_Final_LowRes_Big.jpg",
    subject: "The Kahani bar: backlit shelves, brass pendants and teal velvet stools",
    category: "bar", type: "photograph", resolution: "1536 × 1024 (client-supplied)", aspect: "landscape",
    hq: "bar.webp", placement: "Bar chapter", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  bartender: a({
    id: "bartender", file: "2019/08/Kahani_356_LowRes_Big.jpg",
    subject: "A bartender preparing a drink at the Kahani bar",
    category: "bar", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Bar chapter", focus: "50% 40%", sourcePage: "/gallery/",
  }),
  cocktails: a({
    id: "cocktails", file: "2019/08/Kahani_625_Final_LowRes_Big.jpg",
    subject: "Three colourful cocktails on a table",
    category: "bar", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Bar chapter", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  cocktailOrange: a({
    id: "cocktailOrange", file: "2019/08/08_Zoom.jpg",
    subject: "A golden cocktail garnished with fruit",
    category: "bar", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Gallery", focus: "50% 50%", sourcePage: "/gallery/",
  }),
  cocktailsBar: a({
    id: "cocktailsBar", file: "2019/08/09_Zoom.jpg",
    subject: "Two amber cocktails on the bar counter",
    category: "bar", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Bar chapter", focus: "50% 50%", sourcePage: "/gallery/",
  }),

  // ---------------------------------------------------------------- PRIVATE DINING
  peacockRoom: a({
    id: "peacockRoom", file: "2019/08/spotlight-private-dinner.jpg",
    subject: "The Peacock Room: royal blue velvet, curtains and low pendant lights",
    category: "private-dining", type: "photograph", resolution: "1440 × 663", aspect: "panorama",
    placement: "Private dining chapter", focus: "45% 55%", sourcePage: "/private-dining/",
  }),
  roomEvents: a({
    id: "roomEvents", file: "2019/12/home-rooms3.jpg",
    subject: "Private events and groups at Kahani",
    category: "private-dining", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Private dining page", focus: "50% 50%", sourcePage: "/",
  }),
  roomBar: a({
    id: "roomBar", file: "2019/12/home-rooms2.jpg",
    subject: "The bar at Kahani",
    category: "bar", type: "photograph", resolution: "verify", aspect: "landscape",
    placement: "Experiences page", focus: "50% 50%", sourcePage: "/",
  }),
} satisfies Record<string, Asset>;

export type AssetId = keyof typeof assets;

/** Optional official hero video. None exists today; leave null until supplied. */
export const heroVideo: { mp4: string; webm?: string; poster: AssetId } | null = null;

export function assetUrl(id: AssetId) {
  const asset: Asset = assets[id];
  if (asset.hq) return `/images/hq/${asset.hq}`;
  return LOCAL ? `/media/${asset.file}` : `${ORIGIN}/${asset.file}`;
}

/** Curated gallery (each image once), grouped for filtering. */
export const galleryGroups: { key: string; label: string; items: AssetId[] }[] = [
  {
    key: "food",
    label: "Food",
    items: [
      "saucePour", "broccoli", "prawns", "crab", "kulfi", "octopus", "spiceTable", "tikkaPlatter",
      "aubergine", "chocolateBomb1", "goldPlate", "avocado", "bowl181", "crispyGreens", "dessertDark",
      "cheesecake", "chocolateBomb2", "tandooriPlate", "chocolateDessert", "spices",
    ],
  },
  { key: "kitchen", label: "Kitchen", items: ["flames", "wokToss", "plating", "platingChops", "rollingBread", "avocadoGrill"] },
  { key: "restaurant", label: "Restaurant", items: ["diningRoom", "booths", "velvetChairs", "carousel2", "wallpaper"] },
  { key: "bar", label: "Bar", items: ["bar", "wineWall", "bartender", "cocktails", "cocktailsBar", "cocktailOrange", "cocktailsTable"] },
  { key: "private", label: "Private dining", items: ["peacockRoom"] },
];
