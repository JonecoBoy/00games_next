/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['joneco.dev.br'],
    path:'http://joneco.dev.br:1337',
    unoptimized: true,
    // remotePatterns:[
    //   {
    //     protocol: "http",
    //     hostname: "joneco.dev.br:1337",
    //     pathname: "/uploads/**"
    //   }
    // ]
},
}

module.exports = nextConfig
