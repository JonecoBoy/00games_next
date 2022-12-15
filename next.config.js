/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['https://localhost','localhost','http://localhost'],
    path:'http://localhost:1337'
},
}

module.exports = nextConfig
