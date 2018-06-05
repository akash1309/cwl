var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    mode: 'production',
    performance: { hints: false },
    entry: ['./app/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
              test: /.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['react']
              }
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};


// Extra Configs needed for webpack
// module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"],
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       }
//     ]
//   },
//
//   resolve: {
//     extensions: ['*', '.js', '.jsx']
//   },
// output: {
//   path: __dirname + '/dist',
//   publicPath: '/',
//   filename: 'bundle.js'
// },
// devServer: {
//   contentBase: './dist'
// }
// };
