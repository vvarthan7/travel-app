/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "mockmind-api.uifaces.co", protocol: "https" },
      { hostname: "images.pexels.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
