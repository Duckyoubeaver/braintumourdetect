const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    console.log('Configuring webpack...');
    if (!isServer) {
      console.log('Client-side configuration');
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false
      };
    }

    // Add this rule to ignore HTML files
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader'
    });

    // Add this to ignore mock-aws-s3
    config.resolve.alias['mock-aws-s3'] = false;

    console.log('Webpack configuration completed');
    return config;
  },
  images: {
    domains: ['yyxgbfilifruovbkrmib.supabase.co']
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2
  }
});

module.exports = nextConfig;
