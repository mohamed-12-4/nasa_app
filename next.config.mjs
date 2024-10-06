/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.solarsystemscope.com',
        port: '',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  
};


export default nextConfig;
