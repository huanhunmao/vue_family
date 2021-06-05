const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, "app.js");
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ["webpack-hot-middleware/client", entry];
    }

    return entries;
  }, {}),

  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/__build__/",
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.vue$/, use: ["vue-loader"] },
      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
    ],
  },

  resolve: {
    // 别名
    alias: {
      vuex: path.resolve(__dirname, "../src/index.js"),
    },
  },

  // 此处为分割代码块  常规分成 公共部分 和 第三方部分
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "shared",
          filename: "shared.js",
          chunks: "initial",
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    new webpack.DefinePlugin({
      // DefinePlugin 允许创建一个在编译时可以配置的全局常量
      __DEV__: JSON.stringify(true), // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
