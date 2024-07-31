/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost','37.27.184.93'],
      },
      serverRuntimeConfig: {
        apiHost: process.env.NEXT_PUBLIC_API_HOST,
        imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL,
      }
};

export default nextConfig;
