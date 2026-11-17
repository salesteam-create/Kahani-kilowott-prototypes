/**
 * Sub-folder the site is served from. Empty on a root domain; set to the
 * repository name on GitHub Pages (e.g. "/Kahani-kilowott-prototypes").
 * Next.js prefixes links and its own scripts automatically; plain <img> paths
 * to files in /public go through withBase().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBase = (path: string) => `${BASE_PATH}${path}`;
