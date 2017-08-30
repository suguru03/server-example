'use strict';

const _ = require('lodash');

const config = require('./default');
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'localhost';

_.merge(config, require(`./${env}`));

module.exports = config;
