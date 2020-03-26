const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = {
  mode: 'production',
  entry: {
    'content-script': './src/index.tsx',
    options: './src/options.ts',
    background: './src/background.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib')
  },
  optimization: {
    minimize: false
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new ExtensionReloader({manifest: path.resolve(__dirname, 'src/manifest.json')}),
    new CopyWebpackPlugin([{from: 'src/manifest.json'}]),
    new CopyWebpackPlugin([{from: 'src/options.html'}]),
    new CopyWebpackPlugin([{from: 'src/icons', patterns: ['*.png'], to: 'icons'}])
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.ts', '.tsx', '.json', '.js']
  }
};
