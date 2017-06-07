// webpack.config.js
var ScreepsWebpackPlugin = require('screeps-webpack-plugin');
var path = require('path');

module.exports = {
  target: 'node',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname),
    filename: 'main.js',
    pathinfo: true,
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    console: true,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  plugins: []
}