import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

const routes = ["", "/about/", "/chef/", "/menus/", "/experiences/", "/gallery/", "/private-dining/", "/gift-cards/", "/events/", "/journal/", "/contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r || "/"}`,
    changeFrequency: r === "/menus/" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/menus/" || r === "/private-dining/" ? 0.9 : 0.7,
  }));
}
