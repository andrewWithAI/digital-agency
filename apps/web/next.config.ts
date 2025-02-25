import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // This enables the standalone output mode which optimizes for containerized deployments
};

export default nextConfig;
