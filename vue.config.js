module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/alimama/dist/' : '/',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}