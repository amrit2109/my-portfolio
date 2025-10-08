/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: '/my-portfolio',
};

export default nextConfig;
