/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],

    // Image sizes for the sizes prop
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Minimize image quality while maintaining visual quality
    // 75 is a good balance between size and quality
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache

    // Allow images from these domains if using external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // Enable compression
  compress: true,

  // Optimize for production
  poweredByHeader: false,
};

module.exports = nextConfig;