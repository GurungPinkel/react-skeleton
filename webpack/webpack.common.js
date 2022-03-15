const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');

let envFile;

if (process.env.NODE_ENV === 'PRODUCTION') {
  envFile = '.env.production';
} else if (process.env.NODE_ENV === 'DEVELOPMENT') {
  envFile = '.env.development';
} else {
  envFile = '.env.development.local';
}

const env = dotenv.config({
  path: path.join(__dirname, '..', envFile)
}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[`process.env.${next}`] = JSON.stringify(env[next]);

  return prev;
}, {});

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(tsx|mjs|jsx|ts|js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          globOptions: {
            ignore: ['**/*.html']
          },
          to: './'
        }
      ]
    }),
    new webpack.DefinePlugin(envKeys)
  ]
};
