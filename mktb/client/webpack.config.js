var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  context:  path.join(__dirname, 'src'),
  entry: {
    main: "./index.es6"
  },
  output: {
    path: path.join(__dirname, "../public/"),
    publicPath: "public/",
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=30000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=30000&minetype=application/font-woff2" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  noParse: /\.min\.js/,
  devtool: "source-map"
};
