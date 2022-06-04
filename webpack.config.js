/* webpack.config.js */

const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    // publicPath: 'public',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
