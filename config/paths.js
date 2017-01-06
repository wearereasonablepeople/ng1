const path = require('path');
const root = 'client';

const resolveToApp = (glob = '') => path.join(root, 'app', glob);
const resolveToRoutes = (glob = '') => path.join(root, 'app/routes', glob);
const resolveToComponents = (glob = '') => path.join(root, 'app/components', glob);
const resolveToServices = (glob = '') => path.join(root, 'app/services', glob);

console.log(__dirname, process.cwd());

// Map of all paths
const paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  blankComponent: path.join(__dirname, 'generator', 'component/**/*.**'),
  blankService: path.join(__dirname, 'generator', 'service/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

module.exports = {
  paths, 
  resolveToApp,
  resolveToRoutes,
  resolveToComponents,
  resolveToServices,
};