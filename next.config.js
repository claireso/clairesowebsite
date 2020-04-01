const withOffline = require('next-offline')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = withOffline({
  workboxOpts: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets'
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          cacheableResponse: {
            statuses: [0, 200]
          },
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365
          }
        }
      },
      {
        urlPattern: /^https?:\/\/clairesosset\.fr\/.*/,
        handler: 'NetworkFirst'
      }
    ]
  },
  webpack(config, { dev, isServer }) {
    const additionalConfig = {}

    // add gzip for client production
    if (!isServer && !dev) {
      additionalConfig.plugins = [
        ...config.plugins,
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js(\?.*)?$/i
        })
      ]
    }

    additionalConfig.entry = async () => {
      const entries = await config.entry()

      // client only
      if (entries['main.js']) {
        entries['static/runtime/polyfills.js'] = './client/polyfills.js'
      }

      return entries
    }

    return {
      ...config,
      ...additionalConfig
    }
  },
  poweredByHeader: false,
  env: {}
})
