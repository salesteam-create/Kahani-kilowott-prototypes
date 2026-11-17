import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH when the site lives in a sub-folder (GitHub Pages
// project sites: "/<repository-name>"). Leave it empty for a root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export: deployable to any static host (GitHub Pages, Cloudflare Pages, Netlify, S3).
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
