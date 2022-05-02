const path = require("path");
const nodeExternals = require("webpack-node-externals");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
  entry: path.resolve(__dirname, "./src/server.tsx"),
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: __dirname + "/dist",
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              memo: true,
            },
          },
        ],
      },
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
    extensions: [".tsx", ".ts", ".js", ".json", ".sass", ".scss", ".css"],
  },
  plugins: [new MiniCssExtractPlugin()],
});
