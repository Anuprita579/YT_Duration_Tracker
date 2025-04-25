/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  // distDir: './dist', // Changes the build output directory to `./dist/`.
  distDir: "build", // 👈 important for Chrome Extension
  trailingSlash: true, // needed for export
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
