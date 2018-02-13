var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: "./src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                use: {
                    loader:'babel-loader',
                    options: { presets: ['es2015-without-strict'] }
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};