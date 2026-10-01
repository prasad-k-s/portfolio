import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the project root so Next.js ignores stray lockfiles in parent folders
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
