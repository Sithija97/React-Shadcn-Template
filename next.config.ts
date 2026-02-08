import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      /* {
        protocol: "https",
        hostname: "linkedinclone.blob.core.windows.net",
      },*/
    ],
  } /* config options here */,
};

export default nextConfig;
