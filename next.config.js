// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       config.externals.push({
//         'onnxruntime-node': 'commonjs onnxruntime-node'
//       });
//     }

//     return config;
//   },
//   images: {
//     domains: ['yyxgbfilifruovbkrmib.supabase.co']
//   }
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'onnxruntime-node': 'commonjs onnxruntime-node'
      });
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false
      };
    }
    return config;
  },
  images: {
    domains: ['yyxgbfilifruovbkrmib.supabase.co']
  }
};

module.exports = nextConfig;
