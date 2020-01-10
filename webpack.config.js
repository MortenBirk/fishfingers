const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: path.join(__dirname, 'src/frontend/index.js'),
   output: {
      path: path.join(__dirname, 'build/'),
      filename: 'index.js'
   },
   devServer: {
      contentBase: path.join(__dirname, 'public/'),
      hot: true,
      inline: true,
      open: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: path.join(__dirname, 'public/index.html')
      })
   ]
}