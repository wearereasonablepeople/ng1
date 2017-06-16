import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';

process.noDeprecation = true;
//source code folder
const root = 'client';

// map of all paths
const paths = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
};

//use webpack.config.js to build modules
gulp.task('build', cb => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: false
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    'webpack-hot-middleware/client',
  ].concat(paths.entry);

  const compiler = webpack(config);

  serve({
    port: process.env.PORT || 4000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  });
});

gulp.task('default', ['serve']);
