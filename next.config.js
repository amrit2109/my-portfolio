/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: isProduction && isStaticExport ? '/my-portfolio' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProduction && isStaticExport ? '/my-portfolio' : '',
};

export default nextConfig;
