const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: path.join(__dirname, 'src/frontend/index.js'),
   performance: { hints: false },
   output: {
      path:  path.join(process.cwd(), 'build/'),
      filename: 'index.js'
   },
   devServer: {
      contentBase: path.join(__dirname, 'public/'),
      hot: true,
      inline: true,
      open: true,
      port: 8001
   },
   resolve: {
      alias: {
        fishfingers: path.resolve('./fishfingers/'),
        root: path.resolve('./')
      }
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules\/fishfingers\/node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                 presets: ["@babel/preset-env", "@babel/preset-react"]
               }
            }
         },
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.join(__dirname, 'public/index.html')
      })
   ]
}