const express = require('express');
const dotenv = require('dotenv');
const logger = require('./logger');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: 'server/.env.' + process.env.NODE_ENV || 'development'});

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares');
const resolve = require('path').resolve;
const app = express();

// In production we need to pass these values in instead of relying on webpack
setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 80;

// Start your app.
app.listen(port, (err) => {
    if (err) {
        return logger.error(err.message);
    }


    logger.appStarted(port);

});

