import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deployable to any CDN (Cloudflare Pages, Vercel, Netlify, S3).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
