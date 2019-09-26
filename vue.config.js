module.exports = {
    devServer: {
        proxy: {
            '/alimama': {
                target: 'https://52djw.com/alimama/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/alimama': ''
                }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/alimama/dist/' : '/',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}