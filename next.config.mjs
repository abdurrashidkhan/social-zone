
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "graph.facebook.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cruip-tutorials.vercel.app",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   // Add your custom webpack configurations if needed
  //   return config;
  // },
};

export default (nextConfig);