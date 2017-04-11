const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.ENV


const cssLoaderModule = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: false,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
}

let webpackConfig = {
	entry: {
		src: ['babel-polyfill', path.join(__dirname, 'src/app.js')],
	},
	output: {
		path: path.join(__dirname, 'release/dist'),
		filename: '[name].[hash:8].dist.js',
		publicPath: ((e) => {
			const m = {
				dev: '/',
				beta: '/',
				prod: './dist/',
			}
			return m[e]
		})(env),
	},
	devServer: {
		inline: true,
		contentBase: path.join(__dirname),
		compress: true,
		historyApiFallback: {
			index: './index.html'
		},
		host: '127.0.0.1',
		port: '4466',
	},
	module: {
		rules: [{
			test: /\.(css)$/,
			use: [{
				loader: 'style-loader',
			}, {
				loader: 'css-loader',
				options: {
					modules: true,
					sourceMap: false,
					importLoaders: 1,
					localIdentName: '[hash:base32:5]'
				}
			}, {
				loader: 'postcss-loader'
			}]
		}, {
        test: /\.(scss|css)$/,
        include: /src/,
        use: [
          'style-loader',
          cssLoaderModule,
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(path.join(__dirname, 'node_modules')),
              ],
            },
          },
        ],
      }, {
          test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
              name: 'fonts/[hash].[ext]'
          }
      }, {
          test: /\.(mp3)$/,
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
              limit: 16384,
              name: 'audio/[hash].[ext]'
          }
      }, {
          test: /\.(png|jpg|gif|icon|ico)$/,
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
              limit: 65536,
              name: 'images/[hash].[ext]'
          }
      }, {
          test: /\.(js|jsx)$/,
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/,
          loader: 'babel-loader',
      }],
	},
	plugins: (() => {
      let webpackPlugins = [
          new webpack.DefinePlugin({
              // 'process.env.NODE_ENV': JSON.stringify('development'),
          }),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
					new HtmlWebpackPlugin({
						template: path.join(__dirname, './src/index.html'),
						minify: {
							removeComments: true,
							collapseWhitespace: false,
						},
					}),
      ];

      return webpackPlugins;
	})(),
};

webpackConfig.devtool = 'cheap-source-map';

module.exports = webpackConfig;
