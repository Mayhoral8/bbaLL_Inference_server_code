const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "build"),
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new Dotenv({
      path: ".env.development",
      systemvars: true,
    }),
  ],
  devtool: 'cheap-inline-module-source-map'
});
