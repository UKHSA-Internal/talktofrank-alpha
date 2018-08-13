var path = require('path')
var webpack = require('webpack')


const processEnv = {NODE_ENV: !process.env.BUILD_CONFIG
  ? JSON.stringify('development')
  : process.env.BUILD_CONFIG === 'development'
    ? JSON.stringify('development')
    : JSON.stringify('production'),
BUILD_CONFIG: JSON.stringify(process.env.BUILD_CONFIG),
PORT: JSON.stringify(process.env.PORT)}

module.exports = {
  client: {
    entry: {
      client: './app/client/index.jsx',
      vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'redux-thunk']
    },
    output: {
      path: path.resolve(__dirname, '../dist/static/ui/js/'),
      filename: '[name].bundle.js',
      devtoolLineToLine: true,
      sourceMapFilename: './bundle.js.map',
      pathinfo: true,
      publicPath: '/ui/js/' // need this to ensure that the lazy loaded components can map PATH > URL
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        './node_modules',
        path.resolve(__dirname, './client'),

      ],
      // need this to ensure Webpack can read
      mainFields: ['webpack', 'browser', 'web', 'main'],
      // require this for build, but don't want to expose config to browser.
      alias: {
        'config': path.resolve(__dirname, '../app/client/client-config-loader.js')
      }

    },
    resolveLoader: {
    },
    module: {
      rules: [{
        test: [/\.jsx$/, /\.js$/],
        use: [{
          loader: 'babel-loader'
        }]
      }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        //filename: '[name].[hash].js'
        filename: '[name].bundle.js'
      }),
      new webpack.DefinePlugin({
        'process.env': processEnv
      })
    ],
    stats: {
      colors: true,
      modules: false,
      reasons: false,
      errorDetails: true
    }
  },
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
        'process.env': processEnv
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
