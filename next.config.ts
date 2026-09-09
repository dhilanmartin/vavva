import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
        {
          source: "/products/silk-mask",
          destination: "/products/leopard",
          permanent: false,
        },
        {
          source: "/products/night-leopard",
          destination: "/products/leopard",
          permanent: false,
        },
        {
          source: "/products/cherry-blossom",
          destination: "/products/sakura",
          permanent: false,
        },
        {
          source: "/products/sweet-dreams",
          destination: "/products/midnight",
          permanent: false,
        },
    ];
  },
};

export default nextConfig;
