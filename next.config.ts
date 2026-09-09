import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
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
        {
          source: "/products/pajama-pant",
          destination: "/products/pajama",
          permanent: false,
        },
    ];
  },
};

export default nextConfig;
