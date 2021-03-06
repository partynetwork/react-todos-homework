/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({ // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
    }, options.output), // Merge with env dependent settings
    module: {
        loaders: [
            {
                test: /\.js$/, // Transform all .js files required somewhere with Babel
                loader: 'babel-loader',
                // include: path.join(process.cwd(), 'src'),
                exclude: /node_modules/,
                query: options.babelQuery,
                // query: {
                //     "presets": ["es2015", "stage-0", "react"],
                // }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:6]',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(process.cwd(), 'node_modules/bootstrap/scss/')
                ],
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[local]',
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(jpg|png|gif)$/,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader?limit=10000',
            }],
    },
    plugins: options.plugins.concat([
        new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
        new webpack.ProvidePlugin({
            // make fetch available
            fetch: 'exports?self.fetch!whatwg-fetch',
        }),

        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NamedModulesPlugin(),
    ]),
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.scss',
            '.react.js',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
        alias : {
            'bootstrap-grid' : path.resolve(process.cwd(), 'node_modules/bootstrap/scss/bootstrap-grid.scss'),
            'bootstrap-reboot' : path.resolve(process.cwd(), 'node_modules/bootstrap/scss/bootstrap-reboot.scss'),
            AppConfig: path.join(process.cwd(), `configs/${process.env.NODE_ENV}.json`)
        }
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
});
