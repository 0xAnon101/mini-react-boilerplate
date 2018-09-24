const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =  require('mini-css-extract-plugin');



const miniCssPlugin = new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename:  '[id].[hash].css',
})

const htmlPlugin =  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
})

module.exports  = (env,argv) => {

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
                    loader:  'babel-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  argv.mode =='development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: "[name]_[local]_[hash:base64:5]",
                    }
                  },
                  'sass-loader'
                ]
            }
           
        ]
    },
    plugins: [htmlPlugin,miniCssPlugin]
}
}