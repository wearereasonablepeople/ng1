const path = require('path');
const yargs = require('yargs');
const {times} = require('lodash');

// Source code folder
const root = `${yargs.argv.gulpEnv}/client`;

// Helper methods for resolving paths
const pathTypes = {
  app: 'app',
  components: 'app/components',
  constants: 'app/constants',
  core: 'app/core',
  factories: 'app/factories',
  routes: 'app/routes',
  services: 'app/services'
};
const resolvePath = (type, glob = '') => path.join(root, pathTypes[type], glob);

// Map of all paths
const paths = {
  js: resolvePath('components', '**/*!(.spec.js).js'),
  styl: resolvePath('app', '**/*.scss'),
  html: [
    resolvePath('app', '**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(root, 'app/app.js')
  ],
  output: root,
  blank: type => path.join(__dirname, '../..', 'assets/recipes', `${type}/**/*.**`),
  plugin: type => path.join(__dirname, '../..', 'assets/plugins', type)
};

// Generate path for scss files
const getAppRoot = string => string.substr(string.indexOf(pathTypes.app));
const getRootLevel = string => times(getAppRoot(string).split('/').length, '').join('../');

// Path for seed files
const seedRoot = path.join(__dirname, '../..', 'assets/seeds');

module.exports = {
  paths,
  resolvePath,
  getRootLevel,
  seedRoot
};
