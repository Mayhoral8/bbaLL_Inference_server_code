const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  resolve: {
    alias: {
      Functions: path.resolve(__dirname, "src/Shared/Functions"),
      Firebase: path.resolve(__dirname, "src/App/config.js"),
      Assets: path.resolve(__dirname, "src/assets"),
      Constants: path.resolve(__dirname, "src/constants"),
      Redux: path.resolve(__dirname, "src/redux"),
      Shared: path.resolve(__dirname, "src/Shared"),
      JSON: path.resolve(__dirname, "src/JSON")
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
          },
        },
      },
      {
        test: /\.(ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]"
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      }
    ],
  },
  performance: {
    hints: false
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.ico'
    })
  ]
};
