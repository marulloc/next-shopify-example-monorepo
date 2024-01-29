/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@marulloc/components-library'],

  images: {
    domains: ['cdn.shopify.com'],
  },
};

export default nextConfig;
