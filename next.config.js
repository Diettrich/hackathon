/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.a.transfermarkt.technology",
      },
    ],
  },
  basePath: "",

  images: {
    domains: ["upload.wikimedia.org", "img.a.transfermarkt.technology"],
  },
};

module.exports = nextConfig;
