'use strict'

const port = 8081
const server = 8082

module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: `http://localhost:${server}`,  //这里所有api开头的都被代理到了 localhost:${server} 这样就解决了跨域问题
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  //删除api这三个字
        }
      }
    }
  }
}
