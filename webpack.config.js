const path = require('path');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [/src/, /node_modules/]
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        include: '/build/contracts/'
      }
    ]
  }
};
