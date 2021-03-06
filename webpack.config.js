const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "cheap-module-source-map",

  entry: {
    'app': path.resolve(__dirname, 'src', 'index.jsx'),
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(gif|png|jpg|woff|woff2|eot|svg|ttf)\??.*$/,
        loader: 'url-loader?limit=20000&name=assets/[name].[ext]'
      }
    ]
  },

  resolve: {
    alias: {
      node_modules: path.join(__dirname, 'node_modules'),
    },
  },

  externals: {
    'jquery': 'window.jQuery',
  },

  devServer: {
    publicPath: '/',
    port: 9090,
    contentBase: path.resolve(__dirname, 'dist'),
    // openPage: '/',
    inline: true,
    // inline:false,
    stats: "errors-only",
    historyApiFallback: {
      index: '/view/index.html'
    },
  },

  plugins: [
    //html模板处理
    new HtmlWebpackPlugin({
      filename: 'view/index.html',
      title: '玄换后台管理系统',
      template: './src/index.html',
      favicon: './favicon.ico',
      inject: true,
      hash: true,
      chunks: ['vendors', 'app'],
      chunksSortMode: 'dependency'
    }),

    // 独立通用模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/base.js',
    }),

    // 抽离css文件
    new ExtractTextPlugin('css/[name].css'),

  ],
};