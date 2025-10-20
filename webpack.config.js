const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  // Remote name as it will be consumed by the shell
  name: 'products',

  // Entry file served by this remote
  filename: 'remoteEntry.js',

  // Expose the standalone Parent component so the host can load it
  exposes: {
    './Products': './src/app/parent/parent.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
