const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }

    },
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
    },
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
}