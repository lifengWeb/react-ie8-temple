module.exports = {
  entry: './entry.js',
  output: 'bundle.js',
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.css$/, loader: "style-loader!css-loader"},
    ],
    postLoaders:[//ie8缺少标识符defualt
      {
        test:/\.js$/,
        loaders:['es3ify-loader']
      }
    ]
  },
};
