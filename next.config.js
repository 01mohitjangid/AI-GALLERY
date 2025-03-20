// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['i.pinimg.com'],
//         remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'utfs.io',
//             port: '',
//             pathname: '/f/**',
//           },
//         ],
//       },
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["i.pinimg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
};

module.exports = nextConfig;
