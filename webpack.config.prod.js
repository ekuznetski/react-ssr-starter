const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, args) => ({
  entry: path.resolve(__dirname, "./src/index.tsx"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      hash: true,
      filename: "index.html",
    }),
  ],
});
