/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],

  images: {
    domains: ['cdn.shopify.com'],
  },

};

export default nextConfig;
