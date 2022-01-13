module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://18.191.147.61/',
                target: 'https://virtserver.swaggerhub.com/mosfet/esplori/1.0.0/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': 'api'
                }
            },
        }
    }
}
