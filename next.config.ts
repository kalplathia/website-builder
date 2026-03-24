import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/website-builder-system.firebasestorage.app/**",
      },
    ],
  },
};

export default nextConfig;
