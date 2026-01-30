import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' - this app needs server-side features
  // For cPanel hosting, you'll need to:
  // 1. Deploy to Vercel (free, recommended)
  // 2. Use VPS with Node.js
  // 3. Or use a different hosting that supports Next.js

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
