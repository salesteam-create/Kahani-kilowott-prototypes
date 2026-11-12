import { assets, assetUrl, type AssetId } from "@/data/assets";
import type { CSSProperties } from "react";

interface Props {
  id: AssetId;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  alt?: string;
  sizes?: string;
  decorative?: boolean;
}

/**
 * Official Kahani photograph from the manifest.
 * object-position comes from the manifest so the subject survives any crop.
 */
export function Img({ id, className = "", style, priority, alt, decorative }: Props) {
  const asset = assets[id];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetUrl(id)}
      alt={decorative ? "" : alt ?? asset.subject}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: asset.focus, ...style }}
    />
  );
}
