const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

/** @type { import("webpack").Configuration } */
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Fancade Search",
      filename: "index.html",
      template: "src/index.ejs",
      scriptLoading: "module",
      meta: {
        description:
          "Fancade search is a huge collection of Fancade games. Search them instantly, or submit your own games!",
        "og:image": "src/img/icon.png",
        "og:url": "https://brycked.github.io/fancade-search",
        "og:title": "Search through a world of games! Or submit your own?",
        "og:description":
          "Fancade search is a huge collection of Fancade games. Search them instantly, or submit your own games!",
      },
      favicon: "src/img/icon.png",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: resolve(__dirname, "dist"),
    },
    hot: true,
  },
};
