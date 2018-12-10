'use strict';

const pkg = require('./package.json');
const plugin = require('./src/plugin');

module.exports = {
  register: plugin,
  name: pkg.name,
  version: pkg.version
};
