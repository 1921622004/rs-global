const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }],
    '@babel/plugin-proposal-class-properties'
  ]
};
const cssLoaderOptions = {
  sourceMap: true
}

module.exports = merge({}, {
  entry: './src/index.tsx',
  output: {
    filename: 'build.[hash].js',
    path: path.resolve('testBuild')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: cssLoaderOptions
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: cssLoaderOptions
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve('template/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    port: '8080',
    contentBase: 'testBuild',
    open: true
  },
  mode: 'development'
})