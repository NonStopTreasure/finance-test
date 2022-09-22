const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@enums': path.resolve(__dirname, 'src/common/enums'),
      '@interfaces': path.resolve(__dirname, 'src/common/interfaces'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@tests': path.resolve(__dirname, 'src/tests'),
    },
  };
  return config;
};
