/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "", // No port needed for HTTPS
        pathname: "/**", // Allows any path
      },
      {
        protocol: "https",
        hostname: "mjtechsolutions.in",
        port: "", // No port needed for HTTPS
        pathname: "/**", // Allows any path
      },
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
