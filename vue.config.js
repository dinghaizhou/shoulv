module.exports = {
    // 选项...
    // base: '/aa',
    devServer: {
        // proxy: 'http://localhost:4000'
        proxy: {
            '/api': {
               target: 'http://154.8.197.214', // 正式环境
               changeOrigin: true,
               autoRewrite: true,
               cookieDomainRewrite: true,
               pathRewrite: {
               }
             }
        }
    }
}