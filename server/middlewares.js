
/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const compression = require('compression');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
    const proxy = require('http-proxy-middleware');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        silent: false,
        stats: 'verbose',
        hot: true,
        historyApiFallback: true,
        publicPath: webpackConfig.output.publicPath,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;
    app.get('*', (req, res) => {
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
            if (err) {
                console.error(err);
                res.sendStatus(404);
            } else {
                res.send(file.toString());
            }
        });
    });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
    const publicPath = '/';
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
    app.use(compression());
    app.use(publicPath, express.static(outputPath));


    app.get('*', (req, res) => {
        res.sendFile(path.resolve(outputPath, 'index.html'))
    });
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
    const isProd = process.env.NODE_ENV === 'production';

    if (isProd) {
        addProdMiddlewares(app, options);
    } else {
        const webpackConfig = require('../webpack/webpack.config.dev');
        addDevMiddlewares(app, webpackConfig);
    }

    return app;
};
