const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/,'three.js'],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.join(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test:/\.(jpg|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name:'[name].[ext]',
            public: 'dist/textures',
            outputPath:'textures'
          }
        }],
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
      },
      {
        test: /\.glsl$/,
        use: {
          loader: 'shade-loader'
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, //服务器返回浏览器的时候是否启动gzip压缩
    port: 8033,
    host: "127.0.0.1",
  },
  resolveLoader: {
    modules: [path.join(__dirname, './src/loaders'), 'node_modules']
  },  
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: true,
      minify: {
        minimize: true, //压缩代码
        removeComments: true, //移除注释
        collapseWhitespace: true, //去掉空格
        minifyCSS: true, //压缩行内css
        minifyJS: false //压缩行内js
      }
    }),
    new webpack.NamedModulesPlugin(), 
  ]
};