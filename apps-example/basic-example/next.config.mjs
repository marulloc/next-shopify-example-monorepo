/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@marulloc/components-library"],

  images: {
    domains: ['cdn.shopify.com'],
  },

};

export default nextConfig;
