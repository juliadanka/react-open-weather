var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
var path = require("path");
var isProd = process.env.NODE_ENV === 'production'
var cssDev = ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'sass-loader'],
    publicPath: '/dist'
});

var cssConfig = isProd ? cssProd : cssDev;
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './'
  },
  module: {
    rules: [

      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory=false'

      },
        {
            test: /\.(jpe?g|png|gif|ico)$/i,
            use: [

                'file-loader?name=[name].[ext]&outputPath=images/&publicPath=./',
                'image-webpack-loader'
            ]
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=[name].[ext]&outputPath=font/&publicPath=./'
        }

    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: true,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather',
      filename: 'index.html',
      template: './src/index.html',
      hash: true
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
