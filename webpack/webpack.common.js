const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const dotenv = require('dotenv');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const isProduction = process.env.NODE_ENV === 'PRODUCTION';
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
  devtool: isProduction ? 'hidden-source-map' : 'source-map',
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
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              {
                loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      ['postcss-flexbugs-fixes'],
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: {
                            flexbox: 'no-2009'
                          },
                          stage: 2
                        }
                      ]
                    ]
                  }
                }
              }
            ]
          },
          {
            test: cssModuleRegex,
            use: [
              {
                loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      ['postcss-flexbugs-fixes'],
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: {
                            flexbox: 'no-2009'
                          },
                          stage: 2
                        }
                      ]
                    ]
                  }
                }
              }
            ]
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      ['postcss-flexbugs-fixes'],
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: {
                            flexbox: 'no-2009'
                          },
                          stage: 2
                        }
                      ]
                    ]
                  }
                }
              },
              'resolve-url-loader',
              'sass-loader'
            ]
          },
          {
            test: sassModuleRegex,
            use: [
              {
                loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      ['postcss-flexbugs-fixes'],
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: {
                            flexbox: 'no-2009'
                          },
                          stage: 2
                        }
                      ]
                    ]
                  }
                }
              },
              'resolve-url-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(woff(2)?|eot|ttf|otf)$/,
            type: 'asset',
            generator: {
              filename: 'static/fonts/[name][ext]'
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
