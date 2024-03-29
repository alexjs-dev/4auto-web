/* eslint-disable no-param-reassign */
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-svgr')

module.exports = withPlugins([withFonts, withSvgr], {
  env: {
    API_URL: process.env.API_URL,
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
  webpack5: false,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    const tempConfig = config
    return tempConfig
  },
})
