const path = require('path');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  bail: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    })
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // })
  ],
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    publicPath: '/',
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          processorOptions: {
            parser: safePostCssParser
          }
        },
        minify: CssMinimizerPlugin.cleanCssMinify
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = merge(commonConfig, prodConfig);
