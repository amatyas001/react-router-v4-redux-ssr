const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

console.log('\ncurrent pathname is:\n', path.resolve(__dirname, 'dist'), '\n');

const main = ['./src/index.js'];
let plugins = [];
let cssLoaders = [];
let handleJS = {};
let devServer = {};

if (process.argv.includes('NODE_ENV=production')) {

  console.log('Bundling for production...\n\n');
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('production'),
        PORT: 3005,
      },
      '__DEV__': false,
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
    }),
  ];

  cssLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader',
  });

  handleJS = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'es2015', 'stage-0', 'react'],
      },
    },
  };
}
else {
  console.log('Preparing dev server...\n\n');
  main.unshift('webpack-hot-middleware/client');

  devServer = {
    contentBase: path.join(__dirname, 'public'),
    port: 3005,
  };

  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('development'),
        PORT: 3005,
      },
      '__DEV__': true,
    }),
  ];

  cssLoaders = [
    'style-loader',
    'css-loader',
  ];

  handleJS = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      path.join(__dirname, 'src'),
    ],
    query: {
      env: {
        development: {
          presets: ['react-hmre'],
          plugins: [
            [
              'react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }],
              },
            ],
          ],
        },
      },
    },
  };
}

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    main,
  },
  devServer,
  module: {
    rules: [
      handleJS,
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
};
