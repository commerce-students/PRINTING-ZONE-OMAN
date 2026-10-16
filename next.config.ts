import type { NextConfig } from "next";

/**
 * Printing Zone Oman — website concept build.
 *
 * Notes for whoever ships this:
 * - No third-party image hosts are configured on purpose. All imagery in this
 *   concept lives in `public/media` so the build has no external dependencies.
 * - Server Actions are used for the cart, checkout and enquiry forms; the upload
 *   limit below is a hard ceiling for artwork files posted to those actions.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 128, 200, 256, 320, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
