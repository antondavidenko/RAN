var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./js/profile.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}