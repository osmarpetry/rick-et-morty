const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroui/system', '@heroui/theme'],
  },
};

module.exports = withNextIntl(nextConfig);
