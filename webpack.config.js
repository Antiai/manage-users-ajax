'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: './frontend/app'
    },

    output: {
        path: '/public',  // FS-путь к статике
        publicPath: '/', // Web-путь к статике (CDN?)
        filename: 'js/[name].js'
    },

    watch: true,

    devtool: "source-map",

    devServer: {
      contentBase: path.resolve(__dirname, './public'),
      compress: true,
      port: 9000  // New
    },

    module: {
        rules: [
            {
                test: /\.js$/,           // .../node_modules/loader!file...
                include: __dirname + '/frontend',
                loader: "babel-loader",
                options: {
                    presets: ['es2015']
                }
            }, {
                test: /\.pug$/,
                loader: "pug-loader"
            }, {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!stylus-loader'
                })
            }
        ]
    },

    node: {
        fs: "empty"
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new GhPagesWebpackPlugin({
          path: './public',
          options: {
              message: 'Update Users Page',
              user: {
                  name: 'antiai',
                  email: 'awakening1985@gmail.com'
              }
          }
        })
    ]
};
