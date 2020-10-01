require('dotenv').config()

module.exports = {
  env: {
    CMS_URL: process.env.CMS_URL,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_STRIPE: process.env.NEXT_PUBLIC_STRIPE
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
