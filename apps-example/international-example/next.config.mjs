/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        // 여기에 필요하다면 pathname을 추가할 수 있습니다. 예: pathname: '/yourpath/*'
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
    ],
  },
};

export default nextConfig;
