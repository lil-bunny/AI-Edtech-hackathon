import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'build/web'  // Specify the export directory
};


module.exports = {
  output: 'standalone', // or omit 'output' if default settings are sufficient
};

export default nextConfig;
