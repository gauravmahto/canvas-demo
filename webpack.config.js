import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default {
  entry: './bin/js-output/src/main.js',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: resolve(
            rootDir,
            'src',
            'index.ejs'
          ), to: resolve(
            rootDir,
            'bin',
            'js-output',
            'src',
            'index.ejs'
          )
        },
        {
          from: resolve(
            rootDir,
            'src',
            'images'
          ), to: resolve(
            rootDir,
            'bin',
            'js-output',
            'src',
            'images'
          )
        },
        {
          from: resolve(
            rootDir,
            'src',
            'videos'
          ), to: resolve(
            rootDir,
            'bin',
            'js-output',
            'src',
            'videos'
          )
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: resolve(
        rootDir,
        'bin',
        'js-output',
        'src',
        'index.ejs'
      )
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          variable: 'data',
          interpolate: '\\{\\{(.+?)\\}\\}',
          evaluate: '\\[\\[(.+?)\\]\\]'
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    clean: true,
    path: resolve(
      rootDir,
      'bin',
      'dist'
    )
  }
};
