/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-image-domain.com', // Add all domains where your images are hosted
      'utfs.io', // If you're using uploadthing
      // Add any other domains you need
    ],
  },
}

module.exports = nextConfig
