'use strict';

const _ = require('lodash');
const log4js = require('log4js');
const express = require('express');
const Context = require('context2');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');

log4js.configure(_.pick(config.logging, 'appenders', 'categories'));

const logger = log4js.getLogger('system');

logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  _.forEach(['headers', 'method', 'body'], name => logger.debug(`${name}:`, req[name]));
  next();
});

const context = new Context({ config });

app.set('context', context);

const { server: { host, port } } = config;
logger.info(`listen: ${host}:${port}`);
app.listen(port);
