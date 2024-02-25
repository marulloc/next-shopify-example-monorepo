/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        // 여기에 필요하다면 pathname을 추가할 수 있습니다. 예: pathname: '/yourpath/*'
      },
    ],
  },
};

export default nextConfig;
