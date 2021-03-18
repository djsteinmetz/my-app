module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
      return config
    },
    env: {
      API_SECRET: '737391c4-8faa-4442-8c5b-09ca8a95cc75'
    }
  }