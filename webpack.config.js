const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CopyPlugin = require('copy-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    app: './src/js/app'
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:3].js',
    path: path.resolve('app')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: prod,
    minimizer: [
      new ESBuildMinifyPlugin({
        css: true
      })
    ]
  },
  plugins: [
    new CopyPlugin({patterns: [{ from: 'src/*.html', to: '[name].html' }]}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],
  mode: prod ? 'production' : 'development'
};

module.exports = config;
