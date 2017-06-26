const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config.base')({
    entry: [
        path.join(process.cwd(), 'src/app.js'),
    ],
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    externals: {
        'AppConfig': JSON.stringify(require('../configs/production.json'))
    },
    babelQuery : {
        presets: [
            "es2015",
            "react",
            "stage-2"
        ],
        plugins: ["transform-decorators-legacy"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                drop_console: true,
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: false,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        })
    ]
});
