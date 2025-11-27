/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      path: false,
      os: false,
    };
    
    if (!isServer) {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
    }
    
    // Fix for MetaMask SDK React Native dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      'react-native': false,
    };
    
    return config;
  },
};

export default nextConfig;
