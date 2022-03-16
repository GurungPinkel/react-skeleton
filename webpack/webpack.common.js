const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');

// const isProduction = process.env.NODE_ENV === 'PRODUCTION';
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
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: parseInt(process.env.WEBPACK_MAX_INLINE_SIZE, 10) || 5000 // Images less than 5kb will be inline
              }
            },
            generator: {
              filename: 'static/images/[name].[hash:8][ext]'
            }
          },
          {
            test: /\.svg/,
            type: 'asset/inline'
          },
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
