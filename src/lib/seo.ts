import type { Metadata } from "next";
import { site } from "@/data/site";
import { assetUrl, type AssetId } from "@/data/assets";

/** Per-page metadata with canonical URL and Open Graph image from the manifest. */
export function pageMeta({ title, description, path, image = "saucePour" }: { title: string; description: string; path: string; image?: AssetId }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Kahani London`,
      description,
      url,
      siteName: site.legalName,
      locale: "en_GB",
      type: "website",
      images: [{ url: assetUrl(image) }],
    },
    twitter: { card: "summary_large_image", title: `${title} · Kahani London`, description, images: [assetUrl(image)] },
  };
}
