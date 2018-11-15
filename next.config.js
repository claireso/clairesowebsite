const withOffline = require('next-offline')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = withOffline({
  workboxOpts: {
    runtimeCaching: [{
      urlPattern: /\.mp4$/,
      handler: 'networkOnly',
    }]
  },
  webpack(config, { dev, isServer }) {
    if (isServer || dev) {
      return config
    }

    return {
      ...config,
      plugins: [
        ...config.plugins,
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js(\?.*)?$/i
        })
      ]
    }
  }
})
