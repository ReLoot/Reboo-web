module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    open: true,
    proxy: {
        '/api': {
            // target: process.env.VUE_APP_URL,
            target: 'https://101.32.186.13:8082/',
            changeOrigin: true,         // 是否改变域名
            pathRewrite: {
              '/api': '/'
            }
        },
    }
  }   
}