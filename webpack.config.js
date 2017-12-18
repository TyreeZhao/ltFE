const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {LOCAL_DEV_IP, LOCAL_DEV_PORT, S3_RELEASE_URL} = require('./config');
const VERSION = require('./package.json').version;

const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = 'prod' === NODE_ENV;
const IS_BETA = 'beta' === NODE_ENV;
const IS_DEVELOPMENT = 'dev' === NODE_ENV;
const hostAddress = `https://${LOCAL_DEV_IP}:${LOCAL_DEV_PORT}`;

console.log(`current NODE_ENV is ${NODE_ENV}`);

const cssLoaderModule = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: IS_PRODUCTION,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
}

let webpackConfig = {
  // context: path.join(__dirname, 'src'),
  entry: {
    app: path.join(__dirname, 'src/app.js'),
    vendor: ['react', 'react-dom', 'isomorphic-fetch'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name]-[hash].js",
    publicPath: '/',
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    publicPath: '/',
    port: LOCAL_DEV_PORT,
    inline: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        include: /src/,
        use: [
          'style-loader',
          cssLoaderModule,
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|icon|ico)$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 65536,
          name: 'images/[hash].[ext]'
        }
      },
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        include: '/',
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(path.join(__dirname, 'src')),
      path.resolve(path.join(__dirname, 'node_modules')),
    ],
  },
  plugins: (() => {

    let webpackPlugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.VERSION': JSON.stringify(VERSION),
      }),
      new CopyWebpackPlugin([
        {
          from: './src/images',
          to: path.join(__dirname, 'dist/')
        }
      ]),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: false,
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
    ];

    if (IS_PRODUCTION || IS_BETA) {
      webpackPlugins.push(new webpack.optimize.ModuleConcatenationPlugin())
      webpackPlugins.push(new webpack.optimize.UglifyJsPlugin())
    } else {
      // webpackPlugins.push(new webpack.HotModuleReplacementPlugin())
      webpackPlugins.push(new webpack.NamedModulesPlugin())
    }

    return webpackPlugins;
  })(),
};

module.exports = webpackConfig;
