/**
 * Created by luthfi on 1/13/17.
 */
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/client.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [
                    /(node_modules|bower_components)/,
                    path.resolve(__dirname, 'src/assets')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "client.min.js"
    },
    plugins: [
            new CopyWebpackPlugin([
                {
                    from: "index.html",
                    to: "index.html"
                },
                {
                    from: 'assets',
                    to: 'assets'
                },
                {
                    copyUnmodified: true
                }
            ])
        ],
};