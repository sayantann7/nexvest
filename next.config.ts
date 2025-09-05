import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com","unlistedzone.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nexvest-backend.s3.ap-south-1.amazonaws.com',
        pathname: '/**'
      }
    ]
  },
};

export default nextConfig;