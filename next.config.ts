import type { NextConfig } from "next";

// `experimental.viewTransition` was here for one afternoon, to morph the
// landing's sign into a scaled copy of itself in the shop nav. That copy is
// gone (ComingSoon.tsx), so nothing renders <ViewTransition> and the flag was
// enabling an experiment for no caller.
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
        {
          source: "/products/pajama-pant",
          destination: "/products/pajama",
          permanent: false,
        },
    ];
  },
};

export default nextConfig;
