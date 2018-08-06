var path = require('path')
var webpack = require('webpack')

module.exports = {
  server: {
    devtool: 'eval',
    entry: {
      server: './app/server/index.jsx'
    },
    output: {
      path: path.resolve(__dirname, '../dist/app/'),
      filename: '[name].bundle.js',
      devtoolLineToLine: true,
      sourceMapFilename: './bundle.js.map',
      pathinfo: true
    },
    target: 'node',
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        './node_modules',
        path.resolve(__dirname, 'app')
      ],
      // need this to ensure Webpack can read
      mainFields: ['webpack', 'main'],
      alias: {
        'config': path.resolve(__dirname, '../app/config-loader.js')
      }
    },
    resolveLoader: {
    },
    module: {
      rules: [{
        test: /\.jsx$/,
        use: [{
          loader: 'babel-loader'
        }]
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: !process.env.BUILD_CONFIG
            ? JSON.stringify('development')
            : process.env.BUILD_CONFIG === 'development'
              ? JSON.stringify('development')
              : JSON.stringify('production'),
          BUILD_CONFIG: JSON.stringify(process.env.BUILD_CONFIG),
          PORT: JSON.stringify(process.env.PORT)
        }
      })
    ],
    stats: {
      colors: true,
      modules: false,
      reasons: false,
      errorDetails: true
    }
  }
}
