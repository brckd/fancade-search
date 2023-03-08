const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

/** @type {HtmlWebpackPlugin.Options} */
const templateOptions = {
  title: "Fancade Search",
  scriptLoading: "module",
  meta: {
    "og:url": "https://brycked.github.io/fancade-search",
    "og:title": "Search through a world of games! Or submit your own?",
    "og:description": (description =
      "Fancade search is a huge collection of Fancade games. Search them instantly, or submit your own games!"),
    description,
  },
};

/** @type { import("webpack").Configuration } */
module.exports = {
  entry: {
    shared: "./src/shared/index.ts",
    home: "./src/home/index.ts",
    search: "./src/search/index.ts",
    game: "./src/game/index.ts",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      ...templateOptions,
      filename: "index.html",
      template: "src/home/index.ejs",
      chunks: ["shared", "home"],
    }),
    new HtmlWebpackPlugin({
      ...templateOptions,
      filename: "search/index.html",
      template: "src/search/index.ejs",
      chunks: ["shared", "search"],
    }),
    new HtmlWebpackPlugin({
      ...templateOptions,
      filename: "game/index.html",
      template: "src/game/index.ejs",
      chunks: ["shared", "game"],
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
