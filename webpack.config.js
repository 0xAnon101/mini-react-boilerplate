const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Path = require("path");

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = (env, argv) => {
  return {
    optimization: {
      nodeEnv: argv.mode
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            argv.mode == "development"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          include: [Path.join(__dirname, "src/assets/")],
          loader: "file-loader?name=assets/[name].[ext]"
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {}
            }
          ]
        }
      ]
    },
    plugins: [htmlPlugin, miniCssPlugin]
  };
};
