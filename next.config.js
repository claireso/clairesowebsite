const withOffline = require('next-offline')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = withOffline({
  workboxOpts: {
    globPatterns: ['static/**/*'],
    globDirectory: '.',
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'staleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets'
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'cacheFirst',
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
        handler: 'networkFirst'
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

    return {
      ...config,
      ...additionalConfig
    }
  },
  serverRuntimeConfig: {}
})
