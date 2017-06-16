const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              compact: false,
              cacheDirectory: true,
              //presets: [
              //  ['env', {targets: {browsers: ['last 2 versions']}}]
              //],
              presets: ['stage-0', ['es2015', {modules: false, loose: true}]],
              plugins: [
                'syntax-decorators',
                ['angularjs-annotate', {explicitOnly: true}],
                'lodash'
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {loader: 'raw-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {loader: 'url-loader', options: {limit: 8192}},
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}},
        ]
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {loader: 'file-loader'},
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: false
    }),

    //copy static assets
    new CopyWebpackPlugin([
      {
        context: 'client/fonts',
        from: '**/*',
        to: 'fonts'
      },
      {
        context: 'client/img',
        from: '**/*',
        to: 'img'
      },
      {
        context: 'node_modules/font-awesome/fonts',
        from: '**/*',
        to: 'fonts'
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '70-100'
      },
      svgo: {
        removeViewBox: false
      }
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     return module.resource && module.resource.indexOf(path.resolve(__dirname, 'node_modules')) !== -1;
    //   }
    // })
  ]
};
