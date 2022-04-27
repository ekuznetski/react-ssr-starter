const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require("path");

module.exports = (env, args) => {
  const isProd = args.mode !== "development";
  const config = {
    entry: "./src/index.tsx",
    mode: isProd ? "production" : "development",
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
      filename: "bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
        hash: true,
        filename: "index.html",
      }),
    ],
    devServer: {
      port: 3000,
      hot: true,
      open: true,
    },
  };

  if (!isProd) {
    config.devtool = "eval";
  } else {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
