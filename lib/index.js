'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash');

_.forEach(fs.readdirSync(__dirname), filename => {
  const file = require(`./${filename}`);
  if (fs.lstatSync(path.resolve(__dirname, filename)).isDirectory()) {
    filename += 's';
  } else {
    filename = path.basename(filename, '.js');
    filename = file.constructor ? _.capitalize(filename) : _.camelCase(filename);
  }
  exports[filename] = file;
});
