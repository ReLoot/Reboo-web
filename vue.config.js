module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    open: true,
    proxy: {
        '/api': {
            // target: process.env.VUE_APP_URL,
            target: 'http://139.180.133.154:8082/',
            // target: 'http://192.168.2.23:8082/',
            // target: 'http://110.40.128.216:9000',
            changeOrigin: true,         // 是否改变域名
            pathRewrite: {
              '/api': '/'
            }
        },
        '/vib': {
          // target: 'http://45.32.20.228:9300/',
          // target: 'http://192.168.2.12:9300/',
          target: 'http://139.180.133.154:9300/',
          changeOrigin: true,
          pathRewrite: {
            '/vib': '/'
          }
        },
    }
  },
}