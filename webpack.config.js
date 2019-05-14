const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const Path = require("path");

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const copyPlugin = new copyWebpackPlugin([
  {
    from: "src/assets",
    to: "dist/"
  }
]);

module.exports = (env, argv) => {
  return {
    optimization: {
      nodeEnv: argv.mode
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
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
          test: /\.(png|jpg|jp(e)g|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|svg|jpg|jp(e)g|png|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: "file-loader?name=assets[name].[ext]",
              options: {
                name(file) {
                  if (argv.mode === "development") {
                    return "[path][name].[ext]";
                  }
                  return "[hash].[ext]";
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [htmlPlugin, miniCssPlugin, copyPlugin]
  };
};
