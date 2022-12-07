
module.exports = {
  transpileDependencies: true,
  outputDir: "../src/main/resources/static/static-vue",
  indexPath: "../index.html",
  devServer: {
    port: 8081,
    proxy: "http://localhost:8080"
  },
  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
}
}
