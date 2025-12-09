/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.cloudflare.steamstatic.com',
      'stratz.com',
      'raw.githubusercontent.com'
    ],
  },
};

module.exports = nextConfig;
