/* eslint-disable no-param-reassign */
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-svgr')
const withTypescript = require('@zeit/next-typescript')

module.exports = withPlugins([withFonts, withSvgr, withTypescript], {
  env: {
    API_URL: process.env.API_URL,
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
  webpack(config) {
    const tempConfig = config
    return tempConfig
  },
})
