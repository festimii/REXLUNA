/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false, // 🔴 disable Next.js built-in compression (Nginx will handle it)

  images: {
    domains: ["ui-avatars.com"],
  },
};

module.exports = nextConfig;
