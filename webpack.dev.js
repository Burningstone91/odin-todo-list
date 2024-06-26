const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    allowedHosts: 'all',
    static: "./dist",
  },
});
