const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.load()

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: `${__dirname}/frontend/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/frontend/public`,
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /backend/],
        loader: 'babel-loader'
      }
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/frontend/app/index.html`,
    }),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(`${process.env.API_URL}:${process.env.BACKEND_PORT}`),
      __DEBUG__: JSON.stringify(!production)
    })
  ]
}
