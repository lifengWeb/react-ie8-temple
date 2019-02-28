module.exports = {
  entry: ["babel-polyfill", './entry.js'],
  output: {filename:'bundle.js',path:'/'},
  debug: true,
  devtool: 'source-map',
  devServer: {
      historyApiFallback:{
          index:'./index.html'
      },      
      proxy: {
        "/api":{
            changeOrigin: true,
            target: "http://medical.artloveasy.com",
            // pathRewrite: {
            //   '^http://localhost:8080/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
            // }
        }
    }    
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.css$/, loader: "style-loader!css-loader", use: [
        {
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
              modules: true, // 指定启用css modules
              localIdentName: '[name]_[local]_[hash:base64:5]' // 指定css的类名格式
              }
          }
    ],},
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
