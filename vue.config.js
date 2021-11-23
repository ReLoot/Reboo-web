module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    open: true,
    proxy: {
        '/api': {
            // target: process.env.VUE_APP_URL,
            target: 'http://101.32.186.13:8082/',
            // target: 'http://110.40.128.216:9000',
            changeOrigin: true,         // 是否改变域名
            pathRewrite: {
              '/api': '/'
            }
        },
        '/vib': {
          target: 'http://45.32.20.228:9300/',
          changeOrigin: true,
          pathRewrite: {
            '/vib': '/'
          }
        }
    }
  }
}