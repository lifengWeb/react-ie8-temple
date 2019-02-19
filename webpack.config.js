module.exports = {
  entry: ["babel-polyfill", './entry.js'],
  output: {filename:'bundle.js',path:'/'},
  debug: true,
  devtool: 'source-map',
  devServer: {
      historyApiFallback:{
          index:'./index.html'
      },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.css$/, loader: "style-loader!css-loader",options:{modules: true,}},
      {test: /\.(png|jpg)$/,loader: 'url-loader'}
    ],
    postLoaders:[//ie8缺少标识符defualt
      {
        test:/\.js$/,
        loaders:['es3ify-loader']
      }
    ]
  },
};
